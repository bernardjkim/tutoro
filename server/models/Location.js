const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  tag: {
    type: String
  },
  name: {
    type: String,
    required: true
  }
  // hours/coordinates/address...???
});

module.exports = Location = mongoose.model("locations", LocationSchema);
