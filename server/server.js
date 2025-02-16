const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const db = require("./config/db");

const app = express();

// ✅ FIXED: Proper CORS Setup
app.use(
  cors({
    origin: "https://project-frontend-hazel-two.vercel.app", // Frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(bodyParser.json());

// ✅ Improved Logging Middleware (Shows Request Body)
app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url}`);
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("📦 Request Body:", req.body);
  }
  next();
});

// ✅ Root Route to Confirm Backend is Running
app.get("/", (req, res) => {
  res.send("✅ Backend is running successfully!");
});

// ✅ Check Database Connection
db.query("SELECT 1", (err) => {
  if (err) {
    console.error("❌ Database connection error:", err.message);
  } else {
    console.log("✅ Database connected successfully!");
  }
});

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("🚨 Unexpected Error:", err);
  res.status(500).json({ message: "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
