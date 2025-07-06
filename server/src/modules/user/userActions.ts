import type { RequestHandler } from "express";
import userRepository from "./userRepository";

const add: RequestHandler = async (req, res) => {
  try {
    // console.warn(req.body);

    const user = await userRepository.create(req.body);

    if (user) {
      res
        .status(201)
        .json("Congratulations, your account has been created successfully !");
    } else {
      res.status(404).json("An error occured during the registration");
    }
  } catch (err) {
    res.sendStatus(500);
  }
};

export default { add };
