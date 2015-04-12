var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require('util')
  , multer = require('multer')
  , db = require('./lib/db')
  , router = require('./router')
  , done = false;

app.configure(function() {

  app.use('/static', express.static('public'));
  app.use('/static', express.static('uploads'));
  app.use(express.cookieParser());
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.session({ secret: 'hdw9D87QYHUEDJ8YADUHJUGQWYR87jzmzbnsqaisuUuasuyE98283UJHgahGDAIW98IUkhHjsdshjk@@#$8121' }));
  app.use(app.router);

  db.setup();

});

router(app);

var usersonline = {};

io.sockets.on('connection', function (socket) {

  var connectedUser = {};
  console.log(socket.id);

  socket.on('message', function (data) {
    var msg = {
      message: data.message,
      from: data.username,
      photo: data.photo,
      timestamp: new Date().getTime()
    }
    socket.emit('new message', msg);
    socket.broadcast.emit('new message', msg);
  });

});

server.listen(80);