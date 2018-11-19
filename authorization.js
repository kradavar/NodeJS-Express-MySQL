const express = require("express");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");
const connect = require("connect");
const sessions = require("cookie-sessions");

app.use(connect.cookieParser());
app.use(connect.sessions({ secret: "secret string" }));

/* AUTHORIZATION*/

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username." });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: "Incorrect password." });
      }
      return done(null, user);
    });
  })
);

app.post("/signin", {
  successRedirect: "/",
  failureRedirect: "/signin",
  failureFlash: true
});
