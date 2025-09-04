import express from "express";
import path from "path";
import pkg from "pg"; // PostgreSQL client
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from "uuid";
import methodOverride from "method-override";

const { Pool } = pkg;
const app = express();
const PORT = process.env.PORT || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "views"));
app.use(express.static(path.join(__dirname, "..", "public")));

// ✅ PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Render Postgres
});

// ---------------- ROUTES ----------------

// Show all blogs
app.get("/blogs", async (req, res) => {
  const q = "SELECT * FROM blogs ORDER BY date DESC";
  try {
    const result = await pool.query(q);
    let blogs = result.rows;
    res.render("index", { blogs });
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// New blog form
app.get("/blogs/new", (req, res) => {
  res.render("new");
});

// Create a new blog
app.post("/blogs", async (req, res) => {
  const { title, content, author, password } = req.body;
  const id = uuidv4();
  const date = new Date();

  const q = `INSERT INTO blogs (id, title, content, author, password, date) 
             VALUES ($1, $2, $3, $4, $5, $6)`;

  try {
    await pool.query(q, [id, title, content, author, password, date]);
    res.redirect("/blogs");
  } catch (err) {
    console.error(err);
    res.send("Error in inserting blog");
  }
});

// Show a single blog
app.get("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  const q = `SELECT * FROM blogs WHERE id=$1`;

  try {
    const result = await pool.query(q, [id]);
    let blog = result.rows[0];
    res.render("show", { blog });
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// Update blog content
app.patch("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let { password: formPassword, content: newContent } = req.body;

  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);
    let blog = result.rows[0];

    if (!blog) return res.send("Blog not found");

    if (formPassword !== blog.password) {
      return res.send("Incorrect password");
    }

    await pool.query("UPDATE blogs SET content=$1 WHERE id=$2", [
      newContent,
      id,
    ]);
    res.redirect("/blogs");
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// Edit blog form
app.get("/blogs/:id/edit", async (req, res) => {
  let { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);
    let blog = result.rows[0];
    res.render("edit", { blog });
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// Delete confirmation page
app.get("/blogs/:id/delete", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);
    let blog = result.rows[0];
    res.render("delete", { blog });
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// Delete blog
app.delete("/blogs/:id", async (req, res) => {
  let { id } = req.params;
  let { password: formPassword } = req.body;

  try {
    const result = await pool.query("SELECT * FROM blogs WHERE id=$1", [id]);
    let blog = result.rows[0];

    if (!blog) return res.send("Blog not found");

    if (formPassword !== blog.password) {
      return res.send("Incorrect password");
    }

    await pool.query("DELETE FROM blogs WHERE id=$1", [id]);
    res.redirect("/blogs");
  } catch (err) {
    console.error(err);
    res.send("Error in db");
  }
});

// Redirect root → /blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

// Start server
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
