const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");

// const users = require("./routes/api/user");
const user = require("./routes/user/user");
const profile = require("./routes/api/profile");

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
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Config
app.use(passport.initialize()); // add passport middleware
require("./utils/passport/passport")(passport);

// routes
app.use("/api/user", user);
// app.use('/api/profile', profile);

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