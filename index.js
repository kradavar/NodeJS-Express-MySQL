const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");
const createTable = require("./createEventsTable");
const cors = require("cors");

app.use(
  cors({
    origin: "*" //http://localhost:3001
  })
);
// create application/json parser
const jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.get("/", (req, res) => {
  executeSQL(QUERY.JOIN, []).then(results => res.send(results));
});
app
  .route("/events")
  .get((req, res) => {
    executeSQL(QUERY.SELECT_EVENTS, []).then(events => res.send(events));
  })
  .post(jsonParser, (req, res) => {
    executeSQL(QUERY.INSERT_EVENT, req.body).then(result => res.send(result));
  });
app
  .route("/events/:id")
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
app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
