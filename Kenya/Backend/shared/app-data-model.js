const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const message = require("../config");
const appDataSchema = new Schema({
    element:{type:String},
    key:{type:String},
    label:{type:String},
    value:{type:String},
    inventoryYears:[{type:String}],// being used for ghg config for inventory years
    details:{type: mongoose.Mixed},
    // For file upload
    menuId:{type:String},
    projectId:{type:String},
    fieldName:{type:String},
    inventoryYear:{type:Number},

    dataId:{type:String}, // record id


    section:{type:String},// sdg section
    subSection:{type:String},// sdg section
    subSection2:{type:String},// sdg section
    filePath:{type:String},
    updateDate:{type:Date,default:Date.now},
});

const appDataModel = mongoose.model("app-data", appDataSchema);
module.exports = appDataModel;
