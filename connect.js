const mysql = require("mysql");
const config = require("./config");
const connection = mysql.createConnection(config);
connection.connect(function(err) {
  if (err) {
    return console.error("error: " + err.message);
  }
  const createEventsList = `create table if not exists eventsList(
                          id int primary key auto_increment,
                          name varchar(255)not null,
                          start varchar(255)not null,
                          end varchar(255)not null
                      )`;

  connection.query(createEventsList, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  const sql = `INSERT INTO eventsList(name,start,end)
           VALUES('Test event','2018-10-10 12:00', '2018-10-10 13:00')`;

  connection.query(sql, function(err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  connection.end(function(err) {
    if (err) {
      return console.log(err.message);
    }
  });
});
