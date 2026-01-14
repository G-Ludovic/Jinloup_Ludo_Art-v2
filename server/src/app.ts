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
const port = process.env.PORT || 18859;

// --------------------
// Middleware parsing
// --------------------
// L’ordre compte : on doit parser les cookies avant d’utiliser le routeur
app.use(cookieParser());
app.use(express.json());

// --------------------
// CORS
// --------------------
if (process.env.CLIENT_URL) {
  app.use(
    cors({
      origin: [process.env.CLIENT_URL],
      credentials: true,
    }),
  );
}

app.use(cors({ origin: "https://jinloup-ludo-art-v2-client.vercel.app" }));

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
  console.error("Error:", err);
  console.error("Request:", req.method, req.path);
  if (!res.headersSent) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

app.use(logErrors);

export default app;
