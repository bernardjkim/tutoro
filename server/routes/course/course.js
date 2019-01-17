const express = require("express");
const router = express.Router();

const Course = require("../../models/Course");

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
 * Get list of courses
 */
router.get("/", async (req, res) => {
  Course.find({}, function(err, courses) {
    if (err)
      return res.status(500).json({
        error: {
          message: "Unable to get courses",
          description: "Internal server error"
        }
      });
    return res.status(200).json({ success: true, courses });
  });
});

module.exports = router;
