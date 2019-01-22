// Load module alias
require("module-alias/register");

const express = require("express");
const router = express.Router();
const Promise = require("bluebird");
const passport = require("passport");
const fileType = require("file-type");
const fs = require("fs");
const multiparty = Promise.promisifyAll(require("multiparty"), {
  multiArgs: true
});

const Profile = require("@models/Profile");
const Major = require("@models/Major");
const Course = require("@models/Course");

const { uploadFile, getFile } = require("@utils/s3");

async function create(req, res) {
  const userId = req.user.id;

  // Verify profile has not already been created
  const exists = await Profile.findOne({ userId }).catch(e => {
    res.status(500).json({
      error: {
        message: "Unable to create profile",
        description: "Internal server error"
      }
    });
    return next(e);
  });

  if (exists) {
    res.status(400).json({
      error: {
        message: "Unable to create profile",
        description: "User profile already exists"
      }
    });
    return next(new Error("User profile already exists"));
  }

  const form = new multiparty.Form();
  const [fields, files] = await form.parseAsync(req);

  // parse majors
  let major = [];
  let coursesTaken = [];
  let locationPreferences = [];
  let languagePreferences = [];

  if (fields.major) {
    await (async () => {
      for (const item of JSON.parse(fields.major)) {
        const res = Major.findOne({ name: item.name });
        major.push(await res);
      }
    })();
  }

  if (fields.coursesTaken) {
    await (async () => {
      for (const item of JSON.parse(fields.coursesTaken)) {
        const res = Course.findOne({
          name: item.name,
          number: item.number
        });
        coursesTaken.push(await res);
      }
    })();
  }

  if (fields.languagePreferences) {
    await (async () => {
      for (const item of JSON.parse(fields.languagePreferences)) {
        const res = Language.findOne({
          tag: item.tag
        });
        languagePreferences.push(await res);
      }
    })();
  }

  if (fields.locationPreferences) {
    await (async () => {
      for (const item of JSON.parse(fields.locationPreferences)) {
        const res = Location.findOne({
          tag: item.tag
        });
        locationPreferences.push(await res);
      }
    })();
  }

  const profile = new Profile({
    userId,
    firstName: fields.firstName,
    lastName: fields.lastName,
    phone: fields.phone,
    major,
    coursesTaken,
    locationPreferences,
    languagePreferences,
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
}

// /**
//  * Get list of profiles
//  */
// router.get("/", undefinedHandler);

// /**
//  * Get current user profile
//  */
// router.get(
//   "/current",
//   passport.authenticate("jwt", { session: false }),
//   async (req, res) => {
//     const userId = req.user.id;

//     try {
//       const profile = await Profile.findOne({ userId });
//       if (!profile)
//         return res.status(404).json({
//           error: {
//             message: "Unable to get profile",
//             description: "This profile does not exist"
//           }
//         });

//       const data = await getFile(profile.image);

//       return res.status(200).json({ success: true, profilePic: data, profile });
//     } catch (err) {
//       console.error(err);
//       return res.status(500).json({
//         error: {
//           message: "Unable to get profile",
//           description: "Internal server error"
//         }
//       });
//     }
//   }
// );

// /**
//  * Get user profile
//  */
// router.get("/:userId", async (req, res) => {
//   const { userId } = req.params;

//   try {
//     const profile = await Profile.findOne({ userId });
//     if (!profile)
//       return res.status(404).json({
//         error: {
//           message: "Unable to get profile",
//           description: "This profile does not exist"
//         }
//       });

//     const data = await getFile(profile.image);

//     return res.status(200).json({ success: true, profilePic: data, profile });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({
//       error: {
//         message: "Unable to get profile",
//         description: "Internal server error"
//       }
//     });
//   }
// });

module.exports = { create };
