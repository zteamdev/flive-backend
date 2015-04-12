var db = require('../lib/db')
  , mediaModel = require('../lib/media-model')
  , fs = require('fs')
  , path = require('path')
  , crypto = require('crypto');

var types = {
	"image/jpeg":"jpg",
	"image/png":"png",
	"image/gif":"gif",
};

module.exports.upload = function (request, response, next) {

	response.setHeader('Content-Type', 'application/json');
	response.setHeader('Access-Control-Allow-Origin', '*');

  var id = crypto.randomBytes(20).toString('hex');
  var filepath = './uploads/' + id + '.' + types[request.files.file.type];
  var databaseFilepath = id + '.' + types[request.files.file.type];
  var tmpPath = request.files.file.path;
  var targetPath = path.resolve(filepath);
  
  fs.rename(tmpPath, targetPath, function (err) {
    if(err){
    	response.end(JSON.stringify({
    		success: false
    	}));
    	return;
    } else {
    	mediaModel.saveMedia({
		      mediaType: "image",
		      filename: databaseFilepath,
		      created_at: r.now()
		    },
		    function (err, saved) {
		      if(err) {
		        response.end(JSON.stringify({
		          success: false,
		          message: 'Cannot upload file'
		        }));
		        return;
		      }
		      if(saved) {
		        response.end(JSON.stringify({
		          success: true,
		          path: "http://localhost/static/" + databaseFilepath
		        }));
		      }
		    }
		  );
    }

  });

}