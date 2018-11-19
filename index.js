const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");
const signUp = require("./signup");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
/* app use */
app.use(
  cors({
    origin: "*" //http://localhost:3001
  })
);
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cookieParser());
app.use(session({ secret: "calendar" }));

/*app routing */

app.get("/", (req, res) => {
  executeSQL(QUERY.JOIN, []).then(results => res.send(results));
});
app
  .route("/users/:id/events")
  .get((req, res) => {
    executeSQL(QUERY.SELECT_USER_EVENTS, [req.params.id]).then(events =>
      res.send(events)
    );
  })
  .post(jsonParser, (req, res) => {
    executeSQL(QUERY.INSERT_EVENT, req.body).then(result => res.send(result));
  });
app
  .route("users/:userID/events/:id")
  .put(jsonParser, (req, res) => {
    let formValues = Object.values(req.body);
    let eventId = req.params.id;
    let params = [...formValues, eventId];
    executeSQL(QUERY.EDIT_EVENT, params).then(result => res.send(result));
  })
  .delete((req, res) => {
    executeSQL(QUERY.DELETE_EVENT, req.params.id).then(result =>
      res.send(result)
    );
  });

app.route("/signup").post(jsonParser, (req, res) => {
  executeSQL(QUERY.INSERT_USER, Object.values(req.body))
    .then(result => {
      req.session.user = { ...req.body };
      res.send(result);
    })
    .catch(err => res.send(err.sqlMessage));
});

app.route("/signin").post(jsonParser, (req, res) => {
  executeSQL(QUERY.GET_USER, [req.body.username])
    .then(result => {
      if (result[0].password === req.body.password) {
        req.session.user = { ...req.body };
        res.send(result);
      }
      res.status("400");
      res.send("Incorrect password");
    })
    .catch(err => res.send(err.sqlMessage));
});

app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
