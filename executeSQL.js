const executeSQL = (eventInfoArray, query, pool) =>
  new Promise((resolve, reject) => {
    eventInfoArray.length === 0
      ? pool.query(query, (err, result) => {
          if (result) {
            resolve(result);
          }
          reject(err);
        })
      : pool.query(query, eventInfoArray, (err, result) => {
          if (result) {
            resolve(result);
          }
          reject(err);
        });
  });

module.exports = executeSQL;
