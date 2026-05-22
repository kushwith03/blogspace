import pool from "../config/db.js";

const Blog = {
  async findAll() {
    const result = await pool.query("SELECT id, title, author, date, content FROM blogs ORDER BY date DESC");
    return result.rows;
  },

  async findById(id) {
    const result = await pool.query("SELECT id, title, content, author, date FROM blogs WHERE id = $1", [id]);
    return result.rows[0];
  },

  async create(blogData) {
    const { title, content, author, hashedPassword } = blogData;
    const q = "INSERT INTO blogs (title, content, author, password) VALUES ($1, $2, $3, $4) RETURNING id";
    const result = await pool.query(q, [title, content, author, hashedPassword]);
    return result.rows[0];
  },

  async update(id, content) {
    await pool.query("UPDATE blogs SET content = $1 WHERE id = $2", [content, id]);
    return true;
  },

  async delete(id) {
    await pool.query("DELETE FROM blogs WHERE id = $1", [id]);
    return true;
  },

  async getPassword(id) {
    const result = await pool.query("SELECT password FROM blogs WHERE id = $1", [id]);
    return result.rows[0]?.password;
  }
};

export default Blog;
