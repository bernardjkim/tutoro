const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Language = require("../models/Language");
const Location = require("../models/Location");
const Major = require("../models/Major");
const Course = require("../models/Course");

const languages = require("./language.json");
const locations = require("./location.json");
const majors = require("./major.json");
const courses = require("./course.json");

dotenv.config();

// DB connect
mongoose
  .connect(
    process.env.MONGO_URI,
    // process.env.MONGO_URI_TEST,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  // .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

clearTables()
  .then(() => {
    Promise.all([
      seedTable(Language, languages),
      seedTable(Location, locations),
      seedTable(Major, majors),
      seedTable(Course, courses)
    ])
      .then(_ => {
        Language.findOne({ tag: "en" }).then(res => {
          console.log(res);
        });
        Location.findOne({ tag: "OUG" }).then(res => {
          console.log(res);
        });
        Major.findOne({ name: "Biology" }).then(res => {
          console.log(res);
        });
        Course.findOne({ name: "CSE 142" }).then(res => {
          console.log(res);
          process.exit();
        });
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
    Model.collection.insertMany(data, (err, r) => {
      if (err) reject(err);
      else resolve(r);
    });
  });
}

function clearTables() {
  return new Promise(async (resolve, reject) => {
    Promise.all([
      Language.deleteMany({}),
      Location.deleteMany({}),
      Major.deleteMany({}),
      Course.deleteMany({})
    ])
      .then(() => {
        resolve();
      })
      .catch(e => {
        reject(e);
      });
  });
}
