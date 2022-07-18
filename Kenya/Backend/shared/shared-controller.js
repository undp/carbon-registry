const sharedIndex = require(".")
const utilityIndex = require("./../utility");
const configIndex = require("./../config");
const statusCodes = require('http-status-codes').StatusCodes;
const Downloader = require('nodejs-file-downloader');
const seedGHGSector = require("./../seeds/ghg_sector_mapping.json");
const seedGHGFuel = require("./../seeds/ghg_fuel_mapping.json");
const appDataSeed = require("./../seeds/app-data");
const ndcSectorSeed = require("./../seeds/ndc-sector-map");
const ghgIndex = require("./../ghg")
const menuIndex = require("./../menu")
exports.seedGhgSectorMapping = async function(req,res,next) {
    // remove all existing records
    try{
        await ghgIndex.ghgSectorModel.remove({});
        console.log("Removed all records ");
        await ghgIndex.ghgSectorModel.insertMany(seedGHGSector);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'ghg-sector'));
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"ghg-sector"),error));
         return;
    }

}
exports.seedGHGFuelMapping = async function(req,res,next) {
    // remove all existing records
    try{
        await ghgIndex.ghgFuelModel.remove({});
        console.log("Removed all records ");
        await ghgIndex.ghgFuelModel.insertMany(seedGHGFuel);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'ghg-fuel'));
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"ghg-fuel"),error));
         return;
    }

}

/*
* used to save app related constants like drop down values etc
*/
exports.seedAppData = async (req,res,next)=>{
    // remove all existing records
    try{
        await sharedIndex.appDataModel.remove({});
        await sharedIndex.appDataModel.insertMany(appDataSeed);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, 'app-data'));
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,'app-data'),error));
         return;
    }
}
/*
* used to get app data 
* @input : 
    this can any property like element, key, label etc.
    outputValue: null/ attribute value of model

* output:  
    outputValue != null -  will return the array of distinct string of array based on outputValue
    if outputValue = null - return array of matched objects based on filter
*/
exports.getAppData = async (req,res,next)=>{
    // remove all existing records
    var data = null;
    try{
        if(req.query.outputValue != "" && req.query.outputValue) {
            var outputValue = req.query.outputValue;
            delete req.query["outputValue"];
            var response = await sharedIndex.appDataModel.find(req.query).exec();
            data = [];
            response.forEach(res => {
                data.push(res[outputValue]) ;
            });
        }
        else {
            data = await sharedIndex.appDataModel.find(req.query).exec();
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_GET, 'app-data'),data);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,'app-data'),error));
         return;
    }
}

exports.saveAppData = async (req, res, next)=> { 
    try {
        // check if key is existed then dont insert throw error
        var errorObj = utilityIndex.factory.validationFactory(req.body,configIndex.constants.VALIDATE_NULL,"key");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.INVALID_MENU),errorObj));
            return;
        }
        // check if the same key already existed
        rec = await sharedIndex.appDataModel(req.body).save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, 'app-data'),rec);
        
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,'app-data'),error));
        return;
   }
}
exports.addMailTemplate = async function (req, res, next) {
    try{
        var mail = await sharedIndex.mailModel(req.body).save();
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, 'mail'),mail);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,"mail"),error));
    }
}
exports.uploadFiles = async function (req, res, next) {
    try {
        // console.log(req.body);
        if(!req.files[0]) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.REQ_FILE_NOT_FOUND),errorObj));
            return;
        }
        utilityIndex.restCallUtility.setTokenToReq(req,req.query.token);
        console.log(req.files);
        var record = null;
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"menuId");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.INVALID_MENU),errorObj));
            return;
        }
        var data = {
            menuId:req.query.menuId,
            projectId:req.query.projectId,
            dataId:req.query.dataId,
            menuId:req.query.menuId,
            filePath:req.files[0].path,
            fieldName: req.files[0].fieldname,
            key:"file",
            inventoryYear: req.query.inventoryYear,
        };
        
        data = await sharedIndex.appDataModel(data).save();
        await processFileUpload(req,data);
        // processFileUpload
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, configIndex.message.FILE_UPLOAD),data);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_SAVE,configIndex.message.FILE_UPLOAD),error));
    }
}

processFileUpload = async (req,fileUploadData)=> { 
    if(fileUploadData && fileUploadData.menuId == "GHG_reports") {
        // validate data before saving to database
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"inventoryYear");
        if(errorObj.hasError){
            throw (utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,configIndex.message.INVALID_INVENTORY_YEAR),errorObj));
        }
        // read the file content and save it in ghgReport
       await ghgIndex.ghgController.processGHGReport(req,fileUploadData);
    }
}
exports.download = async function (req, res, next) {
    var record = null;
    var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"menuId");
    if(errorObj.hasError){
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.INVALID_MENU),errorObj));
        return;
    }
    // get the latest file against menu id
    var pipeline = [
        {"$match":{menuId:req.query.menuId}},
    ];
    if(req.query.projectId) {
        pipeline.push({"$match":{projectId:req.query.projectId}})
    };
    if(req.query.fieldName) {
        pipeline.push({"$match":{fieldName:req.query.fieldName}})
    };
    
    if(req.query.inventoryYear) {
        pipeline.push({"$match":{inventoryYear:parseInt(req.query.inventoryYear)}}) 
    }
    pipeline.push( {"$sort":{updateDate:-1}},{"$limit":1}) ;

    record =  await sharedIndex.appDataModel.aggregate(pipeline).exec();
    if(record.length) {
        record = record[0];
        res.download(record.filePath)
    }
    else {
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.REQ_FILE_NOT_FOUND),errorObj));
        return;
    }
    
}
exports.downloadTemplate = async function (req, res, next) {
    res.download(configIndex.constants.REPORT_TEMPLATE_PATH);
}
exports.fileByMenu = async function (req, res, next) {
    var record = null;
    var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"menuId");
    if(errorObj.hasError){
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.INVALID_MENU),errorObj));
        return;
    }
    // get the latest file against menu id
    var pipeline = [
        {"$match":{menuId:req.query.menuId}},
    ]
    if(req.query.projectId) {
        pipeline.push({"$match":{projectId:req.query.projectId}})
    };
    if(req.query.fieldName) {
        pipeline.push({"$match":{fieldName:req.query.fieldName}})
    };
    pipeline.push({"$sort":{updateDate:-1}},{"$limit":1});
    record =  await sharedIndex.appDataModel.aggregate(pipeline).exec();
    if(record.length) {
        record = record[0];
    }
    utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, configIndex.message.RECORD_BY_FILTER),record);
}
exports.getRecord = async function (req, res, next) {
    var record = null;
    var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"collection","attr","attrValue");
    if(errorObj.hasError){
        next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.RECORD_BY_FILTER),errorObj));
        return;
    }
    switch(req.query.collection) {
        case configIndex.constants.COLL_MENU:
            var query = {};
            if(req.query.attr == "menuId") {
                Object.assign(query,{menuId:req.query.attrValue})
            }
            console.log(query);
            record = await menuIndex.menuModel.findOne(query).exec();
        break;
        default:
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,configIndex.message.RECORD_BY_FILTER),"Invalid request"));
            return;
    }
    // get the latest file against menu id
    utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_SAVE, configIndex.message.RECORD_BY_FILTER),record);
    
}
exports.getEntityIdByMenu = (menu)=> {
    switch(menu) {
        
    }
}
/* exports.downloadInServer = async function (req, res, next) {
    const downloader = new Downloader({     
        url: '/uploads/-1622154528827.jpeg',     
        directory: "./downloads/",//Sub directories will also be automatically created if they do not exist.  
        onProgress:function(percentage,chunk,remainingSize){//Gets called with each chunk.
             console.log('% ',percentage)   
             console.log('Current chunk of data: ',chunk)   
             console.log('Remaining bytes: ',remainingSize)   
        }         
      })    
     
     try {
       await downloader.download();   
     } catch (error) {
        console.log(error)
     }
} */

exports.preFillData = (menu,payload) => {
    // add entity
    payload.entity = menu.entity;
    switch(menu.menuId) {
        case "GHG_Energy_Reference_Approach":
            payload.category = "Reference";
            payload.subSector = "Reference";
            payload.subCategory = "Reference";
           break; 
        case "GHG_AFOLU_Livestock_EntericFermentation":
        case "GHG_AFOLU_Livestock_ManureManagement":
        case "GHG_AFOLU_Land_ForestLand":
        case "GHG_AFOLU_Land_Cropland":
        case "GHG_AFOLU_Land_Grassland":
        case "GHG_AFOLU_Land_Wetland":
        case "GHG_AFOLU_Land_Settlements":
        case "GHG_AFOLU_Land_OtherLands":
        case "GHG_AFOLU_Aggregate_nonCO2_Emissions_Biomass":
        case "GHG_AFOLU_Aggregate_nonCO2_Rice_Cultivation":
        case "GHG_IPPU_Mineral_Industry_Cement_Production":
        case "GHG_IPPU_Mineral_Industry_Lime_Production":
        case "GHG_IPPU_Non_Energy_product_Lubricant_Use":
        case "GHG_IPPU_Non_Energy_product_Solvent_Use":
        case "GHG_IPPU_Product_Substitutes_Refrigeration_Air":
            payload.subCategory = payload.subSector;
           break; 
    }
    return payload;
}
exports.getEntityId = (menuId,payload) => {
    var entityId = "";
    switch(menuId) {
        case "GHG_Energy_Reference_Approach":
            entityId = entityId.concat(payload.sector)
            .concat(">")
            .concat("Reference")
            .concat(">")
            .concat(payload.inventoryYear)
        break; 
        case "NDC_Actions":
            
        break; 
       

        default:
            entityId = entityId.concat(payload.sector)
            .concat(">")
            .concat(payload.category)
            .concat(">")
            .concat(payload.subSector)
            .concat(">");

            if(payload.subCategory) {
                entityId = entityId
                .concat(payload.subCategory)
                .concat(">");
            };
            entityId = entityId.concat(payload.inventoryYear);
    }
    return entityId;
}

/* 
* seedNDCSectorMapping : Used to seed NDC sector mapping details 
*/
exports.seedNDCSectorMapping = async (req, res, next)=> {
    // remove all existing records
    try{
        await sharedIndex.ndcSectorMapModel.remove({});
        await sharedIndex.ndcSectorMapModel.insertMany(ndcSectorSeed);
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, 'ndc-sector-map'));
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE,'ndc-sector-map'),error));
         return;
    }
}
/* 
* getNDCSectorMapping : used to give different output 
* if outputValue = "type"  - return distinct types
* if outputValue = "sector"  - validate type in request and send distinct sectors
* if outputValue = "subSector"  - validate type and sector in request and send distinct subSector
* if distinct = true return distinct values, else return array of objects
*/
exports.getNDCSectorMapping = async (req,res,next)=>{
    // remove all existing records
    var data = null;
    try{
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"outputValue");
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,"Sector Details"),errorObj));
            return;
        }
        switch (req.query.outputValue) {
            case "type":
                if(req.query.distinct && req.query.distinct === "true") {
                    data = await sharedIndex.ndcSectorMapModel.find({}).distinct(req.query.outputValue.trim()).exec();
                    data.push(configIndex.constants.DIVISION_CROSS_CUTTING); // adding explicite division for cross cutting
                    //data.push(configIndex.constants.DIVISION_ENABLERS); // adding explicite division for enablers
                }else {
                    data = await sharedIndex.ndcSectorMapModel.find({}).exec(); 
                    data.push({type:configIndex.constants.DIVISION_CROSS_CUTTING}); // adding explicite division for cross cutting
                   // data.push({type:configIndex.constants.DIVISION_ENABLERS}); // adding explicite division for cross cutting

                }
                break;
            case "sector":
                // validate type
                var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"type");
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,"Sector Details"),errorObj));
                    return;
                }
                // type cross-cutting = mitigation + adaptation
                var type = null;
                if(req.query.type == configIndex.constants.DIVISION_CROSS_CUTTING) {
                    type = [configIndex.constants.DIVISION_ADAPTATION,configIndex.constants.DIVISION_MITIGATION]
                } else {
                    type = [req.query.type]
                }

                var query = {
                    type: {"$in":type}
                }
                if(req.query.distinct && req.query.distinct === "true") {

                    data = await sharedIndex.ndcSectorMapModel.find(query).distinct(req.query.outputValue).exec();
                    data = data.sort();
                } else {
                    data = await sharedIndex.ndcSectorMapModel.find(query).sort({'sector': 1}).exec();

                }
                break;
            case "subSector":
                // validate type
                var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"type","sector");
                if(errorObj.hasError){
                    next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,"NDC Sector Details"),errorObj));
                    return;
                }
                // type cross-cutting = mitigation + adaptation
                var type = null;
                if(req.query.type == configIndex.constants.DIVISION_CROSS_CUTTING) {
                    type = [configIndex.constants.DIVISION_ADAPTATION,configIndex.constants.DIVISION_MITIGATION]
                } else {
                    type = [req.query.type]
                }
                var query = {
                    type: {"$in":type},
                    sector: {"$in":req.query.sector.trim().split(configIndex.constants.NDC_SECTOR_SPLIT)},
                }
                if(req.query.distinct && req.query.distinct === "true") { 

                    data = await sharedIndex.ndcSectorMapModel.find(query).distinct(req.query.outputValue).exec();
                }
                else {
                    data = await sharedIndex.ndcSectorMapModel.find(query).exec();

                }
                break;
        
            default:
                data = await sharedIndex.ndcSectorMapModel.find({}).distinct(req.query.outputValue.trim()).exec();
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_GET, 'NDC Sector Details'),data);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_GET,'NDC Sector Details'),error));
         return;
    }
}

exports.getReportYear = async function(req,res,next) {
    
    try{
        var arr = [];
        i = new Date().getFullYear();
        while(i <= configIndex.constants.INVENTORY_YEAR_END) {
            arr.push(i++) ;
        }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_CRUD(configIndex.constants.CRUD_GET, 'Inventory year'),arr);
    }
    catch(error) {
         next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,"Inventory year"),error));
         return;
    }

}