const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const ghgFuelMappingSchema = new Schema({
    fuelType:{type:String},
    fuel:{type:String},
    NCV:{type:Number},
    EFCO2:{type:Number},
    EFCH4:{type:Number},
    EFN2O:{type:Number},
    reference:{type:String},
    lastUpdated:{type:Date},
    
});

const ghgFuelMappingModel = mongoose.model("ghg-fuel", ghgFuelMappingSchema);
module.exports = ghgFuelMappingModel;