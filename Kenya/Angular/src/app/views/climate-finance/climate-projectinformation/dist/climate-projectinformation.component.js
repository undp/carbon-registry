"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClimateProjectinformationComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var ClimateProjectinformationComponent = /** @class */ (function () {
    function ClimateProjectinformationComponent(_fb, _activatedRoute, _snackBar, router, appService) {
        this._fb = _fb;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.router = router;
        this.appService = appService;
        this.climateFinanceData = {
            startDate: null,
            endDate: null,
            closureDate: null,
            targetGhg: [],
            contributions: [],
            financialYear: null,
            appliedExchange: 0,
            financingMode: null,
            budgetCode: null,
            projectSize: null,
            projectCost: 0,
            nationalBudget: 0,
            subNationalBudget: 0,
            greenBonds: 0,
            others: 0,
            sourceOfFinance: [],
            detailBudget: [],
            disbursementSchedule: [],
            entity: "FINANCE INPUT",
            projectId: null,
            performanceIndicatorMI: []
        };
        this.sourceOfFinanceDataList = [];
        this.detailedBudgetDataList = [];
        this.disbursementYearDataList = [];
        // Table related declarations
        this.sourceOfFinanceDisplayedColumns = [];
        this.detailedBudgetDisplayedColumns = [];
        this.disbursementYearDisplayedColumns = [];
        this.sourceOfFinanceDataSource = new material_1.MatTableDataSource(this.sourceOfFinanceDataList);
        this.detailedBudgetDataSource = new material_1.MatTableDataSource(this.detailedBudgetDataList);
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.sourceOfFinanceSelection = new collections_1.SelectionModel(true, []);
        this.detailedBudgetSelection = new collections_1.SelectionModel(true, []);
        this.disbursementYearSelection = new collections_1.SelectionModel(true, []);
        this.sourceOfFinanceColumnNames = [
            { id: 'fundingType', value: 'Funding Type' },
            { id: 'nationalInternational', value: 'National/International' },
            { id: 'amount', value: 'Amount (USD)' },
            { id: 'channel', value: 'Financing Channel' },
            { id: 'fundingAgency', value: 'Funding Agency' }
        ];
        this.detailedBudgetColumnNames = [
            { id: 'category', value: 'Disbursement Category' },
            { id: 'amount', value: 'Amount (USD)' },
            { id: 'reference', value: 'Reference' }
        ];
        this.disbursementYearColumnNames = [
            { id: 'year', value: 'Disbursement Year' },
            { id: 'amount', value: 'Amount (USD)' },
            { id: 'reference', value: 'Reference' }
        ];
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.sourceOfFinanceDataList = [];
        this.detailedBudgetDataList = [];
        this.disbursementYearDataList = [];
        this.sourceOfFinanceDataSource.data = this.sourceOfFinanceDataList;
        this.detailedBudgetDataSource.data = this.detailedBudgetDataList;
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
    Object.defineProperty(ClimateProjectinformationComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ClimateProjectinformationComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    ClimateProjectinformationComponent.prototype.loadActivityData = function (loadType, value) {
        var _a;
        var _this = this;
        var obj = (_a = {},
            _a[loadType] = value,
            _a);
        if (obj) {
            this.appService.getNDC(obj).subscribe(function (res) {
                if (res.statusCode == 200 && res.data) {
                    console.log(res);
                    _this.climateFinanceData = {
                        startDate: res.data.parentProject.startDate,
                        endDate: res.data.parentProject.endDate,
                        closureDate: res.data.parentProject.closureDate,
                        financialYear: res.data.financialYear,
                        appliedExchange: res.data.appliedExchange,
                        financingMode: res.data.financingMode,
                        budgetCode: res.data.budgetCode,
                        projectSize: res.data.projectSize,
                        projectCost: res.data.parentProject.projectSize,
                        projectId: res.data.parentProject.projectId,
                        nationalBudget: res.data.nationalBudget,
                        subNationalBudget: res.data.subNationalBudget,
                        greenBonds: res.data.greenBonds,
                        others: res.data.parentProject.others
                    };
                    _this.formGroup.controls['projectId'].setValue(res.data.parentProject);
                    _this.remarksCtrl.setValue(res.data.remarks);
                    _this.sourceOfFinanceDataList = res.data.sourceOfFinance;
                    _this.detailedBudgetDataList = res.data.detailBudget;
                    _this.disbursementYearDataList = res.data.disbursementSchedule;
                    _this.sourceOfFinanceDataSource.data = _this.sourceOfFinanceDataList;
                    _this.detailedBudgetDataSource.data = _this.detailedBudgetDataList;
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
    ClimateProjectinformationComponent.prototype.ngOnInit = function () {
        this.projectList = [];
        this.yearList = [];
        this.getYears();
        this.getProjectList();
        // this.sourceOfFinanceDataList = [];
        // this.detailedBudgetDataList = [];
        // this.disbursementYearDataList = [];
        this.sourceOfFinanceDisplayedColumns = this.sourceOfFinanceColumnNames.map(function (x) { return x.id; });
        this.detailedBudgetDisplayedColumns = this.detailedBudgetColumnNames.map(function (x) { return x.id; });
        this.disbursementYearDisplayedColumns = this.disbursementYearColumnNames.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.sourceOfFinanceDisplayedColumns.unshift('select');
            this.detailedBudgetDisplayedColumns.unshift('select');
            this.disbursementYearDisplayedColumns.unshift('select');
        }
        this.sourceOfFinanceDataSource = new material_1.MatTableDataSource(this.sourceOfFinanceDataList);
        this.sourceOfFinanceDataSource.paginator = this.paginator;
        this.detailedBudgetDataSource = new material_1.MatTableDataSource(this.detailedBudgetDataList);
        this.detailedBudgetDataSource.paginator = this.paginator;
        this.disbursementYearDataSource = new material_1.MatTableDataSource(this.disbursementYearDataList);
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    ClimateProjectinformationComponent.prototype.getYears = function () {
        var _this = this;
        this.appService.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    ClimateProjectinformationComponent.prototype.getProjectList = function () {
        var _this = this;
        var obj = {
            status: 'approved',
            module: 'FINANCE_INPUT'
        };
        this.appService.getProjectIds(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                console.log(res);
                _this.projectList = res.data;
            }
        }, function (err) {
        });
    };
    ClimateProjectinformationComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    ClimateProjectinformationComponent.prototype.setDataSourceAttributes = function () {
        this.sourceOfFinanceDataSource.paginator = this.paginator;
        this.sourceOfFinanceDataSource.sort = this.sort;
        this.detailedBudgetDataSource.paginator = this.paginator;
        this.detailedBudgetDataSource.sort = this.sort;
        this.disbursementYearDataSource.paginator = this.paginator;
        this.disbursementYearDataSource.sort = this.sort;
    };
    ClimateProjectinformationComponent.prototype.ngAfterViewInit = function () {
        this.detailedBudgetDataSource.paginator = this.paginator;
        this.detailedBudgetDataSource.paginator = this.paginator;
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    ClimateProjectinformationComponent.prototype.isAllSelectedSourceFinance = function () {
        var numSelected = this.sourceOfFinanceSelection.selected.length;
        var numRows = this.sourceOfFinanceDataSource.data.length;
        return numSelected === numRows;
    };
    ClimateProjectinformationComponent.prototype.isAllSelectedDetailedBudget = function () {
        var numSelected = this.detailedBudgetSelection.selected.length;
        var numRows = this.detailedBudgetDataSource.data.length;
        return numSelected === numRows;
    };
    ClimateProjectinformationComponent.prototype.isAllSelectedDisbursementYear = function () {
        var numSelected = this.disbursementYearSelection.selected.length;
        var numRows = this.disbursementYearDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    ClimateProjectinformationComponent.prototype.masterToggleSourceFinance = function () {
        var _this = this;
        this.isAllSelectedSourceFinance() ?
            this.sourceOfFinanceSelection.clear() :
            this.sourceOfFinanceDataSource.data.forEach(function (row) { return _this.sourceOfFinanceSelection.select(row); });
    };
    ClimateProjectinformationComponent.prototype.masterToggleDetailedBudget = function () {
        var _this = this;
        this.isAllSelectedDetailedBudget() ?
            this.detailedBudgetSelection.clear() :
            this.detailedBudgetDataSource.data.forEach(function (row) { return _this.detailedBudgetSelection.select(row); });
    };
    ClimateProjectinformationComponent.prototype.masterToggleDisbursementYear = function () {
        var _this = this;
        this.isAllSelectedDisbursementYear() ?
            this.disbursementYearSelection.clear() :
            this.disbursementYearDataSource.data.forEach(function (row) { return _this.disbursementYearSelection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    ClimateProjectinformationComponent.prototype.checkboxLabelSourceFinance = function (row) {
        if (!row) {
            return (this.isAllSelectedSourceFinance() ? 'select' : 'deselect') + " all";
        }
        return (this.sourceOfFinanceSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ClimateProjectinformationComponent.prototype.checkboxLabelDetailedBudget = function (row) {
        if (!row) {
            return (this.isAllSelectedDetailedBudget() ? 'select' : 'deselect') + " all";
        }
        return (this.detailedBudgetSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ClimateProjectinformationComponent.prototype.checkboxLabelDisbursementYear = function (row) {
        if (!row) {
            return (this.isAllSelectedDisbursementYear() ? 'select' : 'deselect') + " all";
        }
        return (this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ClimateProjectinformationComponent.prototype.addNewSourceOfFinanceRow = function () {
        this.sourceOfFinanceDataList.push({
            fundingType: '', nationalInternational: '', amount: 0, channel: '', fundingAgency: ''
        });
        this.sourceOfFinanceDataSource.data = this.sourceOfFinanceDataList;
    };
    ClimateProjectinformationComponent.prototype.addNewDetailedBudgetRow = function () {
        this.detailedBudgetDataList.push({
            category: '', amount: 0, reference: ''
        });
        this.detailedBudgetDataSource.data = this.detailedBudgetDataList;
    };
    ClimateProjectinformationComponent.prototype.addNewDisbursementYearRow = function () {
        this.disbursementYearDataList.push({
            year: '', amount: 0, reference: ''
        });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    ClimateProjectinformationComponent.prototype.removeSourceSelected = function () {
        var y = new Set(this.sourceOfFinanceSelection.selected);
        this.sourceOfFinanceDataList = this.sourceOfFinanceDataList.filter(function (x) { return !y.has(x); });
        this.sourceOfFinanceDataSource.data = this.sourceOfFinanceDataList;
    };
    ClimateProjectinformationComponent.prototype.removeDetailedBudgetSelected = function () {
        var y = new Set(this.detailedBudgetSelection.selected);
        this.detailedBudgetDataList = this.detailedBudgetDataList.filter(function (x) { return !y.has(x); });
        this.detailedBudgetDataSource.data = this.detailedBudgetDataList;
    };
    ClimateProjectinformationComponent.prototype.removeDisbursementYearSelected = function () {
        var y = new Set(this.disbursementYearSelection.selected);
        this.disbursementYearDataList = this.disbursementYearDataList.filter(function (x) { return !y.has(x); });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    ClimateProjectinformationComponent.prototype.openSnackBar = function (message, type) {
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
    ClimateProjectinformationComponent.prototype.save = function () {
        var _this = this;
        var project = this.formGroup.controls['projectId'].value;
        var obj = {
            menuId: "Climate_Finance_ProjectInformation",
            parentProject: project._id,
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            projectCode: project.projectCode,
            projectId: project.projectId,
            projectTitle: project.projectTitle,
            financialYear: this.climateFinanceData.financialYear,
            appliedExchange: this.climateFinanceData.appliedExchange,
            financingMode: this.climateFinanceData.financingMode,
            budgetCode: this.climateFinanceData.budgetCode,
            projectSize: this.climateFinanceData.projectSize,
            nationalBudget: this.climateFinanceData.nationalBudget,
            subNationalBudget: this.climateFinanceData.subNationalBudget,
            greenBonds: this.climateFinanceData.greenBonds,
            others: this.climateFinanceData.others,
            sourceOfFinance: this.sourceOfFinanceDataList,
            detailBudget: this.detailedBudgetDataList,
            disbursementSchedule: this.disbursementYearDataList,
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
    ClimateProjectinformationComponent.prototype.updateDataStaus = function (status) {
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
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], ClimateProjectinformationComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], ClimateProjectinformationComponent.prototype, "matPaginator");
    ClimateProjectinformationComponent = __decorate([
        core_1.Component({
            selector: 'app-climate-projectinformation',
            templateUrl: './climate-projectinformation.component.html',
            styleUrls: ['./climate-projectinformation.component.scss']
        })
    ], ClimateProjectinformationComponent);
    return ClimateProjectinformationComponent;
}());
exports.ClimateProjectinformationComponent = ClimateProjectinformationComponent;
