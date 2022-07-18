const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const message = require("../config/message");
// const constants = require("../config/constants");
const configIndex = require("../config");
const utilityIndex = require("../utility");
const statusCodes = require('http-status-codes').StatusCodes;
const uniqueValidator = require("mongoose-unique-validator");

const performanceIndicatorMISchema = new Schema({
    indicator:{type:String},
    unit:{type:String},
    value:{type:Number},
    reference:{type:String},
});
const sourceOfFinanceSchema = new Schema({
    fundingType:{type:String},
    nationalInternational:{type:String},
    amount:{type:Number},
    channel :{type:String},
    fundingAgency :{type:String},
});
const projectCostBreakdownSchema = new Schema({
    category:{type:String},
    amount :{type:Number},
    reference :{type:String},
});
const disbursementScheduleSchema = new Schema({
    year :{type:Number},
    amount :{type:Number},
    reference :{type:String},
});
const disbursementDetailSchema = new Schema({
    disbursementCategory :{type:String},
    amountQ1 :{type:Number},
    amountQ2 :{type:Number},
    amountQ3 :{type:Number},
    amountQ4 :{type:Number},
    reference :{type:String},
});
const questionSchema = new Schema({
    label:{type:String},
    question:{type:String},
    strengths :{type:String},
    opportunities :{type:String},
    weakness :{type:String},
    threats :{type:String},

    likelihood :{type:String},
    impact :{type:String},
    data :{type:Number},
    dataSource :{type:String},

    // flag
    isQualitative:{type:Boolean},
    isQuantitative:{type:Boolean}
    
});
const questionSchema2 = new Schema({
    label:{type:String},
    questions:[questionSchema]
})
/* const questionSchema2 = new Schema({
    question:{type:String},
    likelihood :{type:String},
    impact :{type:String},
    data :{type:Number},
    dataSource :{type:String},
}); */
/* const questionSchema3 = new Schema({
    label:{type:String},
    question:[questionSchema],
}); */
const otherSDGSchema = new Schema({
    otherSdgType:{type:String},
    qualitativeImpact:[questionSchema],
    quantitativeImpact:[questionSchema],
    quantitativeImpact2:[questionSchema2],
});

const ndcActionSchema = new Schema({
    parentProject:{type: mongoose.Schema.Types.ObjectId,ref: 'ndc-action'},
    // status:{type:String, require:true, enum:configIndex.constants.STATUS_TYPE}, // status for now managed with data-states
    entity:{type:String,required:true,enum:[
        configIndex.constants.NDC_PROJECT,configIndex.constants.MITIGATION_INPUT,configIndex.constants.MITIGATION_MONITORING,configIndex.constants.FINANCE_INPUT,
        configIndex.constants.FINANCE_DETAILED_BUDGET, configIndex.constants.FINANCE_MONITORING,configIndex.constants.SDG_INPUT,
        configIndex.constants.SDG_MONITORING, configIndex.constants.ADAPTATION_INPUT,configIndex.constants.ADAPTATION_MONITORING
    ]},
    projectCode: {type: String}, // to be set from back end
    projectId: {type: String}, // to be set from back end
    projectTitle: {type: String},
    dataId: {type: String}, // need to verify its use
    // cause: {type: String},
    division : {type: String},
    sector: [{type: String}],
    subSector: [{type: String}],
    area: {type: String},
    agency: {type: String},
    otherParty: {type: String},
    lifetime: {type: Number},
    commissioningDate: {type: Date, default:null},
    approvalDate: {type: Date, default:null},
    closureDate: {type: Date, default:null},
    napa: {type: String},
    ndc: {type: String},
    location: {type: String},
    coordinates: {type: String},
    costAmount: {type: Number},
    funding: {type: String},
    
    // mitigation input starts
    agencyContact:{type:String},
    otherPartyContact:{type:String},
    ghgReduction: {type: Number},
    targetGhg: [String],
    contributions: [String],
    projectStatus: {type: String},
    beneficiary: {type: String},
    genderIncl: {type: String},
    projectOutput: {type: String},
    projectImpact: {type: String},
    fileCalculation: {type: String},// to be implemented for mitigation input/monitoring
    marketMech: {type: String},
    weblink: {type: String},
    carbonBen: {type: String},
    verification: {type: String},
    performanceIndicatorMI: [performanceIndicatorMISchema],

    // mitigation monitoring
    fileVerification:{type:String},
    actualGHGSavings:{type: Number},
    verificationReports:{type: String}, // to hold file path

    // climate finance input -> project details
    financialYear:{type:String},
    // Climate finance monitoring
    monitoringYear:{type:Number},

    appliedExchange:{type:Number},
    financingMode:{type:String},
    budgetCode:{type:String},
    // climate finance input -> financial flow
    projectSize:{type:String},
    nationalBudget:{type:Number},
    subNationalBudget:{type:Number},
    greenBonds:{type:Number},
    others :{type:Number},
    sourceOfFinance :[sourceOfFinanceSchema],
    // climate finance input -> details budget
    detailBudget :[projectCostBreakdownSchema],
    // climate finance input -> Disbursement Year
    disbursementSchedule:[disbursementScheduleSchema],

    
    disbursementDetail: [disbursementDetailSchema],

    // sdg input
    screeningApproach:{type:String},
    stakeholderInput:[questionSchema],
    povertyReduction: [questionSchema],
    reducingInequality: [questionSchema],
    genderParity: [questionSchema],
    otherSDG :[otherSDGSchema], // this is being used in sdg input and sdg monitoring

    // sdg monitoring
    infrastructureInnovationIndustry: [{
        label: String,
        questions:[questionSchema]
    }],
        // other sdg
    sdgMEnvironment:[{
        label: String,
        questions:[questionSchema]
    }],
    sdgMEmployment:[questionSchema],
    sdgMEducation:[questionSchema],
    sdgMFoodSecurity:[questionSchema],
    sdgMWaterSanitation:[questionSchema],
    sdgMHealth:[questionSchema],

    // ADAPTATION ACTION -> project information
    ndpObjectiveCoverage:{type:String},
    ndpCoverage:[String],
    agriculture:[questionSchema],
    forestry:[questionSchema],
    water:[questionSchema],
    energy:[questionSchema],
    health:[questionSchema],
    risk:[questionSchema],
    



    remarks: {type: String},
    updateDate:{type:Date, default:Date.now},
    updatedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user',required:true},

});
var deepPopulate = require('mongoose-deep-populate')(mongoose);
ndcActionSchema.plugin(deepPopulate);
const ndcActionModel = mongoose.model("ndc-action", ndcActionSchema);
module.exports = ndcActionModel;
