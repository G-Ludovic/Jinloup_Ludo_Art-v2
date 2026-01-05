import fs from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// import auth from "./utils/auth";
import authRoutes from "./modules/auth/authRoutes";
// Import routers
import router from "./router"; // ton router global

const app = express();

// --------------------
// CORS
// --------------------
if (process.env.CLIENT_URL != null) {
  app.use(cors({ origin: [process.env.CLIENT_URL], credentials: true }));
}

// --------------------
// Request Parsing
// --------------------
app.use(express.json());
app.use(cookieParser());

// --------------------
// ROUTES PUBLIQUES
// --------------------
// Ces routes ne nécessitent pas de token
// On suppose que ton router gère "/user" pour l'inscription et "/login" pour la connexion
app.use("/api", router);

// --------------------
// ROUTES PROTÉGÉES
// --------------------
// Exemple pour les routes qui nécessitent un token
// Tu peux créer un router séparé ou ajouter verifyToken dans les routes sensibles
// app.use("/api/protected", auth.verifyToken, protectedRouter);
app.use("/api/auth", authRoutes);

// --------------------
// Production-ready setup
// --------------------
const publicFolderPath = path.join(__dirname, "../../server/public");
if (fs.existsSync(publicFolderPath)) app.use(express.static(publicFolderPath));

const clientBuildPath = path.join(__dirname, "../../client/dist");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

// --------------------
// Middleware for Error Logging
// --------------------
import type { ErrorRequestHandler } from "express";

const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error("on req:", req.method, req.path);
  next(err);
};
app.use(logErrors);

export default app;
