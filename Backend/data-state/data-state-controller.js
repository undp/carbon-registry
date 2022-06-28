var utilityIndex = require("./../utility");
var configIndex = require("./../config")
const sharedIndex = require("./../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const dataStateIndex = require(".");
const userIndex = require("./../user");
const menuIndex = require("./../menu");
const ndcIndex = require("./../ndc");
const config = require("./../config/config.json");

exports.saveDataState = async function saveDataState(payload) {
    try {
        var dataState = await dataStateIndex.dataStateModel(payload).save();
        return dataState;
    } catch (error) {
        throw error;
    }
}
exports.updateDataStateByDataId = async function saveDataState(dataId,payload) {
    try {
        var dataState = await dataStateIndex.dataStateModel.findOneAndUpdate({dataId:dataId},payload,{new:true})
        return dataState;
    } catch (error) {
        throw error;
    }
}
exports.updateDataStateStatus = async function(req,res,next) {
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"_id","status","approvedBy");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_UPDATE,"Data-state"),errorObj));
            return;
        }
        var approver = await userIndex.userController.getUserById(req.body.approvedBy);
        if(!approver){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_UPDATE,configIndex.message.PAGE_RECORD_APPROVE),configIndex.message.ERROR_USER_NOT_FOUND));
            return;
        }
        
        // check for valid data state record
        var prevRec = await dataStateIndex.dataStateModel.findById(req.body._id).exec();
        if(!prevRec) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_UPDATE,configIndex.message.PAGE_RECORD_APPROVE),configIndex.message.ERROR_RECORD_NOT_FOUND));
            return
        }
        //prevRec = utilityIndex.factory.removeProperty(prevRec,"_id","lastUpdate");
        var payload = {
            // existing data
            dataId:prevRec.dataId,
            entity:prevRec.entity,
            entityId:prevRec.entityId,
            entityUrl:prevRec.entityUrl,
            updatedBy:prevRec.updatedBy,
            // update data
            status: req.body.status,
            approvedBy:req.body.approvedBy,
            approverComment:req.body.approverComment || null
        }
    var dataState = await dataStateIndex.dataStateModel(payload).save();
        // update individual record
        /* if(state && req.body.dataId) {

            switch (state.entity) {
                case "Project":
                     query = {
                        _id: req.body.dataId
                    };
                     update = {
                        status: req.body.status
                    }
                    var ndcAction = await ndcIndex.ndcActionModel.findOneAndUpdate(query,update,{new:true});
                    break;
            
                default:
                    break;
            }
        } */
        // Need to trigger mail here
        // Step  Trigger mail to admin , nodal and created user
        // step 1 get list of admin users and get list of nodal user having access and send mail
        var menu = await menuIndex.menuModel.findOne({url:dataState.entityUrl}).exec(); // get the menu details
        var admins = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_ADMIN);
        var nodal = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_NODAL,menu._id);
        var reviewer = admins.concat(nodal);
        
        
        // step 2 getting email template
        var reviewerTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_DATA_STATE_RECORD_STATUS_CHANGED_FOR_REVIEWER});
        var userTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_DATA_STATE_RECORD_STATUS_CHANGED_FOR_USER});
        // STEP 3 - send multiple mails in loop for more than one reviewer
        for(var i in reviewer) {

            reviewerTemplate.content = reviewerTemplate.content.replace(/{{user}}/g, reviewer[i].firstName)
            .replace(/{{status}}/g, dataState.status)
            .replace(/{{entity}}/g, dataState.entity)
            .replace(/{{entityId}}/g, dataState.entityId)
            .replace(/{{ngBasePath}}/g, config[process.env.PROFILE].ngUIBasePath )
            .replace(/{{entityUrl}}/g, dataState.entityUrl+"/"+dataState.dataId);
    
            utilityIndex.emailUtility.sendByGmail([ reviewer[i].email],reviewerTemplate.title,reviewerTemplate.content);
        }
        // step 8 send mail to user
        var user = await userIndex.userController.getUserById(prevRec.updatedBy);// get the user details updated record
        userTemplate.content = userTemplate.content.replace(/{{user}}/g, user.firstName)
            .replace(/{{status}}/g, dataState.status)
            .replace(/{{approver}}/g, approver.firstName)
            .replace(/{{entity}}/g, dataState.entity)
            .replace(/{{entityId}}/g, dataState.entityId)
            .replace(/{{ngBasePath}}/g, config[process.env.PROFILE].ngUIBasePath )
            .replace(/{{entityUrl}}/g, dataState.entityUrl+"/"+dataState.dataId);
    
            utilityIndex.emailUtility.sendByGmail([user.email],userTemplate.title,userTemplate.content);




        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_UPDATE, configIndex.message.PAGE_RECORD_APPROVE),dataState);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_UPDATE,configIndex.message.PAGE_RECORD_APPROVE),error));
    }
}
exports.getDataStateByStatus = async function(req,res,next) {
    try {
        /* var errorObj = utilityIndex.factory.validationFactory(req.params,configIndex.constants.VALIDATE_NULL,"status");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Data-state"),errorObj));
            return;
        } */

        var pipeline = [
            {"$group":{_id:"$entityId", lastUpdate:{ $max : "$lastUpdate" }}} // group by entityId and find the last updated record of corresponding group
        ]
        var dataState = await dataStateIndex.dataStateModel.aggregate(pipeline).exec();
        // utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),dataState);
        // return;
        // loop in entityId and get record matching with status and latest one only
        var recArr = [];
        for(var i in dataState) {

            pipeline = [
                {"$match":{entityId:dataState[i]._id}},
                {"$match":{lastUpdate:dataState[i].lastUpdate}},
                {"$match":{status:{"$in":[configIndex.constants.STATUS_PENDING,configIndex.constants.STATUS_UPDATE]}}},
                {"$sort":{lastUpdate:-1}},
                {"$limit":1}
            ]
            var rec = await dataStateIndex.dataStateModel.aggregate(pipeline).lookup({from: 'users', localField: 'updatedBy', foreignField: '_id', as: 'updatedBy'}).exec();
            if(rec[0]) {
                // skip null value records in response
                recArr.push(rec[0]);
            }
        }
        // filter records based on access for nodal role
        if(req.user.role == configIndex.constants.ROLE_NODAL) {
            recArr = recArr.filter(rec=> {
                return req.user.screenMenu.indexOf(rec.menuLabel) != -1;
            })
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),recArr);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"data-state"),error));
    }
}
/*
* name - getNDCByStatusAndModule
* description - get ndc ids based on entity name and status
*/
exports.getNDCByStatusAndEntity = async function(req,res,next) {
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"status","entity");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Data-state"),errorObj));
            return;
        }

        var pipeline = [
            {"$group":{_id:"$entityId", lastUpdate:{ $max : "$lastUpdate" }}} // group by entityId and find the last updated record of corresponding group
        ]
        var dataState = await dataStateIndex.dataStateModel.aggregate(pipeline).exec();
        // utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),dataState);
        // return;
        // loop in entityId and get record matching with status and latest one only
        var recArr = [];
        for(var i in dataState) {
            switch (req.query.entity) {
                case configIndex.constants.NDC_PROJECT:
                    pipeline = [
                        {"$match":{entityId:dataState[i]._id}},
                        // {"$match":{lastUpdate:dataState[i].lastUpdate}},
                        {"$match":{entity:configIndex.constants.NDC_PROJECT}},
                        {"$match":{status:req.query.status}},
                        {"$sort":{lastUpdate:-1}},
                        {"$limit":1},
                        // { $group : { _id : "$_id" } }
                    ]
                    break;
                case configIndex.constants.MITIGATION_INPUT:
                    pipeline = [
                        {"$match":{entityId:dataState[i]._id}},
                        // {"$match":{lastUpdate:dataState[i].lastUpdate}},
                        {"$match":{entity:configIndex.constants.MITIGATION_INPUT}},
                        {"$match":{status:req.query.status}},
                        {"$sort":{lastUpdate:-1}},
                        {"$limit":1},
                        // { $group : { _id : "$_id" } }
                    ]
                    break;
                case configIndex.constants.FINANCE_INPUT:
                    pipeline = [
                        {"$match":{entityId:dataState[i]._id}},
                        // {"$match":{lastUpdate:dataState[i].lastUpdate}},
                        {"$match":{entity:configIndex.constants.FINANCE_INPUT}},
                        {"$match":{status:req.query.status}},
                        {"$sort":{lastUpdate:-1}},
                        {"$limit":1},
                        // { $group : { _id : "$_id" } }
                    ]
                    break;
                case configIndex.constants.SDG_INPUT:
                    pipeline = [
                        {"$match":{entityId:dataState[i]._id}},
                        // {"$match":{lastUpdate:dataState[i].lastUpdate}},
                        {"$match":{entity:configIndex.constants.SDG_INPUT}},
                        {"$match":{status:req.query.status}},
                        {"$sort":{lastUpdate:-1}},
                        {"$limit":1},
                        // { $group : { _id : "$_id" } }
                    ]
                    break;
                case configIndex.constants.ADAPTATION_INPUT:
                    pipeline = [
                        {"$match":{entityId:dataState[i]._id}},
                        // {"$match":{lastUpdate:dataState[i].lastUpdate}},
                        {"$match":{entity:configIndex.constants.ADAPTATION_INPUT}},
                        {"$match":{status:req.query.status}},
                        {"$sort":{lastUpdate:-1}},
                        {"$limit":1},
                        // { $group : { _id : "$_id" } }
                    ]
                    break;
            
                default:
                    // throw exception
                    return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"data-state"),configIndex.message.PAGE_INVALID_MODULE));
                    break;
            }
            
            var rec = await dataStateIndex.dataStateModel.aggregate(pipeline).lookup({from: 'users', localField: 'updatedBy', foreignField: '_id', as: 'updatedBy'}).exec();
            recArr = recArr.concat(rec);
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),recArr);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"data-state"),error));
    }
}

exports.getDataIdRecWithEntityIdGrpByStatusAndEntity = async (status,entity,projectId)=> {
    var pipeline = [
        {"$match":{status:status}},
        {"$match":{entity:entity}},
        {"$group":{_id:"$entityId", lastUpdate:{ $max : "$lastUpdate" }}} // group by entityId and find the last updated record of corresponding group
    ];
    var dataState = await dataStateIndex.dataStateModel.aggregate(pipeline).exec();
    if(!dataState.length) {
        return []; // return with blank []  as no record found
    }
    var ORConArr = [];
    for(var i in dataState) {
        // creating $and query from each record
        ORConArr.push ({ 
            $and : [ 
                    {"entityId" : dataState[i]._id},
                    {"lastUpdate" : dataState[i].lastUpdate},
                    {"entity":entity}
                ]
            })
    };
    var query = {
        "$or" : ORConArr
    }
    dataState = await dataStateIndex.dataStateModel.find(query).exec(); // filtered record after aggregate
    // get list of dataId in array
    var dataIds = [];
    dataState.forEach(state=> {
        dataIds.push(state.dataId);
    });
   
    // loop in entityId and get record matching with status and latest one only
    var query = { 
        _id: { $in: dataIds },

    }
    if(projectId && projectId != "") {
        query.projectId = projectId;
    }
    var recArr = await ndcIndex.ndcActionModel.find(query).sort({updateDate: -1}).exec();
    return recArr;
}
exports.getDataIdRecWithEntityIdGrpByStatusAndEntityWithinClosureDate = async (year,status,entity)=> {
    var pipeline = [
        {"$match":{status:status}},
        {"$match":{entity:entity}},
        {"$group":{_id:"$entityId", lastUpdate:{ $max : "$lastUpdate" }}} // group by entityId and find the last updated record of corresponding group
    ];
    var dataState = await dataStateIndex.dataStateModel.aggregate(pipeline).exec();
    var ORConArr = [];
    for(var i in dataState) {
        // creating $and query from each record
        ORConArr.push ({ 
            $and : [ 
                    {"entityId" : dataState[i]._id},
                    {"lastUpdate" : dataState[i].lastUpdate},
                    {"entity":entity}
                ]
            })
    };
    var query = {
        "$or" : ORConArr,
        

    }
    dataState = await dataStateIndex.dataStateModel.find(query).exec(); // filtered record after aggregate
    // get list of dataId in array
    var dataIds = [];
    dataState.forEach(state=> {
        dataIds.push(state.dataId);
    });
    //console.log(`closure start date:${year} \n closure end date: ${year+"-12-31"}`);
    var query = { 
        _id: { $in: dataIds },
        //"closureDate":{ "$lte": new Date(year) },
        "$and": [ { "closureDate":{ "$gte": new Date(year) } }, { "closureDate":{ "$lte": new Date(year+"-12-31") } } ]
        
    }
    // loop in entityId and get record matching with status and latest one only
    var recArr = await ndcIndex.ndcActionModel.find(query).sort({updateDate: -1}).exec();
    return recArr;
}