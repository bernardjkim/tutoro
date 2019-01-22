const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const morgan = require("morgan");
const Promise = require("bluebird"); // eslint-disable-line no-global-assign

const user = require("./routes/user/user.route");
const profile = require("./routes/profile");
const session = require("./routes/session/session.route");
const language = require("./routes/language");
const location = require("./routes/location");
const major = require("./routes/major");
const course = require("./routes/course");

const app = express();

// Read in .env variables
dotenv.config();

const env = process.env.NODE_ENV;

// Mongo Config
const mongoURI =
  env === "test" ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;
const mongoOptions = { useNewUrlParser: true, useCreateIndex: true };

// Use morgan for logging
if (env !== "test") app.use(morgan("combined")); //'combined' outputs the Apache style LOGs

// Plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// Connect to mongo db
mongoose.connect(
  mongoURI,
  mongoOptions
);
mongoose.connection.on("error", () => {
  throw new Error(`unable to connect to database: ${mongoURI}`);
});

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport Config
app.use(passport.initialize()); // add passport middleware
require("./utils/passport")(passport);

// Routes
app.use("/api/user", user);
app.use("/api/profile", profile);
app.use("/api/session", session);
app.use("/api/language", language);
app.use("/api/location", location);
app.use("/api/major", major);
app.use("/api/course", course);
app.use((err, req, res, next) => {
  // console.error(err);
  return res;
});

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../frontend/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`port running on ${port}`));

module.exports = app; // for testing
