const mysql = require("mysql");
const config = require("./config");
const getUserEvents = (eventInfoArray, query) => {
  const connection = mysql.createConnection(config);
  connection.connect(err => {
    if (err) {
      return console.warn("error: " + err.message);
    }
    connection.query(
      query,
      eventInfoArray,
      (err, results, fields) => err && console.error(err.message)
    );
    connection.end(err => err && console.log(err.message));
  });
};

module.exports = getUserEvents;
