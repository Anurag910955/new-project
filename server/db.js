const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",  // Change if your MySQL username is different
  password: "@Success910",  // Add your MySQL password if set
  database: "resume_builder",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed: " + err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

module.exports = db;
