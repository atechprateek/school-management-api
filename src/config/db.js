// src/config/db.js
// ─────────────────────────────────────────────────────
//  Creates a MySQL connection pool using env variables.
//  Using a pool (instead of a single connection) gives
//  better performance under concurrent requests.
// ─────────────────────────────────────────────────────

const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || "localhost",
  user:               process.env.DB_USER     || "root",
  password:           process.env.DB_PASSWORD || "",
  database:           process.env.DB_NAME     || "school_management",
  port:               process.env.DB_PORT     || 3306,
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
});

// Quick connectivity check on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("✅  MySQL connected successfully");
    conn.release();
  } catch (err) {
    console.error("❌  MySQL connection failed:", err.message);
    process.exit(1);
  }
})();

module.exports = pool;
