const dotenv = require("dotenv");
const { getFile, uploadFile } = require("./index");
dotenv.config();

/**
 * TODO:
 * upload:
 * - success
 * - duplicate file name
 * - ???
 *
 * get:
 * - success
 * - invalid key
 * - ???
 */
getFile("1547337666426-icon.png")
  .then(data => {
    console.log("data>>>>>>>", data);
  })
  .catch(err => {
    console.log("error>>>>>>>", err);
  });
