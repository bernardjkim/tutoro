const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const passport = require("passport");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateRegisterInput = require("../../utils/validations/signup");
const validateLoginInput = require("../../utils/validations/login");

// create a user
router.post("/signup", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ email: "A user has already signed up with this Email" });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
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
        });
      });
    }
  });
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

// Define POST route
app.post("/test-upload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

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
      if (error) throw new Error(error);

      try {
        const path = files.file[0].path;
        const buffer = fs.readFileSync(path);
        const type = fileType(buffer);
        const timestamp = Date.now().toString();
        const fileName = `bucketFolder/${timestamp}-lg`;
        const data = await uploadFile(buffer, fileName, type);
        // return response.status(200).send(data);
      } catch (error) {
        // return response.status(400).send(error);
      }
    });

    // const newProfile = new Profile({
    //   userId: req.
    //   firstName: req.body.firstName,
    //   lastName: req.body.lastName,
    //   email: req.body.email,
    //   password: req.body.password
    // });
  });
});

const ProfileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  image: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  major: {
    type: [String],
    required: true,
    default: [],
    enum: [
      "Undeclared",
      "Computer Science",
      "English",
      "Geology",
      "Physics",
      "Psychology"
    ]
  },
  coursesTaken: {
    type: [String],
    required: true,
    default: [],
    enum: ["CSE 142", "CSE 143", "CSE 311", "ASTR 101"]
  },
  locationPreferences: {
    type: [String],
    required: true,
    default: [],
    enum: ["Odegaard"]
  },
  languagePreferences: {
    type: [String],
    required: true,
    default: [],
    enum: ["English", "Korean", "Spanish"]
  },
  enrollment: {
    type: String,
    enum: ["Freshman", "Sophmore", "Junior", "Senior", "Graduate"]
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);

// get user profile picture
router.get("/:userId/profile", (req, res) => {
  var userId = req.params.userId;
  Profile.findOne({ userId }).then(profile => {
    if (!profile) {
      errors.name = "This user does not exist / has not set up their profile.";
      return res.status(404).json(errors);
    }
  });
});

module.exports = router;
