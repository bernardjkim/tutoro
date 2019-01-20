//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let mongoose = require("mongoose");
// let Course = require("@models/Course");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");
let should = chai.should();

chai.use(chaiHttp);

describe("Courses", () => {
  /**
   * Test the /GET route
   */
  it("it should GET a list of course names", done => {
    chai
      .request(server)
      .get("/api/course")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("courses");
        done();
      });
  });

  /**
   * Test the /GET/:name route
   */
  it("it should GET a list of course", done => {
    chai
      .request(server)
      .get("/api/course/CSE")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property("courses");
        done();
      });
  });
});
