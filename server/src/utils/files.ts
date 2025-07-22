import crypto from "node:crypto";
import path from "node:path";
import type { RequestHandler } from "express";
import multer from "multer";

// 1. Création du diskStorage
//   --> Déclarer la destination du fichier
//   --> Renommer le fichier

const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "public/uploads/");
  },

  filename(req, file, callback) {
    const base = path.basename(file.originalname).toLowerCase();
    const ext = path.extname(file.originalname).toLowerCase();
    const id = crypto.randomUUID();
    callback(null, `${base}_${id}${ext}`);
  },
});

const upload = multer({ storage: storage });

const imageUpload = upload.single("image");

const drawImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
      next();
    } else {
      res.sendStatus(400).json("File problem");
    }
  } catch (err) {
    next(err);
  }
};

export default { imageUpload, drawImage };
