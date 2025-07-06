import express from "express";
import userActions from "./modules/user/userActions";
import validation from "./utils/validation";

const router = express.Router();

router.post("/user", validation.userValidation, userActions.add);

export default router;
