var db = require('../lib/db');

module.exports.findChannels = function (request, response) {
	
	db.findChannels(function (err, results) {
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

	db.saveChannel({
      type: request.param('type'),
      user: request.param('username'),
      flight: request.param('flight'),
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