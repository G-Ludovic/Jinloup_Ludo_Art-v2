import argon2 from "argon2";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import userRepository from "../modules/user/userRepository";
import type { Role } from "./roles";

interface AuthRequest extends Request {
  cookies: Record<string, string>;
  user?: {
    id: number;
    email: string;
    role: Role;
  };
}

// 1. Hashage du mot de passe
const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hash = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    req.body.password = hash;

    next();
  } catch (err) {
    res.sendStatus(500);
  }
};

// 2. Connexion + JWT avec rôle
const login: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1ere partie
    const user = await userRepository.readByEmail(email);
    if (!user) {
      throw new Error("This user doesn't exist");
    }

    // 2ème partie
    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    // 3ème partie
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role as Role,
    };

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

    // Pour cross-origin, on retourne le token au lieu de le mettre en cookie
    res
      .status(200)
      .json({ message: "Congratulations, you're logged in !", token });
  } catch (err) {
    console.warn((err as Error).message);
    res.sendStatus(500);
  }
};

// 3. Déconnexion
const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

// 4. Rafraîchir le token
const refreshToken: RequestHandler = (req, res) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      token = req.cookies.token;
    }
    if (!token) {
      throw new Error("A token must be provided");
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const verifyToken = jwt.verify(token, secretKey) as JwtPayload & {
      id: number;
      email: string;
      role: Role;
    };

    const { id, email, role } = verifyToken;
    const newToken = jwt.sign({ id, email, role }, secretKey, {
      expiresIn: "1d",
    });

    res.status(200).json({ id, email, role, token: newToken });
  } catch (err) {
    console.error((err as Error).message);
    res.sendStatus(500);
  }
};

// 5. Middleware de vérification du token
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // Essayer d'abord dans les headers Authorization (pour cross-origin)
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      // Sinon dans les cookies (pour développement local)
      token = req.cookies.token;
    }
    if (!token) {
      throw new Error("A token must be provided");
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const decoded = jwt.verify(token, secretKey) as JwtPayload & {
      id: number;
      email: string;
      role: Role;
    };

    req.user = decoded;
    next();
  } catch (err) {
    console.error((err as Error).message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

// 6. Middleware de vérification des rôles
const authorize =
  (roles: Role[]) => (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res
        .status(403)
        .json({ message: "Access forbidden: insufficient rights" });
      return;
    }

    next();
  };

export default {
  hashPassword,
  login,
  logout,
  refreshToken,
  verifyToken,
  authorize,
};
