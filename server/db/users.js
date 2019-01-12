const User = require("../models/User");

module.exports.getUser = userParams => {
  return new Promise((resolve, reject) => {
    User.findOne(userParams).then(user => {
      return resolve(user);
    });
  });
};

module.exports.saveUser = user => {
  user
    .save()
    .then(user => {
      const payload = { id: user.id, firstName: user.firstName };

      jsonwebtoken.sign(
        payload,
        process.env.secretOrKey,
        { expiresIn: 36000000 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token
          });
        }
      );
    })
    .catch(err => console.log(err));
};
