const bcrypt = require("bcryptjs");

module.exports.encrpyt = password => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) reject(err);
      return resolve(hash);
    });
  });
};
