const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  }
});

module.exports = Course = mongoose.model("courses", CourseSchema);
