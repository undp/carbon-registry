"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClimateMonitoringinformationComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var ClimateMonitoringinformationComponent = /** @class */ (function () {
    function ClimateMonitoringinformationComponent(_fb, _activatedRoute, _snackBar, router, appService) {
        this._fb = _fb;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.router = router;
        this.appService = appService;
        this.climateFinanceMonitoringData = {
            monitoringYear: null,
            financialYear: null,
            appliedExchange: null,
            financingMode: null,
            budgetCode: null,
            startDate: null,
            endDate: null,
            closureDate: null,
            projectId: null,
            disbursementDetail: []
        };
        this.disbursementYearDataList = [];
        // Table related declarations
        this.disbursementYearDisplayedColumns = [];
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.disbursementYearSelection = new collections_1.SelectionModel(true, []);
        this.disbursementYearColumnNames = [
            { id: 'disbursementCategory', value: 'Disbursement Category' },
            { id: 'amountQ1', value: 'Amount Q1 (USD)' },
            { id: 'amountQ2', value: 'Amount Q2 (USD)' },
            { id: 'amountQ3', value: 'Amount Q3 (USD)' },
            { id: 'amountQ4', value: 'Amount Q4 (USD)' },
            { id: 'reference', value: 'Reference' },
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
            this.loadActivityData('_id', this.routeFormId);
        }
        this.formGroup = this._fb.group({
            projectId: [null, [forms_1.Validators.required]]
        });
    }
    Object.defineProperty(ClimateMonitoringinformationComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClimateMonitoringinformationComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    ClimateMonitoringinformationComponent.prototype.loadActivityData = function (loadType, value) {
        var _a;
        var _this = this;
        var obj = (_a = {},
            _a[loadType] = value,
            _a);
        if (obj) {
            this.appService.getNDC(obj).subscribe(function (res) {
                if (res.statusCode == 200 && res.data) {
                    console.log(res);
                    _this.climateFinanceMonitoringData = {
                        monitoringYear: res.data.monitoringYear,
                        financialYear: res.data.parentProject.financialYear,
                        appliedExchange: res.data.parentProject.appliedExchange,
                        financingMode: res.data.parentProject.financingMode,
                        budgetCode: res.data.parentProject.budgetCode,
                        projectId: res.data.parentProject.projectId,
                        startDate: res.data.parentProject.startDate,
                        endDate: res.data.parentProject.endDate,
                        closureDate: res.data.parentProject.closureDate
                    };
                    _this.appService.getNDC({ _id: res.data.parentProject._id }).subscribe(function (response) {
                        if (response.statusCode == 200 && response.data) {
                            _this.climateFinanceMonitoringData.startDate = response.data.parentProject.startDate;
                            _this.climateFinanceMonitoringData.endDate = response.data.parentProject.endDate;
                            _this.climateFinanceMonitoringData.closureDate = response.data.parentProject.closureDate;
                        }
                    }, function (err) {
                    });
                    _this.formGroup.controls['projectId'].setValue(res.data.parentProject);
                    _this.remarksCtrl.setValue(res.data.remarks);
                    _this.disbursementYearDataList = res.data.disbursementDetail;
                    _this.disbursementYearDataSource.data = _this.disbursementYearDataList;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            }, function (err) {
                _this.openSnackBar('Something went erong... try again later', 'error');
            });
        }
    };
    ClimateMonitoringinformationComponent.prototype.ngOnInit = function () {
        this.projectList = [];
        this.yearList = [];
        this.getProjectList();
        this.getYears();
        this.disbursementYearDataList = [];
        this.disbursementYearDisplayedColumns = this.disbursementYearColumnNames.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.disbursementYearDisplayedColumns.unshift('select');
        }
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    ClimateMonitoringinformationComponent.prototype.getYears = function () {
        var _this = this;
        this.appService.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    ClimateMonitoringinformationComponent.prototype.getProjectList = function () {
        var _this = this;
        var obj = {
            status: 'approved',
            module: 'FINANCE_MONITORING'
        };
        this.appService.getProjectIds(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                console.log(res);
                _this.projectList = res.data;
            }
        }, function (err) {
        });
    };
    ClimateMonitoringinformationComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue == 'required' || 'ValidateDate') {
            return (form.get(field).invalid &&
                (form.get(field).touched || form.get(field).dirty) &&
                form.get(field).hasError(errorValue));
        }
        else if (errorValue == 'pattern') {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError('required') &&
                form.get(field).errors.pattern);
        }
        else if (errorValue == 'email') {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError('required') &&
                form.get(field).hasError('email'));
        }
    };
    ClimateMonitoringinformationComponent.prototype.setDataSourceAttributes = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
        this.disbursementYearDataSource.sort = this.sort;
    };
    ClimateMonitoringinformationComponent.prototype.ngAfterViewInit = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    ClimateMonitoringinformationComponent.prototype.isAllSelectedDisbursementYear = function () {
        var numSelected = this.disbursementYearSelection.selected.length;
        var numRows = this.disbursementYearDataSource.data.length;
        return numSelected === numRows;
    };
    ClimateMonitoringinformationComponent.prototype.masterToggleDisbursementYear = function () {
        var _this = this;
        this.isAllSelectedDisbursementYear() ?
            this.disbursementYearSelection.clear() :
            this.disbursementYearDataSource.data.forEach(function (row) { return _this.disbursementYearSelection.select(row); });
    };
    ClimateMonitoringinformationComponent.prototype.checkboxLabelDisbursementYear = function (row) {
        if (!row) {
            return (this.isAllSelectedDisbursementYear() ? 'select' : 'deselect') + " all";
        }
        return (this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ClimateMonitoringinformationComponent.prototype.addNewDisbursementYearRow = function () {
        this.disbursementYearDataList.push({
            disbursementCategory: '', amountQ1: 0, amountQ2: 0, amountQ3: 0, amountQ4: 0, reference: ''
        });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    ClimateMonitoringinformationComponent.prototype.removeDisbursementYearSelected = function () {
        var y = new Set(this.disbursementYearSelection.selected);
        this.disbursementYearDataList = this.disbursementYearDataList.filter(function (x) { return !y.has(x); });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    ClimateMonitoringinformationComponent.prototype.openSnackBar = function (message, type) {
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
    ClimateMonitoringinformationComponent.prototype.save = function () {
        var _this = this;
        var project = this.formGroup.controls['projectId'].value;
        var obj = {
            menuId: "Climate_Finance_MonitoringInformation",
            parentProject: project._id,
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            projectCode: project.projectCode,
            projectId: project.projectId,
            projectTitle: project.projectTitle,
            monitoringYear: this.climateFinanceMonitoringData.monitoringYear,
            budgetCode: 'MOF10001',
            disbursementDetail: this.disbursementYearDataList,
            remarks: this.remarksCtrl.value
        };
        this.appService.saveNDC(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.openSnackBar(res.message, 'success');
                _this.formGroup.controls['projectId'].reset();
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    ClimateMonitoringinformationComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.openSnackBar(res.message, 'success');
                _this.router.navigate(['./my-approvals']);
            }
            else {
                _this.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    ClimateMonitoringinformationComponent.prototype.notChoosen = function (item) {
        this.disbursementYearDataList.forEach(function (element) {
            if (element.disbursementCategory === item) {
                return false;
            }
        });
        return true;
    };
    ClimateMonitoringinformationComponent.Constants = {
        MENU_ID: 'Climate_Finance_MonitoringInformation'
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], ClimateMonitoringinformationComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], ClimateMonitoringinformationComponent.prototype, "matPaginator");
    ClimateMonitoringinformationComponent = __decorate([
        core_1.Component({
            selector: 'app-climate-monitoringinformation',
            templateUrl: './climate-monitoringinformation.component.html',
            styleUrls: ['./climate-monitoringinformation.component.scss']
        })
    ], ClimateMonitoringinformationComponent);
    return ClimateMonitoringinformationComponent;
}());
exports.ClimateMonitoringinformationComponent = ClimateMonitoringinformationComponent;
