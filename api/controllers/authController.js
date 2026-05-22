import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findByUsername(username);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user.id, username: user.username },
      process.env.JWT_SECRET || "dev_secret_key",
      { expiresIn: "1h" }
    );

    res.json({ token, message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ error: "An error occurred during login" });
  }
};

export const register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  try {
    const existingUser = await User.findByUsername(username);
    if (existingUser) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create(username, hashedPassword);
    res.status(201).json({ 
      message: "User registered successfully", 
      user: { id: user.id, username: user.username } 
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({ error: "An error occurred during registration" });
  }
};
