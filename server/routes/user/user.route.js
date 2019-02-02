const express = require("express");
const router = express.Router();
const passport = require("passport");

const user = require("./user.controller");

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

/** POST /api/user - Create new user */
router.post("/", user.create);

/** GET /api/user - Get a list of users */
router.get("/", undefinedHandler);

/** GET /api/user/current - Get current user */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  user.get
);

/** GET /api/user/:id - Get specified user */
router.get("/:id", user.get);

/** POST /api/user/verify/:id - Verify user account */
router.get("/verify/:id", user.verify);

/** Load user when API with id route parameter is hit */
router.param("id", user.load);

module.exports = router;
