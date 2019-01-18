const express = require("express");
const router = express.Router();

const Major = require("../../models/Major");

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
 * Get list of majors
 */
router.get("/", async (req, res) => {
  Major.find({}, function(err, majors) {
    if (err)
      return res.status(500).json({
        error: {
          message: "Unable to get majors",
          description: "Internal server error"
        }
      });
    return res.status(200).json({ success: true, majors });
  });
});

module.exports = router;
