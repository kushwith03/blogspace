import Blog from "../models/blogModel.js";
import bcrypt from "bcryptjs";

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch blog" });
  }
};

export const createBlog = async (req, res) => {
  const { title, content, author, password } = req.body;
  if (!title || !content || !author || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await Blog.create({ title, content, author, hashedPassword });
    res.status(201).json({ id: result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating blog" });
  }
};

export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const { password: formPassword, content: newContent } = req.body;

  if (!formPassword || !newContent) {
    return res.status(400).json({ error: "Password and content are required" });
  }

  try {
    const hashedPassword = await Blog.getPassword(id);
    if (!hashedPassword) return res.status(404).json({ error: "Blog not found" });

    const isMatch = await bcrypt.compare(formPassword, hashedPassword);
    if (!isMatch) return res.status(400).json({ error: "Incorrect post password" });

    await Blog.update(id, newContent);
    res.json({ message: "Updated successfully" });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: "An error occurred while updating the blog" });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const { password: formPassword } = req.body;

  if (!formPassword) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    const hashedPassword = await Blog.getPassword(id);
    if (!hashedPassword) return res.status(404).json({ error: "Blog not found" });

    const isMatch = await bcrypt.compare(formPassword, hashedPassword);
    if (!isMatch) return res.status(400).json({ error: "Incorrect post password" });

    await Blog.delete(id);
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "An error occurred while deleting the blog" });
  }
};
