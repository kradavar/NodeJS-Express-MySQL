const mysql = require("mysql");
const config = require("./config");

const addEvent = (name, start, end, userID) => {
  const connection = mysql.createConnection(config);
  connection.connect(err => {
    if (err) {
      return console.warn("error: " + err.message);
    }
    const createEventsList = `create table if not exists eventsList(
                          id int primary key auto_increment,
                          name varchar(255)not null,
                          start varchar(255)not null,
                          end varchar(255)not null,
                          user_id int not null 
                      )`;

    connection.query(createEventsList, (err, results, fields) => {
      if (err) {
        console.warn("error: " + err.message);
      }
    });

    const insert = `INSERT INTO eventsList(name,start,end,user_id)
           VALUES(?,?,?,?)`;
    const event = [name, start, end, userID];
    connection.query(
      insert,
      event,
      (err, results, fields) => err && console.error(err.message)
    );
    connection.end(err => err && console.log(err.message));
  });
};

module.exports = addEvent;
