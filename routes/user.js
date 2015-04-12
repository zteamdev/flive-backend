var db = require('../lib/db')
  , userModel = require('../lib/user-model')
  , bcrypt = require('bcrypt');

module.exports.saveUser = function (request, response) {

  if (request.user == "undefined") {
    response.end(JSON.stringify({
      error: 'User is not defined'
    }));
    return;
  }

  if (!validateUser(request.user)) {
    response.end(JSON.stringify({
      error: 'Some fields cannot be blank'
    }));
  }
	
  userModel.saveUser({
      username: request.param('username'),
      password: bcrypt.hashSync(request.param('password'), 8),
      name: request.param('name'),
      created_at: r.now()
    },
    function(err, saved) {
      if(err) {
        response.end(JSON.stringify({
          success: false,
          message: 'Cannot create user'
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
          message: 'The user already exists'
        }));
      }
      return;
    }
  );	

}

module.exports.findUserByUsername = function (request, response) {
 
  var username = request.params.username;
  
  userModel.findUsersByUsername(username, function (err, user) {
    
    if(err) {
      response.end(JSON.stringify({
        error: 'Sorry, but something went wrong'
      }));
      console.log(err)
      return;
    }
    
    if(user === null) {
      response.end(JSON.stringify({
        success: false,
        message: 'User doesn`t exists',
        user: null
      }));
      return;
    }
    else {
      response.end(JSON.stringify({
        success: true,
        user: user
      }));
    }
  });

}

var validateUser = function (user) {
  for (var property in user) {
    if (user[property] == null || user[property].length === 0) {
      return false;
    }
  }
  return true;
}