const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const ghgReportingInputSchema = new Schema({
    menuId:{type:String,required:true},
    srcId: {type: mongoose.Schema.Types.ObjectId, ref: 'app-data',required:true},
    data:{type:Schema.Types.Mixed,required:true},
    inventoryYear:{type:Number,required:true},
    lastUpdated:{type:Date, default:Date.now},
    // updatedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'user',default: "NA"},
    
});

const ghgReportingInputModel = mongoose.model("ghg-report", ghgReportingInputSchema);
module.exports = ghgReportingInputModel;