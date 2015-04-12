var db = require('./db');

module.exports.saveFlight = function (flight, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('flight').insert(flight).run(connection, function (err, result) {
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

module.exports.findFlightByNumberAndAirline = function (flightNumber, airline, callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('flight').filter({
    	'flightNumber': flightNumber,
      'airline': airline
    }).limit(1).run(connection, function (err, cursor) {
      if (err) {
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

module.exports.findFlights = function (callback) {
  db.onConnect(function (err, connection) {
    r.db(dbConfig['db']).table('flight').limit(1000).run(connection, function (err, cursor) {
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
  });
};