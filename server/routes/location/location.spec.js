//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let mongoose = require("mongoose");
// let Location = require("@models/Location");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");
// let should = chai.should();
chai.config.includeStack = false;

chai.use(chaiHttp);

describe("Locations", () => {
  it("it should GET a list of locations", done => {
    chai
      .request(server)
      .get("/api/location")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("locations");
        done();
      });
  });
});
