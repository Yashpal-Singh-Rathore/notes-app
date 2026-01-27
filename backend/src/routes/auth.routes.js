import { Router } from "express";
import { signup, login, logout, me } from "../controllers/auth.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import validate from "../middleware/validate.js";
import { signupSchema, loginSchema } from "../validators/auth.schema.js";
import requireAuth from "../middleware/requireAuth.js";

const router = Router();

router.post("/signup", validate(signupSchema), asyncHandler(signup));
router.post("/login", validate(loginSchema), asyncHandler(login));
router.post("/logout", logout);
router.get("/me", requireAuth, me);

export default router;
