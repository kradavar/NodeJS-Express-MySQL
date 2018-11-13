const express = require("express");
const app = express();
const addEvent = require("./addEvent");
const getUserEvents = require("./getEventUser");
const editEvent = require("./editEvent");
const deleteEvent = require("./deleteEvent");

addEvent("Test 3", "2018", "2018", 2);
editEvent("Test 1", "2018", "2019", 2, 2);
getUserEvents();
deleteEvent(5);
addEvent("Test 4", "2019", "2019", 3);
