import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import noteRoutes from "./routes/notes.routes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { ENV } from "../config/env.js";

const app = express();

const allowedOrigins = new Set(ENV.CORS_ORIGINS);

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.has(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

// Health check route
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/auth", authRoutes);
app.use("/notes", noteRoutes);

// error handler
app.use(errorHandler);

export default app;
