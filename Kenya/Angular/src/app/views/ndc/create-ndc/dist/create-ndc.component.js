"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateNdcComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var Action_1 = require("rxjs/internal/scheduler/Action");
var snackbar_dialog_component_1 = require("../../modal/snackbar-dialog/snackbar-dialog.component");
var form_constants_1 = require("../../../form-constants");
var CreateNdcComponent = /** @class */ (function () {
    function CreateNdcComponent(formBuilder, ts, _authService, ls, router, activatedRoute, _snackBar, appService, dialog) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.ts = ts;
        this._authService = _authService;
        this.ls = ls;
        this.router = router;
        this.activatedRoute = activatedRoute;
        this._snackBar = _snackBar;
        this.appService = appService;
        this.dialog = dialog;
        this.causeArr = [];
        this.ndcAreaArr = [];
        this.divisionArr = [];
        this.locationArr = [];
        this.fundingArr = [];
        this.sectorArr = [];
        this.subSectorArr = [];
        this.errors = {
            noSourceDestination: false
        };
        this.subscription = this.appService.appDataLoadedSubject.subscribe(function (data) {
            // get cause
            _this.causeArr = _this.appService.getAppDataWithFilter(form_constants_1.FormConstants.NDC_CAUSE, form_constants_1.FormConstants.VALUE);
            _this.ndcAreaArr = _this.appService.getAppDataWithFilter(form_constants_1.FormConstants.NDC_AREA, form_constants_1.FormConstants.VALUE);
            _this.locationArr = _this.appService.getAppDataWithFilter(form_constants_1.FormConstants.LOCATION, form_constants_1.FormConstants.VALUE);
            _this.fundingArr = _this.appService.getAppDataWithFilter(form_constants_1.FormConstants.FUNDING, form_constants_1.FormConstants.VALUE);
        });
    }
    CreateNdcComponent_1 = CreateNdcComponent;
    CreateNdcComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    CreateNdcComponent.prototype.getPermissionMenuId = function () {
        this.appService.getRecord(CreateNdcComponent_1.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                CreateNdcComponent_1.Constants.permissionMenuId = res.data.permissionMenuId;
            }
        }, function (err) {
        });
    };
    CreateNdcComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.approvalScreen = false;
        this.routesArr = [];
        // init form
        this.ndcCreateForm = this.formBuilder.group({
            _id: [''],
            menuId: [''],
            cause: ['', [forms_1.Validators.required]],
            division: ['', [forms_1.Validators.required]],
            sector: ['', [forms_1.Validators.required]],
            subSector: ['', [forms_1.Validators.required]],
            area: [''],
            projectTitle: [''],
            agency: [''],
            otherParty: [''],
            lifetime: [''],
            startDate: [''],
            endDate: [''],
            closureDate: [''],
            napa: [''],
            ndc: [''],
            location: [''],
            coordinates: [''],
            costAmount: [''],
            funding: [''],
            remarks: [''],
            updatedBy: [''],
            permissionMenuId: [''],
            // back end properties
            status: [''],
            entity: [''],
            projectCode: [''],
            projectId: ['']
        });
        // console.log("causeArr ",this.causeArr);
        this.appService.getNDCSector({ outputValue: "type", distinct: "true" })
            .subscribe(function (response) {
            _this.divisionArr = response.data;
        });
        // check routes for record update
        this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
        this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
        if (this.formId && this.recordId) {
            this.approvalScreen = true;
        }
        if (this.formId) {
            this.appService.getNDC({ _id: this.formId })
                .subscribe(function (response) {
                if (response.statusCode == 200 && response.data) {
                    var keys = Object.keys(response.data);
                    var pathValueObj_1 = {};
                    keys.forEach(function (key) {
                        pathValueObj_1[key] = response.data[key];
                    });
                    _this.ndcCreateForm.patchValue(pathValueObj_1);
                    // re-populate  dropdown
                    _this.mappingChange('division');
                    _this.mappingChange('sector');
                }
            });
        }
    };
    CreateNdcComponent.prototype.mappingChange = function (type) {
        // console.log(this.ndcCreateForm);
        var _this = this;
        switch (type) {
            case "division":
                // call sector
                this.appService.getNDCSector({ outputValue: "sector", type: this.ndcCreateForm.controls.division.value, distinct: "true" })
                    .subscribe(function (response) {
                    _this.sectorArr = response.data;
                });
                break;
            case "sector":
                // call sector
                this.appService.getNDCSector({ outputValue: "subSector", type: this.ndcCreateForm.controls.division.value, sector: this.ndcCreateForm.controls.sector.value, distinct: "true" })
                    .subscribe(function (response) {
                    _this.subSectorArr = response.data;
                });
                break;
            default:
                break;
        }
    };
    /* addNewRow(){
      this.routesArr.push(
        {
          cause : null,
          division :0,
          sector : 0,
          subSector : null,
          area : null,
          agency : null,
          otherParty : null,
          projectTitle : null,
          lifetime : null,
          napa : null,
          ndc : null,
          location : null,
          coordinates : null,
          costAmount : null,
          funding : null,
          startDate : null,
          endDate : null,
          closureDate : null
         
        }
      )
    } */
    CreateNdcComponent.prototype.addNewCostFactor = function (i) {
        this.routesArr[i].travelcost.factors.push({ name: null, cost: 0 });
    };
    CreateNdcComponent.prototype.removeFromList = function (i) {
        this.routesArr.splice(i, 1);
    };
    CreateNdcComponent.prototype.invalidTripArray = function () {
        var noValues = [null, '', undefined];
        if (this.routesArr.length <= 0) {
            return true;
        }
        if (this.routesArr.filter(function (x) { return noValues.indexOf(x.name) > -1 ||
            noValues.indexOf(x.roadcondition.overallCondition) > -1 ||
            noValues.indexOf(x.wayDetails) > -1 ||
            noValues.indexOf(x.pros) > -1 ||
            noValues.indexOf(x.cons) > -1; }).length > 0) {
            return true;
        }
        if (this.routesArr.filter(function (z) { return z.travelcost.factors.filter(function (x) { return noValues.indexOf(x.name) > -1; }).length > 0; }).length > 0) {
            return true;
        }
        if (this.routesArr.filter(function (y) { return y.intermediateLocation.length <= 0; }).length > 0) {
            return true;
        }
        return false;
    };
    CreateNdcComponent.prototype.removeFromFactorList = function (i, j) {
        this.routesArr[i].travelcost.factors.splice(j, 1);
    };
    CreateNdcComponent.prototype.openSnackBar = function (message, type) {
        this._snackBar.openFromComponent(snackbar_dialog_component_1.SnackbarDialogComponent, {
            duration: 3000,
            panelClass: 'snackbar-global',
            data: {
                message: message,
                action: Action_1.Action,
                type: type
            }
        });
    };
    CreateNdcComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var nameFound = data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1;
            var sourceFound = data.sourceName.toString().trim().toLowerCase().indexOf(searchString.sourceName.toLowerCase()) !== -1;
            var idFound = data.id.toString().trim().toLowerCase().indexOf(searchString.id.toLowerCase()) !== -1;
            var destinationFound = data.destinationName.toString().trim().toLowerCase().indexOf(searchString.destinationName.toLowerCase()) !== -1;
            var routesFound = data.routesNo.toString().trim().toLowerCase().indexOf(searchString.routesNo.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return nameFound || idFound || sourceFound || destinationFound || routesFound;
            }
            else {
                return nameFound && idFound && sourceFound && destinationFound && routesFound;
            }
        };
        return myFilterPredicate;
    };
    CreateNdcComponent.prototype.applyFilter = function (filterValue) {
        var filter = {
            name: filterValue.trim().toLowerCase(),
            id: filterValue.trim().toLowerCase(),
            sourceName: filterValue.trim().toLowerCase(),
            routesNo: filterValue.trim().toLowerCase(),
            destinationName: filterValue.trim().toLowerCase(),
            topFilter: true
        };
    };
    CreateNdcComponent.prototype.getTotalCost = function (i) {
        var overAllCost = 0;
        this.routesArr[i].travelcost.factors.forEach(function (factor) {
            if (factor.cost) {
                overAllCost += parseInt(factor.cost);
            }
        });
        this.routesArr[i].travelcost.totalCost = overAllCost;
        return overAllCost;
    };
    CreateNdcComponent.prototype.saveNDC = function () {
        var _this = this;
        // console.log(this.ndcCreateForm.value.closureDate.toDate());
        this.ndcCreateForm.value.menuId = CreateNdcComponent_1.Constants.MENU_ID;
        this.ndcCreateForm.value.permissionMenuId = CreateNdcComponent_1.Constants.permissionMenuId;
        this.ndcCreateForm.value.updatedBy = JSON.parse(localStorage.getItem('loggedInUser'))._id;
        this.appService.saveNDC(this.ndcCreateForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.openSnackBar(response.message, 'success');
                _this.router.navigate(["/dashboard"]);
            }
        });
        /* var obj = {
          inventoryYear: this.formGroup.controls['inventoryYear'].value,
          sector: this.formGroup.controls['sector'].value,
          calculationApproach: this.formGroup.controls['calculationApproach'].value,
          activityData: this.dataList.concat(this.newlyAddedList),
          updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
          remark: this.remarksCtrl.value,
          menuId : CreateNdcComponent.Constants.MENU_ID,
          permissionMenuId: this.permissionMenuId
        }; */
    };
    var CreateNdcComponent_1;
    CreateNdcComponent.Constants = {
        MENU_ID: "NDC_Actions",
        permissionMenuId: ""
    };
    CreateNdcComponent = CreateNdcComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-create-ndc',
            templateUrl: './create-ndc.component.html',
            styleUrls: ['./create-ndc.component.scss']
        })
    ], CreateNdcComponent);
    return CreateNdcComponent;
}());
exports.CreateNdcComponent = CreateNdcComponent;
