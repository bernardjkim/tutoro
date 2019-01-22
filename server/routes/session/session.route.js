// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const session = require("./session.controller");

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
 * Create new session
 */
router.post("/", session.create);

/**
 * Delete session
 */
router.delete("/", undefinedHandler);

module.exports = router;
