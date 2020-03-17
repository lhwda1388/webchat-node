var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('socket.io')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engind settting
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set(path.join(__dirname, 'views'), './views');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// socket io set
app.set('io', io);

module.exports = app;
