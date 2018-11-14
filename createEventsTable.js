const createTable = connection => {
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
};

module.exports = createTable;
