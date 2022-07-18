const mongoose = require('mongoose');
const createError = require('http-errors')
const config = require("./config.json");
const winston = require('winston');
const statusCodes = require('http-status-codes').StatusCodes;
const message = require("../config/message")
const loggerConfig = require("./logging-config");
var dbConnConfig = {
    createConnection : function(env) {
        
        if(!config[env]) {
            loggerConfig.getLogger().error(message.F_ENV_UNDEFINED(env));
            throw createError(statusCodes.INTERNAL_SERVER_ERROR, message.F_ENV_UNDEFINED(env));
        }
        else{
            loggerConfig.getLogger().info("Profile found "+ env);
            loggerConfig.getLogger().info("Connection string "+config[env].connectionProtocol + config[env].host+ config[env].db);

            mongoose.connect(config[env].connectionProtocol + this.getDbAuth(env)+config[env].host+ config[env].db, { useNewUrlParser: true, useUnifiedTopology: true });
            const db = mongoose.connection;
            db.on('error', function() {
                loggerConfig.getLogger().error(message.ERROR_DB_CONN); // this is not working
                throw createError(statusCodes.INTERNAL_SERVER_ERROR, message.ERROR_DB_CONN)
            });
            db.once('open', function () {
                console.log("we are connected !");
                loggerConfig.getLogger().info("we are connected !");
            });
        }
    },
    getDbAuth: function(env) {
        var auth = "";
        if(config[env].username && config[env].password) {
            auth = config[env].username+":" + config[env].password+ "@";
        }
        return auth;
    }
}

module.exports = dbConnConfig;