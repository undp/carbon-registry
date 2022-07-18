
require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utilityIndex = require("./utility");
const cors = require('cors');
const statusCodes = require('http-status-codes').StatusCodes;

const loggerConfig = require("./config/logging-config");
const dbConnConfig = require("./config/db-config");

var indexRouter = require('./index-routes');

var app = express();

// cors
app.use(cors("*"));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// loading configuration
console.log("Selected profile ",process.env.PROFILE);
loggerConfig.initLogger(process.env.PROFILE);
dbConnConfig.createConnection(process.env.PROFILE);

/* app.use(function(req, res, next) {
  console.log("intercepter calling");
  next();
}); */
/* app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept, X-Requested-With,Content-Type');
  
  next();
}) */
// app.use(allowCrossDomain);

//loading routes

// swagger
const configIndex = require("./config");
configIndex.swagger.config.initSwaggerConfig(app);
/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

var passport = require('passport');
// Need to require the entire Passport config module so app.js knows about it
require('./auth/passport');

app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log("global error handler ",JSON.stringify(err));
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(err) {

    // render the error page
    if(!err.status) {
      err.status = utilityIndex.factory.getErrorCodeByErrorType(err.name);
    }
    return utilityIndex.response(res,err.status,err.message,err);
    // utilityIndex.response(res,err.status,err.message,err);
  }
});

module.exports = app;
