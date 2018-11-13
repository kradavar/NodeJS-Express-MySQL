const QUERY = {
  INSERT: `INSERT INTO eventsList(name,start,end,user_id)
           VALUES(?,?,?,?)`,
  DELETE: `DELETE FROM eventsList WHERE id = ?`,
  EDIT: `UPDATE eventsList SET name = ?,start = ?,end=?, user_id = ? WHERE id = ?`
};

module.exports = QUERY;
