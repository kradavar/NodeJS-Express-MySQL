const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const QUERY = require("../queryList");
const executeSQL = require("../executeSQL");
const bcrypt = require("bcrypt");

const authenticationMiddleware = require("./middleware");

// Generate Password
const saltRounds = 10;
const myPlaintextPassword = "my-password";
const salt = bcrypt.genSaltSync(saltRounds);
const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt);

const getUserFromDB = username =>
  executeSQL(QUERY.GET_USER, [username]).then(result => result[0]);

const findUser = (username, callback) => {
  const user = getUserFromDB(username);
  if (user) {
    return callback(null, user);
  }
  return callback(null);
};

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  findUser(username, cb);
});

function initPassport() {
  passport.use(
    new LocalStrategy((username, password, done) => {
      findUser(username, (err, user) => {
        if (err) {
          return done(err);
        }
        // User not found
        if (!user) {
          console.log("User not found");
          return done(null, false);
        }

        // Always use hashed passwords and fixed time comparison
        bcrypt.compare(password, user.password, (err, isValid) => {
          if (err) {
            return done(err);
          }
          if (!isValid) {
            return done(null, false);
          }
          return done(null, user);
        });
      });
    })
  );

  passport.authenticationMiddleware = authenticationMiddleware;
}

module.exports = initPassport;
