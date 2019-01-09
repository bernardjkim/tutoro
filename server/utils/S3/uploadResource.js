const s3 = require("./s3");
const fs = require("fs");
const path = require("path");

// TODO: probably want to review this code, not sure exactly how Promises work.

/**
 * uploadResource will attempt to upload a file to the S3 bucket. Will return a
 * promoise that will reject on error and resolve with the response data
 *
 * @param {string}  filename
 */
module.exports = function(filename) {
  var fileStream = fs.createReadStream(filename);
  fileStream.on("error", function(err) {
    return Promise.reject(new Error("File Error", err));
  });

  var uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: `${Date.now()}-${path.basename(filename)}`,
    Body: fileStream
  };

  return new Promise(function(resolve, reject) {
    s3.upload(uploadParams, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
