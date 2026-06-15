import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import type { ErrorRequestHandler } from "express";
import authRoutes from "./modules/auth/authRoutes";
// Routes
import router from "./router";

const app = express();

// --------------------
// Middleware parsing
// --------------------
// L'ordre compte : on doit parser les cookies avant d'utiliser le routeur
app.use(cookieParser());
app.use(express.json());

// --------------------
// CORS
// --------------------
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:3000",
  "https://jinloup-ludo-art-v2-client.vercel.app",
  // Add prod domain if needed
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// --------------------
// ROUTES
// --------------------
// Publics
app.use("/api", router);
// Auth (si besoin)
app.use("/api/auth", authRoutes);

// --------------------
// Static files (Production)
// --------------------
const publicFolderPath = path.join(__dirname, "../../server/public");
if (fs.existsSync(publicFolderPath)) {
  app.use(express.static(publicFolderPath));
}

// Serve uploaded files from the uploads directory
// Note: This is for serving images uploaded by users
// __dirname = server/src/ -> remonter de 2 niveaux puis server/uploads
const uploadsFolderPath = path.resolve(__dirname, "../uploads");
if (fs.existsSync(uploadsFolderPath)) {
  app.use("/uploads", express.static(uploadsFolderPath));
}

// Client is deployed separately on Vercel, so no need to serve it here
// const clientBuildPath = path.join(__dirname, "../../client/dist");
// if (fs.existsSync(clientBuildPath)) {
//   app.use(express.static(clientBuildPath));
//   app.get("*", (_, res) => {
//     res.sendFile("index.html", { root: clientBuildPath });
//   });
// }

// --------------------
// Error Middleware
// --------------------
const logErrors: ErrorRequestHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err);
  if (!res.headersSent) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.use(logErrors);

export default app;
