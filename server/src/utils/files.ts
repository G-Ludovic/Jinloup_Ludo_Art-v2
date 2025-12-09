import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import type { Request, RequestHandler } from "express";
import multer from "multer";
import type { FileFilterCallback } from "multer";

// ==============================
// 📂 CONFIGURATION DU STOCKAGE
// ==============================

// Dossier où seront sauvegardées les images
const UPLOAD_DIR = path.join(process.cwd(), "public/uploads");

// Création du dossier s'il n'existe pas
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

// Configuration du stockage Multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },

  filename: (_req, file, cb) => {
    // Sécurisation et unicité du nom de fichier
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext).toLowerCase();
    const uniqueId = crypto.randomUUID();
    cb(null, `${baseName}-${uniqueId}${ext}`);
  },
});

// ==============================
// 🧠 MULTER : middleware upload
// ==============================

// Filtrage : n’accepter que les fichiers image
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"));
  }
};

// Initialisation Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // max 5 Mo
});

// ==============================
// 🧩 MIDDLEWARES EXPRESS
// ==============================

// 🔸 Middleware générique pour upload d’image (clé : "image")
const imageUpload = upload.single("image");

// 🔸 Middleware pour ajouter le chemin d’accès au body (module draw)
const drawImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/uploads/${req.file.filename}`;
    }
    next();
  } catch (err) {
    next(err);
  }
};

// 🔸 Middleware pour le module "presentation"
const presentationImage: RequestHandler = (req, res, next) => {
  try {
    if (req.file) {
      req.body.file = `/uploads/${req.file.filename}`;
    }
    next(); // fichier optionnel
  } catch (err) {
    next(err);
  }
};

// ==============================
// 🗑️ SUPPRESSION DE FICHIERS
// ==============================

// 🔸 Supprime un fichier (ex: "/uploads/nom.jpg")
const removeImageFromServer = (filePath: string | null | undefined) => {
  if (!filePath) return;

  const relativePath = path.join(process.cwd(), "public", filePath);

  fs.unlink(relativePath, (err) => {
    if (err && err.code !== "ENOENT") {
      console.error(`⚠️ Erreur suppression fichier : ${err.message}`);
    } else {
      console.log(`🗑️ Fichier supprimé : ${filePath}`);
    }
  });
};

// ==============================
// 📦 EXPORTS
// ==============================

export default {
  imageUpload,
  drawImage,
  presentationImage,
  removeImageFromServer,
};
