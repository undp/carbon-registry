const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const message = require("../config");
const uniqueValidator = require("mongoose-unique-validator");
const mailSchema = new Schema({
    purpose:{type:String,require:true,unique:true},
    title:{type:String},
    content:{type:String},


});
mailSchema.plugin(uniqueValidator);

const mailModel = mongoose.model("mail", mailSchema);
module.exports = mailModel;
