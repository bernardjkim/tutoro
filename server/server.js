const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

const user = require("./routes/user/user");
const profile = require("./routes/profile/profile");
const session = require("./routes/session/session");
const language = require("./routes/language/language");
const location = require("./routes/location/location");
const major = require("./routes/major/major");
const course = require("./routes/course/course");

const app = express();

// Read in .env variables
dotenv.config();

let mongoURI;
if (process.env.NODE_ENV === "test") {
  mongoURI = process.env.MONGO_URI_TEST;
} else {
  mongoURI = process.env.mongoURI;
  //use morgan to log at command line
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

// DB connect
mongoose
  .connect(
    mongoURI,
    { useNewUrlParser: true, useCreateIndex: true }
  )
  // .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Config
app.use(passport.initialize()); // add passport middleware
require("./utils/passport/passport")(passport);

// routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/session", session);
app.use("/api/language", language);
app.use("/api/location", location);
app.use("/api/major", major);
app.use("/api/course", course);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`port running on ${port}`));

module.exports = app; // for testing
