const bcrypt = require("bcryptjs");

/**
 * Encrypt password.
 *
 * @param   {string}  password  value to be encrypted
 * @return  {Promise}           hashed value of password
 */
function encrypt(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      else resolve(hash);
    });
  });
}

/**
 * Compare password and hash.
 *
 * @param   {string}  password  password value
 * @param   {string}  hash      hash value
 * @return  {Promise}           true if match, false o.w.
 */
function compare(password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt
      .compare(password, hash)
      .then(isMatch => {
        resolve(isMatch);
      })
      .catch(err => {
        reject(err);
      });
  });
}

module.exports = {
  encrypt,
  compare
};
