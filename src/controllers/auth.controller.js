import { registerUser, loginUser } from "../services/auth.service.js";

export async function register(req, res, next) {
  try {
    const user = await registerUser(req.body);

    res.status(201).json({
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { username, password } = req.body;
    console.log("Login request received:", { username, password });
    const { token, user } = await loginUser(username, password);

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    console.log("Login successful, token set in cookie:", token);
    res.json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    next(error);
  }
}

export function logout(req, res) {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.COOKIE_SECURE === "true",
    sameSite: "lax",
  });

  res.json({
    message: "Logged out successfully",
  });
}
