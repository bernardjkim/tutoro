// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const Location = require("@models/Location");

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
 * Get list of locations
 */
router.get("/", async (req, res) => {
  Location.find({}, function(err, locations) {
    if (err)
      return res.status(500).json({
        error: {
          message: "Unable to get locations",
          description: "Internal server error"
        }
      });
    return res.status(200).json({ success: true, locations });
  });
});

module.exports = router;
