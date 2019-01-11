const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const dotenv = require("dotenv");
const multiparty = require("multiparty");
const fileType = require("file-type");
const fs = require("fs");

const users = require("./routes/api/user");
const profile = require("./routes/api/profile");
const uploadFile = require("./utils/S3/uploadFile");

const app = express();

// Read in .env variables
dotenv.config();

// DB connect
mongoose
  .connect(
    process.env.mongoURI,
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
app.use("/api/users", users);
// app.use('/api/profile', profile);

// Define POST route
app.post("/test-upload", (request, response) => {
  const form = new multiparty.Form();
  form.parse(request, async (error, fields, files) => {
    if (error) throw new Error(error);
    try {
      const path = files.file[0].path;
      const buffer = fs.readFileSync(path);
      const type = fileType(buffer);
      const timestamp = Date.now().toString();
      const fileName = `bucketFolder/${timestamp}-lg`;
      const data = await uploadFile(buffer, fileName, type);
      return response.status(200).send(data);
    } catch (error) {
      return response.status(400).send(error);
    }
  });
});

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
