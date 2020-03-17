var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var socketServer = require('socket.io')

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

// view engind settting
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// socket io set
var io = socketServer()
app.set('io', io);

/*
io.on('connection', (socket) => {
  console.log('init connection')
})
*/

var chatNsp = io.of('/chat')

chatNsp.on('connect', (socket) => {
  console.log('chat connection');

  chatNsp.emit('init', 'hello')
  socket.on('send', (msg) => {
    console.log(`send ${msg}`);
    chatNsp.emit('receive', msg);
  });
});

module.exports = app;
