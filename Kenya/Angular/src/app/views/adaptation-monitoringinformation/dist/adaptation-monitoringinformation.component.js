"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdaptationMonitoringinformationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var app_constants_1 = require("../../app.constants");
var AdaptationMonitoringinformationComponent = /** @class */ (function () {
    function AdaptationMonitoringinformationComponent(formBuilder, appService, utilityService, activatedRoute, router) {
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.utilityService = utilityService;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.projects = [];
        this.monitoringYearArr = [];
        this.likelihoodArr = [];
        this.impactArr = [];
        this.agricultureArr = [];
        this.forestryArr = [];
        this.waterArr = [];
        this.energyArr = [];
        this.healthArr = [];
        this.riskArr = [];
        this.ynArr = ["Yes", "No", "Not Applicable"];
        this.yearList = ["1", "2"];
    }
    AdaptationMonitoringinformationComponent.prototype.ngOnInit = function () {
        this.formId = this.activatedRoute.snapshot.paramMap.get("formId");
        this.recordId = this.activatedRoute.snapshot.paramMap.get("recordId");
        if (this.formId && this.recordId) {
            this.approvalScreen = true;
        }
        this.adaptationMIForm = this.formBuilder.group({
            _id: [""],
            menuId: [""],
            remarks: [""],
            updatedBy: [""],
            permissionMenuId: [""],
            projectCode: [""],
            projectId: [""],
            projectTitle: [""],
            parentProject: ["", [forms_1.Validators.required]],
            approverComment: [""],
            monitoringYear: [""],
            sector: [""],
            subSector: [""],
            ndc: [""],
            napa: [""],
            agency: [""],
            otherParty: [""],
            endDate: [""],
            te: [""],
            closureDate: [""],
            startDate: [""],
            lifetime: [""],
            ndpObjectiveCoverage: [""],
            ndpCoverage: [[]],
            agriculture: [[]],
            forestry: [[]],
            water: [[]],
            energy: [[]],
            health: [[]],
            risk: [[]]
        });
        this.getPermissionMenuId();
    };
    AdaptationMonitoringinformationComponent.prototype.populateYear = function (closureDate) {
        var effDate = new Date(closureDate).getFullYear();
        for (var i = effDate; i <= effDate + app_constants_1.MRV_MONITORING_YEAR_COUNT; i++) {
            this.monitoringYearArr.push(i);
        }
    };
    AdaptationMonitoringinformationComponent.prototype.loadProject = function () {
        var _this = this;
        // populate year based on parent project selection
        if (this.adaptationMIForm.controls.parentProject
            && this.adaptationMIForm.controls.parentProject.value.closureDate) {
            this.populateYear(this.adaptationMIForm.controls.parentProject.value.closureDate);
        }
        // call api to get existing latest record
        var query = {
            entity: this.menu.entity,
            parentProject: this.adaptationMIForm.controls.parentProject.value._id
        };
        if (this.adaptationMIForm.controls.monitoringYear.value
            && this.adaptationMIForm.controls.monitoringYear.value != "") {
            query["monitoringYear"] = this.adaptationMIForm.controls.monitoringYear.value;
        }
        ;
        this.appService
            .getNDC(query)
            .subscribe(function (response) {
            // fill form with existing data
            // if no existing data found then populate data from selected project
            if (!response.data) {
                _this.populateForm(_this.adaptationMIForm, _this.selectedProject, "parentProject");
                _this.reAssignValues(_this.selectedProject);
            }
            else {
                // this.selectedProject = response.data.parentProject;
                _this.populateForm(_this.adaptationMIForm, response.data, "parentProject");
                _this.reAssignValues(response.data); // used fetch individual values from existing record and assign in related variables
            }
        }, function (error) {
            console.error("Error in fetching existing record ", error);
        });
    };
    AdaptationMonitoringinformationComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.activatedRoute.data.subscribe(function (data) {
            _this.appService.getRecord(data.menuId).subscribe(function (res) {
                if (res.data) {
                    //getting the menu object
                    _this.menu = res.data;
                    _this.menu.moduleName = data.moduleName;
                    _this.adaptationMIForm.controls.menuId.patchValue(_this.menu.menuId);
                    if (_this.approvalScreen) {
                        // read data from the from id
                        _this.appService
                            .getNDC({ _id: _this.formId })
                            .subscribe(function (response) {
                            if (response.statusCode == 200 && response.data) {
                                _this.populateForm(_this.adaptationMIForm, response.data);
                                _this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
                                // this.selectedProject = response.data.parentProject;
                            }
                        });
                    }
                    else {
                        _this.appService
                            .projectByModule(_this.menu.moduleName)
                            .subscribe(function (response) {
                            _this.projects = response.data;
                        });
                    }
                }
            }, function (err) {
                _this.utilityService.openSnackBar(err.error.message, "error");
            });
        });
    };
    AdaptationMonitoringinformationComponent.prototype.reAssignValues = function (responseData) {
        // assign project from id
        this.agricultureArr = this.adaptationMIForm.controls.agriculture.value;
        this.forestryArr = this.adaptationMIForm.controls.forestry.value;
        this.waterArr = this.adaptationMIForm.controls.water.value;
        this.energyArr = this.adaptationMIForm.controls.energy.value;
        this.healthArr = this.adaptationMIForm.controls.health.value;
        this.riskArr = this.adaptationMIForm.controls.risk.value;
    };
    AdaptationMonitoringinformationComponent.prototype.populateForm = function (form, data) {
        var skipControls = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            skipControls[_i - 2] = arguments[_i];
        }
        var keys = Object.keys(data);
        var pathValueObj = {};
        keys.forEach(function (key) {
            if (skipControls.indexOf(key) == -1) {
                pathValueObj[key] = data[key];
            }
        });
        form.patchValue(pathValueObj);
    };
    AdaptationMonitoringinformationComponent.prototype.submit = function () {
        var _this = this;
        console.log("form submit ", this.adaptationMIForm);
        // add rest of the form values for the question section
        this.adaptationMIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        this.adaptationMIForm.controls.agriculture.patchValue(this.agricultureArr);
        this.adaptationMIForm.controls.forestry.patchValue(this.forestryArr);
        this.adaptationMIForm.controls.water.patchValue(this.waterArr);
        this.adaptationMIForm.controls.energy.patchValue(this.energyArr);
        this.adaptationMIForm.controls.health.patchValue(this.healthArr);
        this.adaptationMIForm.controls.risk.patchValue(this.riskArr);
        this.appService.saveNDC(this.adaptationMIForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.utilityService.openSnackBar(response.message, 'success');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err.error.message, 'error');
        });
    };
    AdaptationMonitoringinformationComponent.prototype.updateDataStatus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.recordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.adaptationMIForm.controls.approverComment.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                // this.adaptationMIForm.reset();
                _this.utilityService.openSnackBar(res.message, 'success');
                _this.router.navigate(['./my-approvals']);
            }
            else {
                _this.utilityService.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err.message, 'error');
        });
    };
    AdaptationMonitoringinformationComponent = __decorate([
        core_1.Component({
            selector: "app-adaptation-monitoringinformation",
            templateUrl: "./adaptation-monitoringinformation.component.html",
            styleUrls: ["./adaptation-monitoringinformation.component.scss"]
        })
    ], AdaptationMonitoringinformationComponent);
    return AdaptationMonitoringinformationComponent;
}());
exports.AdaptationMonitoringinformationComponent = AdaptationMonitoringinformationComponent;
