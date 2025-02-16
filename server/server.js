const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const db = require("./config/db");

const app = express();

// Middleware
app.use(cors({ 
  origin: "https://project-frontend-hazel-two.vercel.app", // Change to your frontend URL
  credentials: true 
}));
app.use(bodyParser.json());

// Logging middleware (for debugging requests)
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  next();
});

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// Check database connection
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ Database connection error:", err);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Use dynamic port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
