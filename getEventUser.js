const mysql = require("mysql");
const config = require("./config");
const getUserEvents = (id, callback) => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    connection.connect(err => {
      if (err) {
        return console.warn("error: " + err.message);
      }
      const query = `SELECT * FROM eventsList WHERE user_id = ?`;
      connection.query(query, [id], (err, rows) => {
        if (rows) {
          resolve(rows);
        }
        reject(err);
      });
      connection.end(err => err && console.log(err.message));
    });
  });
};

module.exports = getUserEvents;
