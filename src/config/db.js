import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
});

export async function testDbConnection() {
  try {
    const connection = await pool.getConnection();

    console.log("✅ MySQL database connected successfully");

    connection.release();
  } catch (error) {
    console.error("❌ MySQL database connection failed:", error.message);
    throw error;
  }
}

export default pool;