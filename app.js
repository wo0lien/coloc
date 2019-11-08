// dependencies

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var logger = require('morgan');
var mongoose = require('mongoose');
require('dotenv').config();

//new routers import

const productRouter = require('./API/routes/product.route');
const shoplistRouter = require('./routes/shoplist');
const taskRouter = require('./API/routes/task.route');
const userRouter = require('./API/routes/user.route');

var indexRouter = require('./routes/index');

var app = express();

//------------------------------- MONGOOSE --------------------------------------

//mongo db connection need to handle promise soon

let dbUrl = process.env.MONGO_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'test' });
mongoose.set('useFindAndModify', false);
let db = mongoose.connection;
db.on('error', (error) => {
  console.log(error);
});

db.once('open', function () {
  console.log('database connected')
});

//------------------------------ SOCKET IO -----------------------------------

//socket.io config 

app.io = require('socket.io')();

//socket.io connection

app.io.on('connection', function (socket) {
  console.log('User has connected to socket');
});

//passing app.io to the req for use in the routes

app.use(function (req, res, next) {
  req.io = app.io;
  next();
});

//---------------------------------------------------------------------------
//use sessions for tracking logins
app.use(session({
  secret: 'process.env.SECRET',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));
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

//requires login middleware use router.get('/profile', mid.requiresLogin, function(req, res, next) {}) syntax to use it

//routes

app.use('/', indexRouter);
app.use('/shoplist', shoplistRouter);

//new API routes

app.use('/product', productRouter);
app.use('/task', taskRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
