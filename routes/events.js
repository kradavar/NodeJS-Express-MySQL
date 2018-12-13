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
  getPermissions(req.session.passport.user).then(users => {
    const userList = [...users, req.session.passport.user];
    let inList = "";
    for (let i = 0; i < userList.length; i++) {
      inList += "?,";
    }
    inList = inList.substring(0, inList.length - 1);
    inList += ")";
    executeSQL(QUERY.SELECT_USER_EVENTS + inList, userList)
      .then(events => {
        const reply = userList.map(userId => {
          const eventsByUser = events.filter(event => event.user_id === userId);
          return {
            userId,
            events: eventsByUser
          };
        });
        res.send(reply);
      })
      .catch(err => {
        setTimeout(() => {
          res.json({ hasErrors: true, error: err });
        }, 1500);
      });
  });
});
router.post("/", isAuthenticated, jsonParser, (req, res) => {
  const params = [...Object.values(req.body), req.session.passport.user];
  executeSQL(QUERY.INSERT_EVENT, params)
    .then(result => {
      executeSQL(QUERY.SELECT_EVENT, [result.insertId]).then(result => {
        setTimeout(() => {
          res.send({ ...result[0] });
        }, 1500);
      });
    })
    .catch(err => {
      setTimeout(() => {
        res.json({
          hasErrors: true,
          error: err
        });
      }, 1500);
    });
});

router.put("/:id", isAuthenticated, jsonParser, (req, res) => {
  const params = [
    ...Object.values(req.body),
    req.session.passport.user,
    req.params.id
  ];
  executeSQL(QUERY.EDIT_EVENT, params)
    .then(result => {
      executeSQL(QUERY.SELECT_EVENT, [req.params.id]).then(result => {
        setTimeout(() => {
          res.send({ ...result[0] });
        }, 1500);
      });
    })
    .catch(err => {
      setTimeout(() => {
        res.json({ hasErrors: true, error: err });
      }, 1500);
    });
});

router.delete("/:id", (req, res) => {
  executeSQL(QUERY.DELETE_EVENT, [req.params.id]).then(() => {
    setTimeout(() => {
      res.send({
        id: req.params.id
      });
    }, 1500);
  });
});

module.exports = router;
