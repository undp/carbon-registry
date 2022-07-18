const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const emissionFactorSchema = new Schema({
    subSector:{type:String,require:true},
    emissionFactor:{type:Number},
    unit:{type:String,require:true},
    reference:{type:String},
    
    
    
});
const databaseEmissionFactorSchema = new Schema({
    emissionFactor:[emissionFactorSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseEmissionFactorModel = mongoose.model("database-ippu-emission-factor", databaseEmissionFactorSchema);
module.exports = databaseEmissionFactorModel;
