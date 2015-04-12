var db = require('./db');

module.exports.saveChannel = function (channel, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('channel').insert(channel).run(connection, function(err, result) {
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

module.exports.findChannels = function (callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('channel').limit(100).run(connection, function (err, cursor) {
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
