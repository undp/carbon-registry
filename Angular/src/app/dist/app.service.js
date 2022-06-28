"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppService = void 0;
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_constants_1 = require("./app.constants");
var AppService = /** @class */ (function () {
    function AppService(http, appModelService) {
        this.http = http;
        this.appModelService = appModelService;
        this.appDataLoadedSubject = new rxjs_1.Subject();
        this.myHeaders = new http_1.HttpHeaders({
            'content-type': 'Application/json',
            'Server': '2'
        });
    }
    AppService.prototype.getInventoryYears = function () {
        return this.http.get("" + app_constants_1.MRV_INVENTORY_YEAR, { headers: this.myHeaders });
    };
    AppService.prototype.getFuelTypes = function () {
        return this.http.get("" + app_constants_1.MRV_FUEL_TYPE, { headers: this.myHeaders });
    };
    AppService.prototype.getFuelByType = function (type) {
        return this.http.get(app_constants_1.MRV_FUEL_BY_FUEL_TYPE + type, { headers: this.myHeaders });
    };
    AppService.prototype.getDataState = function (type) {
        return this.http.get(app_constants_1.MRV_APPROVALS + type, { headers: this.myHeaders });
    };
    AppService.prototype.getRecord = function (data) {
        var myHeaders = this.myHeaders;
        var myParams = new http_1.HttpParams().set('collection', 'menu').set('attr', 'menuId').set('attrValue', data);
        return this.http.get("" + app_constants_1.MRV_SHARED_RECORD, { headers: myHeaders, params: myParams });
    };
    AppService.prototype.projectByModule = function (moduleName) {
        var myHeaders = this.myHeaders;
        var myParams = new http_1.HttpParams().set('status', "approved").set("module", moduleName);
        return this.http.get("" + app_constants_1.MRV_NDC_PROJECT_BY_MODULE, { headers: myHeaders, params: myParams });
    };
    AppService.prototype.saveRecord = function (data) {
        var myHeaders = this.myHeaders;
        return this.http.post("" + app_constants_1.MRV_GHG_DATA, data, { headers: myHeaders });
    };
    AppService.prototype.getDataRecord = function (data) {
        var keys = Object.keys(data);
        var myParams = new http_1.HttpParams();
        keys.forEach(function (key) {
            myParams = myParams.set(key, data[key]);
        });
        return this.http.get("" + app_constants_1.MRV_GHG_DATA, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.getAppData = function (data) {
        var keys = Object.keys(data);
        var myParams = new http_1.HttpParams();
        keys.forEach(function (key) {
            myParams = myParams.set(key, data[key]);
        });
        return this.http.get("" + app_constants_1.MRV_SHARED_APP_DATA, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.fetchAllAppData = function () {
        var _this = this;
        this.http.get("" + app_constants_1.MRV_SHARED_APP_DATA).subscribe(function (response) {
            var data = response.data;
            _this.appModelService.setAppDataModel(data);
            // trigger event
            _this.appDataLoadedSubject.next(data);
        });
    };
    AppService.prototype.getAppDataWithFilter = function (key, output) {
        if (key === void 0) { key = null; }
        if (output === void 0) { output = null; }
        return this.appModelService.getAppDataModel(key, output);
    };
    AppService.prototype.getNDCActionList = function () {
        return this.http.get("" + app_constants_1.MRV_NDC, { headers: this.myHeaders });
    };
    AppService.prototype.getNdcData = function (data) {
        var myParams = new http_1.HttpParams().set('module', data.module);
        return this.http.get("" + app_constants_1.MRV_NDC, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.getNDCSector = function (data) {
        var keys = Object.keys(data);
        var myParams = new http_1.HttpParams();
        keys.forEach(function (key) {
            myParams = myParams.set(key, data[key]);
        });
        return this.http.get("" + app_constants_1.MRV_NDC_SECTOR_MAPPING, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.saveNDC = function (data) {
        return this.http.post("" + app_constants_1.MRV_NDC, data, { headers: this.myHeaders });
    };
    AppService.prototype.deleteNDC = function (data) {
        return this.http["delete"]("" + (app_constants_1.MRV_NDC + "/" + data), { headers: this.myHeaders });
    };
    AppService.prototype.getNDC = function (data) {
        var keys = Object.keys(data);
        var myParams = new http_1.HttpParams();
        keys.forEach(function (key) {
            myParams = myParams.set(key, data[key]);
        });
        return this.http.get("" + app_constants_1.MRV_NDC, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.getReportByGas = function (payload) {
        var keys = Object.keys(payload);
        var myParams = new http_1.HttpParams();
        keys.forEach(function (key) {
            myParams = myParams.set(key, payload[key]);
        });
        return this.http.get("" + app_constants_1.MRV_REPORT_GAS, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.getProjectIds = function (data) {
        var myParams = new http_1.HttpParams().set('status', data.status).set('module', data.module);
        return this.http.get("" + app_constants_1.MRV_NDC_PROJECT_BY_MODULE, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.getCategories = function () {
        console.log('1');
        return this.http.get("" + app_constants_1.MRV_GHG_AFOLU_EMISSIONFACTOR, { headers: this.myHeaders });
    };
    AppService.prototype.updateDataStatus = function (body) {
        return this.http.put(app_constants_1.MRV_APPROVALS + 'status', body, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseEnergyEmissionFactor = function () {
        return this.http.get("" + app_constants_1.MRV_DATABASE_ENERGY_EMISSION_FACTOR, { headers: this.myHeaders });
    };
    AppService.prototype.saveDatabaseEnergyEmissionFactor = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_ENERGY_EMISSION_FACTOR, data, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseIPPUEmissionFactor = function () {
        return this.http.get("" + app_constants_1.MRV_DATABASE_IPPU_EMISSION_FACTOR, { headers: this.myHeaders });
    };
    AppService.prototype.saveDatabaseIPPUEmissionFactor = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_IPPU_EMISSION_FACTOR, data, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseIPPUGwp = function () {
        return this.http.get("" + app_constants_1.MRV_DATABASE_IPPU_GWP, { headers: this.myHeaders });
    };
    AppService.prototype.saveDatabaseIPPUGwp = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_IPPU_GWP, data, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseAfoluPopulation = function (data) {
        var myParams = new http_1.HttpParams().set('inventoryYear', data);
        return this.http.get("" + app_constants_1.MRV_DATABASE_AFOLU_POPULATION, { headers: this.myHeaders, params: myParams });
    };
    AppService.prototype.saveDatabaseAfoluPopulation = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_AFOLU_POPULATION, data, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseAfoluEmissionFactor = function () {
        return this.http.get("" + app_constants_1.MRV_DATABASE_AFOLU_EMISSION_FACTOR, { headers: this.myHeaders });
    };
    AppService.prototype.saveDatabaseEmissionFactor = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_AFOLU_EMISSION_FACTOR, data, { headers: this.myHeaders });
    };
    AppService.prototype.getDatabaseWastePopulation = function () {
        return this.http.get("" + app_constants_1.MRV_DATABASE_WASTE_POPULATION, { headers: this.myHeaders });
    };
    AppService.prototype.saveDatabaseWastePopulation = function (data) {
        return this.http.post("" + app_constants_1.MRV_DATABASE_WASTE_POPULATION, data, { headers: this.myHeaders });
    };
    AppService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppService);
    return AppService;
}());
exports.AppService = AppService;
