const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
});

module.exports = Major = mongoose.model("majors", MajorSchema);
