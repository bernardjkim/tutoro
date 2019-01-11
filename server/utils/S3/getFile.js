const s3 = require("./s3");

/**
 * getResource will attempt to retreive a file from the S3 bucket. Will return a
 * promoise that will reject on error and resolve with the response data
 *
 * @param {string}  key S3 bucket key (file identifier)
 */
module.exports = function(key) {
  var params = { Bucket: process.env.S3_BUCKET, Key: key };

  return new Promise(function(resolve, reject) {
    s3.getObject(params, function(err, data) {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
