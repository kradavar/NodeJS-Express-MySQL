const express = require("express");
const app = express();
const QUERY = require("./queryList");
const getUserEvents = require("./getEventUser");
const executeSQL = require("./executeSQL");
const createTable = require("./createEventsTable");
/* если нет таблицы, то создать
возможно, при первом подключении */
createTable();
executeSQL(["Test 3", "2018", "2018", 2], QUERY.INSERT);
executeSQL(["Test 2", "2018", "2018", 2], QUERY.INSERT);
executeSQL(["Test 1", "2018", "2018", 2], QUERY.INSERT);

executeSQL(["Test edit", "2018", "2018", 1, 1], QUERY.EDIT);
/*
app.get("/", (req, res) => {
  /*executeSQL([2], `SELECT * FROM eventsList WHERE user_id = ?`).then(events =>
    res.send(events)
  );
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
*/
