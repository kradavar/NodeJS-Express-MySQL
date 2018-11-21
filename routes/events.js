const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const QUERY = require("../database/queryList.js");
const executeSQL = require("../database/executeSQL.js");
/* GET user information after login */

const isAuthenticated = (req, res, next) => {
  if (req.session.passport.user) return next();
  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE?
  res.redirect("/signin");
};
router.get("/", isAuthenticated, (req, res, next) => {
  executeSQL(QUERY.SELECT_USER_EVENTS, [req.session.passport.user]).then(
    events => {
      res.send(events);
    }
  );
});
router.post("/", isAuthenticated, jsonParser, (req, res) => {
  const params = [...Object.values(req.body), req.session.passport.user];
  executeSQL(QUERY.INSERT_EVENT, params).then(result => {
    res.send(result);
  });
});

router.put("/:id", isAuthenticated, jsonParser, (req, res) => {
  const params = [
    ...Object.values(req.body),
    req.session.passport.user,
    req.params.id
  ];
  executeSQL(QUERY.EDIT_EVENT, params).then(result => res.send(result));
});

router.delete("/:id", (req, res) => {
  executeSQL(QUERY.DELETE_EVENT, [req.params.id]).then(result =>
    res.send(result)
  );
});

module.exports = router;
