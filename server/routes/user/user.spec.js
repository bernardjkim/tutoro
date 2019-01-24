//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let User = require("@models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");

chai.use(chaiHttp);

// Test user
let user = {
  email: "test@uw.edu",
  password: "password",
  password2: "password"
};

// Valid user stored before all test cases
let valid = {
  email: "valid@uw.edu",
  password: "password",
  password2: "password"
};

let validToken;
let validId;

/**
 * Sends a post request to create a new user.
 *
 * @param   {object}  user  - Object containing user fields
 *
 * @return  {Promise}
 */
function createUser(user) {
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .post("/api/user")
      .send(user)
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

/**
 * Get current user request
 *
 * @param   {string}  token  - Authorization token
 *
 * @return  {Promise}
 */
function getCurrentUser(token) {
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .get("/api/user/current")
      .set("Authorization", token)
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

/**
 * Get user request
 *
 * @param   {string}  id  - User id
 *
 * @return  {Promise}
 */
function getUser(id) {
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .get(`/api/user/${id}`)
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

describe("Users", () => {
  beforeEach(done => {
    //Before each test we empty the database
    User.deleteMany({}, err => {
      createUser(valid).then(res => {
        validToken = res.body.token;
        chai
          .request(server)
          .get("/api/user/current")
          .set("Authorization", validToken)
          .end((err, res) => {
            res.should.have.status(200);
            validId = res.body.id;
            done();
          });
      });
    });
  });

  after(done => {
    //After all test we empty the database
    User.deleteMany({}, err => {
      done();
    });
  });

  /**
   * Test the /POST route
   */
  describe("/POST user", () => {
    it("it should POST a new user", done => {
      createUser(user)
        .then(res => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("token");
          done();
        })
        .catch(e => {
          done(e);
        });
    });

    it("it should not POST a new user with a missing password", done => {
      let test = user;
      test.password = undefined;
      createUser(test)
        .then(res => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        })
        .catch(e => {
          done(e);
        });
    });

    it("it should not POST a new user without a uw.edu email", done => {
      let test = user;
      test.email = "test@gmail.com";
      createUser(test)
        .then(res => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        })
        .catch(e => {
          done(e);
        });
    });

    it("it should not POST a new user without matching passwords", done => {
      let test = user;
      test.password2 = "wrongpassword";
      createUser(test)
        .then(res => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        })
        .catch(e => {
          done(e);
        });
    });

    it("it should not POST a new user with same email", done => {
      const mongoUser = new User(user);
      mongoUser.save(_ => {
        createUser(user)
          .then(res => {
            res.should.have.status(400);
            res.body.should.be.a("object");
            res.body.should.have.property("error");
            done();
          })
          .catch(e => {
            done(e);
          });
      });
    });

    it("it should not POST a new user for the second request", done => {
      createUser(user)
        .then(() => {
          createUser(user)
            .then(res => {
              res.should.have.status(400);
              res.body.should.be.a("object");
              res.body.should.have.property("error");
              done();
            })
            .catch(e => {
              done(e);
            });
        })
        .catch(e => {
          done(e);
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
      getCurrentUser(validToken)
        .then(res => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        })
        .catch(e => {
          done(e);
        });
    });
  });

  /**
   * Test the /GET/:id route
   */
  describe("/GET user/:id", () => {
    it("it should GET a user", done => {
      getUser(validId)
        .then(res => {
          res.should.have.status(200);
          done();
        })
        .catch(e => {
          done(e);
        });
    });

    it("it should not GET a non existent user", done => {
      const test = new User(user);
      getUser(test.id)
        .then(res => {
          res.should.have.status(404);
          done();
        })
        .catch(e => {
          done(e);
        });
    });
  });
});
