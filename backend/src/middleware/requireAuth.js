import { ENV } from "../../config/env.js";

import jwt from "jsonwebtoken";
import { pool } from "../../db.js";
import AppError from "../utils/AppError.js";

const requireAuth = async (req, res, next) => {
  // 1. Read token from cookies
  const token = req.cookies.token;

  if (!token) {
    throw new AppError("Not authenticated", 401);
  }

  // 2. Verify JWT
  const decoded = jwt.verify(token, ENV.JWT_SECRET);

  // decoded now contains payload
  // { userId, iat, exp }

  // 3. Check user exist in DB
  const result = await pool.query("SELECT id, email FROM users WHERE id = $1", [
    decoded.userId,
  ]);

  if (result.rows.length === 0) {
    throw new AppError("User no longer exists", 401);
  }

  // 4. Attach user to request
  req.user = result.rows[0];

  // 5. Allow request to continue
  next();
};

export default requireAuth;
