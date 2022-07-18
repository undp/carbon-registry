
var utilityIndex = require("./../utility");
var configIndex = require("./../config")
var ghgIndex = require("./index");
const sharedIndex = require("./../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("./../menu");
const dataStateIndex = require("./../data-state");
const userIndex = require("./../user")
const config = require("./../config/config.json");
const GHGOutput = require("./report/GHGOutput");
const GHGEmissions = require("./report/GHGEmissions");
const ReportTemplate = require("./report/report-template");
var _ = require('lodash');
var axios = require('axios');
const excelToJson = require('convert-excel-to-json');

// data holder
var fuelEmissionFactorHolder = [];
var fugitiveEmissionHolder = [];
var ippuEmissionFactorHolder = [];

exports.getInventoryYear = async function(req,res,next) {
    
    try{
        var arr = [];
        i = configIndex.constants.INVENTORY_YEAR_START;
        while(i <= configIndex.constants.INVENTORY_YEAR_END) {
            arr.push(i++) ;
        }
        if(req.query.config && req.query.config != "") {
            // get the latest record 
            var appDataModel = await sharedIndex.appDataModel.findOne({key:configIndex.constants.INVENTORY_YEAR_CONFIG_STR})
            .sort({updateDate: -1}).exec();
            if(appDataModel && appDataModel.inventoryYears.length) {
                if(appDataModel.value == req.query.config) {
                    arr = appDataModel.inventoryYears.map(Number);
                    // arr = parseInt(appDataModel.inventoryYears);
                } else {
                    arr = arr.filter(year=> appDataModel.inventoryYears.indexOf(year) == -1);
                }
            } else {
                arr = []; // return blank arr if config passed but no record saved 
            }
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'Inventory year'),arr);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Inventory year"),error));
         return;
    }

}
exports.getFuelType = async function(req,res,next) {
    
    try{
        var fuelType = await ghgIndex.ghgFuelModel.find({}).distinct("fuelType").exec();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'Fuel Type'),fuelType);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Fuel Type"),error));
         return;
    }

}
exports.getFuelByFuelType = async function(req,res,next) {
    
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.params,configIndex.constants.VALIDATE_NULL,"fuelType");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"fuel"),errorObj));
            return;
        }
        var fuel = await ghgIndex.ghgFuelModel.find({fuelType:req.params.fuelType}).distinct("fuel").exec()
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'Fuel'),fuel);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Fuel"),error));
         return;
    }

}
/*
* used to return multiple results based on requestType : sector/ category/ subSector/ subCategory passed in query parameters
* examples: /sectorDetails?requestType=sector
            /sectorDetails?requestType=category&sector=testValue
*/
exports.getSectorDetails = async function(req,res,next) {
    var data =  null;
    try {
        
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"requestType");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS ),errorObj));
            return;
        }
        switch(req.query.requestType) {
            case  configIndex.constants.CONST_SECTOR:
                data = await ghgIndex.ghgSectorModel.find({}).distinct(configIndex.constants.CONST_SECTOR).exec();
            break;
            case  configIndex.constants.CONST_CATEGORY:
                // validate sector in query
                var query = {};
                if(req.query.sector) {
                    query["sector"] = req.query.sector;
                }
                data = await ghgIndex.ghgSectorModel.find(query).distinct(req.query.requestType).exec();
                // get category based on sector passed
            break;
            case  configIndex.constants.CONST_SUB_SECTOR:
                // validate sector,category in query
                /* var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,configIndex.constants.CONST_SECTOR,configIndex.constants.CONST_CATEGORY);
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS ),errorObj));
                    return;
                } */
                var query = {};
                if(req.query.sector) {
                    query["sector"] = req.query.sector;
                }
                if(req.query.category) {
                    query["category"] = req.query.category;
                }
                
                // var query = {sector:req.query.sector,category:req.query.category};
                data = await ghgIndex.ghgSectorModel.find(query).distinct(req.query.requestType).exec();
            break;
            case  configIndex.constants.CONST_SUB_CATEGORY:
                // validate sector,category,sub sector in query
                var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,configIndex.constants.CONST_SECTOR,configIndex.constants.CONST_CATEGORY,configIndex.constants.CONST_SUB_SECTOR);
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS ),errorObj));
                    return;
                }
                var query = {sector:req.query.sector,category:req.query.category,subSector:req.query.subSector};
                data = await ghgIndex.ghgSectorModel.find(query).distinct(req.query.requestType).exec();
            break;
            default:
                next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS ),"Invalid request Type"));
                    return;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_GET, configIndex.message.PAGE_SECTOR_DETAILS),data);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS),error));
         return;
    }
}
/*
* Used to get sector,category, subsector details by uniquly identifying data like subSector
*/
exports.sectorDetailsByMenu = async function(req,res,next) {
    var data;
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"menuId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS ),errorObj));
            return;
        }
        switch(req.body.menuId) {
            // fetching details by the key of subSector
            case "GHG_IPPU_Mineral_Industry_Glass_Production":
            case "GHG_IPPU_Chemical_Industry_soda_ash_production":
            case "GHG_IPPU_Mineral_Industry_Carbonate":
            case "GHG_Energy_Sectoral_Approach_Manufacturing":
            case "GHG_Energy_Sectoral_Transport":
            case "GHG_IPPU_Mineral_Industry_Cement_Production":
            case "GHG_IPPU_Mineral_Industry_Lime_Production":
            case "GHG_IPPU_Non_Energy_product_Lubricant_Use":
            case "GHG_IPPU_Non_Energy_product_Solvent_Use":
            case "GHG_IPPU_Product_Substitutes_Refrigeration_Air":
            case "GHG_AFOLU_Land_ForestLand":
            case "GHG_AFOLU_Land_Cropland":
            case "GHG_AFOLU_Land_Grassland":
            case "GHG_AFOLU_Land_Wetland":
            case "GHG_AFOLU_Land_Settlements":
            case "GHG_AFOLU_Land_OtherLands":
            case "GHG_AFOLU_Aggregate_nonCO2_Emissions_Biomass":
            case "GHG_AFOLU_Aggregate_nonCO2_Rice_Cultivation":
            case "GHG_Waste_Biological_Treatment_SolidWaste":
            case "GHG_AFOLU_Livestock_EntericFermentation":
            case "GHG_Energy_Sectoral_Others":
            case "GHG_AFOLU_Livestock_ManureManagement":
            case "GHG_Waste_Solid_Waste_Disposal":
            case "GHG_Waste_Incineration_Waste":
            case "GHG_Waste_Wastewater_Treatment_Discharge":
            case "GHG_AFOLU_Aggregate_nonCO2_Indirect_N2O":
            case "GHG_AFOLU_Aggregate_nonCO2_Indirect_Emission":
            case "GHG_AFOLU_Aggregate_nonCO2_Direct_Emission":
            case "GHG_AFOLU_Aggregate_nonCO2_Liming":
            case "GHG_AFOLU_Aggregate_nonCO2_Urea":
                var query = {
                    subSector: req.body.subSector
                }
                var sectorDetailsArr = await ghgIndex.ghgSectorModel.find(query).exec();
                var sectorArr =  new Set();
                var categoryArr =  new Set();
                var subSectorArr =  new Set();
                var subCategoryArr =  new Set();
                sectorDetailsArr.forEach(sectorDetails=> {
                    sectorArr.add(sectorDetails.sector);
                    categoryArr.add(sectorDetails.category);
                    subSectorArr.add(sectorDetails.subSector);
                    subCategoryArr.add(sectorDetails.subCategory);
                });
                data = {
                    sectorArr:[...sectorArr],
                    categoryArr:[...categoryArr],
                    subSectorArr:[...subSectorArr],
                    subCategoryArr:[...subCategoryArr],
                }
            break;
            // fetching details by the key of subCategory
            case "GHG_Energy_Sectoral_Approach_Energy_Industries_NaturalGas":
            case "GHG_Energy_Sectoral_Approach_Energy_Industries_FugitiveOil":
            case "GHG_Energy_Sectoral_Approach_Energy_Industries_Electricity_Generation":
            case "GHG_Energy_Sectoral_Approach_Energy_Industries_Production_Solid_Fuels":
                var query = {
                    subCategory: req.body.subCategory
                }
                var sectorDetailsArr = await ghgIndex.ghgSectorModel.find(query).exec();
                var sectorArr =  new Set();
                var categoryArr =  new Set();
                var subSectorArr =  new Set();
                var subCategoryArr =  new Set();
                sectorDetailsArr.forEach(sectorDetails=> {
                    sectorArr.add(sectorDetails.sector);
                    categoryArr.add(sectorDetails.category);
                    subSectorArr.add(sectorDetails.subSector);
                    subCategoryArr.add(sectorDetails.subCategory);
                });
                data = {
                    sectorArr:[...sectorArr],
                    categoryArr:[...categoryArr],
                    subSectorArr:[...subSectorArr],
                    subCategoryArr:[...subCategoryArr],
                }
            break;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_GET, configIndex.message.PAGE_SECTOR_DETAILS),data);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.PAGE_SECTOR_DETAILS),error));
        return;
   }
}
///////////////////////////////////////////////////////////////////////////////////////////////////
/***************************************** ghg data save starts *******************************/
///////////////////////////////////////////////////////////////////////////////////////////////////
/*
* saveEnergyReferenceApproach
*/
exports.saveGhgData = async function(req,res,next) {
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"menuId","updatedBy");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_ENERGY_REFERENCE_APPROACH),errorObj));
            return;
        }
        // Step 1 - validate permission menu id , permission menu, user
        /* var permissionMenu = await menuIndex.menuController.isExistMenu(req.body.permissionMenuId);
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
        
        // step 2 prefill request object
        req.body = sharedIndex.sharedController.preFillData(menu,req.body);
        // Step 3 validate request object based on menu
        var validationObj = utilityIndex.factory.validationByMenu(menu.menuId,req.body,configIndex.constants.VALIDATE_NULL);
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.PAGE_ENERGY_REFERENCE_APPROACH),validationObj));
            return;
        }
        // Step-4 save ghg record
        var record = await ghgIndex.ghgDataModel(req.body).save();
        // step -3 prepare payload of data-state
        var dataStatePayload = {
            menuLabel: menu.label,
            dataId: record._id,
            entity:menu.entity,
            entityUrl:menu.url,//+"/"+energyReference._id,// pattern /<angular-route>/#recordId(to be added in backend)
            entityId:sharedIndex.sharedController.getEntityId(menu.menuId,record),
            updatedBy:record.updatedBy
        }
        // step -4 save data-state
        var dataState = await dataStateIndex.dataStateController.saveDataState(dataStatePayload);

        // Step 5 Trigger mail to admin , nodal and created user
        // step 5.1 get list of admin users and get list of nodal user having access and send mail
        var admins = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_ADMIN);
        var nodal = await userIndex.userController.getActiveUsersByRoleAndPermission(configIndex.constants.ROLE_NODAL/*,req.body.permissionMenuId*/);
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

/*
* get getEnergyReferenceApproach based on selected inventory year and record id
* return record based on the filter paramter passed in query params
*/
exports.getGhgData = async function(req,res,next) {
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"menuId");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET),errorObj));
            return;
        }
        var record = null;
        var errorObj = utilityIndex.factory.validationFactoryAllField(req.query,configIndex.constants.VALIDATE_NULL,"_id","inventoryYear","subCategory");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET),errorObj));
            return;
        }
        else {
            if(req.query._id) {
                record = await ghgIndex.ghgDataModel.findById(req.query._id).exec();
               
            } else  {
                var query = {};
                Object.assign(query,
                        {menuId:req.query.menuId},
                        req.query.inventoryYear ? {inventoryYear: parseInt(req.query.inventoryYear)} : {},
                        req.query.subCategory ? {subCategory: req.query.subCategory} : {}
                    );
                console.log("query ",query);
                var pipeline = [
                    
                    {"$match":query},
                    {"$sort":{updateDate:-1}},
                    {"$limit":1}
                ]
                record = await ghgIndex.ghgDataModel.aggregate(pipeline).exec();
                if(record.length) {
                    record = [record[0]];
                }
                else {
                    record = null;
                }
            }
            
        }
        
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET),error));
        return;
   }

}
///////////////////////////////////////////////////////////////////////////////////////////////////
/***************************************** ghg data save ends *******************************/
///////////////////////////////////////////////////////////////////////////////////////////////////


exports.getReportByGas = async (req,res,next)=> {
    try {
        var response;
        var reportTemplate;
        var responseWrapper = {a:1};
        // validate input
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"fromYear","toYear","inventoryUnit");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET),errorObj));
            return;
        }
        // validate user from header - pending
    
        var fromYear = parseInt(req.query.fromYear);
        var toYear = parseInt(req.query.toYear);
        // getting list of active ghg input records
        var query = {
            entity: /GHG INPUT>/,
            status:configIndex.constants.STATUS_APPROVED
        }
        var approvedGhgInputIds = await dataStateIndex.dataStateModel.find(query).distinct("dataId").exec();
        //get ghg record
        var pipeline = [
            {"$match":{"_id":{"$in":approvedGhgInputIds}}}  ,         
            {"$match": {"inventoryYear":{$gte:fromYear,$lte:toYear}}},
        ]
        // grouping record by year
        var records = await ghgIndex.ghgDataModel.aggregate(pipeline).exec(); 
        //if(records.length) {
            records = await getGhgRecordByYear(records);
            // console.log("records ",records);

            // recussion in year wise data
            await calculateGHGOutput(req,responseWrapper,fromYear,toYear,req.query.inventoryUnit,records.get(fromYear)||[]);
        //}
        // responseWrresponseWrapperapper = utilityIndex.factory.mapToObj(responseWrapper);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET),responseWrapper);
        
    } catch (error) {
        utilityIndex.response(res, statusCodes.INTERNAL_SERVER_ERROR, configIndex.message.F_ERROR_PROCESS(configIndex.message.REPORT_ERROR,error));
    }
}
calculateGHGOutput =  async (req,responseWrapper,yearStr,toYear, unit, ghgInputList) => {
    if(yearStr > toYear) {
        return;
    }
    var reportTemplate = Object.assign({},ReportTemplate);
    // get all the subSectors for individual calculation
    var url = configIndex.constants.API_GHG_SECTOR_MAPPING+"?requestType=subSector";
    var subSectorsList =  await utilityIndex.restCallUtility.getCall(req,url);// api call 
    subSectorsList = subSectorsList.data.data;// extracting data
    // loop in each subsector to calculate individual data
    console.log("subSectorsList   T1:",subSectorsList);
    // filter out subSectors REPORT_SKIP_SUB_SECTOR
    subSectorsList = subSectorsList.filter(subSector=> {
        return configIndex.constants.REPORT_SKIP_SUB_SECTOR.indexOf(subSector) == -1;
    });
    // console.log("subSectorsList   T2:",subSectorsList);
    // console.log("Report template data   T1:",reportTemplate);
    var subSectorProcessCount = 0;
    await calculateSubSectorEmission(req,reportTemplate,yearStr, ghgInputList,subSectorsList,subSectorProcessCount,unit);
    
    // console.log("Report template data   T2:",reportTemplate);
    responseWrapper[yearStr] = reportTemplate;
    await calculateGHGOutput(req,responseWrapper,++yearStr,toYear, unit, ghgInputList);
}
calculateSubSectorEmission = async (req,reportTemplate,yearStr, ghgInputList,subSectorsList,subSectorProcessCount,unit)=> {
    if(subSectorProcessCount > subSectorsList.length) {
        return;
    }
    var subSector = subSectorsList[subSectorProcessCount];
    switch (subSector) {
        case "1.A.1-Energy Industries":
        case "1.A.2-Manufacturing Industries and Construction":
        case "1.A.3-Transport":
        case "1.A.4-Other Sectors":
            // get records with entity GHG_INPUT_ENERGY GHG INPUT>ENERGY
            var energyListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_ENERGY);// get the records with entity GHG INPUT>ENERGY
            var energyIndMap = await filterGhgRecordBySubSector(energyListHolder,subSector);
            await calculateEnergyEmissions_v1(req,reportTemplate,subSector,energyIndMap,unit);
            break;
        case "1.B.2-Oil and Natural Gas":
            // get records with entity GHG INPUT>NATURAL GAS
            
            var gasListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_GAS);// get the records with entity GHG INPUT>NATURAL GAS
            var gasIndMap = await filterGhgRecordBySubSector(gasListHolder,subSector);
            await calculateGasEmissions(req,reportTemplate,subSector,gasIndMap,unit);
            break;
        case "2.A.1-Cement Production":
            // get records with entity GHG INPUT>CEMENT
            var cementListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_CEMENT);// get the records with entity GHG_INPUT_CEMENT
            var cementIndMap = await filterGhgRecordBySubSector(cementListHolder,subSector);
            await calculateCementEmissions_v1(req,reportTemplate,subSector,cementIndMap,unit);
            break;
        case "2.A.2-Lime Production":
            // get records with entity "GHG INPUT>LIME",
            var limeListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_LIME);// get the records with entity GHG_INPUT_LIME
            var limeIndMap = await filterGhgRecordBySubSector(limeListHolder,subSector);
            await calculateLimeEmissions_v1(req,reportTemplate,subSector,limeIndMap,unit);
            break;
        case "2.D.1-Lubricant Use":
            // get records with entity GHG_INPUT_LUBRICANT :  "GHG INPUT>LUBRICANT",
            var lubricantListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_LUBRICANT);// get the records with entity GHG INPUT>LUBRICANT
            var lubricantIndMap = await filterGhgRecordBySubSector(lubricantListHolder,subSector);
            await calculateLubricantEmissions_v1(req,reportTemplate,subSector,lubricantIndMap,unit);
            break;
        case "2.D.3-Solvent Use":
            // get records with entity GHG_INPUT_SOLVENT:"GHG INPUT>SOLVENT USE"
            var solventListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_SOLVENT);// get the records with entity GHG INPUT>SOLVENT USE
            var solventIndMap = await filterGhgRecordBySubSector(solventListHolder,subSector);
            await calculateSolventEmissions_v1(req,reportTemplate,subSector,solventIndMap,unit);
            break;
        case "2.F.1-Refrigeration and Air Conditioning":
            // get records with entity GHG_INPUT_REFRIGERATION:"GHG INPUT>REFRIGERATION"
            var refrigerationListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_REFRIGERATION);// get the records with entity GHG INPUT>REFRIGERATION
            var refrigerationMap = await filterGhgRecordBySubSector(refrigerationListHolder,subSector);
            await calculateRefrigerationEmissions_v1(req,reportTemplate,subSector,refrigerationMap,unit);
            break;
        case "4.A-Solid Waste Disposal":
            // get records with entity GHG_INPUT_SOLID_WASTE:"GHG INPUT>SOLID WASTE DISPOSAL"
            var solidWasteListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_SOLID_WASTE);// get the records with entity GHG INPUT>SOLID WASTE DISPOSAL
            var solidWasteMap = await filterGhgRecordBySubSector(solidWasteListHolder,subSector);
            await calculateSolidWasteEmissions_v1(req,reportTemplate,subSector,solidWasteMap,unit);
            break;
        case "4.B-Biological Treatment":
            // get records with entity GHG_INPUT_BIOLOGICAL:"GHG INPUT>BIOLOGICAL TREATEMENT"
            var biologicalListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_BIOLOGICAL);// get the records with entity GHG INPUT>BIOLOGICAL TREATEMENT
            var biologicalMap = await filterGhgRecordBySubSector(biologicalListHolder,subSector);
            await calculateBiologicalEmissions_v1(req,reportTemplate,subSector,biologicalMap,unit);
            break;
        case "3.A.1-Enteric Fermentation":
            // get records with entity GHG_INPUT_ENTERIC:"GHG INPUT>ENTERIC FERMENTATION"
            var entericFermentationListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_ENTERIC);// get the records with entity GHG INPUT>ENTERIC FERMENTATION
            var entericFermentationMap = await filterGhgRecordBySubSector(entericFermentationListHolder,subSector);
            await calculateEntericEmissions_v1(req,reportTemplate,subSector,entericFermentationMap,unit);
            break;
        case "3.A.2-Manure Management":
            // get records with entity GHG_INPUT_MANURE_MANAGEMENT :  "GHG INPUT>MANURE MANAGEMENT"
            var manureManagementListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_MANURE_MANAGEMENT);// get the records with entity GHG INPUT>MANURE MANAGEMENT
            var manureManagementMap = await filterGhgRecordBySubSector(manureManagementListHolder,subSector);
            await calculateMMEmissions_v1(req,reportTemplate,yearStr,subSector,manureManagementMap,unit);
            break;
        case "3.B.1-Forest Land":
            // get records with entity GHG_INPUT_FOREST:"GHG INPUT>FOREST LAND"
            var forestListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_FOREST);// get the records with entity GHG INPUT>FOREST LAND
            var forestMap = await filterGhgRecordBySubSector(forestListHolder,subSector);
            await calculateForestEmissions_v1(req,reportTemplate,subSector,forestMap,unit);
            break;
        case "3.B.2-Cropland":
            // get records with entity GHG_INPUT_CROPLAND:"GHG INPUT>CROPLAND"
            var cropLandListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_CROPLAND);// get the records with entity GHG INPUT>CROPLAND
            var cropLandMap = await filterGhgRecordBySubSector(cropLandListHolder,subSector);
            await calculateCroplandEmissions_v1(req,reportTemplate,subSector,cropLandMap,unit);
            break;
        case "3.B.3-Grassland":
            // get records with entity GHG_INPUT_GRASSLAND:"GHG INPUT>GRASSLAND"
            var grassLandListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_GRASSLAND);// get the records with entity GHG INPUT>GRASSLAND
            var grassLandMap = await filterGhgRecordBySubSector(grassLandListHolder,subSector);
            await calculateGrasslandEmissions_v1(req,reportTemplate,subSector,grassLandMap,unit);
            break;
        case "3.B.4-Wetlands":
            // get records with entity GHG_INPUT_WETLANDS:"GHG INPUT>WETLANDS",
            var wetlandListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_WETLANDS);// get the records with entity GHG INPUT>WETLANDS
            var wetLandMap = await filterGhgRecordBySubSector(wetlandListHolder,subSector);
            await calculateWetlandEmissions_v1(req,reportTemplate,subSector,wetLandMap,unit);
            break;
        case "3.B.5-Settlements":
            // get records with entity GHG_INPUT_SETTLEMENTS:"GHG INPUT>SETTLEMENTS",
            var settlementListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_SETTLEMENTS);// get the records with entity GHG INPUT>SETTLEMENTS
            var settlementMap = await filterGhgRecordBySubSector(settlementListHolder,subSector);
            await calculateSettlementEmissions_v1(req,reportTemplate,subSector,settlementMap,unit);
            break;
        case "3.B.6-Other Land":
            // get records with entity GHG_INPUT_OTHER_LAND :  "GHG INPUT>OTHER LAND"
            var otherLandListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_OTHER_LAND);// get the records with entity GHG INPUT>OTHER LAND
            var otherLandMap = await filterGhgRecordBySubSector(otherLandListHolder,subSector);
            await calculateOtherLandEmissions_v1(req,reportTemplate,subSector,otherLandMap,unit);
            break;
        case "3.C.1-Emissions from Biomass Burning":
            // get records with entity GHG_INPUT_BIOMASS_BURNING:"GHG INPUT>BIOMASS BURNING"
            var biomassListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_BIOMASS_BURNING);// get the records with entity GHG INPUT>BIOMASS BURNING
            var biomassMap = await filterGhgRecordBySubSector(biomassListHolder,subSector);
            await calculateBiomassBurningEmissions_v1(req,reportTemplate,subSector,biomassMap,unit);
            break;
        case "3.C.7-Rice Cultivation":
            // get records with entity GHG_INPUT_RICE:"GHG INPUT>RICE"
            var riceListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_RICE);// get the records with entity GHG INPUT>RICE
            var riceMap = await filterGhgRecordBySubSector(riceListHolder,subSector);
            await calculateRiceEmissions_v1(req,reportTemplate,subSector,riceMap,unit);
            break;
        case "3.C.2-Liming":
            // get records with entity GHG_INPUT_LIME:"GHG INPUT>LIME"
            var limeListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_LIME);// get the records with entity GHG INPUT>LIME
            var limeMap = await filterGhgRecordBySubSector(limeListHolder,subSector);
            await calculateLimingEmissions(req,reportTemplate,subSector,limeMap,unit);
            break;
        case "3.C.3-Urea Application":
            // get records with entity GHG_INPUT_UREA:"GHG INPUT>UREA"
            var ureaListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_UREA);// get the records with entity GHG INPUT>UREA
            var ureaMap = await filterGhgRecordBySubSector(ureaListHolder,subSector);
            await calculateUreaEmissions(req,reportTemplate,subSector,ureaMap,unit);
            break;
        case "3.C.4-Direct N2O emissions from managed soils":
            // get records with entity GHG_INPUT_DIRECT_EMISSION:"GHG INPUT>DIRECT N2O EMMISION SOIL"
            var directEmissionListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_DIRECT_EMISSION);// get the records with entity GHG INPUT>DIRECT N2O EMMISION SOIL
            var directEmissionMap = await filterGhgRecordBySubSector(directEmissionListHolder,subSector);
            await calculateDirectN2oManagedEmissions(req,reportTemplate,subSector,directEmissionMap,unit);
            break;
        case "4.D - Wastewater Treatment and Discharge":
            // get records with entity GHG_INPUT_WASTE_WATER:"GHG INPUT>WASTE WATER"
            var wasteWaterListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_WASTE_WATER);// get the records with entity GHG INPUT>WASTE WATER
            var wasteWaterMap = await filterGhgRecordBySubSector(wasteWaterListHolder,subSector);
            await calculateWasteWaterEmissions_v1(req,reportTemplate,subSector,wasteWaterMap,unit);
            break;
        case "2.A.3 - Glass Production":
            // get records with entity GHG_INPUT_GLASS:"GHG INPUT>GLASS"
            var glassListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_GLASS);// get the records with entity GHG INPUT>GLASS
            var glassMap = await filterGhgRecordBySubSector(glassListHolder,subSector);
            await calculateGlassEmissions(req,reportTemplate,subSector,glassMap,unit);
            break;
        case "2.A.4 - Other Process Uses of Carbonates":
            // get records with entity GHG_INPUT_CARBONATE:"GHG INPUT>CARBONATE"
            var carbonateListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_CARBONATE);// get the records with entity GHG INPUT>CARBONATE
            var carbonateMap = await filterGhgRecordBySubSector(carbonateListHolder,subSector);
            await calculateCarbonatesEmissions(req,reportTemplate,subSector,carbonateMap,unit);
            break;
        case "2.B.7 - Soda Ash Production":
            // get records with entity GHG_INPUT_SODA_ASH:"GHG INPUT>SODA_ASH"
            var sodaAshListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_SODA_ASH);// get the records with entity GHG INPUT>SODA_ASH
            var sodaAshMap = await filterGhgRecordBySubSector(sodaAshListHolder,subSector);
            await calculateSodaAshEmissions(req,reportTemplate,subSector,sodaAshMap,unit);
            break;
        case "4.C - Incineration and Open Burning of Waste":
            // get records with entity GHG_INPUT_INCINERATION:"GHG INPUT>INCINERATION"
            var incinerationListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_INCINERATION);// get the records with entity GHG INPUT>INCINERATION
            var incinerationMap = await filterGhgRecordBySubSector(incinerationListHolder,subSector);
            await calculateIncinerationEmissions_v1(req,reportTemplate,subSector,incinerationMap,unit);
            break;
        /* case "3.C.5-Indirect N2O emissions from managed soils":
            // get records with entity GHG_INPUT_INDIRECT_EMISSION:"GHG INPUT>INDIRECT N2O EMMISION SOIL"
            var indirectEmissionListHolder = await filterGhgRecordByEntity(ghgInputList,configIndex.constants.GHG_INPUT_INDIRECT_EMISSION);// get the records with entity GHG INPUT>INDIRECT N2O EMMISION SOIL
            var indirectEmissionMap = await filterGhgRecordBySubSector(indirectEmissionListHolder,subSector);
            await calculateIndirectN2oManagedEmissions(req,reportTemplate,subSector,indirectEmissionMap,unit);
            break; */
        default:
            break;
    }
    calculateSubSectorEmission(req,reportTemplate,yearStr, ghgInputList,subSectorsList,++subSectorProcessCount,unit)
}
calculateIncinerationEmissions_v1 = async (req,reportTemplate,subSector,incinerationMap,unit)=> {
    console.log("calculateIncinerationEmissions  - >>");
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    incinerationMap.forEach(incinerationRec=> {
        // both the records will have only one record, accessing ZERO record
        var incineration = incinerationRec.incinerationData.length ? incinerationRec.incinerationData[0] : null;
		var wasteBurning = incinerationRec.openBurningData.length ? incinerationRec.openBurningData[0]: null ;
        if(incineration && wasteBurning) {
            co2 = setZeroForNull(incineration.wasteIncinerated) * setZeroForNull(incineration.dryMatter) * setZeroForNull(incineration.carbonFraction) * 
					setZeroForNull(incineration.fossilCarbonFraction) * setZeroForNull(incineration.oxidationFactor) * 44/12 / 1000 + wasteBurning.urbanPopulation * setZeroForNull(wasteBurning.wastePerCapita) *  setZeroForNull(wasteBurning.fractionOfPopulation) * setZeroForNull(wasteBurning.fractionOfPopulation) * 
					setZeroForNull(wasteBurning.carbonFraction) * setZeroForNull(wasteBurning.fossilCarbonFraction) * setZeroForNull(wasteBurning.oxidationFactor) * 44/12 / 1000;
        }
    })
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateSodaAshEmissions = async (req,reportTemplate,subSector,sodaAshMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    // get the emission factor of glass from ippu-> emission factor
    var sodaAshEmissionFactor = 0;
    // get ippu emission factor
    if(!ippuEmissionFactorHolder.length) {
        ippuEmissionFactorHolder =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorHolder = ippuEmissionFactorHolder.data.data.emissionFactor || []; // extracting data
    };
    // find emission factory for cement
    ippuEmissionFactorHolder.forEach(ippuEmission=> {
        if(ippuEmission.subSector == "Soda Ash") {
            sodaAshEmissionFactor = ippuEmission.emissionFactor;
        }
    });
    // looping in each waste water record
    sodaAshMap.forEach(sodaAshRec=> {
        //GHG Emissions (tCO2e) = Amount of Soda Ash Produced x Emission Factor Soda
        sodaAshRec.sodaAshData.forEach(sodaAshData=> {
            co2 = co2 + setZeroForNull(sodaAshData.sodaAshProduced) * setZeroForNull(sodaAshEmissionFactor) ;
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateCarbonatesEmissions = async (req,reportTemplate,subSector,carbonateMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    // get the emission factor of glass from ippu-> emission factor
    var co2 = 0.0;
    var ceramicsEmissionFactor = 0;
    var otherSodaAshEmissionFactor = 0;
    var magnesiaEmissionFactor = 0;
    // get ippu emission factor
    if(!ippuEmissionFactorHolder.length) {
        ippuEmissionFactorHolder =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorHolder = ippuEmissionFactorHolder.data.data.emissionFactor || []; // extracting data
    };
    // find emission factor
    ippuEmissionFactorHolder.forEach(ippuEmission=> {
        if(ippuEmission.subSector == "Ceramics") {
            ceramicsEmissionFactor = ippuEmission.emissionFactor;
        } else if(ippuEmission.subSector =="Other Uses of Soda Ash") {
            otherSodaAshEmissionFactor = ippuEmission.emissionFactor;
        } else if(ippuEmission.subSector =="Non Metalurgical Magnesia Production") {
            magnesiaEmissionFactor = ippuEmission.emissionFactor;
        }
    });
    
    // looping in each waste water record
    carbonateMap.forEach(carbonateRec=> {
        var ceramicUse = 0;
        var otherSodaAshUse = 0;
        var magnesiaUse = 0;
        //GHG Emissions (tCO2e) = Amount of Ceramics Produced x Emission Factor for carbonate (ceramic)  + Amount of other uses of soda ash x emission factor carbonate (other uses of soda ash) + Amount of Non Metallurgical Magnesia Production x emission factor carbonate (Non Metallurgical Magnesia Production)
        carbonateRec.carbonateData.forEach(carbonateData=> {
            // get the carbonate consumed data in each record
            if(carbonateData.use == "Ceramics") {
                ceramicUse = carbonateData.carbonateConsumed;
            } else if(carbonateData.use == "Other uses of soda Ash") {
                otherSodaAshUse = carbonateData.carbonateConsumed;
            } else if(carbonateData.use == "Non Metallurgical Magnesia Production") {
                magnesiaUse = carbonateData.carbonateConsumed;
            }
        })
        co2 = co2 + (setZeroForNull(ceramicUse) * setZeroForNull(ceramicsEmissionFactor))
            + (setZeroForNull(otherSodaAshUse) * setZeroForNull(otherSodaAshEmissionFactor))
            + (setZeroForNull(magnesiaUse) * setZeroForNull(otherSodaAshEmissionFactor))
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);

}
calculateGlassEmissions = async (req,reportTemplate,subSector,glassMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    // get the emission factor of glass from ippu-> emission factor
    var co2 = 0.0;
    var glassEmissionFactor = 0;
    // get ippu emission factor
    if(!ippuEmissionFactorHolder.length) {
        ippuEmissionFactorHolder =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorHolder = ippuEmissionFactorHolder.data.data.emissionFactor || []; // extracting data
    };
    // find emission factory for cement
    ippuEmissionFactorHolder.forEach(ippuEmission=> {
        if(ippuEmission.subSector == "Glass") {
            glassEmissionFactor = ippuEmission.emissionFactor;
        }
    });
    // looping in each waste water record
    glassMap.forEach(glassRec=> {
        //GHG Emissions (tCO2e) = Amount of Glass Produced x Emission Factor Glass x Average Annual Cullet Ratio
        glassRec.glassData.forEach(glassData=> {
            co2 = co2 + setZeroForNull(glassData.glassProduced) * setZeroForNull(glassEmissionFactor) * setZeroForNull(glassData.avgAnnualRatio);
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateWasteWaterEmissions_v1 = async (req,reportTemplate,subSector,wasteWaterMap,unit)=> {

    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    // looping in each waste water record
    wasteWaterMap.forEach(wasteWaterRec=> {
        // looping in each cH4Emissions of waste water record
        wasteWaterRec.cH4Emissions.forEach(cH4EmissionsRec =>{
            ch4 = ch4 + cH4EmissionsRec.population + setZeroForNull(cH4EmissionsRec.degradableOrganic)
                        + setZeroForNull(cH4EmissionsRec.correctionFactor) + setZeroForNull(cH4EmissionsRec.methaneProducing)/1000;
        });
        // looping in each cH4Emissions of waste water record
        wasteWaterRec.n2OEmissions.forEach(n2OEmissionsRec =>{
            n2o = n2o + n2OEmissionsRec.population + setZeroForNull(n2OEmissionsRec.perCapitaProtein)
                        + setZeroForNull(n2OEmissionsRec.nitrogenFraction) + setZeroForNull(n2OEmissionsRec.emissionFactor) * 44/28 / 1000; 
        });
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);

}
calculateDirectN2oManagedEmissions = async (req,reportTemplate,subSector,directEmissionMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    directEmissionMap.forEach(directEmissionRec=> {
        var directEmissionData = directEmissionRec.managedSoilData
                                .concat(directEmissionRec.floodedRiceData)
                                .concat(directEmissionRec.organicSoilData)
                                .concat(directEmissionRec.grazedSoilData);

        directEmissionData.forEach(directEmission=> {
            n2o = n2o + setZeroForNull(directEmission.amount) * setZeroForNull(directEmission.emissionFactor) * 44/28;
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateUreaEmissions = async (req,reportTemplate,subSector,ureaMap,unit)=> {
    var co2 = 0.0;
    ureaMap.forEach(ureaRec=> {
        var ureaData = ureaRec.ureaData;
        ureaData.forEach(urea=> {
            co2 = co2+  setZeroForNull(urea.ureaApplied) * setZeroForNull(urea.emissionFactor) *44/12;
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateLimingEmissions = async (req,reportTemplate,subSector,limeMap,unit)=> {
    var co2 = 0.0;
    limeMap.forEach(limeRec=> {
        var limingData = limeRec.limingData;
        limingData.forEach(lime=> {
            co2 = co2 + (setZeroForNull(lime.limeUsed) * setZeroForNull(lime.emissionFactor));
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateRiceEmissions_v1 = async (req,reportTemplate,subSector,riceMap,unit)=> {
    var ch4 = 0.0;
    var calcUpland = 1.0;
    var calcIrrigated = 1.0;
    var calcRainfed = 1.0;
    var calcDeepwater = 1.0;
    var organicUpland = 1.0;
    var organicDeepwater = 1.0;
    var organicIrrigated = 1.0;
    var organicRainfed = 1.0;
    riceMap.forEach(riceRec=> {
        var riceData = riceRec.riceData;
        riceData.forEach(rice=> {
            if(!(rice.ecosystem == "subCat" || rice.ecosystem == "reference")) {
                var upland = checkNullEmpty(rice.upland);
                var irrigated = checkNullEmpty(rice.irrigated);
                var rainfed = checkNullEmpty(rice.rainfed);
                var deepwater = checkNullEmpty(rice.deepwater);
                
                if((rice.ecosystem == "organicAmend" || rice.ecosystem == "cfOrganic")) {
                    organicUpland = organicUpland * upland;
                    organicDeepwater = organicDeepwater * deepwater;
                    organicIrrigated = organicIrrigated * irrigated;
                    organicRainfed = organicRainfed * rainfed;
                }else {
                    calcUpland = calcUpland * upland;
                    calcIrrigated = calcIrrigated * irrigated;
                    calcRainfed = calcRainfed * rainfed;
                    calcDeepwater = calcDeepwater * deepwater;
                }
                    
            }
        })
    });

   
    calcUpland = calcUpland * Math.pow(1+organicUpland, 0.59);
    calcRainfed = calcRainfed * Math.pow(1+organicRainfed, 0.59);
    calcDeepwater= calcDeepwater * Math.pow(1+organicDeepwater, 0.59);
    calcIrrigated = calcIrrigated * Math.pow(1+organicIrrigated, 0.59);
    
    
    ch4 = ch4 + calcUpland + calcIrrigated + calcRainfed + calcDeepwater;
    ch4 = ch4 / 1000;
    await setEmissions_v1(req,reportTemplate,0,ch4,0,subSector,unit);
    
}
calculateBiomassBurningEmissions_v1 = async (req,reportTemplate,subSector,biomassMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    biomassMap.forEach(biomassRec=> {
        var biomassData = biomassRec.biomassData;
        biomassData.forEach(biomassBurning=> {
            co2 = co2 + setZeroForNull(biomassBurning.areaBurnt) * setZeroForNull(biomassBurning.massFuelAvailable) * setZeroForNull(biomassBurning.combustionFactor) * setZeroForNull(biomassBurning.efCO2) / 1000;
            ch4 = ch4 + setZeroForNull(biomassBurning.areaBurnt) * setZeroForNull(biomassBurning.massFuelAvailable) * setZeroForNull(biomassBurning.combustionFactor) * setZeroForNull(biomassBurning.efCH4) / 1000;
            n2o = n2o + setZeroForNull(biomassBurning.areaBurnt) * setZeroForNull(biomassBurning.massFuelAvailable) * setZeroForNull(biomassBurning.combustionFactor) * setZeroForNull(biomassBurning.efNO2) / 1000;	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateOtherLandEmissions_v1 = async (req,reportTemplate,subSector,otherLandMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    otherLandMap.forEach(otherLandRec=> {
        var wetlandData = otherLandRec.wetlandData;// with wetlandData property its saved
        wetlandData.forEach(wetland=> {
            co2 = co2 + setZeroForNull(wetland.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateSettlementEmissions_v1 = async (req,reportTemplate,subSector,settlementMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    settlementMap.forEach(settlementRec=> {
        var wetlandData = settlementRec.wetlandData;// with wetlandData property its saved
        wetlandData.forEach(wetland=> {
            co2 = co2 + setZeroForNull(wetland.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateWetlandEmissions_v1 = async (req,reportTemplate,subSector,wetLandMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    wetLandMap.forEach(wetLandRec=> {
        var wetlandData = wetLandRec.wetlandData;
        wetlandData.forEach(wetland=> {
            co2 = co2 + setZeroForNull(wetland.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateGrasslandEmissions_v1 = async (req,reportTemplate,subSector,grassLandMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    grassLandMap.forEach(grassLandRec=> {
        var grasslandData = grassLandRec.grasslandData;
        grasslandData.forEach(grassland=> {
            co2 = co2 + setZeroForNull(grassland.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateCroplandEmissions_v1 = async (req,reportTemplate,subSector,cropLandMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    cropLandMap.forEach(cropLandRec=> {
        var cropLandData = cropLandRec.croplandData;
        cropLandData.forEach(cropLand=> {
            co2 = co2 + setZeroForNull(cropLand.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateForestEmissions_v1 = async (req,reportTemplate,subSector,forestMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    forestMap.forEach(forestRec=> {
        var forestData = forestRec.forestData;
        forestData.forEach(forestLand=> {
            co2 = co2 + setZeroForNull(forestLand.ghgEmissions);	
        })
    });
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateMMEmissions_v1 = async (req,reportTemplate,yearStr,subSector,manureManagementMap,unit)=> {
    // get database afolu emission factor
    var livestockDatabaseList = await utilityIndex.restCallUtility.getCall(req, configIndex.constants.API_DATABASE_AFOLU_LIVE_STOCK_EMISSION_FACTOR)// api call 
    livestockDatabaseList = livestockDatabaseList.data.data.liveStockData;

    // get afolu population by year
    var livestockPopulationList = await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_AFOLU_LIVE_STOCK_POPULATION+"?inventoryYear="+yearStr);
    livestockPopulationList = livestockPopulationList.data.data ? livestockPopulationList.data.data.populationData:[];
    
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    // no use of record manureManagementMap
    livestockPopulationList.forEach(population=> {
        // get emission factor details as per the population`s category
        var indexFound = _.findIndex(livestockDatabaseList, function(o)  { 
            return o.livestock == population.category; 
        });
        if(indexFound != -1) {
            var livestockDatabase = livestockDatabaseList[indexFound];
            ch4 = livestockDatabase.efManureManagement * population.heads / 1000;
            n2o = population.heads * livestockDatabase.nExcretionRate * livestockDatabase.typicalAnimalMass * livestockDatabase.nitrogenExcretionManaged * livestockDatabase.efDirectN2OEmissions * 365 * 44 / 28 / 100000000;
        }
    })
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateEntericEmissions_v1 = async (req,reportTemplate,subSector,entericFermentationMap,unit)=> {
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpMapResponse = gwpMapResponse.data.data.gwpData; // extracting data
    
    var indexFound = _.findIndex(gwpMapResponse, function(o)  { 
        return o.gas == "Methane"; 
    });
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    entericFermentationMap.forEach(entericFermentationRec=> {
        var entericFermentationData = entericFermentationRec.entericFermentationData;
        entericFermentationData.forEach(enteric=> {
            if(indexFound!= -1 && gwpMapResponse[indexFound].gwp != 0) {
                ch4 = ch4 + setZeroForNull(enteric.ghgEmissions) / gwpMapResponse[indexFound].gwp;
            }
        })
    })
    
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateBiologicalEmissions_v1 = async (req,reportTemplate,subSector,biologicalMap,unit)=> {
    var co2 = 0.0;
    biologicalMap.forEach(biologicalRec=> {
        var biologicalData = biologicalRec.wasteData;
        biologicalData.forEach(biological=> {
            co2 = setZeroForNull(biological.amountOfWaste) * setZeroForNull(biological.emissionFactor) / 1000;
        })
    })
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateSolidWasteEmissions_v1 = async (req,reportTemplate,subSector,solidWasteMap,unit)=> {
    var ch4 = 0;
    solidWasteMap.forEach(solidWasteRec=> {
        var solidWasteData = solidWasteRec.solidWasteData;
        solidWasteData.forEach(solidWaste=> {

            ch4 = solidWaste.urbanPopulation == null ? 0 : solidWaste.urbanPopulation * setZeroForNull(solidWaste.wastePerCapita) * setZeroForNull(solidWaste.fractionOfWaste) * setZeroForNull(solidWaste.cH4Generation) / 1000000;
        })
    })
    await setEmissions_v1(req,reportTemplate,0,ch4,0,subSector,unit);
}
calculateRefrigerationEmissions_v1 = async (req,reportTemplate,subSector,refrigerationMap,unit)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpMapResponse = gwpMapResponse.data.data.gwpData; // extracting data
    refrigerationMap.forEach(refrigerationRec=> {
        // concatinating both air and mobile
        refrigerationData = refrigerationRec.refrigerationAirConditioning.concat(refrigerationRec.mobileAirConditioning);
        refrigerationData.forEach(refrigeration=> {
            // find index of gas in gwp database list
            var indexFound = _.findIndex(gwpMapResponse, function(o)  { 
                return o.gas == refrigeration.gasConsumed; 
            });
            if(indexFound != -1) {
                co2 = co2 + setZeroForNull(refrigeration.amount) * setZeroForNull(gwpMapResponse[indexFound].gwp);
            }
        });
    });
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateSolventEmissions_v1 = async (req,reportTemplate,subSector,solventIndMap,unit)=> {
    var co2 = 0.0;
    solventIndMap.forEach(solventRec=> {
        var solventData = solventRec.solventData;
        solventData.forEach(solvent=> {
            co2 = co2 + setZeroForNull(solvent.amountConsumed) * setZeroForNull(solvent.carbonContent) * setZeroForNull(solvent.fractionOxidised) * 44/12;
        });
    });
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateLubricantEmissions_v1 = async (req,reportTemplate,subSector,lubricantIndMap,unit)=> {
    var co2 = 0.0;
    lubricantIndMap.forEach(lubricantRec=> {
        var lubricantData = lubricantRec.lubricantData;
        lubricantData.forEach(lubricant=> {
            co2 = co2 + setZeroForNull(lubricant.amountConsumed) * setZeroForNull(lubricant.carbonContent) * setZeroForNull(lubricant.fractionOxidised) * 44/12;
        });
    });
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateLimeEmissions_v1 = async (req,reportTemplate,subSector,limeIndMap,unit)=> {
    var co2 = 0.0;
    var limeEmissionFactor = 0;
    // get ippu emission factor
    if(!ippuEmissionFactorHolder.length) {
        ippuEmissionFactorHolder =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorHolder = ippuEmissionFactorHolder.data.data.emissionFactor || []; // extracting data
    };
    // find emission factory for cement
    ippuEmissionFactorHolder.forEach(ippuEmission=> {
        if(ippuEmission.subSector == "Lime") {
            limeEmissionFactor = ippuEmission.emissionFactor;
        }
    });
    limeIndMap.forEach(limeRec=>{
        // loop in each lime data
        var limeDataList = limeRec.limeData;
        limeDataList.forEach(lime=> {
            co2 = co2 + (setZeroForNull(lime.amountProduced) * setZeroForNull(limeEmissionFactor));
        })
    })
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);
}
calculateCementEmissions_v1 = async (req,reportTemplate,subSector,cementIndMap,unit)=> {
    var cementEmissionFactor = null;
    // get ippu emission factor
    if(!ippuEmissionFactorHolder.length) {
        ippuEmissionFactorHolder =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorHolder = ippuEmissionFactorHolder.data.data.emissionFactor || []; // extracting data
    };
    // find emission factory for cement
    ippuEmissionFactorHolder.forEach(ippuEmission=> {
        if(ippuEmission.subSector == "Cement") {
            cementEmissionFactor = ippuEmission.emissionFactor;
        }
    });

    var co2 = 0.0;
    var massOfClinkerConsumed = 0.0;
    cementIndMap.forEach(cementRec=> {
        var cementData = cementRec.cementData;
        cementData.forEach(cement=> {
            massOfClinkerConsumed = massOfClinkerConsumed + setZeroForNull((cement.amountProduced) * setZeroForNull(cement.clinkerFraction/100));
        });

    });
    var massOfClinkerProduced = massOfClinkerConsumed;
    cementIndMap.forEach(cementRec=> {
        var clinker = cementRec.clinkerData[0];
        if(clinker !=null) {
            massOfClinkerProduced = massOfClinkerConsumed + setZeroForNull(clinker.clinkerExport) - setZeroForNull(clinker.clinkerImport);
            
        }
    });
    co2 = massOfClinkerProduced * setZeroForNull(cementEmissionFactor);
    await setEmissions_v1(req,reportTemplate,co2,0,0,subSector,unit);

}
calculateGasEmissions = async (req,reportTemplate,subSector,gasIndMap,unit) => {
    // get the list of database fugitive emission details - API_DATABASE_ENERGY_FUGITIVE
    if(!fugitiveEmissionHolder.length) {
        fugitiveEmissionHolder = await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_ENERGY_FUGITIVE)// api call 
        fugitiveEmissionHolder = fugitiveEmissionHolder.data.data.emissionFactor;
    }
    
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    var processingList = [];  
    var processingList = fugitiveEmissionHolder.filter(fugitiveGas=> {
        return fugitiveGas.category == "Gas Production";
    })

    // loop in gas list of each record
    gasIndMap.forEach(gasInput=> {
        var gasList = gasInput.naturalGasData; // get the natural gas data for each record - 1.B.2-Oil and Natural Gas
        gasList.forEach(gas=> {
            // get the fugitive details for gas category
            var matchedFugitiveGasList = fugitiveEmissionHolder.filter(fugitiveGas=> {
                return fugitiveGas.category == gas.category;
            })
            var co2Fugitive = 0.0;
            var ch4Fugitive = 0.0;
            var n2oFugitive = 0.0;
            matchedFugitiveGasList.forEach(matchedFugitiveGas=> {
                if(gas.category == "Gas Production") {
                    processingList.forEach(processingGas=> {
                        co2Fugitive = co2Fugitive + matchedFugitiveGas.efco2 + processingGas.efco2;
						ch4Fugitive = ch4Fugitive + matchedFugitiveGas.efch4 + processingGas.efch4;
						n2oFugitive = n2oFugitive + matchedFugitiveGas.efn2o + processingGas.efn2o;
                    })
                   
                } else {
					co2Fugitive = co2Fugitive + matchedFugitiveGas.efco2 ;
					ch4Fugitive = ch4Fugitive + matchedFugitiveGas.efch4 ;
					n2oFugitive = n2oFugitive + matchedFugitiveGas.efn2o ;
				}
            })
            co2 = co2 + (setZeroForNull(gas.amount) * setZeroForNull(co2Fugitive));
			ch4 = ch4 + (setZeroForNull(gas.amount) * setZeroForNull(ch4Fugitive));
			n2o = n2o + (setZeroForNull(gas.amount) * setZeroForNull(n2oFugitive));
        });
        
        
    })
    await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
}
calculateEnergyEmissions_v1 =  async (req,reportTemplate, subSector,energyIndMap,unit)=> {
    var co2 = 0.0;
    ch4 = 0.0;
    n2o = 0.0;
    if(!fuelEmissionFactorHolder.length) {
        fuelEmissionFactorHolder = await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_ENERGY_EMISSION_FACTOR)// api call 
        fuelEmissionFactorHolder = fuelEmissionFactorHolder.data.data.emissionFactor;
    }
    // looping in ghg input record
    energyIndMap.forEach(energyInd=> {
        var energyDataList = energyInd.energyData;
        // looping in energy data records
        energyDataList.forEach(energyData=> {
            var fuelIndex = _.findIndex(fuelEmissionFactorHolder, function(o)  { 
                return o.fuel == energyData.fuel; 
            });
            if(fuelIndex != -1) {
                var fuelMapping = fuelEmissionFactorHolder[fuelIndex];
                if(energyData.amount!=null && fuelMapping.ncv!=null && fuelMapping.efCO2!=null) {
                    co2 = co2 + (energyData.amount * fuelMapping.ncv * fuelMapping.efCO2/Math.pow(10, 6));
                    ch4 = ch4 + (energyData.amount * fuelMapping.ncv * fuelMapping.efCH4/Math.pow(10, 6));
                    n2o = n2o + (energyData.amount * fuelMapping.ncv * fuelMapping.efN2O/Math.pow(10, 6));
                }
            }
        })
       
    });
    // place holder for exception if fuel not found
    // throw utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,
    //     configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_REPORT,configIndex.message.REPORT_FUEL_INDEX_NOT_FOUND));
     await setEmissions_v1(req,reportTemplate,co2,ch4,n2o,subSector,unit);
    
}
setEmissions_v1 = async ( req,reportTemplate,co2Emission,ch4Emission,n2oEmission,subSector,unit) => {
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpMapResponse = gwpMapResponse.data.data; // extracting data
    var total = 0.0;
    
    if(co2Emission!=null) {
        var co2Index = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Carbon Dioxide'; });
        total = total +co2Emission * (co2Index != -1 ? gwpMapResponse.gwpData[co2Index].gwp : 0)//gwpMap.get("Carbon Dioxide");
        
        if(unit == "GgCO2e") {
            co2Emission = co2Emission/1000;
        }
         
    }
        
    if(ch4Emission!=null) {
        var methanIndex = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Methane'; });
        total = total +ch4Emission * (methanIndex != -1 ? gwpMapResponse.gwpData[methanIndex].gwp : 0)//gwpMap.get("Methane");
        
        if(unit == "GgCO2e") {
            ch4Emission = ch4Emission/1000;
        }
        
    }
        
    if(n2oEmission!=null) {
        var nitrousOxideIndex = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Nitrous Oxide'; });
        total = total +n2oEmission * (nitrousOxideIndex != -1 ? gwpMapResponse.gwpData[nitrousOxideIndex].gwp : 0);//gwpMap.get("Nitrous Oxide");
        if(unit == "GgCO2e") {
            n2oEmission = n2oEmission/1000;
        } 
            
    }
    if(unit == "GgCO2e") {
        total = total/1000;
    }
    co2Emission,ch4Emission,n2oEmission
    if(reportTemplate[subSector]) {
        reportTemplate[subSector]["CO2"] = co2Emission;
        reportTemplate[subSector]["CH4"] = ch4Emission;
        reportTemplate[subSector]["N20"] = n2oEmission;
        reportTemplate[subSector]["CO2eq."] = total;
        // console.log("reportTemplate -> "+subSector+" details:  ",reportTemplate[subSector]);
    }
        
}
getGhgEnengyList = (ghgInputList)=> {
    var energyList =  ghgInputList.filter(ghgInput => {
        return ghgInput.entity == configIndex.constants.GHG_INPUT_ENERGY;
    });
    return energyList;
}
getGhgGasList = (ghgInputList)=> {
    var gasList =  ghgInputList.filter(ghgInput => {
        return ghgInput.entity == configIndex.constants.GHG_INPUT_GAS;
    });
    return gasList;
}
getGhgCementList = (ghgInputList)=> {
    var cementList =  ghgInputList.filter(ghgInput => {
        return ghgInput.entity == configIndex.constants.GHG_INPUT_CEMENT;
    });
    return cementList;
}
filterGhgRecordByEntity = async (ghgInputList,entity)=> {
    var filterList =  ghgInputList.filter(ghgInput => {
        return ghgInput.entity == entity;
    });
    return filterList;
}
filterGhgRecordBySubSector = async(ghgInputList,subSector)=> {
    var filterRecords = ghgInputList.filter((record) => {
        if(record && record.subSector && record.subSector.indexOf(subSector) != -1) {
            return record
        }
    });
    return filterRecords;
}

/*
* this is used to get the report from ghg-report collection created by file upload
* This picks the latest record
* a generic method to fetch ghg reports with gaswise and year wise
* params: 
    * reportType : gas/year
    * inventoryYear
*/
exports.getReport = async(req,res,next)=> {
    var rec = null;
    try {
        if(req.query.reportType) {
            if(req.query.reportType == "gas") {
                var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"inventoryYear");
                // validate parent menu in case of signUp enable menu
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.REPORT_ERROR),errorObj));
                    return;
                }
                var query = {inventoryYear:parseInt(req.query.inventoryYear) };
                rec = await ghgIndex.ghgReportInputModel.find(query).sort({lastUpdated: 'desc'}).limit(1).exec();
            } else if(req.query.reportType == "year") {
                // check validation for year wise report
                var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"startYear","endYear");
                // validate parent menu in case of signUp enable menu
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.REPORT_ERROR),errorObj));
                    return;
                }
                rec = await getYearWiseReport(req.query.startYear, req.query.endYear);
            } else {
                utilityIndex.response(res, statusCodes.BAD_REQUEST, configIndex.message.F_ERROR_PROCESS(configIndex.message.REPORT_ERROR,"Invalid report type"));
            }
        } else {
            // being called from ghg file upload page
            // validate inventory year in query parameters
            var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"inventoryYear");
            // validate parent menu in case of signUp enable menu
            if(errorObj.hasError){
                next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.REPORT_ERROR),errorObj));
                return;
            }
            rec = await ghgIndex.ghgReportInputModel.find({inventoryYear: parseInt(req.query.inventoryYear)}).sort({lastUpdated: 'desc'}).limit(1).exec();
            
        }
    } catch (error) {
        utilityIndex.response(res, statusCodes.INTERNAL_SERVER_ERROR, configIndex.message.F_ERROR_PROCESS(configIndex.message.REPORT_ERROR,error));
    }
    utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET),rec);
}
getYearWiseReport = async (startYear, endYear)=> {
    var query = {
        inventoryYear:{"$gte": parseInt(startYear),"$lte": parseInt(endYear)}
    }
    // group based on inventory year and return the latest record
    var pipeline = [
        {"$match": query},
        {"$group":{_id:"$inventoryYear", lastUpdated:{ $max : "$lastUpdated" }}} 
    ];
    var recArr = [];
    var records = await ghgIndex.ghgReportInputModel.aggregate(pipeline).exec();
    for(var i in records) {

        pipeline = [
            {"$match":{inventoryYear:records[i]._id}},
            {"$match":{lastUpdated:records[i].lastUpdated}},
            {"$limit":1}
        ]
        var rec = await ghgIndex.ghgReportInputModel.aggregate(pipeline).exec();
        if(rec[0]) {
            // skip null value records in response
            recArr.push(rec[0]);
        }
    }

    
    return recArr;

}
exports.processGHGReport = async (req,fileUploadData)=> {
    var result = excelToJson({
        sourceFile: fileUploadData.filePath
    });
    var inventoryYear = getInventoryYearFromUploadData(result);
    // validate inventory year to be match with report excel
    if(inventoryYear != req.query.inventoryYear.trim()) {
        var errorObj = {
            inventoryYearSelected: req.query.inventoryYear,
            inventoryYearUploaded: inventoryYear,
        }
        throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.INVALID_INVENTORY_YEAR),errorObj));
    }
    var payload = {
        menuId: fileUploadData.menuId,
        srcId: fileUploadData._id,
        data: result,
        inventoryYear: inventoryYear
    }
    await ghgIndex.ghgReportInputModel(payload).save();
}

/*
* populateTotalGhg - used to add extra column data of total ghg before saving data to db
* Note: populateTotalGhgBK commented as per the logic change of file upload where, all the data should be save as it is passed from UI
*/

/*populateTotalGhgBK = async (req,excelData)=> {
    var gwpCH4 = 0;
    var gwpN2O = 0;
    // skipping validation for "NAI Reporting Table 1" as being already made in getInventoryYearFromUploadData
    // only consider first tab of the excel for calculation as per scope
    var NAI_Table1 = excelData[configIndex.constants.REPORT_TEMPLATE_TAB];
    var i = 0;
    // get api call to fetch gwp data
    var gwpResponse = await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GET_GWP)// api call 
    if(gwpResponse.data && gwpResponse.data.data.gwpData && gwpResponse.data.data.gwpData.length) {
        gwpResponse.data.data.gwpData.forEach(gwpData=> {
            if(gwpData.gas == "Nitrous Oxide") {
                gwpN2O = gwpData.gwp ;
            }
            if(gwpData.gas == "Carbon Dioxide") {
                gwpCH4 = gwpData.gwp ;
            }
        })
    }
    
    while(i < NAI_Table1.length) {
        if(i <= 1) {
            if( i == 1) {
                NAI_Table1[i]["I"] = "Total ghg emmsions(Gg)";  
                NAI_Table1[i]["J"] = "Total ghg emmsions(tCO2)";  
            }
            i++;
            continue; // skipping 1st two index
        } else {
            // B{{i}}+C{{i}}*gwp(CH4)+D{{i}}*gwp(n2o) -> this represents excel cell position
            NAI_Table1[i]["I"] = NAI_Table1[i]["B"] + (gwpCH4 * NAI_Table1[i]["C"]) + (gwpN2O * NAI_Table1[i]["D"]);
            NAI_Table1[i]["J"] = NAI_Table1[i]["I"] * 1000;
        }

        i++;
        console.log("count updated to ",i);
    }
}*/
getInventoryYearFromUploadData = (uploadData)=> {
    if(uploadData && uploadData[configIndex.constants.REPORT_TEMPLATE_TAB]) {
        if(!uploadData[configIndex.constants.REPORT_TEMPLATE_TAB][0] || !uploadData[configIndex.constants.REPORT_TEMPLATE_TAB][0]["A"]) {
            return (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,"Invalid file format", "invalid Inventory year in uploaded file" ));
        }
        // parse for inventory year
        var inventoryYear = uploadData[configIndex.constants.REPORT_TEMPLATE_TAB][0]["A"];
        inventoryYear = inventoryYear.split(":");
        if(inventoryYear.length < 2) {
            return (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,"Invalid file format", "invalid Inventory year in uploaded file" ));
        }
        inventoryYear = parseInt(inventoryYear[1]);
        return inventoryYear;
    } else {
        return (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,"Invalid file format", "invalid data in tab NAI Reporting Table 1" ) );
    }
}
populateGHGOutput =  async (req,yearStr, unit, ghgInputList) => {
    try {
        
        var ghgOutput = new GHGOutput(unit);
        await getEnergyGHG(ghgInputList,ghgOutput);
        await getReferenceEnergyGHG(req,ghgInputList, ghgOutput);
        await getOdsGHG(req,ghgInputList, ghgOutput); // ippu -> product uses as substitutes -> refreziration
        await getNonEnergyGHG(req,ghgInputList, ghgOutput); // ippu-> non energy-> solvent use and lubricant use
        await getLivestockGHG(req,ghgInputList, ghgOutput,yearStr) // Entric fermentation record not showing in approval
        await getLandGHG(req,ghgInputList, ghgOutput); 
        await getAggregateGHG(req,ghgInputList, ghgOutput);
        await getWasteGHG(req,ghgInputList, ghgOutput);
        /*await getMineralGHG(req,ghgInputList, ghgOutput); */

        //GHGEmissions interimIppuEmission = ghgOutput.getNonEnergy().get("2.D-Non-Energy Products from Fuels and Solvent Use");
		/* var interimIppuEmission = addEmissions(ghgOutput.mineral["2.A-Mineral Industry"], ghgOutput.nonEnergy["2.D-Non-Energy Products from Fuels and Solvent Use"]);
		var ippuEmission = addEmissions(interimIppuEmission, ghgOutput.ods["2.F-Product Uses as Substitutes for Ozone Depleting Substances"]);
		
		
		
		
		var ippu=new Map();
		ippu.set("2-Industrial Processes and Product Use", ippuEmission);
		ghgOutput.ippu = (utilityIndex.factory.mapToObj(ippu));
		
		var interimAfoluEmission = addEmissions(ghgOutput.livestock["3.A-Livestock"], ghgOutput.land["3.B-Land"]);
		var afoluEmission = addEmissions(interimAfoluEmission, ghgOutput.aggregate["3.C-Aggregate sources and non-CO2 emissions sources on land"]);
		
		var afolu = new Map();
		afolu.set("3-Agriculture, Forestry, and Other Land Use", afoluEmission);
		ghgOutput.afolu = (utilityIndex.factory.mapToObj(afolu));
		
		var interim1TotalEmission = addEmissions(ghgOutput.energy["1-Energy"], ghgOutput.ippu["2-Industrial Processes and Product Use"]) ;
		var interim2TotalEmission = addEmissions(interim1TotalEmission, ghgOutput.afolu["3-Agriculture, Forestry, and Other Land Use"]);
		var totalEmission = addEmissions(interim2TotalEmission, ghgOutput.waste["4-Waste"]);
		
		var total=new Map();
		total.set("Total", totalEmission);
		ghgOutput.total = utilityIndex.factory.mapToObj(total); */
        
        return ghgOutput;
    } catch (error) {
        console.error("populateGHGOutput error",error);
    }

}
getMineralGHG = async (req,ghgInputList, ghgOutput)=> {
    var mineral=new Map();
    var cement=new Map();
    var lime=new Map();
    
    setDefaultValue(mineral, "2.A-Mineral Industry");
    setDefaultValue(cement, "2.A.1-Cement Production");
    setDefaultValue(lime, "2.A.2-Lime Production");
    
    var limeList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_LIME}).exec();
    if(limeList && limeList.length) {
        var ghgInput = limeList[0];
        var ghgEmissions = new GHGEmissions();
        ghgEmissions.unit = (ghgOutput.unit);
        var ippuEmissionFactorRes =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorRes = ippuEmissionFactorRes.data.data; // extracting data
        var limeIndex = _.findIndex(ippuEmissionFactorRes.emissionFactor, function(o) { return o.subSector == 'Lime'; });
        var limeData = ippuEmissionFactorRes.emissionFactor[limeIndex];
        await calculateLimeEmissions(req,limeData, ghgInput, ghgEmissions);
        lime.set(ghgInput.subSector,ghgEmissions);
        mineral.set(ghgInput.category, ghgEmissions);
    }
    
    var cementList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_CEMENT}).exec();
    if(cementList && cementList.length) {
        var ghgInput = cementList[0];
        var ghgEmissions = new GHGEmissions();
        ghgEmissions.unit = (ghgOutput.unit);
        var ippuEmissionFactorRes =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_EMISSION_FACTOR)// api call 
        ippuEmissionFactorRes = ippuEmissionFactorRes.data.data; // extracting data
        var cementIndex = _.findIndex(ippuEmissionFactorRes.emissionFactor, function(o) { return o.subSector == 'Cement'; });
        var cementEmissionFactor = ippuEmissionFactorRes.emissionFactor[cementIndex];
        await calculateCementEmissions(req,cementEmissionFactor, ghgInput, ghgEmissions);
        cement.set(ghgInput.subSector,ghgEmissions);
        
        var rolledUp = addEmissions(mineral.get(ghgInput.category), ghgEmissions);
        mineral.set(ghgInput.category, rolledUp);
    
    }
    ghgOutput.lime = utilityIndex.factory.mapToObj(lime);
    ghgOutput.cement = utilityIndex.factory.mapToObj(cement);
    ghgOutput.mineral = utilityIndex.factory.mapToObj(mineral);	
}
calculateCementEmissions = async (req,cementEmissionFactor, ghgInput, ghgEmissions)=> {
    var co2 = 0.0;
    var cementList = ghgInput.cementData;
    var clinker = ghgInput.clinkerData[0];  // there will be one record only
    var massOfClinkerConsumed = 0.0;
    
    
    if(cementList  && cementList.length) {
        for(var i in cementList) {
            massOfClinkerConsumed = massOfClinkerConsumed + setZeroForNull((cementList[i].amountProduced) * setZeroForNull(cementList[i].clinkerFraction/100));
        }	
    }
    
    var massOfClinkerProduced = massOfClinkerConsumed;
    if(clinker) {
        massOfClinkerProduced = massOfClinkerConsumed + setZeroForNull(clinker.clinkerExport) - setZeroForNull(clinker.clinkerImport);
        
    }
    
    co2 = massOfClinkerProduced * setZeroForNull(emissionFactor);
    await setEmissions(req,co2,0.0,0.0,ghgEmissions);
}
calculateLimeEmissions = async (req,limeData, ghgInput, ghgEmissions)=> {
    var co2 = 0.0;
    var limeList = ghgInput.limeData;
    if(limeList && limeList.length) {
        for(var i in limeList) {
            co2 = co2 + (setZeroForNull(limeList[i].amountProduced) * setZeroForNull(limeData.emissionFactor));
        }
        await setEmissions(req,co2,0.0,0.0,ghgEmissions);
    }
}
getWasteGHG = async (req,ghgInputList, ghgOutput)=> {
    var waste = new Map();
    setDefaultValue(waste, "4-Waste");
    var solid = new Map();
    
    var solidList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_SOLID_WASTE}).exec();
    if(solidList && solidList.length) {
        var ghgInput = solidList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateSolidWasteEmissions( req,ghgInput, ghgEmissions);
        solid.set(ghgInput.subSector,ghgEmissions);
        waste.set(ghgInput.subSector, ghgEmissions);
    }else {
        setDefaultValue(solid, "4.A-Solid Waste Disposal");
    }
    
    var biological = new Map();
    
    var biologicalList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_BIOLOGICAL}).exec();
    if(biologicalList && biologicalList.length) {
        var ghgInput = biologicalList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateBiologicalEmissions(req,ghgInput, ghgEmissions);
        biological.set(ghgInput.subSector,ghgEmissions);
        var rolledUp = addEmissions(waste.get(ghgInput.sector), ghgEmissions);
        waste.set(ghgInput.sector, rolledUp);
    
    }else {
        setDefaultValue(biological, "4.B-Biological Treatment");
    }
    
    var incineration= new Map();
    
    var incinerationList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_INCINERATION}).exec();
    if(incinerationList && !incinerationList.length) {
        var ghgInput = incineration[0];
        var incineration = ghgInput.incinerationData[0] // will always have single record
        var wasteBurning = ghgInput.openBurningData[0] // will always have single record
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateIncinerationEmissions(req,incineration, wasteBurning, ghgInput, ghgEmissions);
        incineration.set(ghgInput.subSector,ghgEmissions);
        
        var rolledUp = addEmissions(waste.get(ghgInput.sector), ghgEmissions);
        waste.set(ghgInput.sector, rolledUp);
    }
    else {
        setDefaultValue(incineration, "4.C-Incineration and Open Burning of Waste");
    }
    
    var wasteWater = new Map();
    
    var wasteWaterList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_WASTE_WATER}).exec();
    if(wasteWaterList && wasteWaterList.length) {
        var ghgInput = wasteWaterList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateWasteWaterEmissions(req,ghgInput, ghgEmissions);
        wasteWater.set(ghgInput.subSector,ghgEmissions);
        
        var rolledUp = addEmissions(waste.get(ghgInput.sector), ghgEmissions);
        waste.set(ghgInput.sector, rolledUp);
    }else {
        setDefaultValue(wasteWater, "4.D-Domestic Wastewaster Treatment and Discharge");
    }
    
    ghgOutput.solid = (utilityIndex.factory.mapToObj(solid));
    ghgOutput.biological = (utilityIndex.factory.mapToObj(biological));
    ghgOutput.incineration = (utilityIndex.factory.mapToObj(incineration));
    ghgOutput.wasteWater = (utilityIndex.factory.mapToObj(wasteWater));
    ghgOutput.waste = (utilityIndex.factory.mapToObj(waste));
}
calculateWasteWaterEmissions = async (req,ghgInput, ghgEmissions)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    var cH4Emissions = ghgInput.cH4Emissions[0] || null; // there will always be one record
    var n2OEmissions = ghgInput.n2OEmissions[0] || null;// there will always be one record
    
    if(cH4Emissions && n2OEmissions) {
        ch4 = !cH4Emissions ? 0 : ch4 + cH4Emissions.population * setZeroForNull(cH4Emissions.degradableOrganic) * setZeroForNull(cH4Emissions.correctionFactor) * setZeroForNull(cH4Emissions.methaneProducing) / 1000;
        n2o = !n2OEmissions ? 0 : n2o + n2OEmissions.population * setZeroForNull(n2OEmissions.perCapitaProtein) * setZeroForNull(n2OEmissions.nitrogenFraction) * setZeroForNull(n2OEmissions.emissionFactor) * 44/28 / 1000; 
        setEmissions(req,co2,ch4,n2o,ghgEmissions);
    }
}
calculateIncinerationEmissions = async (req,incineration, wasteBurning, ghgInput, ghgEmissions) => {
    var co2 = 0.0;
    if(incineration !=null && wasteBurning !=null) {
        co2 = setZeroForNull(incineration.wasteIncinerated) * setZeroForNull(incineration.dryMatter) * setZeroForNull(incineration.carbonFraction) * 
                setZeroForNull(incineration.fossilCarbonFraction) * setZeroForNull(incineration.oxidationFactor) * 44/12 / 1000 + wasteBurning.urbanPopulation * setZeroForNull(wasteBurning.wastePerCapita) *  setZeroForNull(wasteBurning.fractionOfPopulation) * setZeroForNull(wasteBurning.dryMatterFraction) * 
                setZeroForNull(wasteBurning.carbonFraction) * setZeroForNull(wasteBurning.fossilCarbonFraction) * setZeroForNull(wasteBurning.oxidationFactor) * 44/12 / 1000;
        await setEmissions(req,co2,0.0,0.0,ghgEmissions);
    }
}
calculateBiologicalEmissions = async (ghgInput, ghgEmissions)=> {
    var co2 = 0.0;
    var biological = ghgInput.wasteData;
    if(biological && biological.length) {
        for(var i in biological) {
            co2 = setZeroForNull(biological[i].amountOfWaste) * setZeroForNull(biological[i].emissionFactor) / 1000;
        }
        setEmissions(req,co2,0.0,0.0,ghgEmissions);
    }
}
calculateSolidWasteEmissions = async( req,ghgInput, ghgEmissions)=> {
    var solidWaste = ghgInput.solidWasteData[0];
    if(solidWaste) {
        var ch4 = solidWaste.urbanPopulation == null ? 0 : (solidWaste.urbanPopulation * setZeroForNull(solidWaste.wastePerCapita) * setZeroForNull(solidWaste.fractionOfWaste) * setZeroForNull(solidWaste.cH4Generation) / 1000000);
        setEmissions(req,0.0,ch4,0.0,ghgEmissions);
    }
}
getAggregateGHG = async (req,ghgInputList, ghgOutput) => {
    var aggregate = new Map();
    var biomassBurning = new Map();
    var indirectn2o = new Map();
    var rice = new Map();
    
    setDefaultValue(aggregate, "3.C-Aggregate sources and non-CO2 emissions sources on land");
    setDefaultValue(biomassBurning, "3.C.1-Emissions from Biomass Burning");
    setDefaultValue(indirectn2o, "3.C.6-Indirect N2O emissions from manure management");
    
    var biomassBurningList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_BIOMASS_BURNING}).exec();
    if(biomassBurningList && biomassBurningList.length) {
        var ghgInput = biomassBurningList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateBiomassBurningEmissions(req, ghgInput, ghgEmissions);
        biomassBurning.set(ghgInput.sector,ghgEmissions);
        aggregate.set(ghgInput.category, ghgEmissions);

    }
    
    var indirectn2oList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_INDIRECT_N2O}).exec();
    if(indirectn2oList && indirectn2oList.length) {
        var ghgInput = indirectn2oList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        calculateIndirectN2OEmissions(req,ghgInput, ghgEmissions);
        indirectn2o.set("3.C.6-Indirect N2O emissions from manure management",ghgEmissions);
        var rolledUp = addEmissions(aggregate.get(ghgInput.category), ghgEmissions);
        aggregate.set(ghgInput.category, rolledUp);
    
    }
    
    var riceList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_RICE}).exec();
    if(riceList && riceList.length) {
        var ghgInput = riceList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        calculateRiceEmissions(req,ghgInput, ghgEmissions);
        rice.set(ghgInput.subSector,ghgEmissions);
        var rolledUp = addEmissions(aggregate.get(ghgInput.category), ghgEmissions);
        aggregate.set(ghgInput.category, rolledUp);
    }
    ghgOutput.rice = (utilityIndex.factory.mapToObj(rice));
    ghgOutput.biomassBurning = (utilityIndex.factory.mapToObj(biomassBurning));
    ghgOutput.indirectn2o = (utilityIndex.factory.mapToObj(indirectn2o));
    ghgOutput.aggregate = (utilityIndex.factory.mapToObj(aggregate));
}
calculateRiceEmissions = async (req,ghgInput, ghgEmissions)=> {
    var ch4 = 0.0;
    var calcUpland = 1.0;
    var calcIrrigated = 1.0;
    var calcRainfed = 1.0;
    var calcDeepwater = 1.0;
    var organicUpland = 1.0;
    var organicDeepwater = 1.0;
    var organicIrrigated = 1.0;
    var organicRainfed = 1.0;
    
    var riceList = ghgInput.riceData;
    if(riceList && riceList.length) {
        for(var i in riceList) {
            if(!(riceList[i].ecosystem.equals("subCat") || riceList[i].ecosystem.equals("reference"))) {
                var upland = checkNullEmpty(riceList[i].upland);
                var irrigated = checkNullEmpty(riceList[i].irrigated);
                var rainfed = checkNullEmpty(riceList[i].rainfed);
                var deepwater = checkNullEmpty(riceList[i].deepwater);
                
                if((riceList[i].ecosystem.equals("organicAmend") || riceList[i].ecosystem.equals("cfOrganic"))) {
                    organicUpland = organicUpland * upland;
                    organicDeepwater = organicDeepwater * deepwater;
                    organicIrrigated = organicIrrigated * irrigated;
                    organicRainfed = organicRainfed * rainfed;
                }else {
                    calcUpland = calcUpland * upland;
                    calcIrrigated = calcIrrigated * irrigated;
                    calcRainfed = calcRainfed * rainfed;
                    calcDeepwater = calcDeepwater * deepwater;
                }
                    
            }
            
        }
        calcUpland = calcUpland * Math.pow(1+organicUpland, 0.59);
        calcRainfed = calcRainfed * Math.pow(1+organicRainfed, 0.59);
        calcDeepwater= calcDeepwater * Math.pow(1+organicDeepwater, 0.59);
        calcIrrigated = calcIrrigated * Math.pow(1+organicIrrigated, 0.59);
        
        
        ch4 = ch4 + calcUpland + calcIrrigated + calcRainfed + calcDeepwater;
        ch4 = ch4 / 1000;
        await setEmissions(req,0.0,ch4,0.0,ghgEmissions);
    }
}
calculateIndirectN2OEmissions = async (req,ghgInput, ghgEmissions) => {
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpMapResponse = gwpMapResponse.data.data; // extracting data
    
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var indirectN2OList = ghgInput.indirectN2OData;
    var nitrousOxideIndex = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Nitrous Oxide'; });
        
    if(gwpMapResponse.gwpData[nitrousOxideIndex].gwp != 0)
    for(var i in indirectN2OList) {
            n2o = n2o + setZeroForNull(indirectN2OList[i].ghgEmissions) / gwpMgwpMapResponse.gwpData[nitrousOxideIndex].gwp;				
    }
    
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateBiomassBurningEmissions = async (req,ghgInput, ghgEmissions) => {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var biomassBurningList = ghgInput.biomassData;
    for(var i in biomassBurningList) {

        co2 = co2 + setZeroForNull(biomassBurningList[i].areaBurnt) * setZeroForNull(biomassBurningList[i].massFuelAvailable) * setZeroForNull(biomassBurningList[i].combustionFactor) * setZeroForNull(biomassBurningList[i].efCO2) / 1000;
        ch4 = ch4 + setZeroForNull(biomassBurningList[i].areaBurnt) * setZeroForNull(biomassBurningList[i].massFuelAvailable) * setZeroForNull(biomassBurningList[i].combustionFactor) * setZeroForNull(biomassBurningList[i].efCH4) / 1000;
        n2o = n2o + setZeroForNull(biomassBurningList[i].areaBurnt) * setZeroForNull(biomassBurningList[i].massFuelAvailable) * setZeroForNull(biomassBurningList[i].combustionFactor) * setZeroForNull(biomassBurningList[i].efNO2) / 1000;
    }
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
getLandGHG = async (req,ghgInputList,  ghgOutput) => {
    var land=new Map();
    var  forest=new Map ();
    var  cropland=new Map ();
    var  grassland=new Map ();
    var  wetland=new Map ();
    var  settlement=new Map ();
    var  otherLand=new Map ();
    
    setDefaultValue(land, "3.B-Land");
    setDefaultValue(forest, "3.B.1-Forest Land");
    setDefaultValue(cropland, "3.B.2-Cropland");
    setDefaultValue(grassland, "3.B.3-Grassland");
    setDefaultValue(wetland, "3.B.4-Wetlands");
    setDefaultValue(settlement, "3.B.5-Settlements");
    setDefaultValue(otherLand, "3.B.6-Other Land");

    
    
    var forestLandList = await ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_FOREST}).exec();
    if(forestLandList && forestLandList.length) {
       var ghgInput = forestLandList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateForestEmissions(req,ghgInput,ghgEmissions);
        land.set(ghgInput.category, ghgEmissions);
        forest.set(ghgInput.subCategory,ghgEmissions);
        
    }
    
    var croplandList = await ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_CROPLAND}).exec();
    if(croplandList && croplandList.length) {
        var ghgInput = croplandList[0]
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateCroplandEmissions(req,ghgInput,ghgEmissions);
        cropland.set(ghgInput.subSector,ghgEmissions);
    
        var rolledUp = addEmissions(land.get(ghgInput.category), ghgEmissions);
        land.set(ghgInput.category, rolledUp);
    }
    
    
    var grasslandList = await ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_GRASSLAND}).exec();
    if(grasslandList && grasslandList.length) {
        var ghgInput = grasslandList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateGrasslandEmissions(req,ghgInput,ghgEmissions);
        grassland.set(ghgInput.subSector,ghgEmissions);
    
        var rolledUp = addEmissions(land.get(ghgInput.category), ghgEmissions);
        land.set(ghgInput.category, rolledUp);
    }
    
    
    var wetlandList = await  ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_WETLANDS}).exec();
    if(wetlandList && wetlandList.length) {
        var ghgInput = wetlandList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateWetlandEmissions(req,ghgInput,ghgEmissions);
        wetland.set(ghgInput.subSector,ghgEmissions);
    
        var rolledUp = addEmissions(land.get(ghgInput.category), ghgEmissions);
        land.set(ghgInput.category, rolledUp);
    }
    
    
    var settlementList = await  ghgIndex.ghgDataModel.find({entity:configIndex.GHG_INPUT_SETTLEMENTS}).exec();
    if(settlementList && settlementList.length) {
        var ghgInput = settlementList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        calculateSettlementEmissions(req,ghgInput,ghgEmissions);
        settlement.set(ghgInput.sector,ghgEmissions);
    
        var rolledUp = addEmissions(land.get(ghgInput.category), ghgEmissions);
        land.set(ghgInput.getCategory(), rolledUp);
    }
    
    
    var otherLandList = await  ghgIndex.ghgDataModel.find({entity:configIndex.GHG_INPUT_OTHER_LAND}).exec();
    if(otherLandList  && otherLandList.length) {
        var ghgInput = otherLandList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit(ghgOutput.unit);
        calculateOtherLandEmissions(req,ghgInput,ghgEmissions);
        otherLand.set(ghgInput.sector,ghgEmissions);
    
        var rolledUp = addEmissions(land.get(ghgInput.category), ghgEmissions);
        land.set(ghgInput.category, rolledUp);
    }
    ghgOutput.forest = (utilityIndex.factory.mapToObj(forest));
    ghgOutput.cropland = (utilityIndex.factory.mapToObj(cropland));
    ghgOutput.grassland = (utilityIndex.factory.mapToObj(grassland));
    ghgOutput.wetland = (utilityIndex.factory.mapToObj(wetland));
    ghgOutput.settlement = (utilityIndex.factory.mapToObj(settlement));
    ghgOutput.otherLand = (utilityIndex.factory.mapToObj(otherLand));
    ghgOutput.land = (utilityIndex.factory.mapToObj(land));
    
}
calculateOtherLandEmissions = async (req,ghgInput,ghgEmissions) => {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    ghgInput.otherlandData.forEach((otherLand)=> {
        co2 = co2 + setZeroForNull(otherLand.ghgEmissions);
    })
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateSettlementEmissions = async (req,ghgInput,ghgEmissions)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var settlementList = settlementMap.get(dataId);
    ghgInput.settlementsData.forEach((settlement) => {
        co2 = co2 + setZeroForNull(settlement.ghgEmissions);
    })
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateWetlandEmissions = async (req,ghgInput,ghgEmissions)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    ghgInput.wetlandData.forEach((wetland)=>{
        co2 = co2 + setZeroForNull(wetland.ghgEmissions);		
    })
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateGrasslandEmissions = async (req,ghgInput,ghgEmissions) => {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var grasslandList = ghgInput.grasslandData;
    grasslandList.forEach((grassland) => {
        co2 = co2 + setZeroForNull(grassland.ghgEmissions);	
    })
    
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateCroplandEmissions = async (req,ghgInput,ghgEmissions)=> {
        var co2 = 0.0;
		var ch4 = 0.0;
		var n2o = 0.0;
		
		var croplandList = ghgInput.croplandData;
        for(var i in croplandList) {
            co2 = co2 + setZeroForNull(croplandList[i].ghgEmissions);
        }
		
		await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
calculateForestEmissions = async (req,ghgInput,ghgEmissions) => {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var forestLandList = ghgInput.forestData;
    forestLandList.forEach((forest)=> {
        co2 = co2 + setZeroForNull(forest.ghgEmissions);
    })
    
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);

}
getLivestockGHG = async (req,ghgInputList, ghgOutput, year)=> {
    livestock=new Map();
    enteric=new Map();
    manure=new Map();
    
    setDefaultValue(livestock, "3.A-Livestock");
    setDefaultValue(enteric, "3.A.1-Enteric Fermentation");
    setDefaultValue(manure, "3.A.2-Manure Management");
    
    var entericList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_ENTERIC}).exec();
    if(entericList && entericList.length) {
        var ghgInput = entericList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateEntericEmissions(req,ghgInput, ghgEmissions);
        enteric.set("3.A.1-Enteric Fermentation",ghgEmissions);
        livestock.set(ghgInput.category, ghgEmissions);
    }
    
    var manureList = await ghgIndex.ghgDataModel.find({entity: configIndex.constants.GHG_INPUT_MANURE_MANAGEMENT}).exec();
    if(manureList && manureList.length) {
        var ghgInput = manureList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateMMEmissions(req,ghgInput, ghgEmissions,year);
        manure.set("3.A.2-Manure Management",ghgEmissions);
        var rolledUp = addEmissions(livestock.get(ghgInput.category), ghgEmissions);
        livestock.set(ghgInput.category, rolledUp);
    
    }
    
    ghgOutput.enteric = utilityIndex.factory.mapToObj(enteric);
    ghgOutput.manure = utilityIndex.factory.mapToObj(manure);
    ghgOutput.livestock = utilityIndex.factory.mapToObj(livestock);		
}
calculateMMEmissions = async (req,ghgInput, ghgEmissions,year)=>  {
    var livestockDatabaseRes = await utilityIndex.restCallUtility.getCall(req, configIndex.constants.API_DATABASE_AFOLU_LIVE_STOCK_EMISSION_FACTOR)// api call 
    var livestockDatabaseList = livestockDatabaseRes.data.data.liveStockData;
    var livestockPopulationRes = await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_AFOLU_LIVE_STOCK_POPULATION+"?inventoryYear="+year);
    var livestockPopulationList = livestockPopulationRes.data.data ? livestockPopulationRes.data.data.populationData:[];
    
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var mmList = ghgInput.manureManagementData;
    if(livestockPopulationList && livestockPopulationList.length) {
        livestockPopulationList.forEach((population) =>{
            var livestockDatabaseIndex = _.findIndex(livestockDatabaseList, function(o) { return o.livestock == population.category });
            if(livestockDatabaseIndex != -1) {

                var livestockDatabase =  livestockDatabaseList[livestockDatabaseIndex];
                ch4 = livestockDatabase.efEntericFermentation * population.head / 1000;
                n2o = population.head * livestockDatabase.nExcretionRate * livestockDatabase.typicalAnimalMass * livestockDatabase.nitrogenExcretionManaged * livestockDatabase.efDirectN2OEmissions * 365 * 44 / 28 / 100000000;
            }
        })
        
    }
    
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);

}
calculateEntericEmissions = async (req,ghgInput, ghgEmissions) =>{
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpData = gwpMapResponse.data.data.gwpData; // extracting data
    
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    
    var entericList = ghgInput.entericFermentationData;
    if(entericList && entericList.length) {
        entericList.forEach((enteric)=> {
            var gwpIndex =  _.findIndex(gwpData, function(gwp) { return gwp.gas == "Methane"; });
            if(gwpIndex != -1) {
                ch4 = ch4 + setZeroForNull(enteric.ghgEmissions) / gwpData[gwpIndex].gwp;
            }
        })
        
    }
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);

}
getNonEnergyGHG = async (req,ghgInputList, ghgOutput)=> {
    var nonEnergy = new Map();
    var lubricant = new Map();
    var solvent = new Map();
    
    setDefaultValue(nonEnergy, "2.D-Non-Energy Products from Fuels and Solvent Use");
    setDefaultValue(lubricant, "2.D.1-Lubricant Use");
    setDefaultValue(solvent, "2.D.3-Solvent Use");
    
    var lubricantList = await ghgIndex.ghgDataModel.find( {entity:configIndex.constants.GHG_INPUT_LUBRICANT}).exec();
    if(lubricantList && lubricantList.length) {
        var ghgInput = lubricantList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateLubricantEmissions(req,ghgInput, ghgEmissions);
        lubricant.set(ghgInput.subSector,ghgEmissions);
        nonEnergy.set(ghgInput.category, ghgEmissions);
    }
    
    
    
    var solventList = await ghgIndex.ghgDataModel.find( {entity:configIndex.constants.GHG_INPUT_SOLVENT}).exec();
    if(solventList && solventList.length) {
        var ghgInput = solventList[0];
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateSolventEmissions(req,ghgInput, ghgEmissions);
        solvent.set(ghgInput.subSector,ghgEmissions);
        
        var rolledUp = addEmissions(nonEnergy.get(ghgInput.category), ghgEmissions);
        nonEnergy.set(ghgInput.category, rolledUp);
    
    }
    
    ghgOutput.lubricant = (utilityIndex.factory.mapToObj(lubricant));
    ghgOutput.solvent = (utilityIndex.factory.mapToObj(solvent));
    ghgOutput.nonEnergy = (utilityIndex.factory.mapToObj(nonEnergy)); 
}
addEmissions = (first, second)=> {
    
    var result = new GHGEmissions();
    
    var unit = null;
    
    if(second !=null) {
        unit = second.unit;	
        
        if(second.co2Emission) {
            var co2 = (!first || !first.co2Emission) ?  second.co2Emission : (first.co2Emission + second.co2Emission);
            result.co2Emission = co2; // gas specific formatting to be made from client end
        }else if(first){
            result.co2Emission = (first.co2Emission);	
        }
        
        if(second.ch4Emission) {
            var ch4 = !first || !first.ch4Emission ?  second.ch4Emission : first.ch4Emission + second.ch4Emission;
            result.ch4Emission = ch4; // gas specific formatting to be made from client end
        }else if(first){
            result.ch4Emission = (first.ch4Emission);	
        }
        
        if(second.n2oEmission) {
            var n2o = !first || !first.n2oEmission ?  second.n2oEmission : first.n2oEmission + second.n2oEmission;
            result.n2oEmission = n2o ;// gas specific formatting to be made from client end
        }else if(first){
            result.n2oEmission = (first.n2oEmission);	
        }
        
        if(second.totalEmission) {
            var total = !first || !first.totalEmission ?  second.totalEmission : first.totalEmission + second.totalEmission;
            result.totalEmission = total;// gas specific formatting to be made from client end
        }else if(first){
            result.totalEmission = (first.totalEmission);	
        }
        
    }else if (first){
        result = first;
        
    }
    //result.setUnit(unit);
    
    return result;
}
calculateSolventEmissions = async (req,ghgInput, ghgEmissions) => {
    var co2 = 0.0;
    
    if(ghgInput.solventData  && ghgInput.solventData.length) {
        ghgInput.solventData.forEach((solvent)=> {

            co2 = co2 + setZeroForNull(solvent.amountConsumed) * setZeroForNull(solvent.carbonContent) * setZeroForNull(solvent.fractionOxidised) * 44/12;
        })
        
    }
    await setEmissions(req,co2,0.0,0.0,ghgEmissions);
}
calculateLubricantEmissions = async (req,ghgInput, ghgEmissions) => {
    var co2 = 0.0;
    if(ghgInput.lubricantData && ghgInput.lubricantData.length) {
        ghgInput.lubricantData.forEach((lubricant)=> {

            co2 = co2 + setZeroForNull(lubricant.amountConsumed) * setZeroForNull(lubricant.carbonContent) * setZeroForNull(lubricant.fractionOxidised) * 44/12;
        });
        
    }
    await setEmissions(req,co2,0.0,0.0,ghgEmissions);
}
getOdsGHG = async (req,ghgInputList, ghgOutput)=> {
    var ods = new Map();
    var refrigeration = new Map();
    
    setDefaultValue(ods, "2.F-Product Uses as Substitutes for Ozone Depleting Substances");
    setDefaultValue(refrigeration, "2.F.1-Refrigeration and Air Conditioning");
    
   var refrigerationList = await ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_REFRIGERATION}).exec();
    if(refrigerationList && refrigerationList.length) {
        var ghgInput = refrigerationList[0];
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
        gwpData = gwpMapResponse.data.data.gwpData; // extracting data
        calculateRefrigerationEmissions(req,gwpData,ghgInput,ghgEmissions);
        ods.set(ghgInput.category, ghgEmissions);
        refrigeration.set(ghgInput.subSector,ghgEmissions);
        
    }
    
    ghgOutput.refrigeration = (utilityIndex.factory.mapToObj(refrigeration));
    ghgOutput.ods = (utilityIndex.factory.mapToObj(ods));
}
calculateRefrigerationEmissions = async (req,gwpData,ghgInput,ghgEmissions)=> {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    if(ghgInput && ghgInput.refrigerationAirConditioning.length) {
        ghgInput.refrigerationAirConditioning.forEach(refrigeration => {
           var gwpIndex =  _.findIndex(gwpData, function(gwp) { return gwp.gas == refrigeration.gasConsumed; });
           if(gwpIndex != -1) {
               co2 = co2 + setZeroForNull(refrigeration.amount) * setZeroForNull(gwpData[gwpIndex].gwp);
           }
        });		
    }
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
getReferenceEnergyGHG = async (req,ghgInputList,ghgOutput) => {
    var reference = new Map();
    setDefaultValue(reference, "Energy (Reference Approach)");
    
    var fuelList =  await ghgIndex.ghgFuelModel.find({}).exec();
    // Map<String, GHGFuelMapping> fuelMap = fuelList.stream().collect(Collectors.toMap(GHGFuelMapping::getFuel, Function.identity()));
    var referenceList = await ghgIndex.ghgDataModel.find({entity:configIndex.constants.GHG_INPUT_REFERENCE_ENERGY}).exec();
    if(referenceList && referenceList.length) {
        var ghgInput = referenceList[0];
        
        //Map<Integer, List<GHGInputReferenceEnergy>> referenceMap = getReferenceEnergyDataIds(ghgInputList); 
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = (ghgOutput.unit);
        await calculateReferenceEnergyEmissions(req,ghgInput, ghgEmissions, ghgInputList, fuelList);
        reference.set("Energy (Reference Approach)", ghgEmissions);
        
    }
    ghgOutput.referenceApproach = (utilityIndex.factory.mapToObj(reference))
}
calculateReferenceEnergyEmissions =  async (req,ghgInput, ghgEmissions, ghgInputList, fuelList) => {
    var co2 = 0.0;
    var ch4 = 0.0;
    var n2o = 0.0;
    ghgInput.activityData.forEach((energy) => {
        var fuelMapping = fuelList.filter((fuelObj)=> {
            return (energy.fuel == fuelObj.fuel);
        });
        var netConsumption = setZeroForNull(energy.production) + setZeroForNull(energy.imports) - setZeroForNull(energy.exports) - setZeroForNull(energy.internationalBunkers) - setZeroForNull(energy.stockChange) - setZeroForNull(energy.excludedConsumption);
        
        if(fuelMapping && fuelMapping.length && netConsumption && fuelMapping[0].NCV && fuelMapping[0].EFCO2) {
            co2 = co2 + (netConsumption * fuelMapping[0].NCV * fuelMapping[0].EFCO2/Math.pow(10, 6));
            ch4 = ch4 + (netConsumption * fuelMapping[0].NCV * fuelMapping[0].EFCH4/Math.pow(10, 6));
            n2o = n2o + (netConsumption * fuelMapping[0].NCV * fuelMapping[0].EFN2O/Math.pow(10, 6));
        }
    });
    await setEmissions(req,co2,ch4,n2o,ghgEmissions);
}
function setZeroForNull (value) {
    if (!value) {
        return 0;
    }
    else {
        return value;
    }
}
checkNullEmpty  = (value)=> {
    if (value==null || value.equals("")) {
        return 0;
    }
    else {
        return parseFloat(value);
    }
}
getEnergyGHG = async (ghgInputList,ghgOutput) => {
    var energy=new Map();
    var fuel=new Map();
    var energyInd=new Map();
    var manufacturing=new Map();
    var transport=new Map();
    var others=new Map();
    var memo=new Map();
    var aviation=new Map();
    var water=new Map();

    // setting default values
    setDefaultValue(transport, "1.A.3-Transport"); //$ its sets default value of passed first parameter wrt key passed as 2nd param
    setDefaultValue(energyInd, "1.A.1-Energy Industries");
    setDefaultValue(manufacturing, "1.A.2-Manufacturing Industries and Construction");
    setDefaultValue(water, "1.A.3.d.i-Water-borne Navigation-International");
    setDefaultValue(aviation, "1.A.3.a.i-Civil Aviation-International");
    setDefaultValue(others, "1.A.4-Other Sectors");
    setDefaultValue(fuel, "1.A-Fuel Combustion Activities");
    setDefaultValue(energy, "1-Energy");
    setDefaultValue(memo, "5-Memo Items");

    // get ghg Energy related records from the input list
    var energyList = ghgInputList.filter((record) => {
       if(record && record.entity.indexOf(configIndex.constants.GHG_INPUT_ENERGY) != -1) {
            return record;
       }
    })
    // get fuel list
    var fuelList = await ghgIndex.ghgFuelModel.find({}).exec();
    if(energyList && energyList.length) {
        var energyIndMap = energyList.filter((record) => {
            if(record && record.subSector && record.subSector.indexOf("1.A.1-Energy Industries")) {
                return record
            }
        });
        var manufacturingMap = energyList.filter((record) => {
            if(record && record.subSector && record.subSector.indexOf("1.A.2-Manufacturing Industries and Construction")) {
                return record
            }
        });
        var transportMap = energyList.filter((record) => {
            if(
                record && record.subSector && record.subSector.indexOf("1.A.3-Transport") 
                && (["1.A.3.d.i-Water-borne Navigation-International", "1.A.3.a.i-Civil Aviation-International"]).indexOf(record.subCategory) == -1
            
            ) {
                return record
            }
        });
        var othersMap = energyList.filter((record) => {
            if(record && record.subSector && record.subSector.indexOf("1.A.4-Other Sectors")) {
                return record
            }
        });
        var aviationMap = energyList.filter((record) => {
            if(record && record.subCategory && record.subCategory.indexOf("1.A.3.a.i-Civil Aviation-International")) {
                return record
            }
        });
        var waterMap = energyList.filter((record) => {
            if(record && record.subCategory && record.subCategory.indexOf("1.A.3.d.i-Water-borne Navigation-International")) {
                return record
            }
        });

        await putEnergy(fuel, energyInd, fuelList, energyList, energyIndMap, ghgOutput.unit);

    }
    ghgOutput.energyIndustries = utilityIndex.factory.mapToObj(energyInd);
    ghgOutput.manufacturing = utilityIndex.factory.mapToObj(manufacturing);
    ghgOutput.transport = utilityIndex.factory.mapToObj(transport);
    ghgOutput.others = utilityIndex.factory.mapToObj(others);
    ghgOutput.fuelCombustion = utilityIndex.factory.mapToObj(fuel);
    ghgOutput.energy = utilityIndex.factory.mapToObj(energy);
    
    ghgOutput.memo = utilityIndex.factory.mapToObj(memo);
    ghgOutput.aviation = utilityIndex.factory.mapToObj(aviation);
    ghgOutput.water = utilityIndex.factory.mapToObj(water);
}
setDefaultValue = (map,key)=> {
    map.set(key, new GHGEmissions("0","0","0","0"));
}
// get map object with grouping record based on inventory year
getGhgRecordByYear = async (records) => {
//    if(!records.length) 
//     return;
    var ghgRecordByYear = new Map ();
    for(var i in records) {
        if(!ghgRecordByYear.has(records[i].inventoryYear)) {
            ghgRecordByYear.set(records[i].inventoryYear,[records[i]]);
        }
        else {
            ghgRecordByYear.get(records[i].inventoryYear).push(records[i]);
        }

    }
    return ghgRecordByYear;
}

/* 
* putEnergy
*/
 putEnergy = async (fuel, energyInd, fuelList, energyList, energyIndMap,unit)=> {
    if(energyIndMap !=null && energyIndMap.length) {
        var energyIndList; //
        var subSector = "";
        var category = "";
        energyIndList =  _.intersection(energyIndMap, energyList);
        if(energyIndList.length) {
            subSector = energyIndList[0].subSector;
            category = energyIndList[0].category;
        }
        
        
        var ghgEmissions = new GHGEmissions("0", "0","0","0");
        ghgEmissions.unit = unit;
         await calculateEnergyEmissions(ghgEmissions, energyIndList, fuelList);
        energyInd.set(subSector, ghgEmissions);
        // GHGEmissions rolledUp = addEmissions(fuel.get(category), ghgEmissions);
        // fuel.put(category,rolledUp);
    }
}
calculateEnergyEmissions =  async ( ghgEmission,  energyList ,  fuelList)=> {
    var co2 = 0.0;
    ch4 = 0.0;
    n2o = 0.0;
            
    //List<GHGInputEnergy> energyList = energyMap.get(dataId);
    for(var energyIndex in energyList) {
        for(var energyDataIndex  in energyList[energyIndex].energyData) {
            var fuelIndex = _.findIndex(fuelList, function(o) 
            { 
                return o.fuel == energyList[energyIndex].energyData[energyDataIndex].fuel; 
            });
            if(fuelIndex != -1) {
                var energyData = energyList[energyIndex].energyData[energyDataIndex];
                var fuelMapping = fuelList[fuelIndex];
                if(fuelMapping!=null && energyData.amount!=null && fuelMapping.NCV!=null && fuelMapping.EFCO2!=null) {
                    co2 = co2 + (energyData.amount * fuelMapping.NCV * fuelMapping.EFCO2/Math.pow(10, 6));
                    ch4 = ch4 + (energyData.amount * fuelMapping.NCV * fuelMapping.EFCH4/Math.pow(10, 6));
                    n2o = n2o + (energyData.amount * fuelMapping.NCV * fuelMapping.EFN2O/Math.pow(10, 6));
                }
            }

        }
        
    }
    // place holder for exception if fuel not found
    // throw utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,
    //     configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_REPORT,configIndex.message.REPORT_FUEL_INDEX_NOT_FOUND));
     await setEmissions(req,co2,ch4,n2o,ghgEmission);
    
}

async function setEmissions( req,co2Emission, ch4Emission, n2oEmission,  ghgEmissions) {
    var gwpMapResponse =  await utilityIndex.restCallUtility.getCall(req,configIndex.constants.API_DATABASE_IPPU_GWP)// api call 
    gwpMapResponse = gwpMapResponse.data.data; // extracting data
    var df = 0.0;
    var df2 = 0.0;
    var total = 0.0;
    var unit = ghgEmissions.unit;
    
    if(co2Emission!=null) {
        var co2Index = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Carbon Dioxide'; });
        total = total +co2Emission * (co2Index != -1 ? gwpMapResponse.gwpData[co2Index].gwp : 0)//gwpMap.get("Carbon Dioxide");
        
        if(unit == "GgCO2e") {
            co2Emission = co2Emission/1000;
            ghgEmissions.co2Emission = co2Emission;
        }else {
            ghgEmissions.co2Emission = co2Emission;	
        }
         
    }
        
    if(ch4Emission!=null) {
        var methanIndex = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Methane'; });
        total = total +ch4Emission * (methanIndex != -1 ? gwpMapResponse.gwpData[methanIndex].gwp : 0)//gwpMap.get("Methane");
        
        if(unit == "GgCO2e") {
            ch4Emission = ch4Emission/1000;
            ghgEmissions.ch4Emission = ch4Emission;
        } else {
            ghgEmissions.ch4Emission = ch4Emission;	
        }
        
    }
        
    if(n2oEmission!=null) {
        var nitrousOxideIndex = _.findIndex(gwpMapResponse.gwpData, function(o) { return o.gas == 'Nitrous Oxide'; });
        total = total +n2oEmission * (nitrousOxideIndex != -1 ? gwpMapResponse.gwpData[nitrousOxideIndex].gwp : 0);//gwpMap.get("Nitrous Oxide");
        if(unit == "GgCO2e") {
            n2oEmission = n2oEmission/1000;
            ghgEmissions.n2oEmission = n2oEmission ;
        } else {
            ghgEmissions.n2oEmission = n2oEmission;
        }
            
    }
    if(unit == "GgCO2e") {
        total = total/1000;
        ghgEmissions.total = total;
    } else {
        ghgEmissions.total = total;
    }
        
}