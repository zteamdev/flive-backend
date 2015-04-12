var db = require('./db');

module.exports.saveMedia = function (resource, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('media').insert(resource).run(connection, function (err, result) {
      if(err) {
      	callback(err);
      }
      else {
      	if (result.inserted === 1) {
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