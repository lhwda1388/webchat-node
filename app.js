var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var io = require('./src/sock/index');
var compression = require('compression');
var cors = require('cors');

var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');

var app = express();

// view engind settting
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'src/views'));

app.use(logger('dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'src/public')));

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);

// socket io set
console.log('io set start')
app.set('io', io);
console.log('io set end')
// chat
require('./src/sock/nsp/chat')(io);


module.exports = app;
