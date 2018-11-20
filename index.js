const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const index = require("./routes/index.js");
const users = require("./routes/users.js");
const QUERY = require("./queryList.js");
const executeSQL = require("./executeSQL.js");

const app = express();

//login script from here

const flash = require("connect-flash");
const crypto = require("crypto");
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
app.use("/events", users);

//passport Strategy -- the express session middleware before calling passport.session()
passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true //passback entire req to call back
    },
    (req, username, password, done) => {
      console.log(username + " = " + password);
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
          console.log(rows);
          if (!rows.length) {
            return done(
              null,
              false,
              req.flash("message", "Invalid username or password.")
            );
          }
          salt = salt + "" + password;
          const encPassword = crypto
            .createHash("sha1")
            .update(salt)
            .digest("hex");
          const dbPassword = rows[0].password;

          if (!(dbPassword == encPassword)) {
            return done(
              null,
              false,
              req.flash("message", "Invalid username or password.")
            );
          }
          req.session.user = rows[0];
          return done(null, rows[0]);
        })
        .catch(err => done(req.flash("message", err)));
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  executeSQL(QUERY.GET_USER_ID, [id]).then((err, rows) => {
    done(err, rows[0]);
  });
});
/*
app.get('/signin', (req, res)=>{
  res.render('login/index',{'message' :req.flash('message')});
});
*/
app.post(
  "/signin",
  passport.authenticate("local", {
    successRedirect: "/events",
    failureRedirect: "/signin",
    failureFlash: true
  }),
  (req, res, info) => {
    res.redirect("/events");
    console.log(req.session);
  }
);

app.get("/logout", (req, res) => {
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
  res.render("error");
});

app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
