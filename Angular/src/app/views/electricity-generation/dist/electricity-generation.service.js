"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ElectricityGenerationService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var ElectricityGenerationService = /** @class */ (function () {
    function ElectricityGenerationService(http) {
        this.http = http;
        this.myHeaders = new http_1.HttpHeaders({
            "content-type": "Application/json",
            "Server": "2"
        });
    }
    ElectricityGenerationService.prototype.getInventoryYears = function () {
        return this.http.get("" + app_constants_1.MRV_INVENTORY_YEAR, { headers: this.myHeaders });
    };
    ElectricityGenerationService.prototype.getFuelTypes = function () {
        return this.http.get("" + app_constants_1.MRV_FUEL_TYPE, { headers: this.myHeaders });
    };
    ElectricityGenerationService.prototype.getFuelByType = function (type) {
        return this.http.get(app_constants_1.MRV_FUEL_BY_FUEL_TYPE + type, { headers: this.myHeaders });
    };
    ElectricityGenerationService.prototype.getDataState = function (type) {
        return this.http.get(app_constants_1.MRV_APPROVALS + type, { headers: this.myHeaders });
    };
    ElectricityGenerationService.prototype.getEData = function (obj) {
        var params = new http_1.HttpParams().set("filterType", obj.type).set("value", obj.value);
        return this.http.get(app_constants_1.MRV_GHG_ENERGY_ELECTRICITY_GENERATION, { headers: this.myHeaders, params: params });
    };
    ElectricityGenerationService.prototype.saveElectricityGeneration = function (body) {
        return this.http.post("" + app_constants_1.MRV_GHG_ENERGY_ELECTRICITY_GENERATION, body, { headers: this.myHeaders });
    };
    ElectricityGenerationService.prototype.updateDataStatus = function (body) {
        return this.http.put(app_constants_1.MRV_APPROVALS + 'status', body, { headers: this.myHeaders });
    };
    ElectricityGenerationService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ElectricityGenerationService);
    return ElectricityGenerationService;
}());
exports.ElectricityGenerationService = ElectricityGenerationService;
