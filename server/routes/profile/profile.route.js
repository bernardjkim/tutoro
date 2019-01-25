// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();
const passport = require("passport");

const profile = require("./profile.controller");

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
 * Create a profile
 */
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  profile.create
);

/**
 * Update a profile
 */
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  profile.update
);

/**
 * Get list of profiles
 */
router.get("/", profile.list);

/**
 * Get current user profile
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  profile.get
);

/**
 * Get user profile
 */
router.get("/:userId", profile.get);

/** Load user when API with userId route parameter is hit */
router.param("userId", profile.load);

module.exports = router;
