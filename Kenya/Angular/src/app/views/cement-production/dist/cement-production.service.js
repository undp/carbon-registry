"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CementProductionService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var CementProductionService = /** @class */ (function () {
    function CementProductionService(http) {
        this.http = http;
        this.myHeaders = new http_1.HttpHeaders({
            "content-type": "Application/json",
            "Server": "2"
        });
    }
    CementProductionService.prototype.getInventoryYears = function () {
        return this.http.get("" + app_constants_1.MRV_INVENTORY_YEAR, { headers: this.myHeaders });
    };
    CementProductionService.prototype.getFuelTypes = function () {
        return this.http.get("" + app_constants_1.MRV_FUEL_TYPE, { headers: this.myHeaders });
    };
    CementProductionService.prototype.getFuelByType = function (type) {
        return this.http.get(app_constants_1.MRV_FUEL_BY_FUEL_TYPE + type, { headers: this.myHeaders });
    };
    CementProductionService.prototype.getDataState = function (type) {
        return this.http.get(app_constants_1.MRV_APPROVALS + type, { headers: this.myHeaders });
    };
    CementProductionService.prototype.getEData = function (obj) {
        var params = new http_1.HttpParams().set("filterType", obj.type).set("value", obj.value);
        return this.http.get(app_constants_1.MRV_GHG_IPPU_CEMENT, { headers: this.myHeaders, params: params });
    };
    CementProductionService.prototype.saveElectricityGeneration = function (body) {
        return this.http.post("" + app_constants_1.MRV_GHG_IPPU_CEMENT, body, { headers: this.myHeaders });
    };
    CementProductionService.prototype.updateDataStatus = function (body) {
        return this.http.put(app_constants_1.MRV_APPROVALS + 'status', body, { headers: this.myHeaders });
    };
    CementProductionService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CementProductionService);
    return CementProductionService;
}());
exports.CementProductionService = CementProductionService;
