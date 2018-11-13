const mysql = require("mysql");
const config = require("./config");
const connection = mysql.createConnection(config);
const getUserEvents = userID => {
  connection.connect(err => {
    if (err) {
      return console.warn("error: " + err.message);
    }
    const query = `SELECT * FROM eventsList WHERE user_id = ?`;
    connection.query(query, [userID], (err, results, fields) => {
      if (err) {
        return console.error(err.message);
      }
      console.log(results);
    });

    connection.end(err => err && console.log(err.message));
  });
};

module.exports = getUserEvents;
