
var utilityIndex = require("./../../utility");
var configIndex = require("./../../config")
var databaseEnergyIndex = require("./index");
const sharedIndex = require("./../../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("./../../menu");
const dataStateIndex = require("./../../data-state");
const userIndex = require("./../../user")
const config = require("./../../config/config.json");
const databaseEnergyEmissionSeed = require("./../../seeds/database-energy-emission");
const fugitiveEmissionSeed = require("./../../seeds/fugitive-emission-seed");

exports.seedEmissionFactor = async (req,res,next)=>{
    req.body.emissionFactor = databaseEnergyEmissionSeed;
    this.saveEmissionFactor(req,res,next);
}
exports.saveEmissionFactor = async (req,res,next)=>{
    try {
      console.log("req.user.email ",req.user.email);
        if(!req.user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        } else {
            // set userId in req body
            req.body.updatedBy = req.user._id;
        }
        var emissionFactor = await databaseEnergyIndex.databaseEmissionFactorModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),emissionFactor);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),error));
        return;
   }
}
/*
* getEmissionFactor: get all the emission factor records
*/
exports.getEmissionFactor = async (req,res,next)=>{
    try {
        var pipeline = [
            {"$sort":{updateDate:-1}},
            {"$limit":1}
        ]
        var emissionFactor = await databaseEnergyIndex.databaseEmissionFactorModel.aggregate(pipeline).exec();
        if(emissionFactor.length) {
            emissionFactor = emissionFactor[0];
        }
        else {
            emissionFactor = null;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),emissionFactor);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),error));
        return;
   }
}

// fugitive starts
exports.seedFugitiveEmission = async (req,res,next)=>{
    req.body.emissionFactor = fugitiveEmissionSeed;
    this.saveFugitiveEmission(req,res,next);
}
exports.saveFugitiveEmission = async (req,res,next)=>{
    try {
      console.log("req.user.email ",req.user.email);
        if(!req.user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        } else {
            // set userId in req body
            req.body.updatedBy = req.user._id;
        }
        var emissionFactor = await databaseEnergyIndex.databaseFugitiveEmissionModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_FUGITIVE_EMISSION),emissionFactor);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_FUGITIVE_EMISSION),error));
        return;
   }
}
/*
* getFugitiveEmission: get all fugitive emission 
*/
exports.getFugitiveEmission = async (req,res,next)=>{
    try {
        var pipeline = [
            {"$sort":{updateDate:-1}},
            {"$limit":1}
        ]
        var emissionFactor = await databaseEnergyIndex.databaseFugitiveEmissionModel.aggregate(pipeline).exec();
        if(emissionFactor.length) {
            emissionFactor = emissionFactor[0];
        }
        else {
            emissionFactor = null;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),emissionFactor);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),error));
        return;
   }
}