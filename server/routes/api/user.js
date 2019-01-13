const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const fileType = require("file-type");
const fs = require("fs");
const multiparty = Promise.promisifyAll(require("multiparty"), {
  multiArgs: true
});

const User = require("../../models/User");
const Profile = require("../../models/Profile");

const validateRegisterInput = require("../../utils/validations/signup");
const validateLoginInput = require("../../utils/validations/login");
const { uploadFile, getFile } = require("../../utils/s3");
const { sign } = require("../../utils/jwt");

/**
 * Create a new user
 */
router.post("/signup", async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  try {
    const userExists = User.findOne({ email: req.body.email });
    const hash = bcrypt.hash(req.body.password, 10);
    const user = new User({ email: req.body.email });
    const token = sign({ id: user.id });

    if (await userExists)
      throw Error("A user has already signed up with this Email");

    user.password = await hash;
    await user.save();

    return res.status(200).json({ success: true, token: await token });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

/**
 * Login
 */
router.post("/login", async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) return res.status(400).json(errors);

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ error: "This user does not exist" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Incorrect password" });

    const token = await sign({ id: user.id });
    return res.status(200).json({ success: true, token });
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
});

/**
 * Validate current user with jwt
 */
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

/**
 * Create user profile
 */
router.post("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  try {
    if (await !User.findOne({ id: userId }))
      return res.status(400).json({ error: "This user does not exist" });

    const form = new multiparty.Form();
    const [fields, files] = await form.parseAsync(req);

    const profile = new Profile({
      userId: userId,
      firstName: fields.firstName,
      lastName: fields.lastName,
      phone: fields.phone,
      major: fields.major,
      coursesTaken: fields.coursesTaken,
      locationPreferences: fields.locationPreferences,
      languagePreferences: fields.languagePreferences,
      enrollment: fields.enrollment
    });

    if (!files.file) {
      profile.image = "default-profile-1.png";
    } else {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const fileName = files.file[0].originalFilename;
      const data = await uploadFile(buffer, fileName, type);
      profile.image = data.key;
    }

    await profile.save();
    return res.status(200).json({ success: true, profile });
  } catch (err) {
    if (err.name === "UnsupportedMediaTypeError")
      return res.status(400).json({ error: "Requires content-type form-data" });

    if (err.name === "ValidationError")
      return res.status(400).json({ error: "Missing profile fields" });

    return res.status(400).json({ error: "Internal server error" });
  }
});

/**
 * Get user profile
 */
router.get("/:userId/profile", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile)
      return res.status(400).json({ error: "This user does not exist" });

    const data = await getFile(profile.image);

    return res.status(200).json({ success: true, profilePic: data, profile });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: "Internal server error" });
  }
});

module.exports = router;
