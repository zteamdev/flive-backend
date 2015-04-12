var db = require('../lib/db')
  , channelModel = require('../lib/channel-model')
  , flightModel = require('../lib/flight-model');

module.exports.findChannels = function (request, response) {
	
  channelModel.findChannels(function (err, results) {
    if (err) {
      response.end(JSON.stringify({
        success: false,
        channels: []
      }));
      return;
    } else {
      response.end(JSON.stringify({
        success: true,
        channels: results
      }));
      return;
    }
  });
	
};

module.exports.saveChannel = function (request, response) {

  var type = request.param('type');
  var username = request.param('username');
  var flight = request.param('flight');

  channelModel.saveChannel({
      type: type,
      user: username,
      flight: flight,
      created_at: r.now()
    },
    function(err, saved) {
      if(err) {
        response.end(JSON.stringify({
          success: false,
          message: 'Cannot create channel'
        }));
        return;
      }
      if(saved) {
        response.end(JSON.stringify({
          success: true
        }));
      } else {
        response.end(JSON.stringify({
          success: false,
          message: 'The channel already exists'
        }));
      }
      return;
    }
  );
  
}