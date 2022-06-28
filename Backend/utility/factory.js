var createError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
var configIndex = require('./../config');


 exports.errorFactory = function (statusCode, message, property) {
    return new createError(statusCode, message,property) ;
}

/*
*validationFactory : return error if any the fields comply to the error type
*/
exports.validationFactory = function (inputObject, validationType, ...fields ) {
    var errorObj = {
        hasError: false,
        type: null,
        field: null
    };
    switch(validationType)
    {
       
        case configIndex.constants.VALIDATE_NULL:
          for(var i in fields)  {
            //   console.log(inputObject[fields[i]],fields[i],inputObject[fields[i]] =="",!inputObject[fields[i]]);
              if(inputObject[fields[i]] === null || inputObject[fields[i]] === undefined || inputObject[fields[i]] === ""){
                errorObj.type = configIndex.constants.VALIDATE_NULL;
                errorObj.field =  fields[i];
                errorObj.hasError =  true;
                break;

              }
          }
        break;
        case configIndex.constants.VALIDATE_EMPTY_ARRAY:
          for(var i in fields)  {
              if(!inputObject[fields[i]] || inputObject[fields[i]].length == 0){
                errorObj.type = configIndex.constants.VALIDATE_EMPTY_ARRAY;
                errorObj.field =  fields[i];
                errorObj.hasError =  true;
                break;

              }
          }
        break;
    }
    return errorObj;
}
/*
*validationByModule : validation based on module name, module should be present in input Object
*/
exports.validateModule = function (inputObject ) {
    var errorObj = {
        hasError: false,
        type: null,
        field: null
    };
    if(!inputObject['module']) {
        errorObj.type = configIndex.constants.VALIDATE_NULL;
        errorObj.field =  "module";
        errorObj.hasError =  true;
    }
    else if(configIndex.constants.MODULES.indexOf(inputObject['module'])!=-1) {
        errorObj.type = configIndex.constants.VALIDATE_NULL;
        errorObj.field =  "Invalid module";
        errorObj.hasError =  true;
    }
    else {

        // place holder for 
    }
    return errorObj;
}
/*
*validationByMenu : used to validate based on menu types
* @param: 
*/
exports.validationByMenu = function (menuId,inputObject, validationType) {
    var errorObj = {
        hasError: true,
        type: configIndex.message.INVALID_MENU,
        field: "menuId"
    };
    switch (menuId) {
        // place holder for menuid with separate validation
        case "GHG_AFOLU_Livestock_EntericFermentation":
        case "GHG_AFOLU_Livestock_ManureManagement":
            errorObj = this.validationFactory(inputObject, validationType,"menuId","inventoryYear");
            break;

            break;
        default:
            errorObj = this.validationFactory(inputObject, validationType,"menuId","inventoryYear" ,"sector","category","subSector","subCategory","calculationApproach");
            break;
    }
    return errorObj;
}
/*
*validationFactoryAllField : return error if all the fields comply to the error type
*/
exports.validationFactoryAllField = function (inputObject, validationType, ...fields ) {
    var errorObj = {
        hasError: true,
        type: configIndex.constants.VALIDATE_NULL,
        field: fields
    };
    switch(validationType)
    {
       
        case configIndex.constants.VALIDATE_NULL:
          for(var i in fields)  {
              if(inputObject[fields[i]] && inputObject[fields[i]] !=""){
                errorObj.hasError =  false;
                break;

              }
          }
    }
    return errorObj;
}

exports.getArrayElemFromKey = (arr,key,value)=> {
    var elem = null;
    for(var i in arr) {
        if(arr[i][key] == value) {
            elem = arr[i];
            break;
        }
    }
    return elem;
}
exports.mapToObj = (inputMap)=>  {
    var obj = {}
    for (let[k,v] of inputMap) {
        obj[k] = v;
    }
    return obj;
}
exports.removeProperty = (object, ...fields)=> {
    for(var i in fields) {
        delete object[fields[i]];
    }
    return object;
}
exports.mergeObject = (destinationObj,srcObj)=> {
    return Object.assign(destinationObj,srcObj);
}
exports.getKeysFromMap = (inputMap)=> {
    var keys = [];
    const iterator = inputMap.keys();
    var result = iterator.next();
    while (!result.done) {
        if(result.value) {
            keys.push(result.value);
        }
        result = iterator.next();
    }
    return keys;

}

exports.getUserTokenConfig = (profile)=> {
    var config = {
        secret: configIndex.configJson[profile].tokenConfig.secret,
        expiry: configIndex.configJson[profile].tokenConfig.expiry,

    }
    return config;
}
exports.getErrorCodeByErrorType = (errorMessage)=> {
    return configIndex.errorMessage[errorMessage] || StatusCodes.INTERNAL_SERVER_ERROR;
    
}