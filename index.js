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

createTable(pool);

executeSQL(["Test 3", "2018", "2018", 2], QUERY.INSERT, pool).then(result =>
  console.log(result)
);
executeSQL(["Test 2", "2018", "2018", 1], QUERY.INSERT, pool).then(result =>
  console.log(result)
);
executeSQL(["Test 1", "2018", "2018", 3], QUERY.INSERT, pool).then(result =>
  console.log(result)
);

app.get("/", (req, res) => {
  executeSQL([], QUERY.SELECT, pool).then(events => res.send(events));
});
const userID = 1;
app.get("/events/" + userID, (req, res) => {
  executeSQL([userID], QUERY.SELECT_EVENT, pool).then(result =>
    res.send(result)
  );
});

app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
