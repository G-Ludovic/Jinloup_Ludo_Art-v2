import argon2 from "argon2";
import type { RequestHandler } from "express";
import userRepository from "../modules/user/userRepository";

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

    const user = await userRepository.readByEmail(email);

    if (!user) {
      throw new Error("This user doesn't exist");
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    res.status(200).json("Congratulations, you're logged in !");
  } catch (err) {
    console.warn((err as Error).message);
    res.sendStatus(500);
  }
};

export default { hashPassword, login };
