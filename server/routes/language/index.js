// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const languages = require("@root/seed/language.json");

/**
 * Get list of languages
 */
router.get("/", async (req, res) => {
  const result = [];
  languages.map(doc => {
    result.push({ value: doc.tag, label: doc.nativeName });
  });
  return res.status(200).json({ success: true, languages: result });
});

module.exports = router;
