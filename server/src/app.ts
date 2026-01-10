import "dotenv/config"; // ✅ Charge les variables d’environnement avant tout
import fs from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

// Routes
import router from "./router";
import authRoutes from "./modules/auth/authRoutes";
import type { ErrorRequestHandler } from "express";

const app = express();

// --------------------
// 🔹 Middleware parsing
// --------------------
// ⚠️ L’ordre compte : on doit parser les cookies avant d’utiliser le routeur
app.use(cookieParser());
app.use(express.json());

// --------------------
// 🔹 CORS
// --------------------
if (process.env.CLIENT_URL) {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL],
      credentials: true,
    }),
  );
}

// --------------------
// 🔹 ROUTES
// --------------------
// Publics
app.use("/api", router);
// Auth (si tu en as besoin)
app.use("/api/auth", authRoutes);

// --------------------
// 🔹 Static files (Production)
// --------------------
const publicFolderPath = path.join(__dirname, "../../server/public");
if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

const clientBuildPath = path.join(__dirname, "../../client/dist");
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));
  app.get("*", (_, res) => {
    res.sendFile("index.html", { root: clientBuildPath });
  });
}

// --------------------
// 🔹 Error Middleware
// --------------------
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error("🔥 Error:", err);
  console.error("Request:", req.method, req.path);
  res.status(500).json({ message: "Internal Server Error" });
  next(err);
};

app.use(logErrors);

export default app;
