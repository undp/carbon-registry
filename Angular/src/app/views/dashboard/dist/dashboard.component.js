"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardComponent = void 0;
var core_1 = require("@angular/core");
var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(ls, ts, us, tls) {
        this.ls = ls;
        this.ts = ts;
        this.us = us;
        this.tls = tls;
        this.color = 'warning';
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // generate random values for mainChart
        this.getLocationCount();
        this.getTripsCount();
        this.getUsersCount();
        this.getbookedtripCount();
    };
    DashboardComponent.prototype.getLocationCount = function () {
        var _this = this;
        this.ls.getlocation().subscribe(function (res) {
            _this.createdLocationCount = res.Data ? res.Data.length : 0;
        });
    };
    DashboardComponent.prototype.getTripsCount = function () {
        var _this = this;
        this.ts.gettrip("all").subscribe(function (res) {
            _this.createdTripCount = res.Data.length;
        });
    };
    DashboardComponent.prototype.getUsersCount = function () {
        var _this = this;
        this.us.getAllUsers("all").subscribe(function (res) {
            _this.createdUserCount = res.Data.length;
        }, function (err) {
            console.log(err);
        });
    };
    DashboardComponent.prototype.getbookedtripCount = function () {
        var _this = this;
        this.tls.gettrip("all").subscribe(function (res) {
            _this.bookedTripCount = res.Data.length;
        });
        this.tls.gettrip("upcoming").subscribe(function (res) {
            _this.upcomingTripCount = res.Data.length;
        });
        this.tls.gettrip("start").subscribe(function (res) {
            _this.liveTripCount = res.Data.length;
        });
        this.tls.gettrip("end").subscribe(function (res) {
            _this.completedTripCount = res.Data.length;
        });
        this.tls.gettrip("cancel").subscribe(function (res) {
            _this.canceledTripCount = res.Data.length;
        });
    };
    DashboardComponent = __decorate([
        core_1.Component({
            templateUrl: 'dashboard.component.html',
            styleUrls: ['./dashboard.component.scss']
        })
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
