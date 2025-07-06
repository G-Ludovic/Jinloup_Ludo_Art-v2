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

export default router;
