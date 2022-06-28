const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const populationDataSchema = new Schema({
    inventoryYear:{type:Number},
    ruralPopulation:{type:Number},
    urbanPopulation:{type:Number},
    reference:{type:String},
    
    
});
const databaseWastePopulationSchema = new Schema({
    populationData:[populationDataSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseWastePopulationModel = mongoose.model("database-waste-population", databaseWastePopulationSchema);
module.exports = databaseWastePopulationModel;
