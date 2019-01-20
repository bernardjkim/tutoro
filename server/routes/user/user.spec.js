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
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      // User.findOne({ email: "test@uw.edu" }).then(user => {
      //   console.log(user);
      // });
      done();
    });
  });

  /**
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should POST a new user", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "password"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        });
    });

    it("it should not POST a new user with a missing password", done => {
      let user = {
        email: "test@uw.edu",
        password: undefined,
        password2: "password"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });

    it("it should not POST a new user without a uw.edu email", done => {
      let user = {
        email: "test@gmail.com",
        password: "password",
        password2: "password"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });

    it("it should not POST a new user without matching passwords", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "wrongpassword"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });

    it("it should not POST a new user with same email", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "password"
      };
      const mongoUser = new User(user);
      mongoUser.save(_ => {
        chai
          .request(server)
          .post("/api/user")
          .send(user)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            done();
          });
      });
    });

    it("it should not POST a new user for the second request", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "password"
      };

      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end(() => {
          chai
            .request(server)
            .post("/api/user")
            .send(user)
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });
    });
  });

  /**
   * Test the /GET route
   * TODO:
   */
  describe("/GET user", () => {
    it.skip("it should GET a list of users", done => {
      throw new Error("fail");
    });
  });

  /**
   * Test the /GET/current route
   */
  describe("/GET user/current", () => {
    it("it should GET the current user", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "password"
      };
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          chai
            .request(server)
            .get("/api/user/current")
            .set("Authorization", res.body.token)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a("object");
              done();
            });
        });
    });
  });

  /**
   * Test the /GET/:id route
   */
  describe("/GET user/:id", () => {
    it("it should GET a user", done => {
      let user = {
        email: "test@uw.edu",
        password: "password"
      };
      const mongoUser = new User(user);
      mongoUser.save().then(user => {
        chai
          .request(server)
          .get(`/api/user/${user.id}`)
          .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            done();
          });
      });
    });

    it("it should not GET a non existent user", done => {
      const user = {
        email: "test@uw.edu",
        password: "password"
      };
      const mongoUser = new User(user);
      chai
        .request(server)
        .get(`/api/user/${mongoUser.id}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
