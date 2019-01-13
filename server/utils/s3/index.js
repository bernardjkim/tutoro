const AWS = require("aws-sdk");
const bluebird = require("bluebird");

// configure the keys for accessing AWS
// AWS.config.update({
// accessKeyId: process.env.AWS_ACCESS_KEY_ID,
// secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// configure AWS to work with promises
AWS.config.setPromisesDependency(bluebird);

// Create S3 service object
s3 = new AWS.S3();

/**
 * This function will attempt to retreive a file from the S3 bucket.
 *
 * @param   {string}  key S3 bucket key (file identifier)
 *
 * @return  {Promise}     file data
 */
function getFile(key) {
  var params = { Bucket: process.env.S3_BUCKET, Key: key };
  return s3.getObject(params).promise();
}

/**
 * This function will attempt to upload a file to the S3 bucket.
 *
 * @param   {object}  buffer  file buffer
 * @param   {string}  name    file name
 * @param   {object}  type    file type
 *
 * @return  {Promise}         s3 upload response
 */
function uploadFile(buffer, name, type) {
  const params = {
    // ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${Date.now()}-${name}`
  };
  return s3.upload(params).promise();
}

module.exports = {
  getFile,
  uploadFile
};
