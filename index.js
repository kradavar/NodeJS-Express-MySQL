const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");
const createTable = require("./createEventsTable");
const cors = require("cors");

const pool = mysql.createPool({
  connectionLimit: 100,
  ...config
});

app.use(
  cors({
    origin: "*" //http://localhost:3001
  })
);

// create application/json parser
const jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const eventsTable = `create table if not exists eventsList(
                          id int primary key auto_increment,
                          event_name varchar(255)not null,
                          start varchar(255)not null,
                          end varchar(255)not null,
                          user_id int not null 
                      )`;

const usersTable = `create table if not exists usersList(
                          id int primary key auto_increment,
                          name varchar(255)not null,
                          password varchar(255)not null
                      )`;

createTable(eventsTable, pool);
createTable(usersTable, pool);

app.get("/", (req, res) => {
  executeSQL([], QUERY.JOIN, pool).then(results => res.send(results));
});

app
  .route("/events")
  .get((req, res) => {
    executeSQL([], QUERY.SELECT_EVENTS, pool).then(events => res.send(events));
  })
  .post(jsonParser, (req, res) => {
    executeSQL(req.body, QUERY.INSERT_EVENT, pool).then(result =>
      res.send(result)
    );
  });

app
  .route("/events/:id")
  .put(jsonParser, (req, res) => {
    let formValues = Object.values(req.body);
    let eventId = req.params.id;
    let params = [...formValues, eventId];
    executeSQL(params, QUERY.EDIT_EVENT, pool).then(result => res.send(result));
  })
  .delete((req, res) => {
    executeSQL(req.params.id, QUERY.DELETE_EVENT, pool).then(result =>
      res.send(result)
    );
  });
app.listen(5000, function() {
  console.log("App listening on port 5000!");
});
