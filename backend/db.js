import { ENV } from "./config/env.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import pkg from "pg";

const { Pool } = pkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pool = new Pool({
  connectionString: ENV.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

/**
 * Initializes DB schema if not exists
 * Runs safely on every boot
 */
export async function initDB() {
  try {
    const schemaPath = path.join(__dirname, "schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf-8");
    await pool.query(schema);
    console.log("Database schema ensured");
  } catch (err) {
    console.error("Schema init failed:", err.message);
    throw err;
  }
}
