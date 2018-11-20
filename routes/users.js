const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
/* GET user information after login */

const isAuthenticated = (req, res, next) => {
  console.log("isAuthenticated", req.session);
  if (req.session.passport.user) return next();

  // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SIGNIN PAGE
  res.redirect("/signin");
};
router.get("/events", (req, res, next) => {
  console.log("hey");
  executeSQL(QUERY.SELECT_USER_EVENTS, [req.session.passport.user]).then(
    events => res.send(events)
  );
});
router.post("/events", isAuthenticated, jsonParser, (req, res) => {
  const params = { ...req.body, user_id: req.session.user.id };
  executeSQL(QUERY.INSERT_EVENT, params).then(result => res.send(result));
});

router.put("/events/:id", isAuthenticated, jsonParser, (req, res) => {
  const params = [
    ...Object.values(req.body),
    req.session.user.id,
    req.params.id
  ];
  executeSQL(QUERY.EDIT_EVENT, params).then(result => res.send(result));
});

router.delete("/events/:id", (req, res) => {
  executeSQL(QUERY.DELETE_EVENT, [req.params.id]).then(result =>
    res.send(result)
  );
});

module.exports = router;
