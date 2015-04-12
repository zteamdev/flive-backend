var db = require('../lib/db')
  , flightModel = require('../lib/flight-model');

module.exports.findFlights = function (request, response) {

  flightModel.findFlights(function (err, results) {
    if (err) {
      response.end(JSON.stringify({
        success: false,
        flights: []
      }));
      return;
    } else {
      response.end(JSON.stringify({
        success: true,
        flights: results
      }));
      return;
    }
  });

};

module.exports.findFlightByNumberAndAirline = function (request, response) {

  var flightNumber = request.params.number;
  var airline = request.params.airline;

  flightModel.findFlightByNumberAndAirline(flightNumber, airline, function (err, flight) {
  	
    if (err || flight === null) {
      response.end(JSON.stringify({
        success: false,
        message: 'Flight doesn`t exists',
        flight: null
      }));
      return;
    } else {
      response.end(JSON.stringify({
        success: true,
        flight: flight
      }));
    }

  });

}

module.exports.saveFlight = function (request, response) {
  
  if (request.flight == "undefined") {
    response.end(JSON.stringify({
      error: 'Flight is not defined'
    }));
    return;
  }

  if (!validateFlight(request.flight)) {
    response.end(JSON.stringify({
      error: 'Some fields cannot be blank'
    }));
  }

  flightModel.saveFlight({
      origin: request.param('origin'),  	
      destination: request.param('destination'),  	
      airline: request.param('airline'),  	
      departureDate: request.param('departureDate'),  	
      arrivalDate: request.param('arrivalDate'),  	
      flightNumber: request.param('flightNumber'),
      created_at: r.now()
    }, function (err, saved) {
      if (err) {
        response.end(JSON.stringify({
          success: false,
          message: 'Cannot create flight'
        }));
        return;
      }
      if (saved) {
    	  response.end(JSON.stringify({
    	    success: true
    	  }));
      } else {
      	response.end(JSON.stringify({
      	  success: false,
      	  message: 'The flight already exists'
      	}));
      }
      return;
    }
  );

}

var validateFlight = function (flight) {
  for (var property in flight) {
    if (flight[property] == null || user[property].length === 0) {
      return false;
    }
  }
  return true;
}