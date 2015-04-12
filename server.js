var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require('util')
  , db = require('./lib/db')
  , router = require('./router');

app.configure(function() {

  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(app.router);
  db.setup();

});

router(app);

server.listen(8000);