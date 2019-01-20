//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let mongoose = require("mongoose");
// let Major = require("@models/Major");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");
let should = chai.should();

chai.use(chaiHttp);

describe("Majors", () => {
  it("it should GET a list of majors", done => {
    chai
      .request(server)
      .get("/api/major")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("majors");
        done();
      });
  });
});
