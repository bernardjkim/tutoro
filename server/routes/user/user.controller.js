// Load module alias
require("module-alias/register");

const passport = require("passport");

const validateRegisterInput = require("@utils/validations/signup");
const { sign } = require("@utils/jwt");

const User = require("@models/User");

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findById(id)
    .then(user => {
      if (!user)
        return res.status(404).json({
          error: {
            message: "Unablge to get user",
            description: `User with id ${id} does not exist`
          }
        });
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => {
      res.status(500).json({
        error: {
          message: "Unable to get user",
          description: "Internal server error"
        }
      });
      return next(e);
    });
}

/**
 * Get current user
 *
 * @property  {string}  req.user.id     - The user id.
 * @property  {string}  req.user.email  - The user email.
 *
 * @returns {User}
 */
function get(req, res) {
  return res.status(200).json({
    id: req.user.id,
    email: req.user.email
  });
}

/**
 * Create new user
 *
 * @property  {string}  req.body.email      - The user email.
 * @property  {string}  req.body.password   - The user password.
 * @property  {string}  req.body.password2  - Password verification.
 *
 * @returns   {Token}
 */
async function create(req, res, next) {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    res.status(400).json({
      error: {
        message: "Unable to create new user",
        description: "Invalid parameters",
        parameters: errors
      }
    });
    return next(new Error("Invalid parameters"));
  }

  const user = new User({ email: req.body.email, password: req.body.password });

  // Generate jwt token
  const token = sign({ id: user.id }).catch(e => {
    res.status(500).json({
      error: {
        message: "Unable to create new user",
        description: "Internal server error"
      }
    });
    return next(e);
  });

  // Save user into mongodb
  const mongoUser = user.save().catch(e => {
    res.status(400).json({
      error: {
        message: "Unable to create new user",
        description: "A user has already signed up with this email"
      }
    });
    return next(e);
  });

  if (await mongoUser)
    return res.status(201).json({ success: true, token: await token });
}

/**
 * Update existing user
 */
function update(req, res, next) {}

/**
 * Get user list.
 */
function list(req, res, next) {}

/**
 * Delete user.
 */
function remove(req, res, next) {}

module.exports = { load, get, create, update, list, remove };
