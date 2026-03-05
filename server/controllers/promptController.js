import pool from "../config/db.js";
import { generatewithGroq } from "../utils/groq.js";

export const generatePrompt = async (req, res) => {
  try {
    const { input } = req.body;
    if (!input) {
      return res.status(400).json({ message: "Input is required" });
    }
    const improved = await generatewithGroq(input);

    res.json({ improved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating prompt" });
  }
};

export const savePrompt = async (req, res) => {
  try {
    const { title, improved_prompt, category, tags } = req.body;
    if (!title || !improved_prompt) {
      return res.status(400).json({ message: "Title and Prompt are required" });
    }
    const newPrompt = await pool.query(
      `INSERT INTO prompts (user_id, title, improved_prompt, category, tags)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [req.user, title, improved_prompt, category, tags],
    );
    res.status(201).json(newPrompt.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving prompt" });
  }
};

export const getPrompts = async (req, res) => {
  try {
    const prompts = await pool.query(
      "SELECT * FROM prompts WHERE user_id = $1 ORDER BY created_at DESC",
      [req.user],
    );
    res.json(prompts.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching prompts" });
  }
};

export const deletePrompt = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM prompts WHERE id = $1 AND user_id = $2", [
      id,
      req.user,
    ]);

    res.json({ message: "Prompt deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const deleteAllPrompts = async (req, res) => {
  try {
    await pool.query("DELETE FROM prompts WHERE user_id = $1", [req.user]);
    res.json({ message: "All prompts deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};
