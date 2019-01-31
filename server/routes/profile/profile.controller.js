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
const Language = require("@models/Language");
const Location = require("@models/Location");

const { uploadFile, getFile } = require("@utils/s3");

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findById(id)
    .then(user => {
      if (!user)
        return res.status(404).json({
          error: {
            message: "Unablge to get user",
            description: `User with id ${id} does not exist`
          }
        });
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => {
      res.status(500).json({
        error: {
          message: "Unable to get user",
          description: "Internal server error"
        }
      });
      return next(e);
    });
}

/**
 * Create new profile
 *
 * @property  {string}  req.user.id - The user id.
 *
 * @returns   {Profile}
 */
async function create(req, res, next) {
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

  let promises = [];

  if (fields.major) {
    fields.major.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Major.findOne({ name: entry })
            .then(res => {
              major.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.coursesTaken) {
    fields.coursesTaken.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Course.findOne({ name: entry })
            .then(res => {
              coursesTaken.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.languagePreferences) {
    fields.languagePreferences.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Language.findOne({ tag: entry })
            .then(res => {
              languagePreferences.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.locationPreferences) {
    fields.locationPreferences.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Location.findOne({ tag: entry })
            .then(res => {
              locationPreferences.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  await Promise.all(promises);

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

  const mongoProfile = await profile.save().catch(e => {
    res.status(400).json({
      error: {
        message: "Unable to create profile",
        description: "Invalid profile fields"
      }
    });
    return next(e);
  });
  if (mongoProfile) {
    const data = await getFile(profile.image);
    const profileObj = profile.toObject();

    profileObj.enrollment = {
      value: profileObj.enrollment,
      label: profileObj.enrollment
    };

    profileObj.major = profileObj.major.map(entry => {
      return { value: entry.name, label: entry.name };
    });

    profileObj.coursesTaken = profileObj.coursesTaken.map(entry => {
      return { value: entry.name, label: entry.name };
    });

    profileObj.locationPreferences = profileObj.locationPreferences.map(
      entry => {
        return { value: entry.tag, label: entry.name };
      }
    );

    profileObj.languagePreferences = profileObj.languagePreferences.map(
      entry => {
        return { value: entry.tag, label: entry.nativeName };
      }
    );

    profileObj.image = data;
    return res.status(201).json({ success: true, profile: profileObj });
  }
}

/**
 * Get profile
 *
 * @property  {string}  req.user.id - The user id.
 *
 * @returns {Profile}
 */
async function get(req, res, next) {
  const userId = req.user.id;

  const profile = await Profile.findOne({ userId })
    .populate("coursesTaken")
    .populate("major")
    .populate("languagePreferences")
    .populate("locationPreferences")
    .catch(e => {
      res.status(500).json({
        error: {
          message: "Unable to get profile",
          description: "Internal server error"
        }
      });
      return next(e);
    });

  if (!profile) {
    res.status(404).json({
      error: {
        message: "Unable to get profile",
        description: "This profile does not exist"
      }
    });
    return next("This profile does not exist");
  }

  const data = await getFile(profile.image);
  const profileObj = profile.toObject();
  profileObj.enrollment = {
    value: profileObj.enrollment,
    label: profileObj.enrollment
  };

  profileObj.major = profileObj.major.map(entry => {
    return { value: entry.name, label: entry.name };
  });

  profileObj.coursesTaken = profileObj.coursesTaken.map(entry => {
    return { value: entry.name, label: entry.name };
  });

  profileObj.locationPreferences = profileObj.locationPreferences.map(entry => {
    return { value: entry.tag, label: entry.name };
  });

  profileObj.languagePreferences = profileObj.languagePreferences.map(entry => {
    return { value: entry.tag, label: entry.nativeName };
  });
  profileObj.image = data;
  return res.status(200).json({ success: true, profile: profileObj });
}

/**
 * Get profile list.
 *
 * @property  {string}  req.query.course    - Course name.
 *
 * @returns   {Profile[]}
 */
async function list(req, res, next) {
  const { course } = req.query;
  var t0 = new Date().getTime();
  const mongoCourse = Course.findOne({ name: course });
  var t1 = new Date().getTime();
  console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.");

  const profiles = await Profile.find({
    coursesTaken: mongoCourse
  })
    .limit(50)
    .populate("major")
    .populate("locationPreferences")
    .populate("languagePreferences")
    .populate("coursesTaken")
    .exec()
    .catch(e => {
      res.status(500).json({
        error: {
          message: "Unable to get profile",
          description: "Internal server error"
        }
      });
      return next(e);
    });

  const result = [];

  await Promise.all(
    profiles.map(profile => {
      return new Promise((resolve, reject) => {
        const obj = profile.toObject();
        getFile(profile.image).then(data => {
          obj.image = data;
          result.push(obj);
          resolve();
        });
      });
    })
  );
  return res.status(200).json({ success: true, profiles: result });
}

/**
 * Update existing user
 */
async function update(req, res, next) {
  const userId = req.user.id;

  // Verify profile has already been created
  const profile = await Profile.findOne({ userId }).catch(e => {
    res.status(500).json({
      error: {
        message: "Unable to update profile",
        description: "Internal server error"
      }
    });
    return next(e);
  });

  if (!profile) {
    res.status(404).json({
      error: {
        message: "Unable to update profile",
        description: "User profile does not exist"
      }
    });
    return next(new Error("User profile does not exist"));
  }

  const form = new multiparty.Form();
  const [fields, files] = await form.parseAsync(req);

  // parse majors
  let obj = {
    major: [],
    coursesTaken: [],
    locationPreferences: [],
    languagePreferences: [],
  }


  const arrField = ['major', 'coursesTaken', 'locationPreferences', 'languagePreferences']
  await Promise.all(
    arrField.map(field => {
      const arr = fields[field];
      arr.map(value => {
        return new Promise((resolve, reject) => {

          obj[field].push(value)
        })
      })
      return new Promise((resolve, reject) => {
        const obj = profile.toObject();
        getFile(profile.image).then(data => {
          obj.image = data;
          result.push(obj);
          resolve();
        });
      });
    })
  );

  let promises = [];

  if (fields.major) {
    fields.major.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Major.findOne({ name: entry })
            .then(res => {
              major.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.coursesTaken) {
    fields.coursesTaken.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Course.findOne({ name: entry })
            .then(res => {
              coursesTaken.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.languagePreferences) {
    fields.languagePreferences.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Language.findOne({ tag: entry })
            .then(res => {
              languagePreferences.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  if (fields.locationPreferences) {
    fields.locationPreferences.forEach(entry => {
      promises.push(
        new Promise((resolve, reject) => {
          Location.findOne({ tag: entry })
            .then(res => {
              locationPreferences.push(res);
              resolve();
            })
            .catch(e => {
              reject(e);
            });
        })
      );
    });
  }

  await Promise.all(promises);

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

  profile.set({
    firstName: fields.firstName,
    lastName: fields.lastName,
    phone: fields.phone,
    major,
    coursesTaken,
    locationPreferences,
    languagePreferences,
    enrollment: fields.enrollment
  });

  const mongoProfile = await profile.save().catch(e => {
    res.status(400).json({
      error: {
        message: "Unable to update profile",
        description: "Invalid profile fields"
      }
    });
    return next(e);
  });
  if (mongoProfile) {
    const data = await getFile(profile.image);
    const profileObj = profile.toObject();

    profileObj.enrollment = {
      value: profileObj.enrollment,
      label: profileObj.enrollment
    };

    profileObj.major = profileObj.major.map(entry => {
      return { value: entry.name, label: entry.name };
    });

    profileObj.coursesTaken = profileObj.coursesTaken.map(entry => {
      return { value: entry.name, label: entry.name };
    });

    profileObj.locationPreferences = profileObj.locationPreferences.map(
      entry => {
        return { value: entry.tag, label: entry.name };
      }
    );

    profileObj.languagePreferences = profileObj.languagePreferences.map(
      entry => {
        return { value: entry.tag, label: entry.nativeName };
      }
    );

    profileObj.image = data;
    return res.status(200).json({ success: true, profile: profileObj });
  }
}
module.exports = { create, get, list, load, update };
