const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emissionFactorSchema = new Schema({
    category:{type:String,require:true},
    subCategory:{type:String,require:true},
    source:{type:String},
    efch4:{type:Number},
    efco2:{type:Number},
    efn2o:{type:Number},
    unit:{type:String},
    reference:{type:String},
    type:{type:String},
    
    
});
const databaseFugitiveEmissionSchema = new Schema({
    emissionFactor:[emissionFactorSchema],
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    
});

const databaseFugitiveEmissionModel = mongoose.model("database-energy-fugitive-emission", databaseFugitiveEmissionSchema);
module.exports = databaseFugitiveEmissionModel;
