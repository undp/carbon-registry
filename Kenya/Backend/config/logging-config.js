const winston = require('winston');
const config = require("./config.json");
var createError = require('http-errors');
const statusCodes = require('http-status-codes').StatusCodes;
const message = require("../config/message")
var  logger;
exports.initLogger = function(env) {
  if (!config[env]) {
    throw createError(statusCodes.INTERNAL_SERVER_ERROR, message.F_ENV_UNDEFINED(env))
  }
  else {
    logger = winston.createLogger({
      level: config[env].logger.level,
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: config[env].logger.filename }),
        new winston.transports.Console()
      ],
    });
  }
}
exports.getLogger = function() {
  return logger;
};