const s3 = require("./s3");

/**
 * This function will attempt to retreive a file from the S3 bucket.
 *
 * @param   {string}  key S3 bucket key (file identifier)
 * @return  {Promise}     file data
 */
module.exports = function(key) {
  var params = { Bucket: process.env.S3_BUCKET, Key: key };
  return s3.getObject(params).promise();
};
