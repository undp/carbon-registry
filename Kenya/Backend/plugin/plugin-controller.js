const pluginIndex = require("./index");
const configIndex = require("./../config");
const utilityIndex = require("./../utility");
const statusCodes = require('http-status-codes').StatusCodes;


exports.getClient = async function (req, res, next) {
    try {
        var plugins = await pluginIndex.pluginModel.find({});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'plugin'),plugins);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"plugin"),error));
    }
}
exports.validateClient = async function (req, res, next) {
    try {
        var query = {
            clientId: req.body.clientId,
            clientSecret: req.body.clientSecret,
            domain: req.body.domain,
            status: "active",
        };
        var response = {
            valid: false
        };
        var plugins = await pluginIndex.pluginModel.findOne(query);
        if(plugins) {
            response.valid = true;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'plugin'),response);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"plugin"),error));
    }
}
exports.saveClient = async function (req, res, next) {
    try {
        var plugin = await pluginIndex.pluginModel(req.body).save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'plugin'),plugin);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"plugin"),error));
    }
}
exports.updateClient = async function (req, res, next) {
    try {
        var query = {
            clientId: req.params.clientId
        };

        var plugin = await pluginIndex.pluginModel.findOneAndUpdate(query,req.body,{new:true}).exec();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'plugin'),plugin);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"plugin"),error));
    }
}