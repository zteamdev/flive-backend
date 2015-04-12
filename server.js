var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , util = require('util')
  , multer = require('multer')
  , db = require('./lib/db')
  , router = require('./router')
  , messageModel = require('./lib/message-model')

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

  messageModel.findMessages(20, function (err, messages) {
    if (!err && messages.length > 0) {
      socket.emit('history', messages);
    }
  });

  socket.on('message', function (data) {
    var msg = {
      message: data.message,
      from: data.username,
      photo: data.photo,
      timestamp: new Date().getTime()
    }

    messageModel.saveMessage(msg, function (err, saved) {
      if(err || !saved) {
        socket.emit('new message', {message: util.format("<em>There was an error saving your message (%s)</em>", msg.message), from: msg.from, timestamp: msg.timestamp});
        return;
      }
      socket.emit('new message', msg);
      socket.broadcast.emit('new message', msg);
    });  

  });

});

server.listen(80);