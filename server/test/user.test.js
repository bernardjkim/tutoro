//During the test the env variable is set to test
process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/User");
// let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
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
          res.body.should.have.property("errors");
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
          res.body.should.have.property("errors");
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
          res.body.should.have.property("errors");
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
      mongoUser.save();
      chai
        .request(server)
        .post("/api/user")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("errors");
          done();
        });
    });
  });

  /**
   * Test the /GET route
   * TODO:
   */
  describe("/GET user", () => {
    it("it should GET a list of users", done => {
      chai
        .request(server)
        .get("/api/user")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  /**
   * Test the /GET route single user
   */
  describe("/GET user/:id", () => {
    it("it should GET a user", done => {
      let user = {
        email: "test@uw.edu",
        password: "password",
        password2: "password"
      };
      const mongoUser = new User(user);
      mongoUser.save();
      console.log(mongoUser);
      chai
        .request(server)
        .get(`/api/user/${mongoUser.id}`)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
