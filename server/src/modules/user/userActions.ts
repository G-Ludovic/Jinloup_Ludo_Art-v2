import argon2 from "argon2";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import userRepository from "./userRepository";

interface AuthRequest extends Request {
  user?: { id: number; email: string };
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

    if (!user) return res.sendStatus(404);
    res.json(user);
  } catch (err) {
    next(err);
  }
};

// Inscription
const add: RequestHandler = async (req, res) => {
  try {
    const { email, password, confirmPassword } =
      req.body as RegisterRequestBody;

    if (!email || !password || !confirmPassword)
      res.status(400).json("Please fill all required fields");

    if (password !== confirmPassword)
      res.status(400).json("Passwords do not match");

    const hashedPassword = await argon2.hash(password, {
      memoryCost: 2 ** 19,
      timeCost: 2,
      parallelism: 1,
    });

    const user = await userRepository.create({
      email,
      password: hashedPassword,
    });

    if (!user) throw res.sendStatus(500).json;

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
    const { email, password } = req.body;
    const user = await userRepository.readByEmail(email);

    if (!user) throw new Error("This user doesn't exist");

    const isPasswordValid = await argon2.verify(user.password, password);
    if (!isPasswordValid) throw new Error("Invalid password");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("A secret must be provided");

    const token = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    res.cookie("token", token, { httpOnly: true, secure: false });
    res.status(200).json("Congratulations, you're logged in !");
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
    const token = req.cookies.token;
    if (!token) throw new Error("jwt must be provided");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload;

    // Récupérer l'utilisateur complet depuis la DB
    const user = await userRepository.read(decoded.id);
    if (!user) return res.sendStatus(404);

    // Générer un nouveau token
    const newToken = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    res.cookie("token", newToken, { httpOnly: true });
    // On renvoie id, email ET role
    return res
      .status(200)
      .json({ id: user.id, email: user.email, role: user.role });
  } catch (err) {
    if ((err as Error).message !== "jwt must be provided") {
      console.error((err as Error).message);
    }
    return res.sendStatus(500);
  }
};

// Middleware pour protéger les routes
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(403).json("A token must be provided");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = { id: decoded.id, email: decoded.email };
    next();
  } catch {
    return res.status(403).json("Invalid or expired token");
  }
};

export default {
  browse,
  read,
  add,
  login,
  logout,
  refreshToken,
  verifyToken,
};
