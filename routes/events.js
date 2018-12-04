const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const QUERY = require("../database/queryList.js");
const executeSQL = require("../database/executeSQL.js");
const getPermissions = require("../getPermissions");
/* GET user information after login */

const isAuthenticated = (req, res, next) => {
  if (req.session.passport && req.session.passport.user) return next();
  return res.json(401, { hasErrors: true, message: "User is unauthorized" });
};

router.get("/", isAuthenticated, (req, res, next) => {
  debugger;
  getPermissions(req.session.passport.user).then(users => {
    const userList = [...users, req.session.passport.user];
    const promises = [];
    for (let i = 0; i < userList.length; i++) {
      promises.push(executeSQL(QUERY.SELECT_USER_EVENTS, userList[i]));
    }
    Promise.all(promises)
      .then(events => {
        if (events.length === 1 && events[0].length === 0) {
          // case for sign up
          res.send([
            {
              userId: req.session.passport.user,
              events: []
            }
          ]);
        } else {
          const reply = events.map(userEvents => {
            return {
              // hardcode?
              userId: userEvents[0].user_id,
              events: userEvents
            };
          });
          res.send(reply);
        }
      })
      .catch(err => {
        res.json(401, {
          hasErrors: true,
          message: err.message
        });
      });
  });
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
