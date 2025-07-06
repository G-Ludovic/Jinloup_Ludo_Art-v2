import express from "express";
import userActions from "./modules/user/userActions";
import validation from "./utils/validation";
import auth from "./utils/auth";

const router = express.Router();

router.post(
  "/user",
  validation.userValidation,
  auth.hashPassword,
  userActions.add,
);

router.post("/login", validation.userValidation, auth.login);

router.post("/logout", auth.logout);

export default router;
