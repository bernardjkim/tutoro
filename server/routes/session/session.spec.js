//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

// let mongoose = require("mongoose");

let User = require("@models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");
// let should = chai.should();

chai.use(chaiHttp);

describe("Sessions", () => {
  const user = {
    email: "test@uw.edu",
    password: "password",
    password2: "password"
  };

  before(done => {
    User.deleteMany({}, err => {
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          done();
        });
    });
  });

  after(done => {
    User.deleteMany({}, err => {
      done();
    });
  });

  /**
   * Test the /POST route
   */
  describe("/POST session", () => {
    it("it should POST a new session", done => {
      chai
        .request(server)
        .post("/api/session")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          done();
        });
    });

    /**
     * Test the /DELETE route
     */
    describe("/DELETE session", () => {
      it.skip("it should GET a list of profiles", done => {});
    });
  });
});
