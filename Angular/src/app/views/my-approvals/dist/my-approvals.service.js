"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MyApprovalsService = void 0;
var http_1 = require("@angular/common/http");
var core_1 = require("@angular/core");
var app_constants_1 = require("../../app.constants");
var MyApprovalsService = /** @class */ (function () {
    function MyApprovalsService(http) {
        this.http = http;
        this.myHeaders = new http_1.HttpHeaders({
            "content-type": "Application/json",
            "Server": "2"
        });
    }
    MyApprovalsService.prototype.getApprovals = function (type) {
        return this.http.get(app_constants_1.MRV_APPROVALS + type, { headers: this.myHeaders });
    };
    MyApprovalsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], MyApprovalsService);
    return MyApprovalsService;
}());
exports.MyApprovalsService = MyApprovalsService;
