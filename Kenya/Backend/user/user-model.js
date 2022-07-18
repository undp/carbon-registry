const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configIndex = require('./../config');
const uniqueValidator = require('mongoose-unique-validator');
const userSchema = new Schema({
    role:{type:String, required:configIndex.message.F_ERROR_REQUIRED('role','userSchema'),enum: [configIndex.constants.ROLE_ADMIN,configIndex.constants.ROLE_NODAL,configIndex.constants.ROLE_USER]},
    // username: { type: String, unique: true,required: [true, configIndex.message.F_ERROR_REQUIRED('username','userSchema')] },
    menu:[{type: mongoose.Schema.Types.ObjectId, ref: 'menu'}], // holds the corresponding id of selected labels
    screenMenu:[{type:String}], // holds list of menu label selected
    email: { type: String,unique: true,required: [true, configIndex.message.F_ERROR_REQUIRED('email','userSchema')]},
    password: { type: String ,required: [true, configIndex.message.F_ERROR_REQUIRED('password','userSchema')]},
    firstName: { type: String, required: [true, configIndex.message.F_ERROR_REQUIRED('firstName','userSchema')] },
    lastName: { type: String},
    mobile: { type: String},
    avatar: { type: String},
    status:{type:String, enum:[configIndex.constants.STATUS_ACTIVE,configIndex.constants.STATUS_DISABLED,configIndex.constants.STATUS_PENDING],default:configIndex.constants.STATUS_PENDING},
    forgotPasswordOtp:{type:String},
    lastUpdated:{type:Date, default: Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},

    
});
userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;