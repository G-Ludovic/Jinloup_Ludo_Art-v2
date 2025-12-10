import express from "express";
import categoriesActions from "./modules/category/categoriesActions";
import drawActions from "./modules/draw/drawActions";
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import userActions from "./modules/user/userActions";
import auth from "./utils/auth";
import files from "./utils/files";
import validation from "./utils/validation";

const router = express.Router();

// Items
router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);
router.put("/items/:id", itemActions.edit);
router.delete("/items/:id", itemActions.destroy);

// Users
router.post(
  "/user",
  validation.userValidation,
  auth.hashPassword,
  userActions.add,
);
router.get("/users", userActions.browse);
router.get("/users/:id", userActions.read);

// Authentication
router.post("/login", validation.userValidation, auth.login);
router.post("/logout", auth.logout);
router.get("/refresh", auth.refreshToken);

// Draws
router.get("/draws", drawActions.browse);
router.get("/draws/:id", drawActions.read);
router.put("/draws/:id", files.imageUpload, files.drawImage, drawActions.edit);
router.post("/draws", files.imageUpload, files.drawImage, drawActions.add);
router.delete("/draws/:id", drawActions.destroy);

// Categories
router.get("/categories", categoriesActions.browse);
router.get("/categories/:id", categoriesActions.read);

// Messages
router.get("/message", messageActions.browse);
router.get("/message/:id", messageActions.read);
router.post(
  "/message",
  files.imageUpload,
  files.presentationImage,
  messageActions.add,
);
router.delete("/message/:id", messageActions.destroy);
router.put(
  "/message/:id",
  files.imageUpload,
  files.presentationImage,
  messageActions.edit,
);

export default router;
