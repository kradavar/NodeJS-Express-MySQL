const express = require("express");
const router = express.Router();
/* GET home page. redirect user to signin page */
router.get("/", function(req, res, next) {
  res.redirect("/signin");
});
module.exports = router;
