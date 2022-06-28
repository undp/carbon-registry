const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configIndex = require('./../config');
const uniqueValidator = require('mongoose-unique-validator');
const pluginSchema = new Schema({
    clientId: { type: String,require:true,unique:true},
    clientSecret: { type: String,require:true},
    domain: { type: String,require:true},
    status:{type:String, default:"pending"},
    certIssued: {type:Date},
    certExpired: {type:Date},
    lastUpdated:{type:Date, default: Date.now},

    
});
pluginSchema.plugin(uniqueValidator);

const pluginModel = mongoose.model('plugin', pluginSchema);
module.exports = pluginModel;