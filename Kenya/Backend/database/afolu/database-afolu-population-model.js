const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");


const populationDataSchema = new Schema({
    category:{type:String},
    heads :{type:Number},
    reference:{type:String}
    
});

const databaseAfoluPopulationSchema = new Schema({
    inventoryYear:{type:Number,required:true},
    
    populationData:[populationDataSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    remark:{type:String},
    
    
});

const databaseAfoluPopulationModel = mongoose.model("database-afolu-population", databaseAfoluPopulationSchema);
module.exports = databaseAfoluPopulationModel;
