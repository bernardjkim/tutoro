const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const passport = require("passport");
// const bcrypt = require("bcryptjs");
const fileType = require("file-type");
const fs = require("fs");
const multiparty = Promise.promisifyAll(require("multiparty"), {
  multiArgs: true
});

const Profile = require("../../models/Profile");

const { uploadFile, getFile } = require("../../utils/s3");
/**
 * Undefined endpoint
 */
const undefinedHandler = (req, res) => {
  return res.status(404).json({
    error: {
      message: "Unable to reach API endpoint",
      description: "Endpoint is currently undefined"
    }
  });
};

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;

    try {
      if (await Profile.findOne({ userId }))
        return res.status(400).json({
          error: {
            message: "Unable to create profile",
            description: "User profile already exists"
          }
        });

      const form = new multiparty.Form();
      const [fields, files] = await form.parseAsync(req);

      // TODO: validate fields???
      const profile = new Profile({
        userId,
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
      return res.status(201).json({ success: true, profile });
    } catch (err) {
      if (err.name === "UnsupportedMediaTypeError")
        return res.status(400).json({
          error: {
            message: "Unable to create profile",
            description: "Requires content-type form-data"
          }
        });

      if (err.name === "ValidationError")
        return res.status(400).json({
          error: {
            message: "Unable to create profile",
            description: "Missing profile fields"
          }
        });

      console.error(err);
      return res.status(500).json({
        error: {
          message: "Unable to create profile",
          description: "Internal server error"
        }
      });
    }
  }
);

/**
 * Get list of profiles
 */
router.get("/", undefinedHandler);

/**
 * Get current user profile
 */
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const userId = req.user.id;

    try {
      const profile = await Profile.findOne({ userId });
      if (!profile)
        return res.status(404).json({
          error: {
            message: "Unable to get profile",
            description: "This profile does not exist"
          }
        });

      const data = await getFile(profile.image);

      return res.status(200).json({ success: true, profilePic: data, profile });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        error: {
          message: "Unable to get profile",
          description: "Internal server error"
        }
      });
    }
  }
);

/**
 * Get user profile
 */
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await Profile.findOne({ userId });
    if (!profile)
      return res.status(404).json({
        error: {
          message: "Unable to get profile",
          description: "This profile does not exist"
        }
      });

    const data = await getFile(profile.image);

    return res.status(200).json({ success: true, profilePic: data, profile });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: {
        message: "Unable to get profile",
        description: "Internal server error"
      }
    });
  }
});

module.exports = router;
