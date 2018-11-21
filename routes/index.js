const express = require("express");
const router = express.Router();
/* GET home page. redirect user to signin page */
router.get("/", (req, res, next) => {
  debugger;
  res.redirect("/signin");
  //error unauth
});
module.exports = router;
