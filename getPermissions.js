const QUERY = require("./database/queryList");
const executeSQL = require("./database/executeSQL.js");

const getPermissions = userId =>
  executeSQL(QUERY.GET_PERMISSIONS, [userId])
    .then(rows => {
      const users = rows.map(row => row.other_user_id);
      return users;
    })
    .catch(err => err);

module.exports = getPermissions;
