import argon2 from "argon2";
import jwt from "jsonwebtoken";

import {
  createUser,
  findUserByUsername,
  findUserById,
} from "../models/user.model.js";

export async function registerUser(data) {
  const {
    firstName,
    lastName,
    username,
    password,
    confirmPassword,
  } = data;

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await findUserByUsername(username);

  if (existingUser) {
    throw new Error("Username already exists");
  }

  const passwordHash = await argon2.hash(password);

  const userId = await createUser({
    firstName,
    lastName,
    username,
    passwordHash,
  });

  return findUserById(userId);
}

export async function loginUser(username, password) {
  const user = await findUserByUsername(username);

  if (!user) {
    throw new Error("Invalid username or password");
  }

  const validPassword = await argon2.verify(
    user.password_hash,
    password
  );

  if (!validPassword) {
    throw new Error("Invalid username or password");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user: {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      username: user.username,
    },
  };
}