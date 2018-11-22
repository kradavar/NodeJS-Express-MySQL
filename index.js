const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const index = require("./routes/index.js");
const events = require("./routes/events.js");
const QUERY = require("./database/queryList.js");
const executeSQL = require("./database/executeSQL.js");

const app = express();

//login script from here

const flash = require("connect-flash");
const crypto = require("crypto");

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);

/* Login script */
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const sess = require("express-session");
const BetterMemoryStore = require("session-memory-store")(sess);
const store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
app.use(
  sess({
    name: "SESSION",
    secret: "CALENDARSECRET",
    store,
    resave: true,
    saveUninitialized: true
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/events", events);

//passport Strategy -- the express session middleware before calling passport.session()
passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true //passback entire req to call back
    },
    (req, username, password, done) => {
      if (!username || !password) {
        return done(
          null,
          false,
          req.flash("message", "All fields are required.")
        );
      }
      let salt = "7fa73b47df808d36c5fe328546ddef8b9011b2c6";

      executeSQL(QUERY.GET_USER, [username])
        .then(rows => {
          if (!rows.length) {
            return done(
              null,
              false,
              req.flash("message", "Invalid username or password.")
            );
          }
          /* salt = salt + "" + password;
          const encPassword = crypto // later
            .createHash("sha1")
            .update(salt)
            .digest("hex");*/
          const dbPassword = rows[0].password;

          if (!(dbPassword == password)) {
            return done(
              null,
              false,
              req.flash("message", "Invalid username or password.")
            );
          }
          return done(null, { ...rows[0] });
        })
        .catch(err => done(req.flash("message", err)));
    }
  )
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true //passback entire req to call back
    },
    (req, username, password, done) => {
      const user = Object.values(req.body);
      executeSQL(QUERY.INSERT_USER, user)
        .then(result => {
          done(null, { ...req.body, id: result.insertId });
        })
        .catch(err => done(err));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((userId, done) => {
  executeSQL(QUERY.GET_USER_ID, [userId])
    .then(result => {
      done(null, result[0]);
    })
    .catch(err => {
      done(err);
    });
});

app.get("/signin", (req, res) => {
  res.send("HEY");
});

app.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/events",
    failureFlash: true
  })
);

app.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/events",
    failureFlash: true
  })
);

app.get("/signout", (req, res) => {
  req.session.destroy();
  req.logout();
  res.redirect("/signin");
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
