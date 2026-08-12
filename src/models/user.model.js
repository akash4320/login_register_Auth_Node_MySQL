import db from "../config/db.js";

export async function findUserByUsername(username) {
  const [rows] = await db.execute(
    `SELECT id, first_name, last_name, username, password_hash
     FROM users
     WHERE username = ?`,
    [username]
  );

  return rows[0];
}

export async function findUserById(id) {
  const [rows] = await db.execute(
    `SELECT id, first_name, last_name, username
     FROM users
     WHERE id = ?`,
    [id]
  );

  return rows[0];
}

export async function createUser({
  firstName,
  lastName,
  username,
  passwordHash,
}) {
  const [result] = await db.execute(
    `INSERT INTO users
       (first_name, last_name, username, password_hash)
     VALUES (?, ?, ?, ?)`,
    [firstName, lastName, username, passwordHash]
  );

  return result.insertId;
}