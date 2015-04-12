var channel = require('./routes/channel')
  , user = require('./routes/user');

module.exports = function (app) {

  app.post('/user', user.saveUser);
  app.get('/user/:username', user.findUserByUsername);
  app.get('/channels', channel.findChannels);
  app.post('/channel', channel.saveChannel);

}