GLOBAL.r = require('rethinkdb')
  , util = require('util')
  , assert = require('assert')

GLOBAL.dbConfig = {
  host: process.env.RDB_HOST || '127.0.0.1',
  port: parseInt(process.env.RDB_PORT) || 28015,
  db  : process.env.RDB_DB || 'flive'
};

module.exports.setup = function() {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    assert.ok(err === null, err);
  });
};

module.exports.onConnect = function (callback) {
  r.connect({host: dbConfig.host, port: dbConfig.port }, function (err, connection) {
    assert.ok(err === null, err);
    connection['_id'] = Math.floor(Math.random()*10001);
    callback(err, connection);
  });
}