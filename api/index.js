import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogs.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5500",
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/blogs", blogRoutes);

app.get("/health", (req, res) => {
  res.json({ 
    status: "ok", 
    message: "Server is running",
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
