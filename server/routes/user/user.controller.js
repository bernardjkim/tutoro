// Load module alias
require("module-alias/register");

const sgMail = require("@sendgrid/mail");
const emails = require("../../sendgrid/emails/email-confirmation");

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
            message: "Unable to get user",
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
  const mongoUser = await user.save().catch(e => {
    res.status(400).json({
      error: {
        message: "Unable to create new user",
        description: "A user has already signed up with this email",
        parameters: { email: "A user has already signed up with this email" }
      }
    });
    return next(e);
  });

  if (mongoUser) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: mongoUser.email,
      from: "uw.turoro@gmail.com",
      subject: "Confirm your account on Tutoro",
      html: emails(mongoUser._id)
    };
    sgMail.send(msg);
    return res.status(201).json({ success: true, token: await token });
  }
}

function verify(req, res, next) {
  User.findById(req.user.id)
    .then(user => {
      user.set({ verified: true });
      user
        .save()
        .then(savedUser => {
          res.status(200).send("Successfully verified account");
        })
        .catch(e => {
          res.status(500).json({
            error: {
              message: "Unable to verify account",
              description: "Internal server error"
            }
          });
          next(e);
        });
    })
    .catch(e => {
      res.status(404).json({
        error: {
          message: "Unable to verify account",
          description: "This user does not exist"
        }
      });
      next(e);
    });
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

module.exports = { load, get, create, update, list, remove, verify };
