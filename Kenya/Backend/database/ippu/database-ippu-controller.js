const express = require('express');
var bodyParser = require('body-parser');
var utilityIndex = require("../../utility");
var configIndex = require("../../config")
var databaseIppuIndex = require(".");
const sharedIndex = require("../../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("../../menu");
const dataStateIndex = require("../../data-state");
const userIndex = require("../../user")
const config = require("../../config/config.json");
const gwpSeedData = require("../../seeds/database-ippu-gwp-seed");


exports.saveEmissionFactor = async (req,res,next)=>{
    try {
      
        if(!req.user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_IPPU_EMISSION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        } else {
            // add user as updatedBy in req body
            req.body.updatedBy = req.user;
        }
        var emissionFactor = await databaseIppuIndex.databaseIppuEmissionFactorModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_EMISSION),emissionFactor);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_EMISSION),error));
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
        var record = await databaseIppuIndex.databaseIppuEmissionFactorModel.aggregate(pipeline).exec();
        if(record.length) {
            record = record[0];
        }
        else {
            record = null;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),error));
        return;
   }
}

/********************GWP starts **************** */

exports.seedGWP = async (req,res,next)=>{
    try {
      
        var user = await userIndex.userController.getUserById(req.user._id);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_IPPU_GWP),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        // remove existing record
        await databaseIppuIndex.databaseGWPModel.remove({});
        var payload = {
            updatedBy:req.user,
            gwpData: gwpSeedData
        }
        var record = await databaseIppuIndex.databaseGWPModel(payload).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_GWP),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_GWP),error));
        return;
   }
}
exports.saveGWP = async (req,res,next)=>{
    try {
      
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_IPPU_GWP),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        var record = await databaseIppuIndex.databaseGWPModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_GWP),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_IPPU_GWP),error));
        return;
   }
}
/*
* getGWP: get all the emission factor records
*/
exports.getGWP = async (req,res,next)=>{
    try {
        var pipeline = [
            {"$sort":{updateDate:-1}},
            {"$limit":1},
        ]
        var record = await databaseIppuIndex.databaseGWPModel.aggregate(pipeline).exec();
        if(record.length) {
            record = record[0];
        }
        else {
            record = null;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_ENERGY_EMISSION),error));
        return;
   }
}
exports.getGWPInternal = async ()=>{
    var record = null;
    var pipeline = [
        {"$sort":{updateDate:-1}},
        {"$limit":1}
    ]
    var record = await databaseIppuIndex.databaseGWPModel.aggregate(pipeline).exec();
    if(record.length) {
        record = record[0];
    }
    else {
        record = null;
    }
    return record;   
}
/********************GWP ends **************** */