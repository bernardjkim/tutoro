//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let mongoose = require("mongoose");
let Profile = require("@models/Profile");
let User = require("@models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");
let should = chai.should();

chai.use(chaiHttp);

describe("Profiles", () => {
  const user = {
    email: "test@uw.edu",
    password: "password",
    password2: "password"
  };

  let token;
  let id;

  before(done => {
    User.deleteMany({}, err => {
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          token = res.body.token;

          chai
            .request(server)
            .get("/api/user/current")
            .set("Authorization", token)
            .end((err, res) => {
              id = res.body.id;
            });
          done();
        });
    });
  });

  beforeEach(done => {
    //Before each test we empty the database
    Profile.deleteMany({}, err => {
      done();
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
  describe("/POST profile", () => {
    it("it should POST a new profile", done => {
      chai
        .request(server)
        .post("/api/profile")
        .type("form")
        .set("Authorization", token)
        .field("firstName", "first")
        .field("lastName", "last")
        .field("phone", 5555555555)
        .field("enrollment", "Freshman")
        .field(
          "major",
          JSON.stringify([
            { name: "Computer Science" },
            { name: "Mathematics" }
          ])
        )
        .field(
          "coursesTaken",
          JSON.stringify([
            { name: "CSE", number: 142 },
            { name: "CSE", number: 143 }
          ])
        )
        .field(
          "locationPreferences",
          JSON.stringify([{ tag: "OUG" }, { tag: "ALB" }])
        )
        .field(
          "languagePreferences",
          JSON.stringify([{ tag: "en" }, { tag: "ko" }])
        )
        .attach("file", "./test.png", "test.png")
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("profile");
          done();
        });
    });

    it("it should not POST a new profile if missing a required field", done => {
      chai
        .request(server)
        .post("/api/profile")
        .type("form")
        .set("Authorization", token)
        // .field("firstName", "first")
        .field("lastName", "last")
        .field("phone", 5555555555)
        .field("enrollment", "Freshman")
        .attach("file", "./test.png", "test.png")
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });

    /**
     * Test the /GET route
     */
    describe("/GET profile", () => {
      it("it should GET a list of profiles", done => {
        chai
          .request(server)
          .get("/api/profile?name=CSE&number=142")
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            // res.body.should.have.property("error");
            done();
          });
      });
    });

    /**
     * Test the /GET/current route
     */
    describe("/GET profile/current", () => {
      it.skip("it should GET the current user's profile", done => {
        chai
          .request(server)
          .get("/api/profile/current")
          .set("Authorization", token)
          .end((err, res) => {
            console.log(res.body);
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            done();
          });
      });
    });

    /**
     * Test the /GET/:id route
     */
    describe("/GET profile/:id", () => {
      it("it should GET a profile", async () => {
        // Create profile
        await chai
          .request(server)
          .post("/api/profile")
          .type("form")
          .set("Authorization", token)
          .field("firstName", "first")
          .field("lastName", "last")
          .field("phone", 5555555555)
          .field("enrollment", "Freshman")
          .attach("file", "./test.png", "test.png");

        // Get profile
        const res = await chai.request(server).get(`/api/profile/${id}`);
        res.should.have.status(200);
      });
    });
  });
});
