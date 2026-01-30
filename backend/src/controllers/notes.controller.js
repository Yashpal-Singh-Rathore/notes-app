import { pool } from "../../db.js";
import AppError from "../utils/AppError.js";

// Create Note
export const createNote = async (req, res) => {
  // 1. Extract data from request body
  const { title, content } = req.body;

  // 2. Validate input
  if (!content || !content.trim()) {
    throw new AppError("Note content cannot be empty", 400);
  }

  // 3. Get user ID from auth middleware
  const userId = req.user.id;

  // 4. Insert note into database
  const result = await pool.query(
    `
        INSERT INTO notes (user_id, title, content)
        VALUES ($1, $2, $3)
        RETURNING id, title, content, created_at, updated_at
        `,
    [userId, title ?? null, content],
  );

  // 5. Send response
  res.status(201).json({
    note: result.rows[0],
  });
};

// Get Notes
export const getNotes = async (req, res) => {
  // 1. Get user Id from middleware
  const userId = req.user.id;

  // 2. Fetch notes belonging to this user
  const result = await pool.query(
    `
            SELECT id, title, content, created_at, updated_at
            FROM notes
            WHERE user_id = $1
            ORDER BY created_at DESC
            `,
    [userId],
  );

  // 3. Send notes
  res.json({
    notes: result.rows,
  });
};

// delete notes
export const deleteNote = async (req, res) => {
  // 1. Extract note id from url
  const noteId = req.params.id;

  // 2. Basic validation
  if (!noteId) {
    throw new AppError("Note ID is required", 400);
  }

  // 3. Get authenticated user ID
  const userId = req.user.id;

  // 4. Delete only if note belongs to user
  const result = await pool.query(
    `
            DELETE FROM notes
            WHERE id = $1 AND user_id = $2
            RETURNING id
            `,
    [noteId, userId],
  );

  // 5. No rows = either not found or not owned
  if (result.rows.length === 0) {
    throw new AppError("Note not found or not authorized", 404);
  }

  // 6. Success
  res.json({
    message: "Note deleted successfully",
  });
};

// Update notes
export const updateNote = async (req, res) => {
  // 1. Extract note ID
  const noteId = req.params.id;

  // 2. Extract data from body
  const { title, content } = req.body;

  // 3. Validate input
  if (!title && !content) {
    throw new AppError("At least title or content is required", 400);
  }

  // 4. Get authenticated user ID
  const userId = req.user.id;

  // 5. Update note only if owned by user
  const result = await pool.query(
    `
        UPDATE notes
        SET 
            title = COALESCE($1, title),
            content = COALESCE($2, content),
            updated_at = NOW()
        WHERE id = $3 AND user_id = $4
        RETURNING id, title, content, created_at, updated_at
        `,
    [title ?? null, content ?? null, noteId, userId],
  );

  // 6. Handle not found / not owned
  if (result.rows.length === 0) {
    throw new AppError("Note not found or not authorized", 404);
  }

  // 7. Success
  res.json({
    note: result.rows[0],
  });
};
