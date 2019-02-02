// Load module alias
require("module-alias/register");

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require("@sendgrid/mail");

const User = require("@models/User");

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
      req.receiver = user; // eslint-disable-line no-param-reassign
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

function offer(req, res, next) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const msg = {
    to: "gksksla7140@gmail.com",
    from: "uw.turoro@gmail.com",
    subject: "Confirm your account on Tutoro",
    html: require("../../sendgrid/emails/email-confirmation")
  };
  sgMail.send(msg);

  res.status(204).send();
}

module.exports = { offer, load };
