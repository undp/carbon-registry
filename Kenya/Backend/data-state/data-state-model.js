const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
const uniqueValidator = require("mongoose-unique-validator");
const dataStateSchema = new Schema({

  menuLabel:{type:String},
  dataId:{type: mongoose.Schema.Types.ObjectId,required:true},
  entity:{type: String,required:true},
  entityId:{type: String,required:true},
  entityUrl:{type: String,required:true},// pattern /<angular-route>/#recordId(to be added in backend)
  status:{type:String,required:true ,default:configIndex.constants.STATUS_PENDING,enum:[configIndex.constants.STATUS_PENDING,configIndex.constants.STATUS_UPDATE,configIndex.constants.STATUS_APPROVED, configIndex.constants.STATUS_REJECTED]},
  updatedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
  approvedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  approverComment:{type: String},
  lastUpdate:{type: Date, default:Date.now},
});

const dataStateModel = mongoose.model("data-state", dataStateSchema);
module.exports = dataStateModel;
