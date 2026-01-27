import { ENV } from "../../config/env.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../db.js";

import AppError from "../utils/AppError.js";

// Signup
export const signup = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  // 2. Hash password
  const passwordHash = await bcrypt.hash(password, 10);

  // 3. Insert user
  const result = await pool.query(
    `
        INSERT INTO users (email, password_hash)
        VALUES ($1, $2)
        RETURNING id, email
        `,
    [email, passwordHash],
  );

  // 4. Success response
  res.status(201).json({
    message: "User created",
    user: result.rows[0],
  });
};

// Login
export const login = async (req, res) => {
  const { email, password } = req.body;

  // 1. Validate input
  if (!email || !password) {
    throw new AppError("Email and password required", 400);
  }

  // 2. Find user
  const result = await pool.query(
    `
            SELECT id, email, password_hash FROM users
            WHERE email = $1
            `,
    [email],
  );

  if (result.rows.length === 0) {
    throw new AppError("Invalid credentials", 401);
  }

  const user = result.rows[0];

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password_hash);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  // 4. Success
  // Create JWT
  const token = jwt.sign(
    {
      userId: user.id,
      userEmail: user.email,
    },
    ENV.JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // Set JWT in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // send response
  res.json({
    message: "Login successful",
  });
};

// logout
export const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    expires: new Date(0),
  });

  res.json({ message: "Logged out successfully" });
};

// remembers user after refreshing page
export const me = (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
    },
  });
};
