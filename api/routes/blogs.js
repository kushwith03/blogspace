import express from "express";
import bcrypt from "bcryptjs";
import pool from "../db.js";

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, title, author, date, content FROM blogs ORDER BY date DESC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs from database" });
  }
});

// Create blog
router.post("/", async (req, res) => {
  const { title, content, author, password } = req.body;
  if (!title || !content || !author || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const q = "INSERT INTO blogs (id, title, content, author, password, date) VALUES (gen_random_uuid(), $1, $2, $3, $4, NOW()) RETURNING id";
    const result = await pool.query(q, [title, content, author, hashedPassword]);
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating blog" });
  }
});

// Get single blog
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT id, title, content, author, date FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs from database" });
  }
});

// Update blog
router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const { password: formPassword, content: newContent } = req.body;

  try {
    const result = await pool.query("SELECT password FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });

    const isMatch = await bcrypt.compare(formPassword, result.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    await pool.query("UPDATE blogs SET content = $1 WHERE id = $2", [newContent, id]);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs from database" });
  }
});

// Delete blog
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { password: formPassword } = req.body;

  try {
    const result = await pool.query("SELECT password FROM blogs WHERE id = $1", [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Blog not found" });

    const isMatch = await bcrypt.compare(formPassword, result.rows[0].password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

    await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs from database" });
  }
});

export default router;
