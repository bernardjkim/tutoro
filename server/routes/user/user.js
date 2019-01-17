const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");

const validateRegisterInput = require("../../utils/validations/signup");
const validateLoginInput = require("../../utils/validations/login");
const { sign } = require("../../utils/jwt");

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
 * Create a new user
 */
router.post("/", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid)
    return res.status(400).json({
      error: {
        message: "Unable to create new user",
        description: "Invalid parameters",
        parameters: errors
      }
    });

  try {
    const userExists = User.findOne({ email: req.body.email });
    const hash = bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email });
    const token = sign({ id: user.id });

    if (await userExists)
      return res.status(400).json({
        error: {
          message: "Unable to create new user",
          description: "A user has already signed up with this email"
        }
      });

    user.password = await hash;
    await user.save();

    return res.status(201).json({ success: true, token: await token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: "Unable to create new user",
        description: "Internal server error"
      }
    });
  }
});

/**
 * Get all users
 */
router.get("/", undefinedHandler);

/**
 * Validate current user with jwt
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  }
);

/**
 * Get a single user
 */
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    var user = await User.findOne({ _id: id });
    if (!user)
      return res.status(404).json({
        error: {
          message: "Unable to get user",
          description: `User with id ${id} does not exist`
        }
      });

    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: {
        message: "Unable to get user",
        description: "Internal server error"
      }
    });
  }
});

module.exports = router;
