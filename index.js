const express = require("express");
const app = express();
const addEvent = require("./addEvent");
const getUserEvents = require("./getEventUser");
const editEvent = require("./editEvent");
const deleteEvent = require("./deleteEvent");

addEvent("Test 3", "2018", "2018", 2);
editEvent("Test 1", "2018", "2019", 2, 2);
deleteEvent(5);
addEvent("Test 4", "2019", "2019", 3);
/*
let message = getUserEvents(2, (err, res) => {
  message = err ? err : res;
  console.log("mess1: ", message);
  return message;
});
console.log("mess2:", message);*/

app.get("/", (req, res) => {
  getUserEvents(2).then(events => res.send(events));
});
app.listen(3000, function() {
  console.log("Example app listening on port 3000!");
});
