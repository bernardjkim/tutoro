const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const Language = require("../../models/Language");
const test = require("../../seed/language.json");
/**
 * Undefined endpoint
 */
const undefinedHandler = (req, res) => {
  return res.status(404).json({
    error: {
      message: "Unable to reach API endpoint",
      description: "Endpoint is currently undefined"
    }
  });
};

/**
 * Get list of languages
 */
router.get("/", async (req, res) => {
  return res.status(200).json({ success: true, test });
  // Language.find({}, function(err, languages) {
  //   if (err)
  //     return res.status(500).json({
  //       error: {
  //         message: "Unable to get user",
  //         description: "Internal server error"
  //       }
  //     });
  //   return res.status(200).json({ success: true, languages });
  // });
});

module.exports = router;
