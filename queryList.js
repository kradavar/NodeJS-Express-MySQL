const QUERY = {
  INSERT_EVENT: `INSERT INTO events SET ?`,
  DELETE_EVENT: `DELETE FROM events WHERE id = ?`,
  EDIT_EVENT: `UPDATE events SET event_name = ?,start = ?,end=?, user_id = ? WHERE id = ?`,
  SELECT_USER_EVENTS: `SELECT * FROM events WHERE user_id = ?`,
  SELECT_EVENTS: `SELECT * FROM events`,
  SELECT_EVENT: `SELECT * FROM events WHERE id=?`,
  INSERT_USER: `INSERT INTO users(name,password) VALUES(?,?)`,
  DELETE_USER: `DELETE FROM users WHERE id = ?`,
  EDIT_USER: `UPDATE users SET name = ?,password = ? WHERE id = ?`,
  SELECT_USERS: `SELECT * FROM users`
};

module.exports = QUERY;
