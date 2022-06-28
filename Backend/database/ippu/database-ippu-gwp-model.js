const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../../config");
const utilityIndex = require("../../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const gwpSchema = new Schema({
    gas:{type:String,require:true},
    gwp:{type:Number,require:true},
    reference:{type:String},
});
const databaseGWPSchema = new Schema({
    gwpData:[gwpSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseGWPModel = mongoose.model("database-ippu-gwp", databaseGWPSchema);
module.exports = databaseGWPModel;
