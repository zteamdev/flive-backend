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
        callback(null, []);
        connection.close();
      }
      else {
        cursor.toArray(function(err, results) {
          if(err) {
            callback(null, []);
          }
          else {
            callback(null, results);
          }
          connection.close();
        });
      }
    });
  })
}
