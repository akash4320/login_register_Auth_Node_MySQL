import cors from "cors";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.set("trust proxy", 1);

// Middleware
/*
Helmet automatically adds several security-related headers.
Content Security Policy, clickjacking, MIME sniffing, information exposure, browser security behaviour
*/
app.use(helmet());

app.use(express.json());

app.use(cookieParser());

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error("CORS not allowed"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Optional: explicit preflight handler
app.options("*", cors());

app.use("/api/auth", authRoutes);

export default app;