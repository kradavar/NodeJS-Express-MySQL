const QUERY = require("./queryList");
const executeSQL = require("./executeSQL");

const signUp = (username, password, fullName) => {
  const existingUsername = executeSQL(QUERY.GET_USER, [username]).then(
    result => result
  );

  if (existingUsername) {
    throw new Error();
  }

  executeSQL(QUERY.INSERT_USER, [username, password, fullName]);
};

module.exports = signUp;
