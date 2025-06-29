import express from "express";
import { upload } from "../config/cloudinary.js";
import {
  askGemini,
  getPrompts,
  addPrompts,
  deletePrompts,
} from "../controllers/aiController.js";

const router = express.Router();

router.post("/ask-gemini", askGemini);

router.get("/get-prompts", getPrompts);
router.post("/add-prompts", upload.none(), addPrompts);
router.delete("/delete-prompts", upload.none(), deletePrompts);

export default router;
