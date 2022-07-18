const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");
const ghgSectorMappingSchema = new Schema({
    sector:{type:String,require:configIndex.message.F_ERROR_REQUIRED("sector", "ghgSectorMappingSchema")},
    category:{type:String},
    subSector:{type:String},
    subCategory:{type:String},
    
});

const ghgSectorMappingModel = mongoose.model("ghg-sector", ghgSectorMappingSchema);
module.exports = ghgSectorMappingModel;