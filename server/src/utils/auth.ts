import argon2 from "argon2";
import type { RequestHandler } from "express";
import userRepository from "../modules/user/userRepository";
import jwt from "jsonwebtoken";

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
    };

    const secretKey = process.env.APP_SECRET;

    if (!secretKey) {
      throw new Error("A secret must be provided");
    }

    const token = jwt.sign(payload, secretKey, { expiresIn: "1d" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // "false" quand le site est en phase de développement et "true" en déploiement
    });

    res.status(200).json("Congratulations, you're logged in !");
  } catch (err) {
    console.warn((err as Error).message);
    res.sendStatus(500);
  }
};

const logout: RequestHandler = (req, res) => {
  try {
    res.clearCookie("token");
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
};

const refreshToken: RequestHandler = (req, res) => {
  const token = req.cookies.token;

  console.warn(token);

  res.sendStatus(200);
};

export default { hashPassword, login, logout, refreshToken };
