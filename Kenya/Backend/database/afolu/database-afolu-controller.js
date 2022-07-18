
var utilityIndex = require("../../utility");
var configIndex = require("../../config")
var databaseAfoluIndex = require(".");
const sharedIndex = require("../../shared");
const statusCodes = require('http-status-codes').StatusCodes;
const menuIndex = require("../../menu");
const dataStateIndex = require("../../data-state");
const userIndex = require("../../user");
const databaseIppuIndex = require("./../ippu");
const ghgIndex = require("./../../ghg");
const config = require("../../config/config.json");
const liveStockSeed = require("./../../seeds/livestock-emission-factor-seed")


exports.seedEmissionFactor = async (req,res,next)=>{
    try {
        var record = null;
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        // remove existing record
        var payload = {
            updatedBy: req.body.updatedBy,
            liveStockData: liveStockSeed
        }
        await databaseAfoluIndex.databaseAfoluEmissionFactorModel.remove({});
        record = await databaseAfoluIndex.databaseAfoluEmissionFactorModel(payload).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),error));
        return;
   }
}
exports.saveEmissionFactor = async (req,res,next)=>{
    try {
      
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        var record = await databaseAfoluIndex.databaseAfoluEmissionFactorModel(req.body).save();

        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),error));
        return;
   }
}
/*
* getEmissionFactor: get all the emission factor records
* internal = true - shows its a internal call and req,res, not included
* isSendRes = false shows we need to only send the record details
* isSendRes = true shows we need to send response
* 
*/
exports.getEmissionFactor = async (req,res,next)=>{
    try {
        var record = await getEmissionFactorInternal();
        if(req.query && req.query.liveStock == "true") {
            var liveStock = record.liveStockData.map((liveStockData)=>{
                return liveStockData.livestock;
            })
            utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),liveStock);
        }
        else {
            utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),record);
        }
    } catch(error) {
        if(internal) {
            throw error;
        }
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),error));
        return;
   }
}
exports.getLiveStock = async (req,res,next)=>{
    try {
        var record = await getEmissionFactorInternal();
        var liveStock = record.liveStockData.map((liveStockData)=>{
            return liveStockData.livestock;
        })
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),liveStock);
    } catch(error) {
        if(internal) {
            throw error;
        }
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_EMISSION),error));
        return;
   }
}

async function getEmissionFactorInternal() {
    var record = null;
    var pipeline = [
        {"$sort":{updateDate:-1}},
        {"$limit":1}
    ]
    record = await databaseAfoluIndex.databaseAfoluEmissionFactorModel.aggregate(pipeline).exec();
    if(record.length) {
        record = record[0];
    }
    else {
        record = null;
    }
    return record;
    
}
exports.savePopulation = async (req,res,next)=>{
    try {
      
        var user = await userIndex.userController.getUserById(req.body.updatedBy);
        if(!user) {
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,
                configIndex.message.F_ERROR_PROCESS(configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),configIndex.message.ERROR_USER_NOT_FOUND)); 
                return;
        }
        var record = await databaseAfoluIndex.databaseAfoluPopulationModel(req.body).save();
        if(record) {

            // saving record for ghg->afolu->livestock
            await addGhgAfoluData(record);
            // saving record for ghg->afolu->livestock
            //addAfoluEntricFermentation(record);
            utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),record);
        }
        else {
            next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),configIndex.message.NO_RECORD_ADDED));
            return;
        }
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),error));
        return;
   }
}
async function addGhgAfoluData(populationRecord) {
    var gwpMethane = null;
    var gwpNitrosOxide = null;
    var entericFermentationData = [];
    var manureManagementData = [];
    var indirectN2OData = [];
    // getting afolu emission factor based on saved category of livestock population
    var emissionFactor = await getEmissionFactorInternal();
    // get gwp for methane
    var databaseIppuGWPRec = await databaseIppuIndex.databaseIppuController.getGWPInternal();
    // get value for methane and nitrogen
    gwpMethane = utilityIndex.factory.getArrayElemFromKey(databaseIppuGWPRec.gwpData,"gas","Methane");
    gwpNitrosOxide = utilityIndex.factory.getArrayElemFromKey(databaseIppuGWPRec.gwpData,"gas","Nitrous Oxide");
    
    // console.log("emissionFactor", emissionFactor);
    for(var i in populationRecord.populationData) {
        for(var j in emissionFactor.liveStockData) {
            var mmEmissions = 0;
            var entericEmissions = 0;
            var indirectN2OEmissions = 0;
            if(populationRecord.populationData[i].category == emissionFactor.liveStockData[j].livestock) {
                // emission for entric fermentation
                entericEmissions = emissionFactor.liveStockData[j].efEntericFermentation * populationRecord.populationData[i].heads * (gwpMethane? (gwpMethane.gwp) : 0) / 1000;
                //emission for  manure management 
                var first = emissionFactor.liveStockData[j].efManureManagement * populationRecord.populationData[i].heads / 1000;
				var second = populationRecord.populationData[i].heads * emissionFactor.liveStockData[j].nExcretionRate * emissionFactor.liveStockData[j].typicalAnimalMass * emissionFactor.liveStockData[j].nitrogenExcretionManaged * emissionFactor.liveStockData[j].efDirectN2OEmissions * 365 * 44 / 28 / 100000000;
                mmEmissions = first * (gwpMethane? (gwpMethane.gwp) : 0) + second * (gwpNitrosOxide? (gwpNitrosOxide.gwp) : 0);
                indirectN2OEmissions = populationRecord.populationData[i].heads * emissionFactor.liveStockData[j].nExcretionRate * emissionFactor.liveStockData[j].typicalAnimalMass * emissionFactor.liveStockData[j].nitrogenExcretionManaged * emissionFactor.liveStockData[j].fractionOfManagedLivestockNitrogen * emissionFactor.liveStockData[j].emissionFactorForN2O * (gwpNitrosOxide? (gwpNitrosOxide.gwp) : 0) * 365 / 100000000 * 44 / 28;
                entericFermentationData.push({
                    category:populationRecord.populationData[i].category,
                    heads :populationRecord.populationData[i].heads,
                    ghgEmissions:entericEmissions
                })
                manureManagementData.push({
                    category:populationRecord.populationData[i].category,
                    heads :populationRecord.populationData[i].heads,
                    ghgEmissions:mmEmissions
                })
                indirectN2OData.push({
                    category:populationRecord.populationData[i].category,
                    heads :populationRecord.populationData[i].heads,
                    ghgEmissions:indirectN2OEmissions
                })
            }
        }
    }
    // save data //,"sector","category","subSector","subCategory","calculationApproach"
    var entricFermentationRec = {
        menuId:"GHG_AFOLU_Livestock_EntericFermentation",
        entity:configIndex.constants.GHG_INPUT_ENTERIC,
        inventoryYear: populationRecord.inventoryYear,
        sector:"3-Agriculture, Forestry, and Other Land Use",
        category:"3.A-Livestock",
        subSector:"3.A.1-Enteric Fermentation",
        subCategory:"3.A.1-Enteric Fermentation",
        calculationApproach:"Tier II",
        entericFermentationData:entericFermentationData,
        status: configIndex.constants.STATUS_APPROVED, // hard code to approved status 
        updatedBy: populationRecord.updatedBy
    };
    var manureManagementRec = {
        menuId:"GHG_AFOLU_Livestock_ManureManagement",
        entity:configIndex.constants.GHG_INPUT_MANURE_MANAGEMENT,
        inventoryYear: populationRecord.inventoryYear,
        sector:"3-Agriculture, Forestry, and Other Land Use",
        category:"3.A-Livestock",
        subSector:"3.A.2-Manure Management",
        subCategory:"3.A.2-Manure Management",
        calculationApproach:"Tier II",
        manureManagementData:manureManagementData,
        status: configIndex.constants.STATUS_APPROVED, // hard code to approved status 
        updatedBy: populationRecord.updatedBy
    };
    var indirectN2ORec = {
        menuId:"GHG_AFOLU_Aggregate_nonCO2_Indirect_N2O",
        entity:configIndex.constants.GHG_INPUT_INDIRECT_N2O,
        inventoryYear: populationRecord.inventoryYear,
        sector:"3-Agriculture, Forestry, and Other Land Use",
        category:"3.C-Aggregate sources and non-CO2 emissions sources on land",
        subSector:"3.C.6-Indirect N2O Emissions from Manure Management",
        subCategory:"3.C.6-Indirect N2O Emissions from Manure Management",
        calculationApproach:"Tier II",
        indirectN2OData:indirectN2OData,
        status: configIndex.constants.STATUS_APPROVED, // hard code to approved status 
        updatedBy: populationRecord.updatedBy
    };
    await ghgIndex.ghgDataModel(entricFermentationRec).save();
    await ghgIndex.ghgDataModel(manureManagementRec).save();
    await ghgIndex.ghgDataModel(indirectN2ORec).save();

}
async function addAfoluEntricFermentation(populationRecord) {

}
/*
* getPopulation: get all the emission factor records
*/
exports.getPopulation = async (req,res,next)=>{
    try {
        var errorObj = utilityIndex.factory.validationFactory(req.query,configIndex.constants.VALIDATE_NULL,"inventoryYear");
        // validate parent menu in case of signUp enable menu
        if(errorObj.hasError){
            next(utilityIndex.factory.errorFactory(statusCodes.BAD_REQUEST,configIndex.message.F_ERROR_CRUD(configIndex.constants.CRUD_GET,configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),errorObj));
            return;
        }
       var query = {inventoryYear:parseInt(req.query.inventoryYear)}
                var pipeline = [
                    
                    {"$match":query},
                    {"$sort":{updateDate:-1}},
                    {"$limit":1}
                ]
                var record = await databaseAfoluIndex.databaseAfoluPopulationModel.aggregate(pipeline).exec();
                if(record.length) {
                    record = record[0];
                }
                else {
                    record = null;
                }
        utilityIndex.response(res, statusCodes.OK, configIndex.message.F_SUCCESS_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),record);
    } catch(error) {
        next(utilityIndex.factory.errorFactory(statusCodes.INTERNAL_SERVER_ERROR,configIndex.message.F_ERROR_PROCESS(configIndex.constants.CRUD_SAVE, configIndex.message.PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION),error));
        return;
   }
}