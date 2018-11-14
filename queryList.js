const QUERY = {
  INSERT: `INSERT INTO eventsList(name,start,end,user_id) VALUES(?,?,?,?)`,
  DELETE: `DELETE FROM eventsList WHERE id = ?`,
  EDIT: `UPDATE eventsList SET name = ?,start = ?,end=?, user_id = ? WHERE id = ?`,
  SELECT_EVENT: `SELECT * FROM eventsList WHERE user_id = ?`,
  SELECT: `SELECT * FROM eventsList`
};

module.exports = QUERY;
