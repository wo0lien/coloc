// dependencies

var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var logger = require('morgan');

var app = express();

//socket.io require 

app.io = require('socket.io')();

app.use(cookieParser());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//list of routers used

var indexRouter = require('./routes/index');
var dataAddRouter = require('./routes/dbadd')(app.io);
var dataRemoveRouter = require('./routes/dbremove')(app.io);
var listRouter = require('./routes/list')

//routes

app.use('/', indexRouter);
app.use('/list', listRouter);

//api routes

app.use('/db/add', dataAddRouter);
app.use('/db/remove', dataRemoveRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
