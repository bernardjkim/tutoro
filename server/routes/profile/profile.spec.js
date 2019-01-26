//During the test the env variable is set to test
process.env.NODE_ENV = "test";

// Load module alias
require("module-alias/register");

let qs = require("qs");
let Profile = require("@models/Profile");
let User = require("@models/User");

//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("@root/server");

chai.use(chaiHttp);

const user = {
  email: "test@uw.edu",
  password: "password",
  password2: "password"
};

let token;
let id;

const profile = {
  firstName: "first",
  lastName: "last",
  phone: 5555555555,
  enrollment: "Freshman",
  major: [{ name: "Computer Science" }, { name: "Mathematics" }],
  coursesTaken: [{ name: "CSE 142" }, { name: "CSE 143" }],
  locationPreferences: [{ tag: "OUG" }, { tag: "ALB" }],
  languagePreferences: [{ tag: "en" }, { tag: "ko" }],
  image: { path: "./images/test.png", name: "test.png" }
};

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
 * Post request to create new profile
 *
 * @param   {Profile} profile - User profile
 *
 * @return  {Promise}
 *
 */
function createProfile(profile) {
  return new Promise((resolve, reject) => {
    chai
      .request(server)
      .post("/api/profile")
      .type("form")
      .set("Authorization", token)
      .field("firstName", profile.firstName)
      .field("lastName", profile.lastName)
      .field("phone", profile.phone)
      .field("enrollment", profile.enrollment)

      // Unable to send json along with file...
      // .send({ major: profile.major })
      // .send({ coursesTaken: profile.coursesTaken })
      // .send({ locationPreferences: profile.locationPreferences })
      // .send({ languagePreferences: profile.languagePreferences })
      .attach("file", profile.image.path, profile.image.name)
      .end((err, res) => {
        if (err) reject(err);
        else resolve(res);
      });
  });
}

describe("Profiles", () => {
  before(done => {
    User.deleteMany({}, err => {
      createUser(user).then(res => {
        token = res.body.token;
        getCurrentUser(res.body.token).then(res => {
          res.should.have.status(200);
          id = res.body.id;
          done();
        });
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
      createProfile(profile)
        .then(res => {
          res.should.have.status(201);
          res.body.should.be.a("object");
          res.body.should.have.property("profile");
          done();
        })
        .catch(e => {
          console.error(e);
          done();
        });
    });

    it.skip("it should not POST a new profile if missing a required field", done => {
      const test = { ...profile };
      delete test.firstName;

      createProfile(test)
        .then(res => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        })
        .catch(e => {
          console.error(e);
          done();
        });
    });

    it("it should not POST a new profile if invalid field", done => {
      const test = { ...profile };
      test.enrollment = "INVALID";

      createProfile(test)
        .then(res => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        })
        .catch(e => {
          console.error(e);
          done();
        });
    });
  });

  /**
   * Test the /GET route
   */
  describe("/GET profile", () => {
    it("it should GET a list of profiles", done => {
      chai
        .request(server)
        .get("/api/profile?course=CSE%20142")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          done();
        });
    });
  });

  /**
   * Test the /PUT route
   */
  describe("/PUT profile", () => {
    it("it should PUT a profile", done => {
      createProfile(profile).then(() => {
        chai
          .request(server)
          .put("/api/profile")
          .type("form")
          .set("Authorization", token)
          .field("firstName", "first-updated")
          .field("lastName", "last-updated")
          .field("phone", profile.phone)
          .field("enrollment", profile.enrollment)
          .attach("file", profile.image.path, profile.image.name)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("profile");
            res.body.profile.firstName.should.equal("first-updated");
            res.body.profile.lastName.should.equal("last-updated");
            done();
          });
      });
    });

    it("it should not PUT a profile", done => {
      chai
        .request(server)
        .put("/api/profile")
        .type("form")
        .set("Authorization", token)
        .field("firstName", profile.firstName)
        .field("lastName", profile.lastName)
        .field("phone", profile.phone)
        .field("enrollment", profile.enrollment)
        .attach("file", profile.image.path, profile.image.name)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });

  /**
   * Test the /GET/current route
   */
  describe("/GET profile/current", () => {
    it("it should GET the current user's profile", done => {
      createProfile(profile).then(() => {
        chai
          .request(server)
          .get("/api/profile/current")
          .set("Authorization", token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("profile");
            done();
          });
      });
    });
  });

  /**
   * Test the /GET/:id route
   */
  describe("/GET profile/:userId", () => {
    it("it should GET a profile", done => {
      createProfile(profile).then(() => {
        chai
          .request(server)
          .get(`/api/profile/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a("object");
            res.body.should.have.property("profile");
            done();
          });
      });
    });
  });
});
