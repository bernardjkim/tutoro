// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const majors = require("@root/seed/major.json");

/**
 * Get list of majors
 */
router.get("/", async (req, res, next) => {
  let result = [];
  majors.map(doc => {
    result.push({ value: doc.name, label: doc.name });
  });
  return res.status(200).json({ success: true, majors: result });
});

module.exports = router;
