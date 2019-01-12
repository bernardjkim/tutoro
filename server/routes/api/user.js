const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateRegisterInput = require("../../utils/validations/signup");
const validateLoginInput = require("../../utils/validations/login");

const { encrpyt } = require("../../utils/passwords/passwords");
const { sign } = require("../../jwt/jwt");

// create a user
router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  try {
    const userExists = User.findOne({ email: req.body.email });
    const hash = encrpyt(req.body.password);

    if (await userExists)
      throw Error("A user has already signed up with this Email");

    const user = new User({
      email: req.body.email,
      password: await hash
    });

    const savedUser = await user.save();
    const token = await sign({
      id: savedUser.id,
      firstName: savedUser.firstName
    });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// login user
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      errors.name = "This user does not exist";
      return res.status(404).json(errors);
    }

    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const payload = { id: user.id, firstName: user.firstName };

        jsonwebtoken.sign(
          payload,
          process.env.secretOrKey,
          { expiresIn: 36000 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.password = "Incorrect password";
        return res.status(400).json(errors);
      }
    });
  });
});

// validate current user with jwebtoken
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email
    });
  }
);

// update user profile
router.post("/:userId/profile", (req, res) => {
  var userId = req.params.userId;
  User.findOne({ id: userId }).then(user => {
    if (!user) {
      errors.name = "This user does not exist";
      return res.status(404).json(errors);
    }
    const form = new multiparty.Form();

    form.parse(request, async (error, fields, files) => {
      console.log(fields);
      console.log(files);
      if (error) throw new Error(error);

      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const fileName = files.file[0].originalFilename;
        const data = await uploadFile(buffer, fileName, type);

        const newProfile = new Profile({
          userId: userId,
          image: data.key,
          phone: req.body.phone,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          enrollment: req.body.enrollment,
          major: req.body.major,
          coursesTaken: req.body.coursesTaken,
          locationPreferences: req.body.locationPreferences,
          languagePreferences: req.body.languagePreferences
        });
        newProfile.save().then(profile => {
          res.json({
            sucess: true,
            profile
          });
        });
      } catch (error) {
        return res.status(400).send(error);
      }
    });
  });
});

module.exports = router;
