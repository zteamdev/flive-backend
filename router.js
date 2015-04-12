var channel = require('./routes/channel')
  , user = require('./routes/user')
  , flight = require('./routes/flight')
  , media = require('./routes/media')
  , multipart = require('connect-multiparty')
  , multipartMiddleware = multipart();

module.exports = function (app) {

  app.post('/user', user.saveUser);
  app.get('/user/:username', user.findUserByUsername);

  app.get('/channels', channel.findChannels);
  app.post('/channel', channel.saveChannel);

  app.get('/flights', flight.findFlights);
  app.post('/flight', flight.saveFlight);
  app.get('/flights/:number/:airline', flight.findFlightByNumberAndAirline);

  app.post('/media/upload', multipartMiddleware, media.upload);

}