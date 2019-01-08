const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv").config();

const users = require("./routes/api/user");
const profile = require("./routes/api/profile");

const app = express();

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

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`port running on ${port}`));
