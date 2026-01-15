import argon2 from "argon2";
import type { NextFunction, Request, RequestHandler, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import databaseClient from "../../../database/client";
import type { User } from "../../types/user";
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
    console.log("Reading user id:", userId);
    const user = await userRepository.read(userId);
    console.log("User found:", user);

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
    const userId = Number(req.params.id);
    const { pseudo, role, bio, avatar } = req.body;
    if (!pseudo || !role) {
      res.status(400).json("Pseudo and role are required");
      return;
    }

    const updateData: Partial<User> = { pseudo, role };
    if (bio !== undefined) updateData.bio = bio;
    if (avatar !== undefined) updateData.avatar = avatar;

    const affectedRows = await userRepository.updateUser(userId, updateData);
    if (affectedRows === 0) {
      res.sendStatus(404);
      return;
    }

    // Return updated user
    const updatedUser = await userRepository.read(userId);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);
    // Delete associated data in order to avoid foreign key constraints
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
    res.status(200).json({
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
    });
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
    console.log("Refresh token received:", token ? "present" : "missing");
    if (!token) throw new Error("jwt must be provided");

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    console.log("Decoded token:", decoded);

    // Récupérer l'utilisateur complet depuis la DB
    const user = await userRepository.read(decoded.id);
    console.log("User from DB for refresh:", user);
    if (!user) {
      res.sendStatus(404);
      return;
    }

    // Générer un nouveau token
    const newToken = jwt.sign({ id: user.id, email: user.email }, secretKey, {
      expiresIn: "1d",
    });

    res.cookie("token", newToken, { httpOnly: true });
    // On renvoie les infos complètes de l'utilisateur
    res.status(200).json({
      id: user.id,
      email: user.email,
      pseudo: user.pseudo,
      role: user.role,
      avatar: user.avatar,
      bio: user.bio,
    });
  } catch (err) {
    console.error("Refresh token error:", (err as Error).message);
    if ((err as Error).message !== "jwt must be provided") {
      console.error((err as Error).message);
    }
    res.sendStatus(500);
  }
};

// Middleware pour protéger les routes
const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      res.status(403).json("A token must be provided");
      return;
    }

    const secretKey = process.env.APP_SECRET;
    if (!secretKey) throw new Error("APP_SECRET is not defined");

    const decoded = jwt.verify(token, secretKey) as JwtPayload;
    req.user = { id: decoded.id, email: decoded.email };
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
  verifyToken,
};
