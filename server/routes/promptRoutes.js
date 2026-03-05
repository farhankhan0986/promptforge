import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  generatePrompt,
  savePrompt,
  getPrompts,
  deletePrompt,
  deleteAllPrompts
} from "../controllers/promptController.js";

const router = express.Router();

router.post("/generate", protect, generatePrompt);
router.post("/", protect, savePrompt);
router.get("/", protect, getPrompts);
router.delete("/:id", protect, deletePrompt);
router.delete("/", protect, deleteAllPrompts);

export default router;