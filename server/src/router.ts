import express from "express";
import categoriesActions from "./modules/category/categoriesActions";
import drawActions from "./modules/draw/drawActions";
import itemActions from "./modules/item/itemActions";
import messageActions from "./modules/message/messageActions";
import subjectActions from "./modules/subject/subjectActions";
import userActions from "./modules/user/userActions";
import files from "./utils/files";
import validation from "./utils/validation";

const router = express.Router();

/** Items **/
router.get("/items", itemActions.browse);
router.get("/items/:id", itemActions.read);
router.post("/items", itemActions.add);
router.put("/items/:id", itemActions.edit);
router.delete("/items/:id", itemActions.destroy);

/** Users **/
// Inscription (publique)
router.post("/user", validation.userValidation, userActions.add);

// Connexion / Déconnexion (publiques)
router.post("/login", userActions.login);
router.post("/logout", userActions.logout);

// Routes protégées
router.get("/users", userActions.verifyToken, userActions.browse);
router.get("/users/:id", userActions.verifyToken, userActions.read);
router.put("/users/:id", userActions.verifyToken, userActions.edit);
router.delete("/users/:id", userActions.verifyToken, userActions.destroy);
router.get("/refresh", userActions.verifyToken, userActions.refreshToken);

/** Draws **/
router.get("/draws", drawActions.browse);
router.get("/draws/:id", drawActions.read);
router.put("/draws/:id", files.imageUpload, files.drawImage, drawActions.edit);
router.post("/draws", files.imageUpload, files.drawImage, drawActions.add);
router.delete("/draws/:id", drawActions.destroy);

/** Categories **/
router.get("/categories", categoriesActions.browse);
router.get("/categories/:id", categoriesActions.read);

/** Subjects **/
router.get("/subject", subjectActions.browse);
router.get("/subject/:id", subjectActions.read);

/** Messages **/
router.get("/message", messageActions.browse);
router.get("/message/:id", messageActions.read);
router.post(
  "/message",
  files.imageUpload,
  files.presentationImage,
  messageActions.add,
);
router.put(
  "/message/:id",
  files.imageUpload,
  files.presentationImage,
  messageActions.edit,
);
router.delete("/message/:id", messageActions.destroy);

export default router;
