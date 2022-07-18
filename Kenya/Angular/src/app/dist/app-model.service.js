"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModelService = void 0;
var core_1 = require("@angular/core");
var AppModelService = /** @class */ (function () {
    function AppModelService() {
    }
    AppModelService.prototype.setAppDataModel = function (data) {
        this.appDataModel = data;
    };
    /*
    * used to return app data model complete list or specific values based on filter
    */
    AppModelService.prototype.getAppDataModel = function (key, output) {
        if (key === void 0) { key = null; }
        if (output === void 0) { output = null; }
        var filterData = [];
        if (!key)
            return this.appDataModel;
        else if (key) {
            filterData = this.appDataModel.filter(function (dataModel) {
                console.log("this.appDataModel  ", dataModel, key);
                if (dataModel.key.trim() === key.trim()) {
                    return output ? dataModel[output.trim()] : dataModel;
                }
            });
            return filterData;
        }
    };
    AppModelService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AppModelService);
    return AppModelService;
}());
exports.AppModelService = AppModelService;
