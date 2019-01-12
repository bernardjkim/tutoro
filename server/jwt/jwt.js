const jsonwebtoken = require("jsonwebtoken");

/**
 * This function takes int a payload and optional sign options and will return
 * a promise returning either a jwt token or an error.
 *
 * @param {object}  payload
 * @param {object}  options (optional sign options)
 */
module.exports.sign = (payload, options = { expiresIn: 36000000 }) => {
  const key = process.env.secretOrKey;

  return new Promise((resolve, reject) => {
    jsonwebtoken.sign(payload, key, options, (err, token) => {
      if (err) reject(err);
      else resolve(`Bearer ${token}`);
    });
  });
};
