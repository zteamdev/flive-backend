var r = require('rethinkdb')
  , util = require('util')
  , assert = require('assert')

var dbConfig = {
  host: process.env.RDB_HOST || '127.0.0.1',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'flive'
};

module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    assert.ok(err === null, err);
  });
};

module.exports.saveUser = function (user, callback) {
	onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('user').insert(user).run(connection, function(err, result) {
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

module.exports.findUsersByUsername = function (username, callback) {
	onConnect(function (err, connection) {
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

module.exports.saveChannel = function (channel, callback) {
	onConnect(function (err, connection) {
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
	onConnect(function (err, connection) {
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

function onConnect(callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function(err, connection) {
    assert.ok(err === null, err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}