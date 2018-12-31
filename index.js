const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const passport = require("passport");
const app = express();

const users = require("./routes/api/user");

// DB config
const db = require("./config/keys").mongoURI;

// DB connect
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// Body Parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

// Passport Config
app.use(passport.initialize()); // add passport middleware
require("./config/passport")(passport);

// routes
app.use("/api/users", users);
// app.use('/api/profile', profile);

module.exports.handler = serverless(app);
