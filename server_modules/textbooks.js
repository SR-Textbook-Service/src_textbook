module.exports = {
  get_table: function(req, res) {
    global.db.all("SELECT * FROM textbooks", (err, rows) => {
        if (err) {
          throw err;
        }

        res.send(rows);
    });
  },
  insert: function(req, res) {
    var id = global.uuid();
    var bookName = req.body.bookName;
    var isbn = req.body.isbn;
    var author = req.body.author;
    var subject_id = req.body.subject_id;
    var data = [id, bookName, isbn, author, subject_id];

    global.db.run("INSERT INTO textbooks VALUES(?, ?, ?, ?, ?)", data);

    return id;
  },
  search: function(req, res) {
    var query = req.body.query;

    global.db.all("SELECT a.*, b.subjectName FROM textbooks as a INNER JOIN \
    subjects as b ON (a.bookName LIKE '%" + query + "%' OR a.author LIKE '%" +
    query + "%' OR a.isbn = '" + query + "' OR b.subjectName LIKE '%" + query
    + "%') AND a.subject_id = b.uuid", (err, rows) => {
      if(err) {
        throw err;
      }

      res.send(rows);
    });
  }
};
