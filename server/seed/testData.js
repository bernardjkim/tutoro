const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Language = require("../models/Language");
const Location = require("../models/Location");
const Major = require("../models/Major");
const Course = require("../models/Course");
const User = require("../models/User");
const Profile = require("../models/Profile");

const user = require("./user.json");
const profile = require("./profile.json");

dotenv.config();

// DB connect
mongoose
  .connect(
    // process.env.MONGO_URI,
    process.env.MONGO_URI_TEST,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  // .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

clearTables()
  .then(() => {
    seedTable(User, user)
      .then(async res => {
        await (async () => {
          let index = 0;
          for (const user of res) {
            const fields = profile[index++];

            const newProfile = {
              userId: user,
              firstName: fields.firstName,
              lastName: fields.lastName,
              phone: fields.phone,
              enrollment: fields.enrollment,
              major: [],
              locationPreferences: [],
              languagePreferences: [],
              coursesTaken: [],
              image: "default-profile-1.png"
            };

            await (async () => {
              for (const item of fields.major) {
                const res = Major.findOne({
                  name: item
                });
                newProfile.major.push(await res);
              }

              for (const item of fields.locationPreferences) {
                const res = Location.findOne({
                  tag: item
                });
                newProfile.locationPreferences.push(await res);
              }

              for (const item of fields.languagePreferences) {
                const res = Language.findOne({
                  tag: item
                });
                newProfile.languagePreferences.push(await res);
              }

              for (const item of fields.coursesTaken) {
                const res = Course.findOne({
                  name: item
                });
                newProfile.coursesTaken.push(await res);
              }
            })();

            const mongoProfile = new Profile(newProfile);
            mongoProfile.save().catch(e => {
              console.error(e);
              process.exit(1);
            });
          }
        })();
        process.exit(0);
      })
      .catch(e => {
        console.error(e);
        process.exit(1);
      });
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  });

function seedTable(Model, data) {
  return new Promise((resolve, reject) => {
    Model.create(data, { ordered: false }, (err, r) => {
      if (err) reject(err);
      else resolve(r);
    });
  });
}

function clearTables() {
  return new Promise(async (resolve, reject) => {
    Promise.all([User.deleteMany({}), Profile.deleteMany({})])
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}
