const QUERY = {
  INSERT_EVENT: `INSERT INTO events(event_name,start,end,user_id) VALUES(?,?,?,?)`,
  DELETE_EVENT: `DELETE FROM events WHERE id = ?`,
  EDIT_EVENT: `UPDATE events SET event_name = ?,start = ?,end=?, user_id = ? WHERE id = ?`,
  SELECT_USER_EVENTS: `SELECT * FROM events WHERE user_id = ?`,
  SELECT_EVENTS: `SELECT * FROM events`,
  SELECT_EVENT: `SELECT * FROM events WHERE id=?`,
  INSERT_USER: `INSERT INTO users(username,password,full_name) VALUES(?,?,?)`,
  DELETE_USER: `DELETE FROM users WHERE id = ?`,
  EDIT_USER: `UPDATE users SET username = ?,password = ? full_name = ? WHERE id = ?`,
  SELECT_USERS: `SELECT * FROM users`,
  GET_USER: `SELECT * FROM users WHERE username = ?`,
  GET_USER_ID: `SELECT * FROM users WHERE id = ?`
};

module.exports = QUERY;
