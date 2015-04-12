var db = require('./db');

module.exports.saveMessage = function (msg, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('message').insert(msg).run(connection, function (err, result) {
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

module.exports.findMessages = function (limit, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('message').limit(limit).run(connection, function (err, cursor) {
      if(err) {
        callback(err, []);
        connection.close();
      }
      else {
        cursor.toArray(function(err, results) {
          if (results.length > 0) {
            callback(null, results);
          } else {
            callback(null, [])
          }
          connection.close();
        });
      }
    });
  })
}

module.exports.deleteMessages = function (callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('message').delete().run(connection, function (err, cursor) {
      if(err) {
        callback(err, false);
        connection.close();
      }
      callback(null, true);
      connection.close();
    });
  })
}