const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const db = require("./db");

const app = express();

// ✅ Fix CORS Issue
app.use(
  cors({
    origin: "https://project-frontend-hazel-two.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Ensure Preflight Requests are Handled
app.options("*", cors());

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// ✅ Check Database Connection
db.query("SELECT 1")
  .then(() => console.log("✅ Database connected successfully!"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🚨 Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Fix for Vercel Deployment (DO NOT use app.listen())
module.exports = app;
