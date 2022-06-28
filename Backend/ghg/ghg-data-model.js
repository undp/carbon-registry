const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
// const uniqueValidator = require("mongoose-unique-validator");

const activityDataSchema = new Schema({
    fuelType:{type:String},
    fuel :{type:String},
    unit:{type:String},
    production:{type:Number},
    imports:{type:Number},
    exports:{type:Number},
    internationalBunkers:{type:Number},
    stockChange:{type:Number},
    excludedConsumption:{type:Number},
    reference:{type:String},
});
const energyDataSchema = new Schema({
    fuelType:{type:String},
    fuel :{type:String},
    unit:{type:String},
    amount:{type:Number},
    reference:{type:String},
    
});
const fuelProductionDataSchema = new Schema({
    fuelName:{type:String},
    production :{type:Number},
    emissionFactor:{type:Number},
    reference:{type:String}
    
});

const entericFermentationDataSchema = new Schema({
    category:{type:String},
    heads :{type:Number},
    ghgEmissions:{type:Number}
    
});
const manureManagementDataSchema = new Schema({
    category:{type:String},
    heads :{type:String},
    ghgEmissions:{type:String}
    
});
const indirectN2OSchema = new Schema({
    category:{type:String},
    heads :{type:Number},
    ghgEmissions:{type:Number}
    
});
const forestDataSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});
const croplandDataSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});
const grasslandSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});

const wetlandDataSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});

const settlementsDataSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});

const otherlandDataSchema = new Schema({
    forestCategory:{type:String},
    area :{type:Number},
    ghgEmissions:{type:Number},
    reference:{type:String},
    
});
const biomassDataSchema = new Schema({
    initialLandUse:{type:String},
    landUseReportingYear:{type:String},
    subcategory:{type:String},
    areaBurnt :{type:Number},
    massFuelAvailable :{type:Number},
    combustionFactor :{type:Number},
    efCO2 :{type:Number},
    efNO2 :{type:Number},
    efCH4 :{type:Number},
    reference :{type:String},
    
});

const riceDataSchema = new Schema({
    ecosystem:{type:String},
    upland :{type:Number},
    irrigated:{type:Number},
    rainfed:{type:String},
    deepwater:{type:String},
    
});
const limingDataSchema = new Schema({
    limeType:{type:String},
    limeUsed :{type:Number},
    emissionFactor:{type:Number},
    reference:{type:String},
    
});
const ureaDataSchema = new Schema({
    subCategory:{type:String},
    ureaApplied :{type:Number},
    emissionFactor:{type:Number},
    reference:{type:String},
    
});
const cementDataSchema = new Schema({
    cementType:{type:String},
    amountProduced :{type:Number},
    clinkerFraction:{type:Number},
    reference:{type:String},
    
});
const clinkerDataSchema = new Schema({
    clinkerImport:{type:Number},
    clinkerExport:{type:Number},
    reference:{type:String},
    
});
const limeDataSchema = new Schema({
    limeType:{type:String},
    amountProduced :{type:Number},
    reference:{type:String},
    
});
const lubricantSchema = new Schema({
    lubricantName:{type:String},
    amountConsumed  :{type:Number},
    carbonContent  :{type:Number},
    fractionOxidised  :{type:Number},
    reference:{type:String},
    
});
const solventSchema = new Schema({
    solventName:{type:String},
    amountConsumed  :{type:Number},
    carbonContent  :{type:Number},
    fractionOxidised  :{type:Number},
    reference:{type:String},
    
});
const airconditionSchema = new Schema({
    gasConsumed:{type:String},
    unit  :{type:String},
    amount  :{type:Number},
    reference:{type:String},
    
});
const solidWasteDataSchema = new Schema({
    urbanPopulation:{type:Number},
    wastePerCapita :{type:Number},
    fractionOfWaste:{type:Number},
    cH4Generation:{type:Number},
    reference:{type:String},
    
});
const wasteDataSchema = new Schema({
    treatmentType:{type:String},
    amountOfWaste :{type: Number},
    emissionFactor:{type:Number},
    reference:{type:String}
    
});
const incinerationSchema = new Schema({
    wasteIncinerated:{type:Number},
    dryMatter:{type:Number},
    carbonFraction:{type:Number},
    fossilCarbonFraction:{type:Number},
    oxidationFactor:{type:Number},
    reference:{type:String}
    
});

const openBurningSchema = new Schema({
    urbanPopulation:{type:Number},
    wastePerCapita:{type:Number},
    fractionOfPopulation:{type:Number},
    dryMatterFraction:{type:Number},
    carbonFraction:{type:Number},
    fossilCarbonFraction:{type:Number},
    oxidationFactor:{type:Number},
    reference:{type:String}
    
});
const cH4EmissionsSchema = new Schema({
    population:{type:Number},
    degradableOrganic:{type:Number},
    correctionFactor:{type:Number},
    methaneProducing:{type:Number},
    reference:{type:String}
    
});

const n2OEmissionsSchema = new Schema({
    population:{type:Number},
    perCapitaProtein:{type:Number},
    nitrogenFraction:{type:Number},
    emissionFactor:{type:Number},
    reference:{type:String}
    
});
const industrialWastewaterSchema = new Schema({
    industrySector:{type:String},
    treatmentType:{type:String},
    production :{type:Number},
    wasteWaterGenerated:{type:Number},
    cod:{type:Number},
    maximumMethaneCapacity:{type:Number},
    methaneCorrectionFactor:{type:Number},
    sludgeRemoved:{type:Number},
    methaneRecovered:{type:Number},
    reference:{type:String}
    
});

// glass data
const glassDataSchema = new Schema({
    glassProduced:{type:Number},
    // glassEmissionFactor:{type:Number},
    avgAnnualRatio:{type:Number},
    reference:{type:String},
    
});
// sodaAsh data
const sodaAshDataSchema = new Schema({
    sodaAshProduced:{type:Number},
    reference:{type:String},
    
});
// carbonate data
const carbonateDataSchema = new Schema({
    use:{type:String},
    carbonateConsumed:{type:Number},
    reference:{type:String},
    
});
// natural gas
const naturalGasDataSchema = new Schema({
    category:{type:String},
    subCategory:{type:String},
    amount:{type:Number},
    unit:{type:String},
    reference:{type:String},
    
});
const fugitiveOilSchema = new Schema({
    category:{type:String},
    subCategory:{type:String},
    amount:{type:Number},
    unit:{type:String},
    reference:{type:String},
    
});
const indirectEmissionSchema = new Schema({
    category:{type:String},
    subCategory:{type:String},
    amount:{type:Number},
    unit:{type:String},
    reference:{type:String},
    
});
const directEmissionSchema = new Schema({
    inputType:{type:String},
    amount:{type:Number},
    emissionFactor:{type:Number},
    reference:{type:String},
    
});

const ghgDataSchema = new Schema({
    // common
    menuId:{type:String,required:true},
    entity:{type:String,required:true},
    inventoryYear:{type:Number,required:true},
    sector:{type:String},
    category:{type:String},
    subSector:{type:String},
    subCategory:{type:String},
    calculationApproach:{type:String},
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},
    status:{type:String,enum:configIndex.constants.STATUS_TYPE},
    remark:{type:String},

    // Energy reference
    activityData:[activityDataSchema],
    // Energy generation / manufacturing/transport/Others
    energyData:[energyDataSchema],
    // production of solid fuels
    fuelProductionData:[fuelProductionDataSchema],
    naturalGasData:[naturalGasDataSchema],
    fugitiveOilData:[fugitiveOilSchema],
    //AFOLU/Aggregate_nonCO2/Indirect_Emission
    indirectEmissionAtmospheric:[indirectEmissionSchema],
    indirectEmissionLeaching:[indirectEmissionSchema],

    // ghg/AFOLU/Aggregate_nonCO2/Direct_Emission - direct emission
    managedSoilData:[directEmissionSchema],
    floodedRiceData:[directEmissionSchema],
    organicSoilData:[directEmissionSchema],
    grazedSoilData:[directEmissionSchema],



    // afolu entric fermentation
    entericFermentationData:[entericFermentationDataSchema],
    // afolu manure management
    manureManagementData:[manureManagementDataSchema],
    // afolu forest data
    forestData:[forestDataSchema],
    //afolu cropland
    croplandData:[croplandDataSchema],
    // afolu grassland
    grasslandData:[grasslandSchema],
    // wetland
    wetlandData:[wetlandDataSchema],
    // settlement
    settlementsData:[settlementsDataSchema],
    //otherland
    otherlandData:[otherlandDataSchema],
    //biomass burning
    biomassData:[biomassDataSchema],
    // indirect n2o
    indirectN2OData:[indirectN2OSchema],
    // rice cultivation
    riceData:[riceDataSchema],
    limingData:[limingDataSchema],
    ureaData:[ureaDataSchema],

    // ippu cement
    cementData:[{type:cementDataSchema}],
    clinkerData:[clinkerDataSchema], // there will be one record
    // lime
    limeData:[limeDataSchema],
    // lubricant
    lubricantData:[lubricantSchema],
    // solvent
    solventData:[solventSchema],
    // aircondition
    refrigerationAirConditioning:[airconditionSchema],
    mobileAirConditioning:[airconditionSchema],
    // glass
    glassData:[glassDataSchema],
    sodaAshData:[sodaAshDataSchema],
    carbonateData:[carbonateDataSchema],

    
    // waste solid disposal
    solidWasteData:[solidWasteDataSchema],
    // waste biological treatment
    wasteData:[wasteDataSchema],
    //incineration
    incinerationData:[incinerationSchema],
    openBurningData:[openBurningSchema],
    //water treatment
    cH4Emissions:[cH4EmissionsSchema],
    n2OEmissions:[n2OEmissionsSchema],
    industrialData :[industrialWastewaterSchema],
    
    
});



const ghgDataModel = mongoose.model("ghg-data", ghgDataSchema);
module.exports = ghgDataModel;
