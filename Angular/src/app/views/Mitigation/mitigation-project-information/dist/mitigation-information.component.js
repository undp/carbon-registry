"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MitigationInformationComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var MitigationInformationComponent = /** @class */ (function () {
    function MitigationInformationComponent(_fb, _ras, _activatedRoute, _snackBar, utilityService, router, appService) {
        var _this = this;
        this._fb = _fb;
        this._ras = _ras;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.utilityService = utilityService;
        this.router = router;
        this.appService = appService;
        this.projects = [];
        //table related declarations
        this["true"] = true;
        this.disbursementYearDataList = [];
        this.permissionMenuId = "";
        this.disbursementYearDisplayedColumns = [];
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.disbursementYearSelection = new collections_1.SelectionModel(true, []);
        this.disbursementYearColumnNames = [
            { id: "indicator", value: "Indicator" },
            { id: "unit", value: "Unit" },
            { id: "value", value: "Value" },
            { id: "reference", value: "Reference" }
        ];
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.disbursementYearDataList = [];
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
        this.approvalScreen = false;
        this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
        this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
        if (this.routeFormId) {
            this.approvalScreen = true;
        }
        this.miForm = this._fb.group({
            _id: [""],
            menuId: [''],
            parentProject: [],
            projectCode: [''],
            projectTitle: [''],
            projectId: [''],
            sector: [''],
            subSector: [''],
            ndc: [''],
            location: [''],
            costAmount: [0],
            funding: [0],
            lifetime: [0],
            agency: [''],
            agencyContact: [''],
            otherParty: [''],
            otherPartyContact: [''],
            ghgReduction: [0],
            targetGhg: [[]],
            contributions: [[]],
            projectStatus: [''],
            beneficiary: [''],
            genderIncl: [''],
            projectOutput: [''],
            projectImpact: [''],
            marketMech: [''],
            weblink: [''],
            carbonBen: [''],
            verification: [''],
            startDate: [''],
            endDate: [''],
            closureDate: [''],
            fileCalculation: [''],
            performanceIndicatorMI: [[]],
            // common
            remarks: [''],
            approverComment: [''],
            updatedBy: ['']
        });
        if (this.approvalScreen) {
            // populate data from formId
            this.appService.getNDC({ _id: this.routeFormId })
                .subscribe(function (response) {
                _this.populateForm(_this.miForm, response.data);
                _this.getPermissionMenuId(); // load route related data
            }, function (err) {
                _this.utilityService.openSnackBar(err, "error");
            });
        }
        else {
            this.getPermissionMenuId(); // load route related data
        }
    }
    Object.defineProperty(MitigationInformationComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MitigationInformationComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    MitigationInformationComponent.prototype.onProjectSelect = function () {
        var _this = this;
        console.log("on select", this.selectedProject);
        this.appService.getNDC({ entity: this.menu.entity, parentProject: this.selectedProject._id }).subscribe(function (response) {
            // fill form with existing data
            // if no existing data found then populate data from selected project
            if (!response.data || !response.data.length) {
                _this.populateForm(_this.miForm, _this.selectedProject);
            }
            else {
                _this.populateForm(_this.miForm, response.data);
            }
        }, function (error) {
            console.error("Error in fetching existing record ", error);
        });
    };
    MitigationInformationComponent.prototype.populateForm = function (form, data) {
        var keys = Object.keys(data);
        var pathValueObj = {};
        keys.forEach(function (key) {
            pathValueObj[key] = data[key];
        });
        form.patchValue(pathValueObj);
    };
    MitigationInformationComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this._activatedRoute.data.subscribe(function (data) {
            _this.appService.getRecord(data.menuId).subscribe(function (res) {
                if (res.data) {
                    //getting the menu object
                    _this.menu = res.data;
                    _this.menu.moduleName = data.moduleName;
                    _this.appService.projectByModule(_this.menu.moduleName)
                        .subscribe(function (response) {
                        _this.projects = response.data;
                        if (_this.approvalScreen) {
                            _this.projects.forEach(function (project) {
                                if (project._id == _this.miForm.controls.parentProject.value._id) {
                                    _this.selectedProject = project;
                                }
                            });
                        }
                    });
                }
            }, function (err) {
                console.error("getPermissionMenuId  ", err);
            });
        });
    };
    MitigationInformationComponent.prototype.ngOnInit = function () {
        this.yearList = [];
        this.indicators = [];
        this.valuesByType = [];
        this.getYears();
        this.disbursementYearDataList = [];
        this.disbursementYearDisplayedColumns = this.disbursementYearColumnNames.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.disbursementYearDisplayedColumns.push('actions');
            this.disbursementYearDisplayedColumns.unshift('select');
        }
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    MitigationInformationComponent.prototype.setDataSourceAttributes = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
        this.disbursementYearDataSource.sort = this.sort;
    };
    MitigationInformationComponent.prototype.ngAfterViewInit = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    MitigationInformationComponent.prototype.getYears = function () {
        var _this = this;
        this._ras.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    MitigationInformationComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue == 'required' || 'ValidateDate') {
            return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
        }
        else if (errorValue == 'pattern') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
        }
        else if (errorValue == 'email') {
            return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).hasError('email');
        }
    };
    MitigationInformationComponent.prototype.isAllSelectedDisbursementYear = function () {
        var numSelected = this.disbursementYearSelection.selected.length;
        var numRows = this.disbursementYearDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    MitigationInformationComponent.prototype.masterToggleDisbursementYear = function () {
        var _this = this;
        this.isAllSelectedDisbursementYear() ?
            this.disbursementYearSelection.clear() :
            this.disbursementYearDataSource.data.forEach(function (row) { return _this.disbursementYearSelection.select(row); });
    };
    MitigationInformationComponent.prototype.checkboxLabelDisbursementYear = function (row) {
        if (!row) {
            return (this.isAllSelectedDisbursementYear() ? 'select' : 'deselect') + " all";
        }
        return (this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    MitigationInformationComponent.prototype.addNewDisbursementYearRow = function () {
        this.disbursementYearDataList.push({
            indicator: '', value: 0, unit: '', reference: ''
        });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MitigationInformationComponent.prototype.removeDisbursementYearSelected = function () {
        var y = new Set(this.disbursementYearSelection.selected);
        this.disbursementYearDataList = this.disbursementYearDataList.filter(function (x) { return !y.has(x); });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MitigationInformationComponent.prototype.submit = function () {
        var _this = this;
        this.miForm.controls.menuId.patchValue(this.menu.menuId);
        this.miForm.controls.parentProject.patchValue(this.selectedProject);
        this.miForm.controls.projectCode.patchValue(this.selectedProject.projectCode);
        this.miForm.controls.projectId.patchValue(this.selectedProject.projectId);
        this.miForm.controls.projectTitle.patchValue(this.selectedProject.projectTitle);
        this.miForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
        this.miForm.controls.remarks.patchValue(this.remarksCtrl.value);
        console.log(JSON.stringify(this.miForm.value));
        this.appService.saveNDC(this.miForm.value)
            .subscribe(function (response) {
            if (response.statusCode == 200) {
                _this.utilityService.openSnackBar(response.message, 'success');
            }
        }, function (err) {
            _this.utilityService.openSnackBar(err, 'error');
        });
    };
    MitigationInformationComponent.prototype.removeIndividuallyFromList = function (ele) {
        this.disbursementYearDataList.splice(ele, 1);
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MitigationInformationComponent.prototype.removeSelected = function () {
        var y = new Set(this.disbursementYearSelection.selected);
        this.disbursementYearDataList = this.disbursementYearDataList.filter(function (x) { return !y.has(x); });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MitigationInformationComponent.prototype.openSnackBar = function (message, type) {
        this._snackBar.openFromComponent(snackbar_dialog_component_1.SnackbarDialogComponent, {
            duration: 3000,
            panelClass: 'snackbar-global',
            horizontalPosition: 'center',
            verticalPosition: 'top',
            data: {
                message: message,
                type: type
            }
        });
    };
    MitigationInformationComponent.prototype.updateDataStatus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.miForm.reset();
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
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], MitigationInformationComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], MitigationInformationComponent.prototype, "matPaginator");
    MitigationInformationComponent = __decorate([
        core_1.Component({
            selector: 'app-mitigation-information',
            templateUrl: './mitigation-information.component.html',
            styleUrls: ['./mitigation-information.component.scss']
        })
    ], MitigationInformationComponent);
    return MitigationInformationComponent;
}());
exports.MitigationInformationComponent = MitigationInformationComponent;
