// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const courses = require("@root/seed/course.json");

/**
 * Get list of courses
 */
router.get("/", async (req, res) => {
  const result = [];
  courses.map(doc => {
    result.push({ value: doc.name, label: doc.name });
  });

  return res.status(200).json({ success: true, courses: result });
});

module.exports = router;
