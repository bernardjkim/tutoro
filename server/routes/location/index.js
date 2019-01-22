// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const locations = require("@root/seed/location.json");

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
  const result = [];
  locations.map(doc => {
    result.push({ value: doc.tag, label: doc.name });
  });
  return res.status(200).json({ success: true, locations: result });
});

module.exports = router;
