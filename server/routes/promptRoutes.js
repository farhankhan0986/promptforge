import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  generatePrompt,
  savePrompt,
  getPrompts,
  deletePrompt,
  deleteAllPrompts,
  updatePrompt,
} from "../controllers/promptController.js";

const router = express.Router();

router.post("/generate", protect, generatePrompt);
router.post("/", protect, savePrompt);
router.get("/", protect, getPrompts);
router.put("/:id", protect, updatePrompt);
router.delete("/:id", protect, deletePrompt);
router.delete("/", protect, deleteAllPrompts);

export default router;