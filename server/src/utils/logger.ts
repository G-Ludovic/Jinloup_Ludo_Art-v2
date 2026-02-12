import type { NextFunction, Request, Response } from "express";

// Create a logger utility
const isProduction = process.env.NODE_ENV === "production";

export const logger = {
  info: (message: string, ...args: unknown[]) => {
    if (!isProduction) {
      console.log(`[INFO] ${message}`, ...args);
    }
  },
  warn: (message: string, ...args: unknown[]) => {
    if (!isProduction) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  },
  error: (message: string, ...args: unknown[]) => {
    if (!isProduction) {
      console.error(`[ERROR] ${message}`, ...args);
    } else {
      // In production, you might want to send errors to a monitoring service
      console.error(`[ERROR] ${message}`);
    }
  },
};

// Request logging middleware
export const requestLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    logger.info(
      `${req.method} ${req.path} - ${res.statusCode} - ${duration}ms`,
    );
  });

  next();
};
