// some useful node libraries
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//  modules from our routes directory. These modules/files contain code for handling particular sets of related "routes" (URL paths)
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// create the app object using our imported express module
var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://test_user:testone@locallibrary-7zkfe.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// add middleware libraries into the request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// serve all the static files in the /public directory in the project root
app.use(express.static(path.join(__dirname, 'public')));

// add our (previously imported) route-handling code to the request handling chain
app.use('/', indexRouter);
app.use('/users', usersRouter);

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

// Express application object (app) is now fully configured
// this is what allows it to be imported by /bin/www
module.exports = app;
