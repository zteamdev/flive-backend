var db = require('../lib/db')
  , messageModel = require('../lib/message-model');

module.exports.deleteMessages = function (request, response) {

  messageModel.deleteMessages(function (err, deleted) {
    response.end(JSON.stringify({
      success: true
    }));
  	return;
  });	

}