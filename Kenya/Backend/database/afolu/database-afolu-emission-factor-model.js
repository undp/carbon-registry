const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const liveStockDataSchema = new Schema({
    livestock:{type:String},
    efEntericFermentation:{type:Number},
    efManureManagement:{type:Number},
    nExcretionRate:{type:Number},
    typicalAnimalMass:{type:Number},
    nitrogenExcretionManaged:{type:Number},
    efDirectN2OEmissions:{type:Number},
    managedManure:{type:Number},
    fractionOfManagedLivestockNitrogen:{type:Number},
    emissionFactorForN2O:{type:Number},
    reference:{type:String},
    
    
});
const databaseAfoluEmissionFactorSchema = new Schema({
    liveStockData:[liveStockDataSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseAfoluEmissionFactorModel = mongoose.model("database-afolu-emission-factor", databaseAfoluEmissionFactorSchema);
module.exports = databaseAfoluEmissionFactorModel;
