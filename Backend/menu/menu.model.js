const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
const uniqueValidator = require("mongoose-unique-validator");
const menuSchema = new Schema({
  
  menuId: {
    type: String,
    unique: true,
    required: [true, configIndex.message.F_ERROR_REQUIRED("menuId", "menuSchema")],
  },
  label: {
    type: String,
    required: [true, configIndex.message.F_ERROR_REQUIRED("label", "menuSchema")],
  },
  url: {
    type: String,
    unique: true,
    required: [true, configIndex.message.F_ERROR_REQUIRED("url", "menuSchema")],
  },
  icon: {
    type: String,
  },
  entity:{type:String}, // to be used as input for data-states
 
});
menuSchema.plugin(uniqueValidator);

/* menuSchema.pre('save', function(next) {
  var newDoc = this;
  
  if(newDoc.parent != null && newDoc.parent != "") {
    menuModel.findOne({label:newDoc.parent}).exec()
    .then((menu)=>{
      if(menu == null){
        return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CAUSE(configIndex.message.INVALID_MENU_PARENT)));
      }
      else{
        console.log("before save",newDoc);
        next();
      }
    })
    .catch((error)=>{
      return next(error)
    })
  }
  else{
    next();
  }
  
}); */
const menuModel = mongoose.model("menu", menuSchema);
module.exports = menuModel;
