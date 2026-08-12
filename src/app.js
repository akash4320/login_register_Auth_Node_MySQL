import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
/*
Helmet automatically adds several security-related headers.
Content Security Policy, clickjacking, MIME sniffing, information exposure, browser security behaviour
*/
app.use(helmet());

app.use(express.json());

app.use(cookieParser());

// Use the Routes here, we add first Authentication route
app.use("/api/auth", authRoutes);

export default app;