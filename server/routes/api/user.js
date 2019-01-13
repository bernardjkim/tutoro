const express = require("express");
const router = express.Router();
const passport = require("passport");
const multiparty = require("multiparty");
const fileType = require("file-type");
const fs = require("fs");

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateRegisterInput = require("../../utils/validations/signup");
const validateLoginInput = require("../../utils/validations/login");
const uploadFile = require("../../utils/S3/uploadFile");
const getFile = require("../../utils/S3/getFile");

const { encrpyt, compare } = require("../../utils/passwords/passwords");
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
    const token = await sign({ id: savedUser.id });

    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) throw Error("This user does not exist");

    const match = await compare(password, user.password);
    if (!match) throw Error("Incorrect password");

    const token = await sign({ id: user.id });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
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

// update user profile
router.post("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  if (await !User.findOne({ id: userId }))
    return res.status(400).json({ error: "This user does not exist" });

  const form = new multiparty.Form();
  form.parse(req, async (error, fields, files) => {
    console.log(files, fields);
    if (error) throw Error(error);

    try {
      const path = files.image[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const fileName = files.image[0].originalFilename;
      const data =  uploadFile(buffer, fileName, type);
      let newProfile = {
        userId: userId,
        image: data.key
      };
      
      
      // append fields to profile
      Object.keys(fields).forEach(key=> {
        newProfile[key] = fields[key];
      });
      console.log("NewProfiel >>",newProfile);
      newProfile = new Profile(newProfile);
      
      newProfile
      .save()
      .then(profile => {
          return res.status(200).json({ success: true, profile });
        })
        .catch(error => {
          return res.status(400).json({ error: error.message });
        });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  });
});

// update user profile
router.get("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile) throw Error("This profile does not exist");

    const data = await getFile(profile.image);

    return res.status(200).json({ success: true, profilePic: data, profile });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
