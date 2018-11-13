const mysql = require("mysql");
const config = require("./config");

const editEvent = (name, start, end, userID, id) => {
  const connection = mysql.createConnection(config);
  connection.connect(err => {
    if (err) {
      return console.warn("error: " + err.message);
    }

    const insert = `UPDATE eventsList SET name = ?,start = ?,end=?, user_id = ? WHERE id = ?`;
    const event = [name, start, end, userID, id];
    connection.query(
      insert,
      event,
      (err, results, fields) => err && console.error(err.message)
    );
    connection.end(err => err && console.log(err.message));
  });
};

module.exports = editEvent;
