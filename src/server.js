import "dotenv/config";

import app from "./app.js";
import { testDbConnection } from "./config/db.js";

const PORT = process.env.PORT || 8080;

function mask(v) {
  if (!v) return "MISSING";
  if (v.length <= 4) return "****";
  return `${v.slice(0, 2)}****${v.slice(-2)}`;
}

function logEnvCheck() {
  console.log("ENV CHECK:", {
    NODE_ENV: process.env.NODE_ENV || "MISSING",
    PORT: process.env.PORT || "MISSING",
    DB_HOST: process.env.DB_HOST || "MISSING",
    DB_PORT: process.env.DB_PORT || "MISSING",
    DB_USER: process.env.DB_USER || "MISSING",
    DB_NAME: process.env.DB_NAME || "MISSING",
    DB_PASSWORD: mask(process.env.DB_PASSWORD),
    JWT_SECRET: mask(process.env.JWT_SECRET),
    CORS_ORIGINS: process.env.CORS_ORIGINS || "MISSING",
  });

  console.log("DB target:", `${process.env.DB_HOST}:${process.env.DB_PORT || 3306}`);
}

async function startServer() {
  try {
    logEnvCheck(); // <-- add here
    await testDbConnection();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error?.message || error);
    process.exit(1);
  }
}

startServer();