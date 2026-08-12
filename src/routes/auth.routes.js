import express from "express";

import {
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middleware/auth.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Protected route
router.get("/me", authenticate, (req, res) => {
  res.json({
    authenticated: true,
    user: req.user,
  });
});

export default router;