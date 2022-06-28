"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AdaptationProjectinformationComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AdaptationProjectinformationComponent = /** @class */ (function () {
    function AdaptationProjectinformationComponent(formBuilder, appService, utilityService, _activatedRoute, activatedRoute, router) {
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.utilityService = utilityService;
        this._activatedRoute = _activatedRoute;
        this.activatedRoute = activatedRoute;
        this.router = router;
        this.projects = [];
        this.ndpObjectiveCoverageArr = [];
        this.ndpCoverageArr = [];
        this.likelihoodArr = [];
        this.impactArr = [];
        this.agricultureArr = [];
        this.forestryArr = [];
        this.waterArr = [];
        this.energyArr = [];
        this.healthArr = [];
        this.riskArr = [];
        this.ynArr = ["Yes", "No", "Not Applicable"];
    }
    AdaptationProjectinformationComponent.prototype.ngOnInit = function () {
        this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
        this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
        if (this.formId && this.recordId) {
            this.approvalScreen = true;
        }
        this.adaptationPIForm = this.formBuilder.group({
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
            sector: [''],
            subSector: [''],
            ndc: [''],
            napa: [''],
            agency: [''],
            otherParty: [''],
            endDate: [""],
            te: [''],
            closureDate: [''],
            startDate: [''],
            lifetime: [''],
            ndpObjectiveCoverage: [''],
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
    AdaptationProjectinformationComponent.prototype.loadData = function () {
        this.populateData("likelihoodArr", { key: "Likelihood", outputValue: "value" });
        this.populateData("impactArr", { key: "Impact", outputValue: "value" });
        this.populateData("ndpObjectiveCoverageArr", { "menuId": this.menu.menuId,
            key: "NDPObjectiveCoverage", outputValue: "value" });
        this.populateData("ndpCoverageArr", { "menuId": this.menu.menuId, key: "NDPCoverage", outputValue: "value" });
        // dynamic data
        this.populateData("agricultureArr", { "menuId": this.menu.menuId,
            "key": "Agriculture", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("agricultureArr", { "menuId": this.menu.menuId,
            "key": "Agriculture", "section": "quantitativeImpact", outputValue: "value" });
        this.populateData("forestryArr", { "menuId": this.menu.menuId,
            "key": "Forestry", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("forestryArr", { "menuId": this.menu.menuId,
            "key": "Forestry", "section": "quantitativeImpact", outputValue: "value" });
        this.populateData("waterArr", { "menuId": this.menu.menuId,
            "key": "Water", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("waterArr", { "menuId": this.menu.menuId,
            "key": "Water", "section": "quantitativeImpact", outputValue: "value" });
        this.populateData("energyArr", { "menuId": this.menu.menuId,
            "key": "Energy", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("energyArr", { "menuId": this.menu.menuId,
            "key": "Energy", "section": "quantitativeImpact", outputValue: "value" });
        this.populateData("healthArr", { "menuId": this.menu.menuId,
            "key": "Health", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("healthArr", { "menuId": this.menu.menuId,
            "key": "Health", "section": "quantitativeImpact", outputValue: "value" });
        this.populateData("riskArr", { "menuId": this.menu.menuId,
            "key": "RiskManagement", "section": "qualitativeImpact", outputValue: "value" });
        this.populateData("riskArr", { "menuId": this.menu.menuId,
            "key": "RiskManagement", "section": "quantitativeImpact", outputValue: "value" });
    };
    AdaptationProjectinformationComponent.prototype.populateData = function (fieldName, filter) {
        var _this = this;
        this.appService.getAppData(filter)
            .subscribe(function (response) {
            if (fieldName == "likelihoodArr") {
                _this.likelihoodArr = response.data;
                return;
            }
            else if (fieldName == "impactArr") {
                _this.impactArr = response.data;
                return;
            }
            else if (fieldName == "ndpObjectiveCoverageArr") {
                _this.ndpObjectiveCoverageArr = response.data;
                return;
            }
            else if (fieldName == "ndpCoverageArr") {
                _this.ndpCoverageArr = response.data;
                return;
            }
            else {
                response.data = response.data.map(function (data) {
                    var question = {};
                    if (filter["key"] == "Agriculture" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Agriculture" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Forestry" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Forestry" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Water" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Water" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Energy" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Energy" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Health" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "Health" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "RiskManagement" && filter["section"] == "qualitativeImpact") {
                        question.question = data;
                        question.isQualitative = true;
                        question.dataSource = "";
                    }
                    else if (filter["key"] == "RiskManagement" && filter["section"] == "quantitativeImpact") {
                        question.question = data;
                        question.isQuantitative = true;
                        question.data = 0;
                        question.dataSource = "";
                    }
                    return question;
                });
                if (fieldName == "agricultureArr") {
                    _this.agricultureArr = _this.agricultureArr.concat(response.data);
                }
                else if (fieldName == "forestryArr") {
                    _this.forestryArr = _this.forestryArr.concat(response.data);
                }
                else if (fieldName == "waterArr") {
                    _this.waterArr = _this.waterArr.concat(response.data);
                }
                else if (fieldName == "energyArr") {
                    _this.energyArr = _this.energyArr.concat(response.data);
                }
                else if (fieldName == "healthArr") {
                    _this.healthArr = _this.healthArr.concat(response.data);
                }
                else if (fieldName == "riskArr") {
                    _this.riskArr = _this.riskArr.concat(response.data);
                }
            }
            //this.adaptationPIForm.controls[controlName].setValue(response.data);
        });
    };
    AdaptationProjectinformationComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this._activatedRoute.data.subscribe(function (data) {
            _this.appService.getRecord(data.menuId).subscribe(function (res) {
                if (res.data) {
                    //getting the menu object
                    _this.menu = res.data;
                    _this.menu.moduleName = data.moduleName;
                    _this.adaptationPIForm.controls.menuId.patchValue(_this.menu.menuId);
                    _this.loadData(); // load static data
                    if (_this.approvalScreen) {
                        // read data from the from id
                        _this.appService.getNDC({ _id: _this.formId })
                            .subscribe(function (response) {
                            if (response.statusCode == 200 && response.data) {
                                _this.populateForm(_this.adaptationPIForm, response.data);
                                _this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
                                _this.selectedProject = response.data.parentProject;
                            }
                        });
                    }
                    else {
                        _this.appService.projectByModule(_this.menu.moduleName)
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
    AdaptationProjectinformationComponent.prototype.onProjectSelect = function () {
        var _this = this;
        // call api to get existing latest record
        this.appService.getNDC({ entity: this.menu.entity, parentProject: this.adaptationPIForm.controls.parentProject.value._id }).subscribe(function (response) {
            // fill form with existing data
            // if no existing data found then populate data from selected project
            if (!response.data) {
                _this.populateForm(_this.adaptationPIForm, _this.selectedProject);
            }
            else {
                // this.selectedProject = response.data.parentProject;
                _this.populateForm(_this.adaptationPIForm, response.data);
                _this.reAssignValues(response.data); // used fetch individual values from existing record and assign in related variables
            }
        }, function (error) {
            console.error("Error in fetching existing record ", error);
        });
    };
    AdaptationProjectinformationComponent.prototype.reAssignValues = function (responseData) {
        // assign project from id
        this.agricultureArr = this.adaptationPIForm.controls.agriculture.value;
        this.forestryArr = this.adaptationPIForm.controls.forestry.value;
        this.waterArr = this.adaptationPIForm.controls.water.value;
        this.energyArr = this.adaptationPIForm.controls.energy.value;
        this.healthArr = this.adaptationPIForm.controls.health.value;
        this.riskArr = this.adaptationPIForm.controls.risk.value;
    };
    AdaptationProjectinformationComponent.prototype.populateForm = function (form, data) {
        var keys = Object.keys(data);
        var pathValueObj = {};
        keys.forEach(function (key) {
            pathValueObj[key] = data[key];
        });
        form.patchValue(pathValueObj);
        if (data.entity && data.entity == this.menu.entity) {
            form.controls.parentProject = data.parentProject;
            this.selectedProject = data.parentProject;
        }
    };
    AdaptationProjectinformationComponent.prototype.onTabChange = function (event) {
        console.log(event.index);
    };
    AdaptationProjectinformationComponent.prototype.submit = function () {
        var _this = this;
        console.log("form submit ", this.adaptationPIForm);
        // add rest of the form values for the question section
        this.adaptationPIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        this.adaptationPIForm.controls.agriculture.patchValue(this.agricultureArr);
        this.adaptationPIForm.controls.forestry.patchValue(this.forestryArr);
        this.adaptationPIForm.controls.water.patchValue(this.waterArr);
        this.adaptationPIForm.controls.energy.patchValue(this.energyArr);
        this.adaptationPIForm.controls.health.patchValue(this.healthArr);
        this.adaptationPIForm.controls.risk.patchValue(this.riskArr);
        this.appService.saveNDC(this.adaptationPIForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.utilityService.openSnackBar(response.message, 'success');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err.error.message, 'error');
        });
    };
    AdaptationProjectinformationComponent.prototype.updateDataStatus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.recordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.adaptationPIForm.controls.approverComment.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                // this.adaptationPIForm.reset();
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
    AdaptationProjectinformationComponent = __decorate([
        core_1.Component({
            selector: 'app-adaptation-projectinformation',
            templateUrl: './adaptation-projectinformation.component.html',
            styleUrls: ['./adaptation-projectinformation.component.scss']
        })
    ], AdaptationProjectinformationComponent);
    return AdaptationProjectinformationComponent;
}());
exports.AdaptationProjectinformationComponent = AdaptationProjectinformationComponent;
