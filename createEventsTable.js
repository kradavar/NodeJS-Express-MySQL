const createTable = (tableToCreate, connection) => {
  connection.query(tableToCreate, (err, results, fields) => {
    if (err) {
      console.warn("error: " + err.message);
    }
  });
};

module.exports = createTable;
