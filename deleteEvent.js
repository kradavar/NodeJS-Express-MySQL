const mysql = require("mysql");
const config = require("./config");

const deleteEvent = id => {
  const connection = mysql.createConnection(config);
  connection.connect(err => {
    if (err) {
      return console.warn("error: " + err.message);
    }

    const delEvent = `DELETE FROM eventsList WHERE id = ?`;
    const event = [id];
    connection.query(
      delEvent,
      event,
      (err, results, fields) => err && console.error(err.message)
    );
    connection.end(err => err && console.log(err.message));
  });
};

module.exports = deleteEvent;
