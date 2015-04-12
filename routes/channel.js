var db = require('../lib/db')
  , channelModel = require('../lib/channel-model')

module.exports.findChannels = function (request, response) {
	
  channelModel.findChannels(function (err, results) {
    if (err) {
      response.end(JSON.stringify({
        success: false,
        channels: []
      }));
    } else {
      if (results.length > 0) {
        response.end(JSON.stringify({
          success: true,
          channels: results
        }));
      }
    }
  });
	
};

module.exports.saveChannel = function (request, response) {

  channelModel.saveChannel({
      type: request.param('type'),
      user: request.param('username'),
      flight: request.param('flight'),
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