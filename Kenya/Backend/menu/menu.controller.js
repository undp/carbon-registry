var menuIndex = require(".");
var userIndex = require("./../user");
var utilityIndex = require("./../utility");
var configIndex = require("./../config")
const sharedIndex = require("./../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuSeed = require("./../seeds/main-menu-seed.js");
const { child } = require("winston");
 
exports.processSeedMenu =  async function(req,res,next) {
    try {
        var count = 0;
        console.log("menuSeed  ",menuSeed);
    //    await insertMenu(menuSeed,count);
    // clean menu items
        await menuIndex.menuModel.remove({}).exec();
       /*  menuSeed.forEach(async (menu) => {
            await menuIndex.menuModel(menu).save();
        }); */
        await menuIndex.menuModel.insertMany(menuSeed);
        return utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.message.MENU_SEED));
    } catch (error) {
        console.error("Error in menu seed ",error);
        return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_SEED),error));
    }
}

insertMenu = async function(menuSeed,count) {
    
        if(menuSeed.length -1 < count) {
            return;
        }
        if(menuSeed[count].menuId == "Reports_GHGInventory_Gaswise") {

            console.log("Processing menu ",menuSeed[count].menuId);
        }
        if(count == 0) {
            await menuIndex.menuModel.find({}).remove(); // remove all existing record
            var menu = await menuIndex.menuModel(menuSeed[count]).save(); // not validating , considering ghg menu as first entry
            console.log("Inserted ",menu.menuId);
        }
        else{
            // get id of permissionMenuId and update the object
            var permissionMenuId = await menuIndex.menuModel.findOne({menuId:menuSeed[count].permissionMenuId}).select("_id").exec();
            if(permissionMenuId) {
                menuSeed[count].permissionMenuId =  permissionMenuId;
            }
            var menu = await menuIndex.menuModel(menuSeed[count]).save();
            // check for parent id and if present insert newly inserted id to parent menu children array
            if(menuSeed[count].parentMenuId) {
                var  parentMenu = await menuIndex.menuModel.findOne({menuId:menuSeed[count].parentMenuId}).exec();
                if(!parentMenu) {
                    console.log("Invalid parent menu given ",menuSeed[count].parentMenuId);
                    console.log("Delete inserted menu ",menu.label);
                    menu = await menuIndex.menuModel.findById(menu._id).remove();
                    return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_MENU_PARENT,"Rollback menu save",menu.label)));
                }
                else {
                    parentMenu.children.push(menu._id);
                    //unique(parentMenu.children)
                    await parentMenu.save();
                }
            }
            await validateSignUpMenu(menu);
        }
        await insertMenu(menuSeed,++count)
    
    
}
exports.addMenu = async function (req, res, next) {
    try{
        
        var menu = await menuIndex.menuModel(req.body).save();
        // check for parent id and if present insert newly inserted id to parent menu children array
        if(req.body.parentMenuId) {
            var  parentMenu = await menuIndex.menuModel.findOne({menuId:req.body.parentMenuId}).exec();
            if(!parentMenu) {
                console.log("Invalid parent menu given ",req.body.parentMenuId);
                console.log("Delete inserted menu ",menu.label);
                menu = await menuIndex.menuModel.findById(menu._id).remove();
                return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_MENU_PARENT,"Rollback menu save",menu.label)));
            }
            else {
                parentMenu.children.push(menu._id);
                //unique(parentMenu.children)
                await parentMenu.save();
            }
        }
        await validateSignUpMenu(menu);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'menu'),menu);
    }
    catch(error) {
        return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"menu"),error));
    }
}
async function validateSignUpMenu(menuPayload) {
    
    if(menuPayload.isPermissionType && !menuPayload.isMain) {
        // validate menu is immediate children of any mail menu
        var query = {
            children: menuPayload._id,
            isMain: true
        }
        var menu = await menuIndex.menuModel.find(query).exec();
        if(!menu.length) {
            throw utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_NOT_IMMEDIATE_CHILD));
        }
    }
}
exports.updateMenu = async function (req, res, next) {
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"_id");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_UPDATE,"menu"),errorObj));
            return;
        }
        await validateSignUpMenu(req.body);
        // update data
        var menu = await menuIndex.menuModel.findOneAndUpdate({_id:req.body._id},req.body,{new:true});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_UPDATE, 'menu'),menu);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"menu"),error));
    }
}
exports.getAllMenu = async function (req, res, next) {
    try{
        var query = {
            // to be used to apply filter
        }
        var menu = await menuIndex.menuModel.find(query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),menu);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getParentMenu = async function (req, res, next) {
    try{
        // validate user
        var response = [];
        var errorObj = utilityIndex.factory.validationFactory(req.params,configIndex.constants.VALIDATE_NULL,"userId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_LIST),errorObj));
            return;
        }
        var user = await userIndex.userModel.findById(req.params.userId).exec();
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        var query = {
            isMain:true,
            isActive:true
        }
        var mainMenuList = await menuIndex.menuModel.find(query);
        // find nested menu from main menu
        var count = 0;
        // addMainMenu(mainMenuList,user,response,count);
        for(var i in mainMenuList) {
            if(user.role == configIndex.constants.ROLE_ADMIN) {
                    response.push(mainMenuList[i]);
            }
            else {
                // for other user
                if(user.menu.indexOf(mainMenuList[i]._id) != -1) {
                    response.push(mainMenuList[i]);
                }
            }
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),response);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getChildList = async function (req, res, next) {
    try{
        // validate user
        var response = [];
        var errorObj = utilityIndex.factory.validationFactory(req.params,configIndex.constants.VALIDATE_NULL,"userId","menuId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_LIST),errorObj));
            return;
        }
        var user = await userIndex.userModel.findById(req.params.userId).exec();
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        var menu = await menuIndex.menuModel.findById(req.params.menuId).populate("children").exec();
        if(!menu) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_MENU)));
        }
        // filter children as per user menu permission
        var allowedChildren = [];
        if(user.role == configIndex.constants.ROLE_ADMIN) {
            allowedChildren = menu.children;
        }
        else {

            allowedChildren = menu.children.filter((child=> {
                if(child.isPermissionType && user.menu.indexOf(child._id) != -1)
                    return child;
                else
                    return child; // return nested child other than isPermissionType
            }))
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),allowedChildren);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
/* exports.getMenuHierarchy = async function (req, res, next) {
    try{
        // validate user
        var response = [];
        var errorObj = utilityIndex.factory.validationFactory(req.params,configIndex.constants.VALIDATE_NULL,"userId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_LIST),errorObj));
            return;
        }
        var user = await userIndex.userModel.findById(req.params.userId).exec();
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.ERROR_USER_NOT_FOUND)));
        }
        var query = {
            isMain:true,
            isActive:true
        }
        var mainMenuList = await menuIndex.menuModel.find(query);
        // find nested menu from main menu
        var count = 0;
        addMainMenu(mainMenuList,user,response,count);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),response);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
function addMainMenu(mainMenuList,user,response,count) {
    if(count > mainMenuList.length -1 ) {
        return;
    }
    var menu = mainMenuList[count];
    if(user.role == configIndex.constants.ROLE_ADMIN) {
            // find children
            if(menu.children.length > 0) {
                addChildMenu(user,menu.children,0,menu.children.length);
            }
            response.push(menu);
    }
    else {
        // for other user
        if(user.menu.indexOf(menu._id) != -1) {
            response.push(menu);
        }
    }
    addMainMenu(++count,mainMenuList,user,response);
}
async function addChildMenu(user,childMenuList,startCount,endCount) {
    if(startCount > endCount -1 ) {
        return;
    }
    if(user.role == configIndex.constants.ROLE_ADMIN) {
        var query = {"_id" : { $in : childMenuList}}
        childMenuList = await menuIndex.menuModel.find(query);
    }
    else {
        // for other user
    }
} */
exports.getMenuGroup = async function (req, res, next) {
    try{
        var response = {};
        var groups = await menuIndex.menuModel.find().distinct("group");
        for(var i in groups) {
            
            var query = {
                group: groups[i],
                isPermissionType: true
            }
            var menuList = await menuIndex.menuModel.find(query);
            response[groups[i]] = menuList;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),response);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getRemainingMenuList = async function (req, res, next) {
    try{
        var response = {};
        var children = await menuIndex.menuModel.find({}).distinct("children"); // get list of children menu id
        // console.log("children",children);
        var query = {
            isMain:false,
            isActive:true,
            _id:{"$nin":children}
        }
        var menu = await menuIndex.menuModel.find(query).exec(); // get list of children menu id
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),menu);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
/* exports.getParentMenuList = async function (req, res, next) {
    try{
        // validate group
      
        var group = await menuIndex.menuModel.find({parent:null});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),group);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getParentMenuList = async function (req, res, next) {
    try{
        // validate group
      
        var group = await menuIndex.menuModel.find({parent:null});
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),group);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getMenuListByGroup = async function (req, res, next) {
    try{
        // validate group
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"group");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_LIST),errorObj));
            return;
        }
        var query = {
            group: req.query.group,
            isActive:true,
            isPermissionType:true
        }
        var menu = await menuIndex.menuModel.find(query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),menu);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
}
exports.getChildMenuList = async function (req, res, next) {
    try{
        // validate group
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"parent");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.MENU_LIST),errorObj));
            return;
        }
        var query = {
            parent:req.query.parent
        }
        // validate parent menu
        var parent = await menuIndex.menuModel.findOne({label:req.query.parent}).exec();
        if(!parent)
        {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.message.INVALID_MENU_PARENT),errorObj));
            return; 
        }
        var menu = await menuIndex.menuModel.find(query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'menu'),menu);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"menu"),error));
    }
} */
exports.isExistMenu = async function(menuId) {
    var menu = await menuIndex.menuModel.findById(menuId);
    return !menu ? false: true;
}
exports.getByMenuId = async function(menuId) {
    console.log({menuId:menuId});
    var menu = await menuIndex.menuModel.findOne({menuId:menuId});
    return menu;
}