const express = require("express");
const app = express();
const config = require("./config");
const mysql = require("mysql");
const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");
const createTable = require("./createEventsTable");
/* если нет таблицы, то создать
возможно, при первом подключении */

const pool = mysql.createPool({
  connectionLimit: 100,
  ...config
});
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
/*
executeSQL(["Test 3", "2018", "2018", 2], QUERY.INSERT_EVENT, pool);
executeSQL(["Test 2", "2018", "2018", 1], QUERY.INSERT_EVENT, pool);
executeSQL(["Test 1", "2018", "2018", 3], QUERY.INSERT_EVENT, pool);

executeSQL(["root", "pass"], QUERY.INSERT_USER, pool);
executeSQL(["darya", "qwerty"], QUERY.INSERT_USER, pool);
executeSQL(["krasava", "1234"], QUERY.INSERT_USER, pool);
*/
app.get("/", (req, res) => {
  executeSQL([], QUERY.JOIN, pool).then(results => res.send(results));
});
/*
app.get("/users", (req, res) => {
  executeSQL([], QUERY.SELECT_USERS, pool).then(users => res.send(users));
});

app.get("/users/:userID", (req, res) => {
  executeSQL([req.params.userID], QUERY.SELECT_USER_EVENTS, pool).then(result =>
    res.send(result)
  );
});*/

app
  .route("/events")
  .get((req, res) => {
    executeSQL([], QUERY.SELECT_EVENTS, pool).then(events => res.send(events));
  })
  .post((req, res, eventInfo) => {
    executeSQL(eventInfo, QUERY.INSERT_EVENT, pool).then(result =>
      res.send(result)
    );
  })
  .put((req, res, eventInfo) => {
    executeSQL(eventInfo, QUERY.EDIT_EVENT, pool).then(result =>
      res.send(result)
    );
  })
  .delete((req, res, eventInfo) => {
    executeSQL(eventInfo, QUERY.DELETE_EVENT, pool).then(result =>
      res.send(result)
    );
  });
/*
app.get("/events/:eventId", (req, res) => {
  executeSQL([req.params.eventID], QUERY.SELECT_EVENT, pool).then(result =>
    res.send(result)
  );
});
*/
app.listen(3000, function() {
  console.log("App listening on port 3000!");
});
