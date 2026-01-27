import { ENV } from "./config/env.js";
import fs from "fs";
import path from "path";
import pkg from "pg";

const { Pool } = pkg;

export const pool = new Pool({
  host: ENV.DB_HOST,
  port: ENV.DB_PORT,
  database: ENV.DB_NAME,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
});

/**
 * Initializes DB schema if not exists
 * Runs safely on every boot
 */
export async function initDB() {
  try {
    const schemaPath = path.resolve("schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");
    await pool.query(schema);
    console.log("Database schema ensured");
  } catch (err) {
    console.error("Schema init failed:", err.message);
  }
}
