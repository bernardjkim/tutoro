const s3 = require("./s3");

// https://medium.com/@fabianopb/upload-files-with-node-and-react-to-aws-s3-in-3-steps-fdaa8581f2bd

/**
 * This function will attempt to upload a file to the S3 bucket.
 *
 * @param   {object}  buffer  file buffer
 * @param   {string}  name    file name
 * @return  {Promise}         s3 upload response
 */
module.exports = (buffer, name, type) => {
  const params = {
    // ACL: "public-read",
    Body: buffer,
    Bucket: process.env.S3_BUCKET,
    ContentType: type.mime,
    Key: `${Date.now()}-${name}`
  };
  return s3.upload(params).promise();
};
