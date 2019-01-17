const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LanguageSchema = new Schema({
  tag: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nativeName: {
    type: String,
    required: true
  }
});

module.exports = Language = mongoose.model("languages", LanguageSchema);
