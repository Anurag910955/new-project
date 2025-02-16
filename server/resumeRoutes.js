const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Save Resume Data
router.post("/save", (req, res) => {
  const { userId, personalDetails, education, experience, skills, projects, extracurricular, certifications } = req.body;

  db.query(
    "INSERT INTO resumes (user_id, personal_details, education, experience, skills, projects, extracurricular, certifications) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [userId, JSON.stringify(personalDetails), JSON.stringify(education), JSON.stringify(experience), JSON.stringify(skills), JSON.stringify(projects), JSON.stringify(extracurricular), JSON.stringify(certifications)],
    (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to save resume" });
      res.json({ message: "Resume saved successfully" });
    }
  );
});

// Fetch Resume Data
router.get("/:userId", (req, res) => {
  const userId = req.params.userId;

  db.query("SELECT * FROM resumes WHERE user_id = ?", [userId], (err, result) => {
    if (err || result.length === 0) return res.status(404).json({ message: "No resume found" });
    res.json(result[0]);
  });
});

module.exports = router;
