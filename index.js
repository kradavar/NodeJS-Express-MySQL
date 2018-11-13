const express = require("express");
const app = express();
const addEvent = require("./addEvent");
const getUserEvents = require("./getEventUser");

addEvent("Test 3", "2018", "2018", 2);

getUserEvents(3);

addEvent("Test 4", "2019", "2019", 3);
