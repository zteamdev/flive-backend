var db = require('./db');

module.exports.findUsersByUsername = function (username, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('user').filter({'username': username}).limit(1).run(connection, function (err, cursor) {
      if(err) {
        callback(err);
      }
      else {
        cursor.next(function (err, row) {
          if(err) {
            callback(err);
          }
          else {
            callback(null, row);
          }
          connection.close();
        });
      }
    });
  });
};

module.exports.saveUser = function (user, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('user').insert(user).run(connection, function (err, result) {
      if(err) {
        callback(err);
      }
      else {
        if(result.inserted === 1) {
          callback(null, true);
        }
        else {
          callback(null, false);
        }
      }
      connection.close();
    });
  });
};
