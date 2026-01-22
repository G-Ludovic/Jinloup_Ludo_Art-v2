import argon2 from "argon2";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import databaseClient from "../../../database/client";
import type { User } from "../../types/user";
import files from "../../utils/files";
import userRepository from "./userRepository";

interface AuthRequest extends Request {
  user?: { id: number; email: string; role: string };
}

interface RegisterRequestBody {
  email: string;
  password: string;
  confirmPassword: string;
}

const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await userRepository.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

const read: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    const user = await userRepository.read(userId);

    if (!user) {
      res.sendStatus(404);
      return;
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
};

const edit: RequestHandler = async (req, res, next) => {
  try {
    console.log("Edit user request:", req.params.id, req.body);
    const userId = Number(req.params.id);
    const currentUser = req.user;
    if (!currentUser) {
      res.status(403).json("Authentication required");
      return;
    }
    // Allow if editing own profile or if user is alpha
    if (currentUser.id !== userId && currentUser.role !== "loup alpha") {
      res
        .status(403)
        .json("You can only edit your own profile or must be an admin");
      return;
    }
    const { pseudo, role, bio, avatar } = req.body;
    console.log("Parsed data:", { pseudo, role, bio, avatar });
    if (!pseudo || !role) {
      res.status(400).json("Pseudo and role are required");
      return;
    }

    // Récupérer l'ancien user pour supprimer l'ancien avatar si nécessaire
    const oldUser = await userRepository.read(userId);
    if (!oldUser) {
      res.sendStatus(404);
      return;
    }

    // Si un nouvel avatar est uploadé, supprimer l'ancien
    if (avatar && oldUser.avatar) {
      files.removeImageFromServer(oldUser.avatar);
    }

    const updateData: Partial<User> = { pseudo, role };
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;
    console.log("Update data:", updateData);

    const affectedRows = await userRepository.updateUser(userId, updateData);
    console.log("Affected rows:", affectedRows);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    // Retourner l'utilisateur mis à jour
    const updatedUser = await userRepository.read(userId);
    console.log("Updated user:", updatedUser);
    res.json(updatedUser);
  } catch (err) {
    console.error("Edit error:", err);
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    // Supprimer les données associées pour éviter les contraintes de clé étrangère
    await databaseClient.query("DELETE FROM comment WHERE user_id = ?", [
      userId,
    ]);
    await databaseClient.query("DELETE FROM message WHERE user_id = ?", [
      userId,
    ]);
    await databaseClient.query("DELETE FROM subject WHERE user_id = ?", [
      userId,
    ]);
    await databaseClient.query("DELETE FROM draw WHERE user_id = ?", [userId]);
    const affectedRows = await userRepository.delete(userId);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Inscription
const add: RequestHandler = async (req, res) => {
  try {
    const { email, password, confirmPassword } =
      req.body as RegisterRequestBody;

    if (!email || !password || !confirmPassword) {
      res.status(400).json("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json("Passwords do not match");
      return;
    }

    const hashedPassword = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    const user = await userRepository.create({
      email,
      password: hashedPassword,
    });

    if (!user) {
      res.sendStatus(500);
      return;
    }

    res
      .status(201)
      .json("Congratulations, your account has been created successfully !");
  } catch (err) {
    res.sendStatus(500).json;
  }
};

// Connexion
const login: RequestHandler = async (req, res) => {
  try {
    console.log("Login attempt for email:", req.body.email);
    const { email, password } = req.body;
    const user = await userRepository.readByEmail(email);

    if (!user) throw new Error("This user doesn't exist");

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new Error("Invalid password");

    // Update last_active
    await userRepository.updateLastActive(user.id);

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("A secret must be provided");

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      {
        expiresIn: "1d",
      },
    );

    res
      .status(200)
      .json({ message: "Congratulations, you're logged in !", token });
  } catch (err) {
    console.warn((err as Error).message);
    res.sendStatus(500);
  }
};

// Logout
const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch {
    res.sendStatus(500);
  }
};

// Refresh Token
const refreshToken: RequestHandler = async (req, res) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      token = req.cookies.token;
    }
    if (!token) throw new Error("jwt must be provided");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Récupérer l'utilisateur complet depuis la DB
    const user = await userRepository.read(decoded.id);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // Générer un nouveau token
    const newToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      secretKey,
      {
        expiresIn: "1d",
      },
    );

    // On renvoie les infos complètes de l'utilisateur avec le nouveau token
    res.status(200).json({
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      avatar: user.avatar,
      bio: user.bio,
      role: user.role,
      token: newToken,
    });
  } catch (err) {
    res.sendStatus(500);
  }
};

// Obtenir les statistiques en ligne (comptes par rôle)
const getOnlineStats: RequestHandler = async (req, res, next) => {
  try {
    const onlineStats = await userRepository.countOnlineByRole();
    const totalStats = await userRepository.countByRole();
    const stats = totalStats.map((total) => {
      const online = onlineStats.find((o) => o.role === total.role);
      return {
        role: total.role,
        total: total.count,
        online: online ? online.count : 0,
      };
    });
    res.json({ stats });
  } catch (err) {
    next(err);
  }
};

// Middleware pour protéger les routes
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      token = req.cookies?.token;
    }
    if (!token) {
      res.status(403).json("A token must be provided");
      return;
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload & {
      role: string;
    };
    req.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    next();
  } catch {
    res.status(403).json("Invalid or expired token");
  }
};

export default {
  browse,
  read,
  edit,
  destroy,
  add,
  login,
  logout,
  refreshToken,
  getOnlineStats,
  verifyToken,
};
