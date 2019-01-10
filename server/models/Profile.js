<<<<<<< HEAD
const mongoose = require('mongoose');
=======
const mongoose = require("mongoose");
>>>>>>> master
const Schema = mongoose.Schema;

// I dont know what profile should have
const ProfileSchema = new Schema({
<<<<<<< HEAD
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: Number,
        required: true
    },
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);

=======
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
    type: Array,
    required: true,
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
    type: Array,
    required: true,
    enum: ["CSE 142", "CSE 143", "CSE 311", "ASTR 101"]
  },
  locationPreferences: {
    type: Array,
    required: true,
    enum: ["Odegaard"]
  },
  languagePreferences: {
    type: Array,
    required: true,
    enum: ["English", "Korean", "Spanish"]
  },
  enrollment: {
    type: String,
    enum: ["Freshman", "Sophmore", "Junior", "Senior", "Graduate"]
  }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);
>>>>>>> master
