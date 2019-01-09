// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");
// Set the region
AWS.config.update({ region: process.env.S3_REGION });

// Create S3 service object
s3 = new AWS.S3();

module.exports = s3;
