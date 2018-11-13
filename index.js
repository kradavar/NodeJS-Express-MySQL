const express = require("express");
const app = express();
const addEvent = require("./addEvent");
const getUserEvents = require("./getEventUser");
const editEvent = require("./editEvent");

addEvent("Test 3", "2018", "2018", 2);
editEvent("Test 1", "2018", "2019", 2, 2);
getUserEvents();

addEvent("Test 4", "2019", "2019", 3);
