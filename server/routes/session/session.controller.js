// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();

const User = require("@models/User");

const validateLoginInput = require("@utils/validations/login");
const { sign } = require("@utils/jwt");

async function create(req, res, next) {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    res.status(400).json({
      error: {
        message: "Unable to create session",
        description: "Invalid parameters",
        parameters: errors
      }
    });
    return next(new Error("Invalid parameters"));
  }
  debugger
  const { email, password } = req.body;

  //
  const user = await User.findOne({ email }).catch(e => {
    res.status(500).json({
      error: {
        message: "Unable to create session",
        description: "Internal server error"
      }
    });
    return next(e);
  });

  if (!user) {
    res.status(404).json({
      error: {
        message: "Unable to create session",
        description: "Invalid email",
        parameters: { email: "Invalid email" }
      }
    });
    return next(new Error("Invalid email"));
  }

  // Generate jwt token
  const token = await sign({ id: user.id }).catch(e => {
    res.status(500).json({
      error: {
        message: "Unable to create session",
        description: "Internal server error"
      }
    });
    return next(e);
  });

  // test matching password
  user.comparePassword(password, function(err, isMatch) {
    if (!isMatch) {
      res.status(400).json({
        error: {
          message: "Unable to create session",
          description: "Incorrect password",
          parameters: { password: "Incorrect password" }
        }
      });
      return next(new Error("Incorrect password"));
    } else {
      return res.status(201).json({ success: true, token });
    }
  });
}

async function remove(req, res) {}

module.exports = { create, remove };
