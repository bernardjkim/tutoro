const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// I dont know what profile should have
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
