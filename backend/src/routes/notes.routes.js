import { Router } from "express";

import requireAuth from "../middleware/requireAuth.js";

import asyncHandler from "../utils/asyncHandler.js";

import validate from "../middleware/validate.js";
import validateParams from "../middleware/validateParams.js";
import {
  createNoteSchema,
  updateNoteSchema,
  noteIdParamSchema,
} from "../validators/note.schema.js";

import {
  createNote,
  getNotes,
  deleteNote,
  updateNote,
} from "../controllers/notes.controller.js";

const router = Router();

router.use(asyncHandler(requireAuth));

router.post("/", validate(createNoteSchema), asyncHandler(createNote));
router.get("/", asyncHandler(getNotes));
router.delete(
  "/:id",
  validateParams(noteIdParamSchema),
  asyncHandler(deleteNote)
);
router.put(
  "/:id",
  validateParams(noteIdParamSchema),
  validate(updateNoteSchema),
  asyncHandler(updateNote)
);

export default router;
