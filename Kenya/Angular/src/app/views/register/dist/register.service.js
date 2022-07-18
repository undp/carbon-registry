"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RegisterService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var RegisterService = /** @class */ (function () {
    function RegisterService(_http) {
        this._http = _http;
        this.myHeaders = new http_1.HttpHeaders({
            "content-type": "Application/json",
            "Server": "2"
        });
    }
    RegisterService.prototype.getMenuGroup = function () {
        return this._http.get("" + app_constants_1.MRV_GET_MENU_GROUP, { headers: this.myHeaders });
    };
    RegisterService.prototype.register = function (data) {
        return this._http.post("" + app_constants_1.MRV_USER, data, { headers: this.myHeaders });
    };
    RegisterService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RegisterService);
    return RegisterService;
}());
exports.RegisterService = RegisterService;
