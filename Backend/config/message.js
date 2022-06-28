module.exports = {
    F_ENV_UNDEFINED: function(env) {
        return `${env} is not configured!`
    },
    F_ERROR_REQUIRED: function(field, model) {
        return `${field} is required in ${model}!`
    },
    F_ERROR_CRUD: function(operation, model) {
        return `Error in ${operation} for ${model}`
    },
    F_ERROR_INVALID_FIELD: function(field,value) {
        return `Invalid field given ${field} with value ${value}`
    },
    F_ERROR_PROCESS: function(value, ...data) {
        if(data.length > 0){
            // add additional information
            return `Error in process ${value} : `+data.join(",");
        }
        return `Error in process ${value}`
    },
    F_ERROR_CAUSE: function(value) {
        return `Error due to  ${value}`
    },
    F_SUCCESS_PROCESS: function(value, ...data) {
        return `Success in process ${value} : `+data.join(",");
    },
    F_SUCCESS_CRUD: function(operation, model) {
        return `Success in ${operation} for ${model||'data'}`
    },


    //messages
    ERROR_DB_CONN: "Error in DB connection",
    NO_RECORD_ADDED:"No record added",
    CREATE_ENTITY_ID:"Creating Entity id",
    // auth
    
    
    //User
    ERROR_INVALID_PASSWORD: "Invalid password given",
    ERROR_USER_NOT_FOUND: "User not found",
    ERROR_RECORD_NOT_FOUND: "Record not found",
    PASSWORD_RESET: "Password Reset",
    PASSWORD_UPDATE: "Password update",
    PASSWORD_NOT_MATCH: "Password don`t match",
    FORBIDDEN_USER:"User is forbidden",
    ERROR_FORGOT_PASSWORD:"Error in forgot password",
    LOGIN:"login",
    EMAIL_NOT_VALID:"Invalid email provided",
    FORGOT_PASSWORD_OTP:"Sending Otp for forgot password",
    INVALID_OTP:"Invalid OTP given",
    FORGOT_PASSWORD_OTP_SUCCESS:"OTP sent successfully to your mail id",
    FORGOT_PASSWORD_OTP_VALID:"OTP is valid",

    //menu
    INVALID_MENU_PARENT: "invalid parent menu given",
    INVALID_MENU: "invalid Menu",
    INVALID_INVENTORY_YEAR: "invalid Inventory Year",
    INVALID_FILTER: "invalid Filter",
    RECORD_BY_FILTER: "Get record By filter",
    REQ_FILE_NOT_FOUND: "File not found in request",
    FILE_UPLOAD: "File upload",
    MENU_LIST:"Menu List",
    MENU_USER_ASSIGN:"Error in assigning menu to user",
    MENU_NOT_IMMEDIATE_CHILD:"Menu is not immediate child",
    MENU_SEED:"Menu seeding",
    
    
    // PAGE
    PAGE_INVALID_QUERY:"Invalid Query",
    PAGE_INVALID_MODULE:"Invalid Module",
    PAGE_ENERGY_REFERENCE_APPROACH:"Energy Reference Approach",
    PAGE_ENERGY_ELECTRICITY_GENERATION:"Energy Generation",
    PAGE_ENERGY_MANUFACTURING:"Energy Manufacturing",
    PAGE_ENERGY_TRANSPORT:"Energy Transport",
    PAGE_ENERGY_OTHERS:"Energy Others",
    PAGE_RECORD_APPROVE:"Approval page",
    PAGE_SECTOR_DETAILS:"Sector Details",
    PAGE_PRODUCTION_OF_SOLID:"Production of solid fuels",
    // IPPU
    PAGE_IPPU_CEMENT:"Ippu Cement Production",
    PAGE_IPPU_LIME:"Ippu Lime production",
    PAGE_IPPU_LUBRICANT:"Ippu Lubricant Use",
    PAGE_IPPU_SOLVENT:"Ippu Solvent Use",
    PAGE_IPPU_AIR_CONDITIONING:"Ippu  Refrigeration and Air Conditioning",
    
    // AFOLU
    PAGE_AFOLU_ENTERIC_FERMENTATION:"AFOLU Entric Formentation",
    PAGE_AFOLU_MANURE_MANAGEMENT:"AFOLU Manure Management",
    PAGE_AFOLU_FOREST_LAND:"AFOLU Forest land",
    PAGE_AFOLU_CROP_LAND:"AFOLU Crop land",
    PAGE_AFOLU_GRASS_LAND:"AFOLU Grass land",
    PAGE_AFOLU_WET_LAND:"AFOLU Grass land",
    PAGE_AFOLU_SETTLEMENT:"AFOLU Settlement",
    PAGE_AFOLU_OTHERLAND:"AFOLU Other Land",
    PAGE_AFOLU_BIOMASS_BURNING:"AFOLU Biomass Burning",
    PAGE_AFOLU_RICE_CULTIVATION:"AFOLU Rice Cultivation",
    PAGE_WASTE_SOLID_WASTE:"Solid Waste Disposal",
    PAGE_WASTE_BIOLOGICAL_TREATMENT:"Biological Treatment of Solid waste",
    PAGE_WASTE_INCINERATION:"Incineration and open burning of Waste",
    PAGE_WASTE_WATER_TREATMENT:"Waste water treatment",
    
    // database section
    PAGE_DATABASE_ENERGY_EMISSION:"Emission factor database - Fuel",
    PAGE_DATABASE_FUGITIVE_EMISSION:"Fugitive Emission database",
    PAGE_DATABASE_IPPU_EMISSION:"Emission factor database - IPPU",
    PAGE_DATABASE_IPPU_GWP:"Database GWP - IPPU",
    PAGE_DATABASE_AFOLU_EMISSION:"Database Livestock Emission Factor - AFOLU",
    PAGE_DATABASE_AFOLU_LIVESTOCK_POPULATION:"Database Livestock Population - AFOLU",
    PAGE_DATABASE_WASTE_POPULATION:"Database Population - WASTE",

    // report
    REPORT_FUEL_INDEX_NOT_FOUND : "Fuel index not found",
    REPORT_ERROR:"Error in reporting",

    // NDC action
    PAGE_NDC_CREATE:"Create NDC action",




}