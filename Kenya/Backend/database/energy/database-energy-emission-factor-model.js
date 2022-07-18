const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emissionFactorSchema = new Schema({
    fuelType:{type:String,require:true},
    fuel:{type:String,require:true},
    ncv:{type:Number},
    efCO2:{type:Number},
    efCH4:{type:Number},
    efN2O:{type:Number},
    reference:{type:String},
    
    
});
const databaseEmissionFactorSchema = new Schema({
    emissionFactor:[emissionFactorSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseEmissionFactorModel = mongoose.model("database-energy-emission-factor", databaseEmissionFactorSchema);
module.exports = databaseEmissionFactorModel;
