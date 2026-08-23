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
      console.log("CORS_ORIGINS process env:", process.env.CORS_ORIGINS);
      if (!origin) return cb(null, true);
      if (allowedOrigins.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS not allowed ${origin}`));
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/auth", authRoutes);

export default app;