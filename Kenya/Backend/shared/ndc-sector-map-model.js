const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const message = require("../config");
const uniqueValidator = require("mongoose-unique-validator");
const ndcSectorSchema = new Schema({
    sector:{type:String},
    subSector:{type:String},
    code:{type:String},
    type:{type:String,require:true},


});

const ndcSectorModel = mongoose.model("ndc-sector", ndcSectorSchema);
module.exports = ndcSectorModel;
