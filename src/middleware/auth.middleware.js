import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = payload;

    next();
  } catch (err){
    return res.status(401).json({
      message: "Invalid or expired token - "+ err.message,
    });
  }
}