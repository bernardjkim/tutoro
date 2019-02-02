const express = require("express");
const router = express.Router();
const passport = require("passport");

const sendgrid = require("./sendgrid.controller");

/** POST /api/sendgrid/:id  - Send offer to user */
router.post(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  sendgrid.offer
);

/** Load user when API with id route parameter is hit */
router.param("id", sendgrid.load);

module.exports = router;
