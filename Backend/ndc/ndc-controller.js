var utilityIndex = require("./../utility");
var configIndex = require("./../config")
var ndcIndex = require("./index");
const sharedIndex = require("./../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("./../menu");
const dataStateIndex = require("./../data-state");
const userIndex = require("./../user")
const config = require("./../config/config.json");
const MitigationReportOutput = require("./report/mitigation-report-output");
const MitigationOutput = require("./report/mitigationOutput");
const FinanceReportOutput = require("./report/finance-report-output");
const FinanceOutput = require("./report/finance-output");
const SDGReportOutput = require("./report/sdg/sdg-report-output");
const SDGOutput = require("./report/sdg/sdg-output");
const SDGOutputCount = require("./report/sdg/sdg-output-count");
const AdaptationReportOutput = require("./report/adaptation/adaptation-report-output");
const AdaptationOutputCount = require("./report/adaptation/adaptation-output-count");
const AdaptationOutput = require("./report/adaptation/adaptation-output");
const MrvReportOutput = require("./report/mrv/mrv-report-output");
const MrvOutput = require("./report/mrv/mrv-output");
var _ = require('lodash');


exports.saveNDC = async (req,res,next)=> {
    try {
        var record;
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"menuId","updatedBy");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
            return;
        }
        // Step 1 - validate permission menu id , permission menu, user
        /* var permissionMenu = await menuIndex.menuController.isExistMenu(req.body.menuId); // this is a exception where menuId === permissionMenuId
        if(!permissionMenu && !permissionMenu.isPermissionType) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,"Invalid permissionMenuId"))); 
            return;
        } */
        var menu = await menuIndex.menuController.getByMenuId(req.body.menuId);
        if(!menu) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,"Invalid MenuId"))); 
            return;
        }
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.ERROR_USER_NOT_FOUND))); 
            return;
        }
        // Step-2 create  required back end data set up like project code
        if(menu.menuId == "NDC_Actions") {
            req.body.projectId = await createProjectData(req,req.body);
        }
        // step 3 always create new record, set status = update if existing record
        req.body.status = req.body.status || configIndex.constants.STATUS_PENDING;
        //delete req.body["_id"];
        await validateRequestData(menu,req.body); // populate request payload based on menu
        // check for new record or update
        if( req.body.status == "update") {
            // delete req.body["_id"]; // delete _id = "" from form submit
            record = await ndcIndex.ndcActionModel.findByIdAndUpdate(req.body["_id"],req.body,{new:true} ).exec();
        } else {
            delete req.body["_id"];
            record = await ndcIndex.ndcActionModel(req.body).save();
        }
        var dataState;
        // update data state for ndc update
        if(record && req.body.status == "update") {
            var dataStatePayload = {
                // dataId: record._id,
                menuLabel: menu.label,
                status: req.body.status,
                entity:menu.entity,
                entityUrl:menu.url,
                entityId: record.projectId,
                updatedBy:record.updatedBy,
                lastUpdate: new Date()
            }
            // step -4 save data-state
            dataState = await dataStateIndex.dataStateController.updateDataStateByDataId(record._id,dataStatePayload);
        } else {

            // step -3 prepare payload of data-state
            var dataStatePayload = {
                menuLabel: menu.label,
                dataId: record._id,
                status: req.body.status,
                entity:menu.entity,
                entityUrl:menu.url,
                entityId: record.projectId,
                updatedBy:record.updatedBy
            }
            // step -4 save data-state
            dataState = await dataStateIndex.dataStateController.saveDataState(dataStatePayload);
        }

        // Step 5 Trigger mail to admin , nodal and created user
        // step 5.1 get list of admin users and get list of nodal user having access and send mail
        var admins = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_ADMIN);
        var nodal = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_NODAL,menu._id);// this is a exception where menuId and permission menu id is same
        var reviewer = admins.concat(nodal);
        
        
        // step 6 getting email template
        var reviewerTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_DATA_STATE_NEW_RECORD_REVIEWER});
        var userTemplate = await sharedIndex.mailModel.findOne({purpose:configIndex.constants.MAIL_DATA_STATE_NEW_RECORD_USER});
        // STEP 7 - send multiple mails in loop for more than one reviewer
        for(var i in reviewer) {

            reviewerTemplate.content = reviewerTemplate.content.replace(/{{user}}/g, reviewer[i].firstName)
            .replace(/{{entity}}/g, dataState.entity)
            .replace(/{{entityId}}/g, dataState.entityId)
            .replace(/{{ngBasePath}}/g, config[process.env.PROFILE].ngUIBasePath )
            .replace(/{{entityUrl}}/g, dataState.entityUrl+"/"+dataState.dataId+"/"+dataState._id ) // adding data state id for email link
    
            utilityIndex.emailUtility.sendByGmail([ reviewer[i].email],reviewerTemplate.title,reviewerTemplate.content);
        }
        // step 8 send mail to user
        userTemplate.content = userTemplate.content.replace(/{{user}}/g, user.firstName)
            .replace(/{{entity}}/g, dataState.entity)
    
            utilityIndex.emailUtility.sendByGmail([user.email],userTemplate.title,userTemplate.content);

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_ENERGY_REFERENCE_APPROACH),error));
        return;
   }
}
validateRequestData = async (menu,payload) => {
    payload.entity = menu.entity;
    // adding common validation for all modules
    if(menu.menuId != "NDC_Actions") {
        var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
            return;
        }
        // validate parentProject
        var parentProject = await ndcIndex.ndcActionModel.findById(payload.parentProject).exec();
        if(!parentProject) {
            throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,"Invalid parentProject id")));
            return;  
        }
    }
    // adding individual validation
    switch(menu.menuId) {
        case "Mitigation_Actions_ProjectInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject",
            "ghgReduction","contributions",
            "projectStatus","beneficiary","genderIncl","projectOutput","projectImpact","marketMech");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
            errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_EMPTY_ARRAY,"targetGhg");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.CRUD_SAVE),errorObj));
                return;
            }
        break;
        case "Mitigation_Actions_MonitoringInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject",
            "monitoringYear","actualGHGSavings");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
            
        break;  
        case "Adaptation_Actions_ProjectInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
            errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_EMPTY_ARRAY,
                "ndpObjectiveCoverage","ndpCoverage");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.CRUD_SAVE),errorObj));
                return;
            }
        break;  
        case "Adaptation_Actions_MonitoringInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject","monitoringYear");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
        break ; 
        case "Climate_Finance_ProjectInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject",
            "financialYear","appliedExchange",
            "financingMode","projectSize","costAmount","nationalBudget","subNationalBudget",
            "greenBonds");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
            errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_EMPTY_ARRAY,
                "sourceOfFinance","detailBudget","disbursementSchedule");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.CRUD_SAVE),errorObj));
                return;
            }
        break;   
        case "Climate_Finance_MonitoringInformation":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,"parentProject",
            "monitoringYear","disbursementDetail");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
            break;   
        case "NDC_Actions":
            var errorObj = utilityIndex.factory.validationFactory(payload,configIndex.constants.VALIDATE_NULL,
             "division","sector", "commissioningDate","approvalDate","closureDate");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_NDC_CREATE),errorObj));
                return;
            }
        break;  
    }
    
    
}
createProjectData = async (req,payload)=> {
    // get the latest project code for the new record but for update skip this part
    if(!payload._id) {

        var pipeline = [
            { "$sort" : { updateDate : -1 } },
            {$limit:1}// find the latest record only
        ]
        var latestNDC = await ndcIndex.ndcActionModel.aggregate(pipeline).exec();
        if(latestNDC.length) {
            payload.projectCode =  parseInt(latestNDC[0].projectCode) + 1;
        }
        else {
            payload.projectCode = 0;
        }
    }
    var projectId = "";
    var projectCodeStr = payload.projectCode.toString();
    
    
    var causeCode = "01"; // hardcoded cause code as from ui its not passed for now
    var divisionCode = "0";
    var areaCode = "0";
    var sectorCode = "00";
    
    causeCode = "01";
    /* if(payload.cause === "Climate Change") {
        causeCode = "01";
        
    }else if(payload.cause === "Sustainable Development") {
        causeCode = "02";
    } */
    switch (payload.division) {
        case "Adaptation":
            divisionCode = "1";
            /* var url = configIndex.constants.API_NDC_SECTOR_MAPPING+`?outputValue=subSector&type=${payload.division}&sector=${payload.sector}`;
            var ndcSectorMappingRes =  await utilityIndex.restCallUtility.getCall(req,url)
            ndcSectorMappingRes = ndcSectorMappingRes.data.data;
            sectorCode = ndcSectorMappingRes[0].code; */
            break;
        case "Mitigation":
            divisionCode = "2";
            /* var url = configIndex.constants.API_NDC_SECTOR_MAPPING+`?outputValue=subSector&type=${payload.division}&sector=${payload.sector}`;
            var ndcSectorMappingRes =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            ndcSectorMappingRes = ndcSectorMappingRes.data.data; // extracting data
            sectorCode = ndcSectorMappingRes[0].code; */
            break;
        case "Cross-cutting":
            divisionCode = "3";
            break;
        case "Enablers":
            divisionCode = "4";
            break;
        default:
            divisionCode = "NA" // default
            break;
    }
    switch (payload.area) {
        case "Principle":
            areaCode = "1";
            break;
        case "Significant":
            areaCode = "2";
            break;
    }
    
    projectId = configIndex.constants.NDC_PREFIX + "-" + causeCode + divisionCode + areaCode + "-" + /*sectorCode + "-" */ + projectCodeStr; // removed sector code from projectId for multiple sector/subsectors
    projectId = projectId + "|" + payload.projectTitle;
    return projectId;
}

/* 
* used to get records with pending and update status with grouping by entity with latest record
  */
exports.getNDC = async (req,res,next)=> {
    try {
        
        if(req.query && req.query._id) {
            var rec = await ndcIndex.ndcActionModel.findById(req.query._id).deepPopulate("parentProject.parentProject").exec();
            return utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),rec);
        }
        else if(req.query && req.query.entity && req.query.parentProject) {
            // check for existing parent project with all status
            var query = {
                entity: req.query.entity,
                parentProject: req.query.parentProject,
            };
            // check for individual form validation
            if(req.query.monitoringYear && (req.query.entity == "FINANCE MONITORING" 
            || req.query.entity == "MITIGATION MONITORING" 
            || req.query.entity == "ADAPTATION MONITORING" || req.query.entity == "SDG MONITORING" )) {
                query["monitoringYear"] = parseInt(req.query.monitoringYear)
            } 
            var rec = await ndcIndex.ndcActionModel.findOne(query).sort({updateDate: -1}).populate("parentProject").exec();
            return utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'ndc-data'),rec);
        }
        else {
            // used for ndc project listing
            var pipeline = [
                {"$match":{entity:"Project"}},
                {"$match":{status:{"$ne":configIndex.constants.STATUS_DISABLED}}},
                {"$group":{_id:"$entityId", lastUpdate:{ $max : "$lastUpdate" }}}, // group by entityId and find the last updated record of corresponding group

            ]
            var dataState = await dataStateIndex.dataStateModel.aggregate(pipeline).exec();
            // utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),dataState);
            // return;

            // check for the exact record of the data states based on aggregated results, as with aggregate _id not fetching
            var ORConArr = [];
            for(var i in dataState) {
                // creating $and query from each record
                ORConArr.push ({ 
                    $and : [ 
                            {"entityId" : dataState[i]._id},
                            {"lastUpdate" : dataState[i].lastUpdate},
                            {"entity":"Project"}
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
            var recArr = await ndcIndex.ndcActionModel.find({ _id: { $in: dataIds } }).exec();
            /* for(var i in dataState) {
    
                pipeline = [
                    {"$match":{projectId:dataState[i]._id}},
                    // {"$match":{updateDate:dataState[i].updateDate}},
                    // {"$match":{entity:"Project"}},
                    // {"$match":{status: {"$in":[configIndex.constants.STATUS_PENDING,configIndex.constants.STATUS_UPDATE]}}},
                    {"$sort":{updateDate:-1}},
                    {"$limit":1}
                ]
                var rec = await ndcIndex.ndcActionModel.aggregate(pipeline).lookup({from: 'users', localField: 'updatedBy', foreignField: '_id', as: 'updatedBy'}).exec();
                if(rec[0]) {
                    // skip null value records in response
                    recArr.push(rec[0]);
                }
                // recArr = rec;
            } */
            utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'data-state'),recArr);
        }
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"data-state"),error));
    }
}

exports.deleteNDC = async (req,res,next)=> {
    try {
        if(req.params && req.params.id) {
            var rec = await ndcIndex.ndcActionModel.findByIdAndRemove(req.params.id).exec();
            if(rec) {
                utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_DELETE, 'NDC'),rec);
            }
            else {
                next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_DELETE,"Invalid NDC id")));
            }
        }
    } catch (error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_DELETE,"NDC"),error));
    }
}
/* 
* getNDCReport - A generic method being called for all the NDC related reports
* query params - (required) - reportType
*/
exports.getNDCReport = async (req,res,next)=> {
    var response = null;
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"menuId");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REPORT_ERROR),errorObj));
            return;
        }
        // validate report request based on menuId
        validateReportRequest(req.query);
        response = await processReport(req.query);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET),response);
    } catch (error) {
        console.log("Error: getNDCReport", error);
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_DELETE,"NDC"),error));
    }
}
processReport = async (query) => {
    var response = null;
    switch(query.menuId) {
        case "Reports_MitigationTracking":
            response = await processMitigationTracking(query);
        break;
        case "Reports_FinanceTracking":
            response = await processFinanceTracking(query);
        break;
        case "Reports_AdaptationTracking":
            response = await processAdaptationTracking(query);
        break;
        case "Reports_SDGTracking":
            response = await processSDGTracking(query);
        break;
        case "Reports_MRVTracking":
            response = await processMrvTracking(query.projectId);
        break;
    }
    return response;
} 
processMrvTracking = async (projectId)=> {
    
    var mrvReportOutput = new MrvReportOutput();
    var mrvOutput = new MrvOutput();
    //status = approved and entity = 'PROJECT', grp by entityId , get the latest project
    var projects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.NDC_PROJECT,projectId);
    var project = projects.length ? projects[0] : null;// get the latest project
    if(!project) {
        console.log("No project found for MRV report");
    }
    var totalGHGReduction = 0.0;
    
    // mitigation input
    var mitigationProjects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.MITIGATION_INPUT);
    // filter MI with parent project id
    mitigationProjects.filter(mi=> {
        return (mi.parentProject.toString() == project._id.toString());
    })
    var mitigationProject = mitigationProjects.length ? mitigationProjects[0] : null ;// get the latest project
    if(mitigationProject) {
        var mitigationMonitoringAllList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.MITIGATION_MONITORING);
        // filter monitoring list from the mitigation input
        var mitigationMonitoringList = mitigationMonitoringAllList.filter(mm=> {
            return (mm.parentProject.toString() == mitigationProject._id.toString())
        });
        var mitigationMonitoringIndicatorMap = new Map();
        var actualGhgReductionMap = new Map();
        
        mitigationMonitoringList.forEach(mm=> {
            mitigationMonitoringIndicatorMap.set(mm.monitoringYear,mm.performanceIndicatorMI);
            actualGhgReductionMap.set(mm.monitoringYear,mm.actualGHGSavings);
            totalGHGReduction = totalGHGReduction + mm.actualGHGSavings;
        })
        mrvOutput.project = (project);
        mrvOutput.mitigationInputIndicatorMap = mitigationProject.performanceIndicatorMI;
        mrvOutput.mitigationMonitoringIndicatorMap = utilityIndex.factory.mapToObj(mitigationMonitoringIndicatorMap);
        
        mrvOutput.expectedGhgReduction = (mitigationProject.ghgReduction);
        mrvOutput.actualGhgReductionMap = utilityIndex.factory.mapToObj(actualGhgReductionMap);
        mrvOutput.totalGHG = (totalGHGReduction);
    }

    // SDG
    var sdgProjects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.SDG_INPUT);
    // filter MI with parent project id
    sdgProjects = sdgProjects.filter(sdg=> {
        return (sdg.parentProject.toString() == project._id.toString());
    })
    var sdgProject = sdgProjects.length ? sdgProjects[0]:null;
    if(sdgProject) {
        // get sdg monitoring list matching with sdg input
        var sdgMonitoringList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.SDG_MONITORING);
        sdgMonitoringList = sdgMonitoringList.filter(sdgMonitoring => {
            return (sdgMonitoring.parentProject.toString() == sdgProject._id.toString());
        })
        var expectedSdgMap = new Map();
        var actualSdgMap = new Map();
        var sdgImpactSummaries = new Map(); 

        getSDGDataForMRV(sdgProject,sdgMonitoringList,expectedSdgMap,actualSdgMap);
        var categories = Array.from(getSdgCategoryMap().keys());
        var sdgReportOutput = await processSDGTracking({category:categories});
      if(sdgReportOutput && sdgReportOutput.sdgOutputCount 
            && sdgReportOutput.sdgOutputCount.sdgOutputList 
            && sdgReportOutput.sdgOutputCount.sdgOutputList.length) {
                sdgReportOutput.sdgOutputCount.sdgOutputList.forEach(sdgOutput=> {
                    if(sdgOutput.project.projectId = (projectId)) {
                        sdgImpactSummaries=sdgOutput.impactSummaries;  
                    }
                }) 
        }
        mrvOutput.expectedSdgMap = utilityIndex.factory.mapToObj(expectedSdgMap);
        mrvOutput.actualSdgMap = utilityIndex.factory.mapToObj(actualSdgMap);
        mrvOutput.sdgImpactSummaries = utilityIndex.factory.mapToObj(sdgImpactSummaries);
        var sdgCategoryMap = getSdgCategoryMap();
        mrvOutput.sdgCategoryMap = utilityIndex.factory.mapToObj(sdgCategoryMap);
    }

    //Adaptation
		
	var adaptationInputList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.ADAPTATION_INPUT);
    var adaptationInput = null;
    // find the latest adaptation input from project
    for(var adaptation of adaptationInputList) {
        if(
            project._id.toString() == adaptation.parentProject.toString()
        ) {
            adaptationInput = adaptation;
            break;
        }
    };

    if(adaptationInput) {
        // get all the approved adaptation monitoring record
        var adaptationMonitoring = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.ADAPTATION_MONITORING);
        adaptationMonitoringList = [];// holds the mapped monitoring record
        // get adaptation monitoring data from adaptation input data
        adaptationMonitoring.forEach(monitoring=> {
            if(adaptationInput._id.toString() == monitoring.parentProject.toString()) {
                adaptationMonitoringList.push(monitoring);
            }
        });
        var expectedAdaptationMap = new Map();
        var actualAdaptationMap = new Map();
        var adaptationImpactSummaries = []; 
        getAdaptationDataForMRV(adaptationInput, adaptationMonitoringList, expectedAdaptationMap, actualAdaptationMap);
        var categories = utilityIndex.factory.getKeysFromMap(getAdaptationCategoryMap2());
        var adaptationReportResponse = await processAdaptationTracking({category:categories.toString()});
        var adaptationOutputList = [];
        if(adaptationReportResponse && adaptationReportResponse.adaptationOutputCount 
            && adaptationReportResponse.adaptationOutputCount.adaptationOutputList) {
                adaptationOutputList = adaptationReportResponse.adaptationOutputCount.adaptationOutputList;
        }

        if(adaptationOutputList.length) {
            for (var adaptationOutput of adaptationOutputList) {
                if(adaptationOutput.project._id.toString() == project._id.toString()) {
                    adaptationImpactSummaries=adaptationOutput.impactSummaries;
                }
            }
        }
        mrvOutput.expectedAdapMap = utilityIndex.factory.mapToObj(expectedAdaptationMap);
        mrvOutput.actualAdapMap = utilityIndex.factory.mapToObj(actualAdaptationMap);
        mrvOutput.adapImpactSummaries = (adaptationImpactSummaries);
        var adaptationCategoryMap = getAdaptationCategoryMap();
        mrvOutput.adaptationCategoryMap = utilityIndex.factory.mapToObj(adaptationCategoryMap);
    }

    // FINANCE
    var financeInputProjects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.FINANCE_INPUT);
    // filter MI with parent project id
    var financeInputForm = null;
    // get the latest finance input approved project matched with NDC project
    for(var financeInput of financeInputProjects) {
        if(financeInput.parentProject._id.toString() == project._id.toString()) {
            financeInputForm = financeInput;
            break;
        }
    }
    if(financeInputForm) {
        var financeMonitoringList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.FINANCE_MONITORING);
        // filter out approved monitoring project matching with financeInputForm
        financeMonitoringList = financeMonitoringList.filter(financeMonitoring=> {
            if(financeMonitoring.parentProject._id.toString() == financeInputForm._id.toString()) {
                return financeMonitoring;
            }
        });
        var disbursementMap = new Map();
        var financeMonitoringMap = new Map();
        var unutilizedFundMap = new Map();
        var financeYears =  [];
        var totalFinanceMonitoring = 0.0;

        for(var financeMonitoring of financeMonitoringList) {
            if(financeMonitoring.disbursementDetail.length) {
                financeMonitoring.disbursementDetail.forEach(disbursementDetail=> {

                    var monitoringDis = setZeroForNull(disbursementDetail.amountQ1) + setZeroForNull(disbursementDetail.amountQ2) + 
                            setZeroForNull(disbursementDetail.amountQ3) + setZeroForNull(disbursementDetail.amountQ4); 
                    financeMonitoringMap.set(financeMonitoring.monitoringYear, monitoringDis);
                    totalFinanceMonitoring = totalFinanceMonitoring + monitoringDis;
                })
            }
        }
        financeMonitoringMap.set("Total", totalFinanceMonitoring);
        var totalFinanceDisbursement = 0.0;
        for(var financeDisbursement of financeInputForm.disbursementSchedule) {
            var year = financeDisbursement.year;
            disbursementMap.set(year, financeDisbursement.amount);
            totalFinanceDisbursement = totalFinanceDisbursement + financeDisbursement.amount;
            
        }
        disbursementMap.set("Total", totalFinanceDisbursement);
        financeYears = financeYears.concat(utilityIndex.factory.getKeysFromMap(disbursementMap));
		financeYears = financeYears.concat(utilityIndex.factory.getKeysFromMap(financeMonitoringMap));
        financeYears = _.uniq(financeYears);

        for(var year of financeYears) {
            var amount = disbursementMap.get(year)==null ? 0.0 : disbursementMap.get(year);
            var monitoredAmt = financeMonitoringMap.get(year)==null ? 0.0 : financeMonitoringMap.get(year);
            
            unutilizedFundMap.set(year, amount - monitoredAmt);
        }
        
        mrvOutput.financeYears = (financeYears);
        mrvOutput.disbursementMap = (utilityIndex.factory.mapToObj(disbursementMap));
        mrvOutput.financeMonitoringMap = (utilityIndex.factory.mapToObj(financeMonitoringMap));
        mrvOutput.unutilizedFundMap = (utilityIndex.factory.mapToObj(unutilizedFundMap));
    }
    mrvReportOutput.mrvOutput = mrvOutput;
    mrvReportOutput.selectedProject = projectId;

    return mrvReportOutput;

}
getAdaptationCategoryMap = ()=> {
    var adaptationCategoryMap = new Map();
    
    adaptationCategoryMap.set("Disaster", "Disaster Risk (Floods and Drought) Management");
    
    adaptationCategoryMap.set("EnergyTransport", "Energy and Transport");
    
    adaptationCategoryMap.set("FoodNutrition", "Food and Nutrition");
    
    adaptationCategoryMap.set("WaterBlue", "Water and the Blue Economy");
    
    adaptationCategoryMap.set("Forestry", "Forestry, Wildlife and Tourism");
    
    adaptationCategoryMap.set("HealthSettlement", "Health, Sanitation and Human Settlements");
    
    return adaptationCategoryMap;
    
}
getAdaptationCategoryMap2 = ()=> {
    var adaptationCategoryMap = new Map();
    
    adaptationCategoryMap.set("Energy", "Energy");
    
    adaptationCategoryMap.set("Risk management", "Risk management");
    
    adaptationCategoryMap.set("Agriculture", "Agriculture");
    
    adaptationCategoryMap.set("Forestry", "Forestry");
    
    adaptationCategoryMap.set("Health", "Health");
    
    adaptationCategoryMap.set("Water", "Water");
    
    return adaptationCategoryMap;
    
}
getAdaptationDataForMRV = (adaptationInput, adaptationMonitoringList, expectedAdaptationMap, actualAdaptationMap) => {
    var actualAdaptationTempMap = new Map();
	var type = "Adp";
    handleMRVData("Energy",adaptationInput.energy, expectedAdaptationMap,type);
    handleMRVData("Risk Management",adaptationInput.risk, expectedAdaptationMap,type);
    handleMRVData("Health",adaptationInput.health, expectedAdaptationMap,type);
    handleMRVData("Water",adaptationInput.water, expectedAdaptationMap,type);
    handleMRVData("Forestry",adaptationInput.forestry, expectedAdaptationMap,type);
    handleMRVData("Agriculture",adaptationInput.agriculture, expectedAdaptationMap,type);

    for(var adaptationMonitoring of adaptationMonitoringList) {
			
        handleMRVData("Energy",adaptationInput.energy, actualAdaptationTempMap,type);
        handleMRVData("Risk Management",adaptationInput.risk, actualAdaptationTempMap,type);
        handleMRVData("Health",adaptationInput.health, actualAdaptationTempMap,type);
        handleMRVData("Water",adaptationInput.water, actualAdaptationTempMap,type);
        handleMRVData("Forestry",adaptationInput.forestry, actualAdaptationTempMap,type);
        handleMRVData("Agriculture",adaptationInput.agriculture, actualAdaptationTempMap,type);
        
        

        var monitoringInternalObject = {};
        for (const [key, value] of actualAdaptationTempMap.entries()) {
            Object.assign(monitoringInternalObject,actualAdaptationTempMap.get(key));
        }
        actualAdaptationMap.set(adaptationMonitoring.monitoringYear, monitoringInternalObject);
    }
    // below code need to be implemented according to existing application
    /* for (String category:actualAdaptationTempMap.keySet()) {
			
        String inputCategory=category.substring(0,category.indexOf("Monitoring"));
        Map<String,Double> actualQuestionMap = actualAdaptationTempMap.get(category);
        Map<String, Double> expectedQuestionMap = expectedAdaptationMap.get(inputCategory);
        if (expectedQuestionMap==null) {
            expectedQuestionMap = new HashMap<String, Double>();
            expectedAdaptationMap.put(inputCategory, expectedQuestionMap);
        }
        for (String question: actualQuestionMap.keySet()) {
            if (!expectedQuestionMap.containsKey(question)) {
                expectedQuestionMap.put(question, 0.0);
            }
        }
        
    } */
}
getSDGDataForMRV =  (sdgInput,sdgMonitoringList,expectedSdgMap,actualSdgMap) => {
    var type = "Sdg";
    handleMRVData("Poverty", sdgInput.povertyReduction, expectedSdgMap,type);
    handleMRVData("Gender",sdgInput.genderParity, expectedSdgMap,type);
    var eductionArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Education and Learning");
    handleMRVData("Education", eductionArr, expectedSdgMap,type);

    // handleMRVData(sdgInput.getEmployment(), expectedSdgMap,sdgQuestionMap,type); // pending
    var environmentArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Environment");
    handleMRVData("Environment", environmentArr, expectedSdgMap,type);
    
    var foodArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Food Security and Hunger");
    handleMRVData("Food", foodArr, expectedSdgMap,type);

    var waterArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Water and Sanitation");
    handleMRVData("Water", waterArr, expectedSdgMap,type);

    var industryArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Infrastructure, Innovation, Industry");
    handleMRVData("Industry", industryArr, expectedSdgMap,type);
    
    handleMRVData("Inequality", sdgInput.reducingInequality, expectedSdgMap,type);
    
    var healthArr = getQuestionSectionForOtherSdg(sdgInput.otherSDG,"Health and Well Being");
    handleMRVData("Health", healthArr, expectedSdgMap,type);

    // monitoring details
    var actualSdgTempMap = new Map();
    for(var sdgMonitoring in sdgMonitoringList) {
			
        handleMRVData("Poverty", sdgMonitoring.povertyReduction, actualSdgTempMap,type);
        handleMRVData("Gender",sdgMonitoring.genderParity, actualSdgTempMap,type);

        var educationArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Education and Learning");
        handleMRVData("Education", educationArr, actualSdgTempMap,type);

        // handleMRVData(sdgMonitoring.getEmployment(), actualSdgTempMap,sdgQuestionMap,type); // pending
        var environmentArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Environment");
        handleMRVData("Environment", environmentArr, actualSdgTempMap,type);

        var foodArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Food Security and Hunger");
        handleMRVData("Food", foodArr, actualSdgTempMap,type);

        var waterArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Water and Sanitation");
        handleMRVData("Water", waterArr, actualSdgTempMap,type);

        var industryArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Infrastructure, Innovation, Industry");
        handleMRVData("Industry", industryArr, actualSdgTempMap,type);
        
        handleMRVData("Inequality", sdgMonitoring.reducingInequality, actualSdgTempMap,type);
        
        var healthArr = getQuestionSectionForOtherSdg(sdgMonitoring.otherSDG,"Health and Well Being");
        handleMRVData("Health", healthArr, actualSdgTempMap,type);

        
        var monitoringInternalObject = {};

        for (const [key, value] of actualSdgTempMap.entries()) {
            Object.assign(monitoringInternalObject,actualSdgTempMap.get(key));
        }
        
        
        actualSdgMap.set(sdgMonitoring.monitoringYear, monitoringInternalObject);
    }
    /* code after it needs to be integrated - source code snipset
    for (String category:actualSdgTempMap.keySet()) {
			
			String inputCategory=category.substring(0,category.indexOf("Monitoring"));
			Map<String,Double> actualQuestionMap = actualSdgTempMap.get(category);
			Map<String, Double> expectedQuestionMap = expectedSdgMap.get(inputCategory);
			if (expectedQuestionMap==null) {
				expectedQuestionMap = new HashMap<String, Double>();
				expectedSdgMap.put(inputCategory, expectedQuestionMap);
			}
			for (String question: actualQuestionMap.keySet()) {
				if (!expectedQuestionMap.containsKey(question)) {
					expectedQuestionMap.put(question, 0.0);
				}
			}
			
		}
    */
}

/*
* getQuestionSectionForOtherSdg
*/
getQuestionSectionForOtherSdg = (otherSDG,otherSdgType,targetKey)=> {
    var questionArr = [];
    for(var sdg of otherSDG) {
        if(sdg.otherSdgType == otherSdgType) {
            selectedSdgSection = sdg;
            break;
        }
    }
    switch (otherSdgType) {
        case "Education and Learning":
        case "Food Security and Hunger":
        case "Water and Sanitation":
        case "Health and Well Being":
            questionArr =  selectedSdgSection.qualitativeImpact;
            break;
        case "Environment":
        case "Infrastructure, Innovation, Industry":
            selectedSdgSection.quantitativeImpact2.forEach(quantitativeImpact2 => {
                questionArr = questionArr.concat(quantitativeImpact2.questions);
            });
            break;
        
    
        default:
            break;
    }

    return questionArr;
    
}
/*
*handleMRVData: Check for Quantitative data and include question if data >0
*/

handleMRVData =  (sectionName,sectionInput,expectedSdgMap,type) => {
    // for now there is same code wrt type being passed
    var matchedQuestion = {};
    sectionInput = sectionInput.filter(data=> {
        if(data.isQuantitative && data.data > 0) {
            matchedQuestion[data.question] = data.data;
        }
    })
    expectedSdgMap.set(sectionName,matchedQuestion);
}
/*
* checkExistenceOfImpactType : An generic method to check generic condition of tabs 
                            to meet the dynamic code of method execution in existing java code
*/
checkExistenceOfImpactType = (impactData,validation1,validation2)=> {
    var validation1 = validation1.split("-");
    var validation1_key = validation1[0];
    var validation1_condition = validation1[1];

    var validation2 = validation2.split("-");
    var validation2_key = validation2[0];
    var validation2_condition = validation2[1];
    var found = false;
    
    for(var i in impactData) {
        
      if(
            impactData[i] && impactData[i][validation1_key] && 
            impactData[i][validation1_key].toString() == validation1_condition.toString() &&
            impactData[i][validation2_key] && 
            impactData[i][validation2_key].toString() == validation2_condition.toString()

        )  {
            found = true;
            break;
        }
    }
    return found;
}
/*
* checkExistenceOfImpactTypeSdg : An generic method to check generic condition of tabs 
                            to meet the dynamic code of method execution in existing java code for SDG
*/
checkExistenceOfImpactTypeSdg = (impactData,validation1,validation2)=> {
    var validation1 = validation1.split("-");
    var validation1_key = validation1[0];
    var validation1_condition = validation1[1];

    var validation2 = validation2.split("-");
    var validation2_key = validation2[0];
    var validation2_condition = validation2[1];
    var found = false;
    
    for(var i in impactData) {
        
      if(
            impactData[i] && impactData[i][validation1_key] && 
            impactData[i][validation1_key].toString() == validation1_condition.toString() &&
            impactData[i][validation2_key] && 
            impactData[i][validation2_key].toString() != "" &&
            impactData[i][validation2_key].toString() != validation2_condition.toString()

        )  {
            found = true;
            break;
        }
    }
    return found;
}
handle = (impactData,impactSummaries,type,impactType) => {
    var isPresent = false;
    // for adaptation
    if(type == "Adp") { 
        switch (impactType) {
            case "energy":
            case "risk":
            case "agriculture":
            case "health":
            case "water":
            case "forestry":
                // loop in data and check isQualitative = true with dataSource == yes
                var isPresent = checkExistenceOfImpactType(impactData,"isQualitative-true","dataSource-Yes");
                if(isPresent) {
                    impactSummaries.push(getAdaptationSummaryMap().get(impactType));
                }
                break;
        
            default:
                break;
        }
    } else if(type == "Sdg") {
        switch (impactType) {
            case "povertyReduction":
            case "reducingInequality":
            case "genderParity":
            case "Food Security and Hunger":
            case "Water and Sanitation":
            case "Environment":
            case "Education and Learning":
            case "Infrastructure, Innovation, Industry":
            case "Health and Well Being":
            
                // loop in data and check isQualitative = true with dataSource == yes
                var isPresent = checkExistenceOfImpactTypeSdg(impactData,"isQualitative-true","likelihood-Not Applicable");
                if(isPresent) {
                    impactSummaries.push(impactType); //Q: for now added impactType, TBD as per code mapping
                }
                break;
        
            default:
                break;
        }
    }
    return isPresent;
}
processSDGTracking = async (query)=> {
    var sdgReportOutput = new SDGReportOutput();
    var sdgOutputCount = new SDGOutputCount();
    
    var countMap = new Map();
    //status = approved and entity = 'PROJECT', grp by entityId , get the latest project
    var allProjects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.NDC_PROJECT);
    // status = approved and entity = 'SDG INPUT',grp by entityId , get the latest project
    var sdgInfoList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.SDG_INPUT);
    var sdgOutputList = [];
    allProjects.forEach(project=> {
        var projectId = project.projectId;
        var consolidatedImpactSummaries = [];
        var output = new SDGOutput();
        var type = "Sdg";
        // find the sdg info related to ndc project
        var matchIndex = -1;
        for(var i in sdgInfoList) {
            if(sdgInfoList[i].parentProject.toString() == project._id.toString()) {
                matchIndex = i;
                break;
            }
        }
        var sdgInfo;
        

        if(matchIndex != -1) {
            sdgInfo = sdgInfoList[matchIndex];
            //poverty
            var povertyList = sdgInfo.povertyReduction;
            if(povertyList.length) {

                var impactSummaries = [];
                var isPresent = handle(povertyList,impactSummaries,type,"povertyReduction"); // need to implement
                processCountMap(countMap, isPresent, getSdgCategoryMap().get("Poverty"));	
                if(query.category.indexOf("Poverty") != -1 && isPresent) {
                    consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                    // output.project = (project); // add it in common block
                }
            }
            //Inequality
            var inequalityList = sdgInfo.reducingInequality;

                var impactSummaries = [];
                var isPresent = handle(inequalityList,impactSummaries,type,"reducingInequality");
                processCountMap(countMap, isPresent, getSdgCategoryMap().get("Inequality"));	
                if(query.category.indexOf("Inequality")!= -1 && isPresent) {
                    consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                    // output.project = (project); // add it in common block
                }
            
            // gender
            var genderList = sdgInfo.genderParity;
            if(genderList.length) {

                var impactSummaries = []
                var isPresent = handle(genderList,impactSummaries,type,"genderParity");
                processCountMap(countMap, isPresent, getSdgCategoryMap().get("Gender"));	
                if(query.category.indexOf("Gender")!= -1 && isPresent) {
                    consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                    // output.project = (project); // add it in common block
                }
            }
            // other sdg section
            sdgInfo.otherSDG.forEach(otherSDG=> {
                if(otherSDG.otherSdgType == "Food Security and Hunger") {
                    // food
                    var foodList = otherSDG.quantitativeImpact;
                    if(foodList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(foodList,impactSummaries,type,"Food Security and Hunger");
                        processCountMap(countMap, isPresent, getSdgCategoryMap().get("Food"));	
                        if(query.category.indexOf("Food")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }
                if(otherSDG.otherSdgType == "Water and Sanitation") {
                    // water
                    var waterList = otherSDG.quantitativeImpact;
                    if(waterList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(waterList,impactSummaries,type,"Water and Sanitation");
                        processCountMap(countMap, isPresent, getSdgCategoryMap().get("Water"));	
                        if(query.category.indexOf("Water")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }
                if(otherSDG.otherSdgType == "Health and Well Being") {
                    // health
                    var healthList = otherSDG.quantitativeImpact;
                    if(healthList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(healthList,impactSummaries,type,"Health and Well Being");
                        processCountMap(countMap, isPresent, getSdgCategoryMap().get("Health"));	
                        if(query.category.indexOf("Health")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }
                if(otherSDG.otherSdgType == "Infrastructure, Innovation, Industry") {
                    // Industry
                    var industryList = otherSDG.quantitativeImpact;
                    if(industryList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(industryList,impactSummaries,type,"Infrastructure, Innovation, Industry");
                        if(query.category.indexOf("Industry")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }
                if(otherSDG.otherSdgType == "Education and Learning") {
                    // Education
                    var educationList = otherSDG.quantitativeImpact;
                    if(educationList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(educationList,impactSummaries,type,"Education and Learning");
                        processCountMap(countMap, isPresent, getSdgCategoryMap().get("Education"));	
                        if(query.category.indexOf("Education")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }
                if(otherSDG.otherSdgType == "Environment") {
                    // Environment
                    var environmentList = otherSDG.quantitativeImpact;
                    if(environmentList.length) {

                        var impactSummaries = [];
                        var isPresent = handle(environmentList,impactSummaries,type,"Environment");
                        processCountMap(countMap, isPresent, getSdgCategoryMap().get("Environment"));	
                        if(query.category.indexOf("Environment")!= -1 && isPresent) {
                            consolidatedImpactSummaries = consolidatedImpactSummaries.concat(impactSummaries);
                            // output.project = (project);
                        }
                    }
                }

            })
            if(consolidatedImpactSummaries.length) {
                if(sdgInfo.screeningApproach && sdgInfo.screeningApproach != "") {
                    output.screening = ("Yes");
                }else {
                    output.screening = ("No");
                }
                
                var stakeholder = "TBD";//handleStakeholder(sdgInfo);// need to implement
                output.stakeholderEngagement = (stakeholder);
				output.impactSummaries = (consolidatedImpactSummaries);
				
			}
            output.project = (project);
			sdgOutputList.push(output);
        }

    });
    sdgOutputCount.sdgOutputList = sdgOutputList;
    sdgOutputCount.countMap = utilityIndex.factory.mapToObj(countMap);
    sdgReportOutput.sdgOutputCount = sdgOutputCount;
    sdgReportOutput.selectedCategory = query.category;
    return sdgReportOutput;
}

processCountMap = (countMap, isPresent, category)=> {
    if(isPresent) {
        var count = countMap.get(category);
        if(!count) {
            count=1;
        }else {
            count = count + 1;
        }
        countMap.set(category, count);
    }else {
        if(!countMap.get(category)) {
            countMap.set(category, 0);
        }
    }
}
getSdgCategoryMap = ()=> {
    var sdgCategoryMap = new Map();
    
    sdgCategoryMap.set("Poverty", "Poverty Reduction");
    
    sdgCategoryMap.set("Inequality", "Reducing Inequality");
    
    sdgCategoryMap.set("Gender", "Gender Parity");
    
    sdgCategoryMap.set("Industry", "Infrastructure, Innovation, Industry");
    
    sdgCategoryMap.set("Environment", "Environmental Impacts");
    
    sdgCategoryMap.set("Employment", "Employment");
    
    sdgCategoryMap.set("Food", "Food Security and Hunger");
    
    sdgCategoryMap.set("Water", "Water and Sanitation");
    
    sdgCategoryMap.set("Health", "Health and Well Being");
    
    sdgCategoryMap.set("Education", "Education and Learning");
    
    return sdgCategoryMap;
    
}
processFinanceTracking = async (query)=> {
    var financeReportOutput = new FinanceReportOutput(query.year);
    // with entity = 'Project' and status approved, grp by entityId find the latest record and closure_date <= year
    var projectList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntityWithinClosureDate(query.year,configIndex.constants.STATUS_APPROVED,configIndex.constants.NDC_PROJECT);
    // with entity = 'FINANCE INPUT' and status approved, grp by entityId find the latest record
    var financeInputList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.FINANCE_INPUT);
    var financeMonitoringList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.FINANCE_MONITORING);
    var financeOutputList = [];
    for(var i in financeInputList) {
        console.log("parent project: ",financeInputList[i].parentProject.toString());
        var ndcProject = await ndcIndex.ndcActionModel.findById(financeInputList[i].parentProject).exec();
        var projectId = ndcProject.projectId;
        var disbursementList = financeInputList[i].disbursementSchedule;
        var financeOutput = new FinanceOutput();
        var project = null;
        
        var disbursement = 0.0;
        var disbursementAllYear = 0.0;
        
        var monitoringDisbursement = 0.0;
        var monitoringDisbursementAllYear = 0.0;
        
        var list = projectList.filter(project=> { 
            return project.projectId == projectId; 
        })
        if(list && list.length) {
            project = list[0];
            if(project != null) {
                disbursementList.forEach(elem => {
                    if(elem.year == query.year) {
                        disbursement = elem.amount;
                    }					
                    disbursementAllYear = disbursement + (elem.amount==null ? 0.0 : elem.amount);	
                });
                
                var collect2 = financeMonitoringList.filter(climateMI=> {
                    return climateMI.parentProject.toString() == financeInputList[i]._id.toString();
                })
                var monitoringDis = 0;
                collect2.forEach(financeMonitoring => {
                    if(financeMonitoring.disbursementDetail) {
                        monitoringDis = setZeroForNull(financeMonitoring.disbursementDetail.amountQ1) + setZeroForNull(financeMonitoring.disbursementDetail.amountQ2) + 
                                setZeroForNull(financeMonitoring.disbursementDetail.amountQ3) + setZeroForNull(financeMonitoring.disbursementDetail.amountQ4); 
                        monitoringDisbursementAllYear = monitoringDisbursementAllYear + monitoringDis;

                    }
                    
                    if(financeMonitoring.monitoringYear ==  query.year)
                        monitoringDisbursement= monitoringDis;
                });
                
                    
                financeOutput.project = (project);
                financeOutput.disbursement = (disbursement);				
                financeOutput.disbursementAllYear = (disbursementAllYear);
                financeOutput.monitoringDisbursement = (monitoringDisbursement);
                financeOutput.monitoringDisbursementAllYear = (monitoringDisbursementAllYear);	
                financeOutputList.push(financeOutput);
            }
        }				
    }
    financeReportOutput.financeOutputList = financeOutputList;
    console.log("financeReportOutput  ",financeReportOutput);
    return financeReportOutput;
}
getAdaptationSummaryMap = ()=> {
    var adaptationCategoryMap = new Map();
    
    adaptationCategoryMap.set("energy", "Energy");
    adaptationCategoryMap.set("risk", "Risk Management");
    adaptationCategoryMap.set("agriculture", "Agriculture");
    adaptationCategoryMap.set("water", "Water");
    adaptationCategoryMap.set("forestry", "Forestry");
    adaptationCategoryMap.set("health", "Health");
    return adaptationCategoryMap;
    
}
processAdaptationTracking = async (query)=> {
    // need to be implemented
    var adaptationReportOutput = new AdaptationReportOutput();
    var adaptationOutputCount = new AdaptationOutputCount();
    var adaptationProjects;
    var impactSummaries = [];
    var countMap = new Map();
    //status = approved and entity = 'PROJECT', grp by entityId , get the latest project
    var allProjects = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.NDC_PROJECT);
    var adaptationInfoList = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.ADAPTATION_INPUT);
    // filter out ndc project Division !=  Mitigation
    var adaptationProjects = allProjects.filter(project=> {
        return (project.division != "Mitigation");
    });
    adaptationProjects.forEach(project=> {
        var type="Adp";
        var output = new AdaptationOutput();
        // match 1st recent match of energy in adaptationInfoList
        var index = -1;
        for(var i in adaptationInfoList) {
            // comparing with _id in place of project id in original code
            if(project._id.toString() == adaptationInfoList[i].parentProject.toString()) {
                index = i;
                break;
            }
        }
        // check if the record found
        if(index != -1) {
            output.project = project;
            if(query && query.category && query.category.indexOf("Energy") != -1) {

                // Energy
                var energyList = adaptationInfoList[index].energy;
                var isPresent = handle(energyList,impactSummaries,type,"energy");
                processCountMap(countMap, isPresent, "Energy");
            }
            if(query && query.category && query.category.indexOf("Risk management") != -1) {
                // Disaster
                var disasterList = adaptationInfoList[index].risk;
                var isPresent = handle(disasterList,impactSummaries,type,"risk");
                processCountMap(countMap, isPresent, "Risk management");
            }
            if(query && query.category && query.category.indexOf("Agriculture") != -1) {

                // Agriculture
                var agricultureList = adaptationInfoList[index].agriculture;
                var isPresent = handle(agricultureList,impactSummaries,type,"agriculture");
                processCountMap(countMap, isPresent, "Agriculture");
            }
            if(query && query.category && query.category.indexOf("Health") != -1) {

                // Health
                var healthList = adaptationInfoList[index].health;
                var isPresent = handle(healthList,impactSummaries,type,"health");
                processCountMap(countMap, isPresent, "Health");
            }
            if(query && query.category && query.category.indexOf("Water") != -1) {

                // Water
                var waterList = adaptationInfoList[index].water;
                var isPresent = handle(waterList,impactSummaries,type,"water");
                processCountMap(countMap, isPresent, "Water");
            }
            if(query && query.category && query.category.indexOf("Forestry") != -1) {

                // forestry
                var forestryList = adaptationInfoList[index].forestry;
                var isPresent = handle(forestryList,impactSummaries,type,"forestry");
                processCountMap(countMap, isPresent, "Forestry");
            }
            
        }
        if(impactSummaries.length > 0) {
            output.impactSummaries = _.uniq(impactSummaries);
            adaptationOutputCount.adaptationOutputList.push(output);	
        }
    })
    adaptationOutputCount.countMap = utilityIndex.factory.mapToObj(countMap);
    adaptationReportOutput.adaptationOutputCount = adaptationOutputCount;
    adaptationReportOutput.selectedCategory = query.category;
    return adaptationReportOutput;

}
processMitigationTracking = async (query)=> {
    var mitigationReportOutput = new MitigationReportOutput(query.year);
    // with entity = 'MITIGATION INPUT' and status approved, grp by entityId find the latest record
    var approvedMIRec = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.MITIGATION_INPUT);
    // with entity = 'MITIGATION MONITORING' and status approved, grp by entityId find the latest record
    var approvedMMRecords = await dataStateIndex.dataStateController.getDataIdRecWithEntityIdGrpByStatusAndEntity(configIndex.constants.STATUS_APPROVED,configIndex.constants.MITIGATION_MONITORING);
    var date1 = new Date();
    for(var i in approvedMIRec) {
        var mitigationOutput = new MitigationOutput();
        mitigationInputGHG = 0.0;
        mitigationInputGHG = approvedMIRec[i].ghgReduction;
        mitigationInputAllYearGHG = 0.0;
        mitigationMonitoringGHG = 0.0;
        mitigationMonitoringGHGAllYears = 0.0;
        // get ndc parent project of MI
        var ndcProject = await ndcIndex.ndcActionModel.findById(approvedMIRec[i].parentProject).exec();
        var date2 = ndcProject.commissioningDate;
        var diffInDays = Math.abs(date1.getDay() - date2.getDay()) + 365;
        mitigationInputAllYearGHG = mitigationInputGHG *  diffInDays / 365;
        // get the matching Mitigation monitoring  with matching project id of mitigation input
        // here filtering MM with matching its parent MI
        var collect2 = approvedMMRecords.filter(mm=> {
            if(mm.parentProject.toString() == approvedMIRec[i]._id.toString()) {
                return mm;
            }
        });
        collect2.forEach(collect=> {
            mitigationMonitoringGHGAllYears = mitigationMonitoringGHGAllYears + (collect.actualGHGSavings ==null ? 0.0 : collect.actualGHGSavings);
            if(collect.monitoringYear == query.year )
                mitigationMonitoringGHG = collect.actualGHGSavings;
        });
        mitigationOutput.project = (ndcProject);
        mitigationOutput.mitigationInputGHG = (mitigationInputGHG);
        mitigationOutput.mitigationInputAllYearGHG = (mitigationInputAllYearGHG);
        mitigationOutput.mitigationMonitoringGHG = (mitigationMonitoringGHG);
        mitigationOutput.mitigationMonitoringGHGAllYears = (mitigationMonitoringGHGAllYears);	
        
        mitigationReportOutput.mitigationOutputList.push(mitigationOutput);
        
    };
    return mitigationReportOutput;
}
setZeroForNull = ( value)=> {
    if (value==null) {
        return 0;
    }
    else {
        return value;
    }
}
validateReportRequest = (query)=> {
    switch(query.menuId) {
        case "Reports_MitigationTracking":
        case "Reports_FinanceTracking":
            var errorObj = utilityIndex.factory.validationFactory(query,configIndex.constants.VALIDATE_NULL,"year");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REPORT_ERROR),errorObj));
                return;
            }
            
        break;
        case "Reports_AdaptationTracking":
        case "Reports_SDGTracking":

            var errorObj = utilityIndex.factory.validationFactory(query,configIndex.constants.VALIDATE_NULL,"category");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REPORT_ERROR),errorObj));
                return;
            }
        break;
        case "Reports_MRVTracking":

            var errorObj = utilityIndex.factory.validationFactory(query,configIndex.constants.VALIDATE_NULL,"projectId");
            if(errorObj.hasError){
                throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REPORT_ERROR),errorObj));
                return;
            }
            
        break;
        default:// throw error if no menuId match 
            throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REPORT_ERROR),configIndex.message.PAGE_INVALID_QUERY));
        break;
         
    }
}
exports.getNDCProject = async (req,res,next)=> {
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"status","module");
    var errorObj2 = utilityIndex.factory.validateModule(req.query);
    // validate parent menu in case of signUp enable menu
    if(errorObj.hasError){
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Data-state"),errorObj));
        return;
    }
    if(errorObj2.hasError){
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Data-state"),errorObj));
        return;
    }
    var ndcIds = [];
    var recArr = [];
    switch (req.query.module) {
        case configIndex.constants.MODULE_MITIGATION_INPUT:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.NDC_PROJECT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds},division:{"$in":[configIndex.constants.DIVISION_MITIGATION,configIndex.constants.DIVISION_CROSS_CUTTING]}}).exec();
            break;
        case configIndex.constants.MODULE_MITIGATION_MONITORING:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.MITIGATION_INPUT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).populate("parentProject").exec();
            break;
        case configIndex.constants.MODULE_FINANCE_INPUT:
        case configIndex.constants.MODULE_SDG_INPUT:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.NDC_PROJECT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).exec();
            break;
        case configIndex.constants.MODULE_FINANCE_MONITORING:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.FINANCE_INPUT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).populate("parentProject").exec();
            break;
        case configIndex.constants.MODULE_SDG_MONITORING:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.SDG_INPUT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).populate("parentProject").exec();
            break;
        case configIndex.constants.MODULE_ADAPTATION_INPUT:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.NDC_PROJECT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds},division:{"$in":[configIndex.constants.DIVISION_ADAPTATION,configIndex.constants.DIVISION_CROSS_CUTTING]}}).exec();

            break;
        case configIndex.constants.MODULE_ADAPTATION_MONITORING:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.ADAPTATION_INPUT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).populate("parentProject").exec();
            break;
        case configIndex.constants.MODULE_REPORT_MRV_TRACKING:
            var url = `${configIndex.constants.API_DATA_STATE_NDC}?entity=${configIndex.constants.NDC_PROJECT}`;
            var dataStateNdc =  await utilityIndex.restCallUtility.getCall(req,url)// api call 
            dataStateNdc = dataStateNdc.data.data; // extracting data
            dataStateNdc.forEach((dataState) => {
                ndcIds.push(dataState.dataId)
            });
            recArr = await ndcIndex.ndcActionModel.find({_id:{"$in":ndcIds}}).select('projectId').exec();
            break;
        default:
            return next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"data-state"),configIndex.message.PAGE_INVALID_MODULE));
            break;
    }
    
    utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'ndc'),recArr);
    } catch (error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_DELETE,"NDC"),error));
    }
}
