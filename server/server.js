const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");
const db = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Root route to confirm server is running
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Use dynamic port for deployment
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
