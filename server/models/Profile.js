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
    type: String,
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
    type: [{ type: Schema.Types.ObjectId, ref: "majors" }],
    required: true,
    default: []
  },
  coursesTaken: {
    type: [{ type: Schema.Types.ObjectId, ref: "courses" }],
    required: true,
    default: []
  },
  locationPreferences: {
    type: [{ type: Schema.Types.ObjectId, ref: "locations" }],
    required: true,
    default: []
  },
  languagePreferences: {
    type: [{ type: Schema.Types.ObjectId, ref: "languages" }],
    required: true,
    default: []
  },
  enrollment: {
    type: String,
    enum: ["Freshman", "Sophmore", "Junior", "Senior", "Graduate"]
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
