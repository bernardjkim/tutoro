// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const User = require("@models/User");

const validateLoginInput = require("@utils/validations/login");
const { sign } = require("@utils/jwt");

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
router.post("/", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid)
    return res.status(400).json({
      error: {
        message: "Unable to create session",
        description: "Invalid parameters",
        parameters: errors
      }
    });

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({
        error: {
          message: "Unable to create session",
          description: "This user does not exist"
        }
      });
    const token = await sign({ id: user.id });

    // // test a matching password
    user.comparePassword(password, function(err, isMatch) {
      if (!isMatch)
        return res.status(400).json({
          error: {
            message: "Unable to create session",
            description: "Incorrect password"
          }
        });
      else {
        return res.status(201).json({ success: true, token });
      }
    });
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

/**
 * Delete session
 */
router.delete("/", undefinedHandler);

module.exports = router;
