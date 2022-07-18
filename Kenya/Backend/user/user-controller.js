const userIndex = require(".");
const configIndex = require("./../config");
const utilityIndex = require("./../utility");
const menuIndex = require("./../menu");
const sharedIndex = require("./../shared");
const statusCodes = require('http-status-codes').StatusCodes;
var jwt = require('jsonwebtoken');


/************************************************************ */
////////////// shared code starts///////////////////////////////
/************************************************************ */
exports.getUserById = async function(userId) {
    var user = await userIndex.userModel.findById(userId).exec();
    return user;
}
/************************************************************ */
////////////// shared code ends///////////////////////////////
/************************************************************ */

// user
exports.addUser = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"email","password");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.LOGIN),errorObj));
            return;
        }
        // add parent menu from child menu added in sign UP page if any
        if(req.body.menu && req.body.menu.length > 0) {
            var parentMenuIdList = await getMainMenuListFromChildList(req.body.menu);
            req.body.menu = req.body.menu.concat(parentMenuIdList);
        }
        // hash password
        req.body.password = await utilityIndex.encryption.encrypt(req.body.password);
        req.body.status = configIndex.constants.STATUS_PENDING; // overriding status in case given in request
        var user = await userIndex.userModel(req.body).save();
        // sending mail to user
        // step 1 - getting the mail template for user sign up
        var userSignUpTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_USER_SIGNUP});
        // STEP 2 - update values of place holder
        userSignUpTemplate.content = userSignUpTemplate.content.replace(/{{user}}/g, user.firstName)
        .replace(/{{role}}/g, user.role);
        
        // STEP 3 get list of admin emails
        var admins = await userIndex.userModel.find({role:configIndex.constants.ROLE_ADMIN});
        var adminMails = [];
        for(var i in admins){
            adminMails.push(admins[i].email) ;
        }
        // step 5 getting the admin sign up template
        var adminSignUpTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_ADMIN_SIGNUP});
        // STEP 6 - update values of place holder
        adminSignUpTemplate.content = adminSignUpTemplate.content.replace(/{{user}}/g, user.firstName)
        .replace(/{{role}}/g, user.role);

        // step 7 send mail to user
        utilityIndex.emailUtility.sendByGmail([user.email],userSignUpTemplate.title,userSignUpTemplate.content);
        // step 8 send mail to user
        utilityIndex.emailUtility.sendByGmail(adminMails,adminSignUpTemplate.title,adminSignUpTemplate.content);

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'user'),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"user"),error));
    }
}
async function getMainMenuListFromChildList(childMenuList) {
    var query = {
        children: {"$in": childMenuList},
        isMain: true,
        isActive:true
    }
    var mainMenuIds = await menuIndex.menuModel.find(query).distinct("_id").exec();
    return mainMenuIds
}
exports.sendForgotPasswordOtp = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"email");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.FORGOT_PASSWORD_OTP),errorObj));
            return;
        }
        // STEP 1 - get user based on the email
        var user = await userIndex.userModel.findOne({email:req.body.email});
        if(!user){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.EMAIL_NOT_VALID)));
        }
        // STEP 2 generate otp of 4 digit
        var otp = Math.floor(1000 + Math.random() * 9000);
        // STEP 3 - save the otp to the user record
        user = await userIndex.userModel.findByIdAndUpdate(user._id,{forgotPasswordOtp:otp},{new:true});
        // STEP 4 - get the forgot password otp template
        var forgotPasswordTemplateOtp = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.FORGOT_PASSWORD_OTP});
        forgotPasswordTemplateOtp.content = forgotPasswordTemplateOtp.content.replace(/{{user}}/g, user.firstName)
        .replace(/{{otp}}/g, otp);
        
        // STEP 5 send mail
        utilityIndex.emailUtility.sendByGmail([user.email],forgotPasswordTemplateOtp.title,forgotPasswordTemplateOtp.content);

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.message.FORGOT_PASSWORD_OTP_SUCCESS),{userId:user._id,email:user.email});
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"user"),error));
    }
}
/* exports.sendForgotPasswordOtpVerify = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"otp","userId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_OTP),errorObj));
            return;
        }
        // STEP 1 - get user based on the otp
        var user = await userIndex.userModel.findById(req.body.userId);
        if(!user){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        if(user.forgotPasswordOtp != req.body.otp){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_OTP))); 
        }
        user.forgotPasswordOtp = null;
        user = await user.save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.message.FORGOT_PASSWORD_OTP_VALID),{userId:user._id});
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_FORGOT_PASSWORD),error));
    }
} */
exports.resetPassword = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"otp","password","userId","confirmPassword");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_OTP),errorObj));
            return;
        }
        // STEP 1 - get user based on the otp
        var user = await userIndex.userModel.findById(req.body.userId);
        if(!user){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        if(user.forgotPasswordOtp != req.body.otp){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_OTP))); 
        }
        user.forgotPasswordOtp = null;
        // STEP 2 - validate both password and confirm password string
        
        if(req.body.password != req.body.confirmPassword){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.PASSWORD_RESET,configIndex.message.PASSWORD_NOT_MATCH)));
        }
        
        // STEP 2 create hash password and save to user
        user.password = await utilityIndex.encryption.encrypt(req.body.password);
        user = await user.save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.message.PASSWORD_RESET),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_FORGOT_PASSWORD),error));
    }
}
exports.updatePassword = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"password","userId","confirmPassword");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.PASSWORD_UPDATE),errorObj));
            return;
        }
        // STEP 1 - get user based userId
        var user = await userIndex.userModel.findById(req.body.userId);
        if(!user){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        // STEP 2 - validate both password and confirm password string
        
        if(req.body.password != req.body.confirmPassword){
            return next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.PASSWORD_RESET,configIndex.message.PASSWORD_NOT_MATCH)));
        }
        
        // STEP 2 create hash password and save to user
        user.password = await utilityIndex.encryption.encrypt(req.body.password);
        user = await user.save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.message.PASSWORD_UPDATE),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.PASSWORD_UPDATE),error));
    }
}
exports.updateUser = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"_id");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_UPDATE,"user"),errorObj));
            return;
        }
        // add parent menu from child menu added in sign UP page if any
        if(req.body.menu && req.body.menu.length > 0) {
            var parentMenuIdList = await getMainMenuListFromChildList(req.body.menu);
            req.body.menu = req.body.menu.concat(parentMenuIdList);
        }
        // update data
        var user = await userIndex.userModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_UPDATE, 'user'),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"user"),error));
    }
}
exports.updateUserStatus = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"status","_id");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_UPDATE,"user"),errorObj));
            return;
        }
        // update data
        var user = await userIndex.userModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true});
        // sending mail to user to account update status
        var purpose = req.body.status == configIndex.constants.STATUS_ACTIVE ? configIndex.constants.MAIL_USER_APPROVED: configIndex.constants.MAIL_USER_REJECTED;
        var userStatusChangeTemplate = await sharedIndex.mailModel.findOne({purpose:purpose});
        // STEP 2 - update values of place holder
        userStatusChangeTemplate.content = userStatusChangeTemplate.content.replace(/{{user}}/g, user.firstName)
        .replace(/{{status}}/g, user.status);
        utilityIndex.emailUtility.sendByGmail([user.email],userStatusChangeTemplate.title,userStatusChangeTemplate.content);

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_UPDATE, 'user'),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"user"),error));
    }
}
exports.getUser = async function (req, res, next) {
    try{
        var query = {
            // to be used to apply filter
        }
        var user = await userIndex.userModel.find(query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"user"),error));
    }
}
exports.getUserByStatus = async function (req, res, next) {
    try{
        var query = {
            status:req.params.status
        }
        var user = await userIndex.userModel.find(query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),user);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"user"),error));
    }
}

exports.login = async function(req, res, next){

    try {
        console.log("Login : ",req.user); // set from passport
        // user status should be active
        if(req.user.status != configIndex.constants.STATUS_ACTIVE) {
            return next(utilityIndex.factory.errorFactory(statusCodes.FORBIDDEN,configIndex.message.F_ERROR_PROCESS("Login"),configIndex.message.FORBIDDEN_USER));
        }
        // create token
        var userTokenConfig = utilityIndex.factory.getUserTokenConfig(process.env.PROFILE);
        var token = await jwt.sign(req.user.toJSON(), userTokenConfig.secret, { expiresIn: userTokenConfig.expiry });
        var userDetails = Object.assign(req.user._doc,{token:token});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS("Login"),userDetails );

    } catch (error) {
        return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS("Login"),error));
    }

}
exports.getActiveUsersByRoleAndPermission = async function(role,permissionMenuId) {
    try {
       var query = {
        status: configIndex.constants.STATUS_ACTIVE,
       } 
       if(role == configIndex.constants.ROLE_ADMIN) {
        query["role"] = role;
       } else { // nodal
            query["role"] = role;
            //query["menu"] = {"$in":[permissionMenuId]}; // removed permsission menuId as with new implementation it may not required
       }
       var users = await userIndex.userModel.find(query).exec();
       return users;
    } catch (error) {
        throw error;
    }
}
