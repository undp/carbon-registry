
var utilityIndex = require("../../utility");
var configIndex = require("../../config")
var databaseWasteIndex = require("./index");
const sharedIndex = require("../../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("../../menu");
const dataStateIndex = require("../../data-state");
const userIndex = require("../../user")
const config = require("../../config/config.json");
var _ = require('lodash');

exports.savePopulation = async (req,res,next)=>{
    try {
      
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_WASTE_POPULATION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        var record = await databaseWasteIndex.databaseWastePopulationModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_WASTE_POPULATION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_WASTE_POPULATION),error));
        return;
   }
}
/*
* getPopulation: get all the emission factor records
*/
exports.getPopulation = async (req,res,next)=>{
    try {
        var emissionFactor = await databaseWasteIndex.databaseWastePopulationModel.find({}).exec();
        var pipeline = [
            
            {"$sort":{updateDate:-1}},
            {"$limit":1}
        ]
        record = await databaseWasteIndex.databaseWastePopulationModel.aggregate(pipeline).exec();
        if(record.length) {
            record = record[0];
            // check for inventoryYear to give latest entry from populationData array
            if(req.query.inventoryYear && record && record.populationData.length) {
               var index =  _.findLastIndex(record.populationData, function(o) { return o.inventoryYear == parseInt(req.query.inventoryYear); });
               record.populationData = [record.populationData[index]];
            }
        }
        else {
            record = null;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_WASTE_POPULATION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_WASTE_POPULATION),error));
        return;
   }
}