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

module.exports = s3;
