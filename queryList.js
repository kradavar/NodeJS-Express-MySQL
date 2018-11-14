const QUERY = {
  INSERT_EVENT: `INSERT INTO eventsList(event_name,start,end,user_id) VALUES(?,?,?,?)`,
  DELETE_EVENT: `DELETE FROM eventsList WHERE id = ?`,
  EDIT_EVENT: `UPDATE eventsList SET event_name = ?,start = ?,end=?, user_id = ? WHERE id = ?`,
  SELECT_USER_EVENTS: `SELECT * FROM eventsList WHERE user_id = ?`,
  SELECT_EVENTS: `SELECT * FROM eventsList`,
  SELECT_EVENT: `SELECT * FROM eventsList WHERE id=?`,
  JOIN: `SELECT * FROM eventsList JOIN usersList ON eventsList.user_id = usersList.id`,
  INSERT_USER: `INSERT INTO usersList(name,password) VALUES(?,?)`,
  DELETE_USER: `DELETE FROM usersList WHERE id = ?`,
  EDIT_USER: `UPDATE usersList SET name = ?,password = ? WHERE id = ?`,
  SELECT_USERS: `SELECT * FROM usersList`
};

module.exports = QUERY;
