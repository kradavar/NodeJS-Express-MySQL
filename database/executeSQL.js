const mysql = require("mysql");
const config = require("./config");
const pool = mysql.createPool({
  connectionLimit: 100,
  ...config
});
const executeSQL = (query, values) =>
  new Promise((resolve, reject) => {
    console.log("QUERY", query);
    console.log("Values", values);
    values.length === 0
      ? pool.query(query, (err, result) => {
          if (result) {
            resolve(result);
          }
          reject(err);
        })
      : pool.query(query, values, (err, result) => {
          if (result) {
            resolve(result);
          }
          reject(err);
        });
  });

module.exports = executeSQL;
