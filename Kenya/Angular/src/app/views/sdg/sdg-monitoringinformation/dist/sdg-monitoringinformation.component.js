"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SdgMonitoringinformationComponent = void 0;
var core_1 = require("@angular/core");
var other_sdg_bottom_sheet_component_1 = require("../other-sdg-bottom-sheet/other-sdg-bottom-sheet.component");
var app_constants_1 = require("../../app.constants");
var SdgMonitoringinformationComponent = /** @class */ (function () {
    function SdgMonitoringinformationComponent(bottomsheet, formBuilder, appService, activatedRoute, utilityService) {
        this.bottomsheet = bottomsheet;
        this.formBuilder = formBuilder;
        this.appService = appService;
        this.activatedRoute = activatedRoute;
        this.utilityService = utilityService;
        this.otherSdg = {
            selectedSdgName: null
        };
        this.projects = [];
        // stakeholderInputArr:QuestionModel[] = [];
        this.povertyReductionArr = [];
        this.reducingInequalityArr = [];
        this.genderParityArr = [];
        this.otherSDGArr = [];
        this.likelihoodArr = [];
        this.impactArr = [];
        this.otherSdgValueArr = [];
        this.monitoringYears = [];
        this.sdgMIForm = this.formBuilder.group({
            _id: [""],
            menuId: [SdgMonitoringinformationComponent_1.Constants.MENU_ID],
            remarks: [""],
            updatedBy: [""],
            permissionMenuId: [""],
            projectCode: [""],
            projectId: [""],
            projectTitle: [""],
            // back end properties
            entity: [""],
            parentProject: [""],
            monitoringYear: [""],
            // stakeholderInput:[[]],
            povertyReduction: [[]],
            reducingInequality: [[]],
            genderParity: [[]],
            otherSDG: [[]],
            approverComment: [""]
        });
    }
    SdgMonitoringinformationComponent_1 = SdgMonitoringinformationComponent;
    SdgMonitoringinformationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getPermissionMenuId();
        this.appService.projectByModule(SdgMonitoringinformationComponent_1.Constants.moduleName)
            .subscribe(function (response) {
            _this.projects = response.data;
        });
        this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
        this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
        if (this.formId && this.recordId) {
            this.approvalScreen = true;
            // read data from the from id
            this.appService.getNDC({ _id: this.formId })
                .subscribe(function (response) {
                if (response.statusCode == 200 && response.data) {
                    /* let keys = Object.keys(response.data);
                    let pathValueObj = {};
                    keys.forEach(key=> {
                      pathValueObj[key] = response.data[key];
                    })
                    this.sdgMIForm.patchValue(pathValueObj); */
                    _this.populateForm(_this.sdgMIForm, response.data);
                    _this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
                }
            });
        }
    };
    SdgMonitoringinformationComponent.prototype.populateForm = function (form, data) {
        var keys = Object.keys(data);
        var pathValueObj = {};
        keys.forEach(function (key) {
            pathValueObj[key] = data[key];
        });
        form.patchValue(pathValueObj);
    };
    SdgMonitoringinformationComponent.prototype.reAssignValues = function (responseData) {
        var _this = this;
        // assign project from id
        this.projects.forEach(function (project) {
            if (project._id == responseData.parentProject || project._id == responseData.parentProject._id) {
                _this.sdgMIForm.controls.parentProject.patchValue(project);
                _this.selectedProject = (project);
            }
        });
        this.povertyReductionArr = responseData.povertyReduction;
        this.reducingInequalityArr = responseData.reducingInequality;
        this.genderParityArr = responseData.genderParity;
        this.otherSDGArr = responseData.otherSDG;
        // get otherSdgValueArr
        this.selectedProject.otherSDG.forEach(function (otherSdg) {
            _this.otherSdgValueArr.push(otherSdg.otherSdgType);
        });
    };
    SdgMonitoringinformationComponent.prototype.populateYears = function (closureDate) {
        this.monitoringYears = [];
        var closureYear = new Date(closureDate).getFullYear();
        for (var i = closureYear; i <= closureYear + app_constants_1.MRV_MONITORING_YEAR_COUNT; i++) {
            this.monitoringYears.push(i);
        }
    };
    SdgMonitoringinformationComponent.prototype.onProjectSelect = function () {
        var _this = this;
        this.populateYears(this.selectedProject.closureDate);
        this.appService.getNDC({ entity: SdgMonitoringinformationComponent_1.Constants.entity, parentProject: this.selectedProject._id }).subscribe(function (response) {
            console.log("response.data   ", response);
            // fill form with existing data
            // if no existing data found then populate data from selected project
            if (!response.data) {
                _this.populateForm(_this.sdgMIForm, _this.selectedProject);
            }
            else {
                _this.populateForm(_this.sdgMIForm, response.data);
            }
            _this.reAssignValues(response.data);
        }, function (error) {
            _this.utilityService.openSnackBar(error, "error");
        });
        // data population from selected project
        // get otherSdgValueArr
        /* this.selectedProject.otherSDG.forEach((otherSdg:OtherSDGModel) => {
          this.otherSdgValueArr.push(otherSdg.otherSdgType);
        });
        this.povertyReductionArr = (this.selectedProject.povertyReduction as QuestionModel[]).filter(poverty=>{
          if(poverty.isQuantitative) {
            return poverty;
          }
        })
        this.reducingInequalityArr = (this.selectedProject.reducingInequality as QuestionModel[]).filter(reducingInequality=>{
          if(reducingInequality.isQuantitative) {
            return reducingInequality;
          }
        })
        console.log("reducingInequalityArr ",this.reducingInequalityArr);
    
        this.genderParityArr = (this.selectedProject.genderParity as QuestionModel[]).filter(genderParity=>{
          if(genderParity.isQuantitative) {
            return genderParity;
          }
        })
        this.otherSDGArr = (this.selectedProject.otherSDG as OtherSDGModel[]);
        console.log("otherSDGArr ",this.otherSDGArr); */
    };
    SdgMonitoringinformationComponent.prototype.submit = function () {
        var _this = this;
        console.log("povertyReductionArr  ", this.povertyReductionArr);
        console.log("otherSDGArr  ", this.otherSDGArr);
        // add rest of the form values for the question section
        this.sdgMIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        this.sdgMIForm.controls.povertyReduction.patchValue(this.povertyReductionArr);
        this.sdgMIForm.controls.reducingInequality.patchValue(this.reducingInequalityArr);
        this.sdgMIForm.controls.genderParity.patchValue(this.genderParityArr);
        this.sdgMIForm.controls.otherSDG.patchValue(this.otherSDGArr);
        this.appService.saveNDC(this.sdgMIForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.utilityService.openSnackBar(response.message, 'success');
            }
        });
    };
    SdgMonitoringinformationComponent.prototype.updateDataStatus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.recordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.sdgMIForm.controls.approverComment.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.sdgMIForm.reset();
                _this.utilityService.openSnackBar(res.message, 'success');
            }
            else {
                _this.utilityService.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err.message, 'error');
        });
    };
    SdgMonitoringinformationComponent.prototype.getPermissionMenuId = function () {
        this.appService
            .getRecord(SdgMonitoringinformationComponent_1.Constants.MENU_ID)
            .subscribe(function (res) {
            if (res.data) {
                SdgMonitoringinformationComponent_1.Constants.permissionMenuId =
                    res.data.permissionMenuId;
            }
        }, function (err) {
            console.error(err);
        });
    };
    SdgMonitoringinformationComponent.prototype.onTabChange = function (event) {
        console.log(event.index);
        if (event.index == 4) {
            this.openBottomSheet();
        }
    };
    SdgMonitoringinformationComponent.prototype.openBottomSheet = function () {
        var _this = this;
        // Take refernce of bottom sheet
        var bottomSheetRef = this.bottomsheet.open(other_sdg_bottom_sheet_component_1.OtherSdgBottomSheetComponent, {
            data: {
                datas: this.otherSdgValueArr
            }
        });
        // subscribe to observable that emit event when bottom sheet closes
        bottomSheetRef.afterDismissed().subscribe(function (dataFromChild) {
            console.log(dataFromChild);
            if (dataFromChild == undefined) {
                _this.openBottomSheet();
            }
            else if (dataFromChild != undefined) {
                // update visible flag
                _this.otherSDGArr.map(function (sdg) {
                    sdg.otherSdgType == dataFromChild ? sdg.isVisible = true : sdg.isVisible = false;
                });
                // do the api call for other sdg question list
            }
        });
    };
    var SdgMonitoringinformationComponent_1;
    SdgMonitoringinformationComponent.Constants = {
        MENU_ID: "SDG_Assessment_MonitoringInformation",
        permissionMenuId: "",
        moduleName: "SDG_MONITORING",
        entity: "SDG MONITORING"
    };
    SdgMonitoringinformationComponent = SdgMonitoringinformationComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-sdg-monitoringinformation',
            templateUrl: './sdg-monitoringinformation.component.html',
            styleUrls: ['./sdg-monitoringinformation.component.scss']
        })
    ], SdgMonitoringinformationComponent);
    return SdgMonitoringinformationComponent;
}());
exports.SdgMonitoringinformationComponent = SdgMonitoringinformationComponent;
