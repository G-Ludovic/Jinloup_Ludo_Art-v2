import express from "express";
import categoriesActions from "./modules/category/categoriesActions";
import drawActions from "./modules/draw/drawActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import files from "./utils/files";
import validation from "./utils/validation";

const router = express.Router();

router.post(
  "/user",
  validation.userValidation,
  auth.hashPassword,
  userActions.add,
);

router.post("/login", validation.userValidation, auth.login);

router.post("/logout", auth.logout);

router.get("/refresh", auth.refreshToken);

router.get("/draws", drawActions.browse);
router.get("/draws/:id", drawActions.read);
router.put("/draws/:id", files.imageUpload, files.drawImage, drawActions.edit);
router.post("/draws", files.imageUpload, files.drawImage, drawActions.add);
router.delete("/draws/:id", drawActions.destroy);

router.get("/categories", categoriesActions.browse);
router.get("/categories/:id", categoriesActions.read);

export default router;
