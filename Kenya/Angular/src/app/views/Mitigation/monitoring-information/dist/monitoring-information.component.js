"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MonitoringInformationComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var MonitoringInformationComponent = /** @class */ (function () {
    function MonitoringInformationComponent(_fb, router, _activatedRoute, _snackBar, appService) {
        this._fb = _fb;
        this.router = router;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.appService = appService;
        // static Constants = {
        //   MENU_ID : "GHG_Energy_Reference_Approach"
        // };
        this.mitigationMonitoringData = {
            sector: null,
            subSector: null,
            ndc: null,
            location: null,
            agency: null,
            agencyContact: null,
            otherParty: null,
            otherPartyContact: null,
            costAmount: null,
            funding: null,
            startDate: null,
            endDate: null,
            closureDate: null,
            lifetime: null,
            targetGhg: null,
            contributions: null,
            projectStatus: null,
            beneficiary: null,
            genderIncl: null,
            projectOutput: null,
            projectImpact: null,
            actualGHGSavings: null,
            fileCalculation: null,
            marketMech: null,
            weblink: null,
            carbonBen: null,
            verification: null,
            fileVerification: null,
            performanceIndicatorMI: []
        };
        this.disbursementYearDataList = [];
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
            this.loadActivityData('_id', this.routeFormId);
        }
        this.formGroup = this._fb.group({
            monitoringYear: [null, [forms_1.Validators.required]],
            projectId: [null, [forms_1.Validators.required]]
        });
    }
    Object.defineProperty(MonitoringInformationComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MonitoringInformationComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    MonitoringInformationComponent.prototype.loadActivityData = function (loadType, value) {
        var _a;
        var _this = this;
        var obj = (_a = {},
            _a[loadType] = value,
            _a);
        if (obj) {
            this.appService.getNDC(obj).subscribe(function (res) {
                if (res.statusCode == 200 && res.data) {
                    // console.log(res);
                    // this.mitigationMonitoringData = {
                    //   monitoringYear: res.data.monitoringYear,
                    //   financialYear: res.data.parentProject.financialYear,
                    //   appliedExchange: res.data.parentProject.appliedExchange,
                    //   financingMode: res.data.parentProject.financingMode,
                    //   budgetCode: res.data.parentProject.budgetCode,
                    //   projectId: res.data.parentProject.projectId,
                    //   startDate: res.data.parentProject.startDate,
                    //   endDate: res.data.parentProject.endDate,
                    //   closureDate: res.data.parentProject.closureDate,
                    // }
                    // this.appService.getNDC({_id : res.data.parentProject._id}).subscribe((response: any) => {
                    //   if (response.statusCode == 200 && response.data) {
                    //     this.climateFinanceMonitoringData.startDate = response.data.parentProject.startDate;
                    //     this.climateFinanceMonitoringData.endDate = response.data.parentProject.endDate;
                    //     this.climateFinanceMonitoringData.closureDate = response.data.parentProject.closureDate;
                    //   }
                    // },err=>{
                    // });
                    // this.formGroup.controls['projectId'].setValue(res.data.parentProject);
                    // this.remarksCtrl.setValue(res.data.remarks);
                    // this.disbursementYearDataList = res.data.disbursementDetail;
                    // this.disbursementYearDataSource.data = this.disbursementYearDataList;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            }, function (err) {
                _this.openSnackBar('Something went erong... try again later', 'error');
            });
        }
    };
    MonitoringInformationComponent.prototype.ngOnInit = function () {
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
    MonitoringInformationComponent.prototype.getYears = function () {
        var _this = this;
        this.appService.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    MonitoringInformationComponent.prototype.getProjectList = function () {
        var _this = this;
        var obj = {
            status: 'approved',
            module: 'MITIGATION_MONITORING'
        };
        this.appService.getProjectIds(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                console.log(res);
                _this.projectList = res.data;
            }
        }, function (err) {
        });
    };
    MonitoringInformationComponent.prototype.loadProjectData = function () {
        var project = this.formGroup.controls['projectId'].value;
        this.mitigationMonitoringData = {
            sector: project.sector,
            subSector: project.subSector,
            ndc: project.ndc,
            location: project.location,
            agency: project.agency,
            agencyContact: project.agencyContact,
            otherParty: project.otherParty,
            otherPartyContact: project.otherPartyContact,
            costAmount: project.costAmount,
            funding: project.funding,
            startDate: project.startDate,
            endDate: project.endDate,
            closureDate: project.closureDate,
            lifetime: project.lifetime,
            targetGhg: project.targetGhg,
            contributions: project.contributions,
            projectStatus: project.projectStatus,
            beneficiary: project.beneficiary,
            genderIncl: project.genderIncl,
            projectOutput: project.projectOutput,
            projectImpact: project.projectImpact,
            actualGHGSavings: null,
            fileCalculation: null,
            marketMech: project.marketMech,
            weblink: project.weblink,
            carbonBen: project.carbonBen,
            verification: null,
            fileVerification: null,
            performanceIndicatorMI: project.performanceIndicatorMI
        };
    };
    MonitoringInformationComponent.prototype.setDataSourceAttributes = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
        this.disbursementYearDataSource.sort = this.sort;
    };
    MonitoringInformationComponent.prototype.ngAfterViewInit = function () {
        this.disbursementYearDataSource.paginator = this.paginator;
    };
    MonitoringInformationComponent.prototype.isAllSelectedDisbursementYear = function () {
        var numSelected = this.disbursementYearSelection.selected.length;
        var numRows = this.disbursementYearDataSource.data.length;
        return numSelected === numRows;
    };
    MonitoringInformationComponent.prototype.masterToggleDisbursementYear = function () {
        var _this = this;
        this.isAllSelectedDisbursementYear() ?
            this.disbursementYearSelection.clear() :
            this.disbursementYearDataSource.data.forEach(function (row) { return _this.disbursementYearSelection.select(row); });
    };
    MonitoringInformationComponent.prototype.checkboxLabelDisbursementYear = function (row) {
        if (!row) {
            return (this.isAllSelectedDisbursementYear() ? 'select' : 'deselect') + " all";
        }
        return (this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    MonitoringInformationComponent.prototype.addNewDisbursementYearRow = function () {
        this.disbursementYearDataList.push({
            disbursementCategory: '', amountQ1: 0, amountQ2: 0, amountQ3: 0, amountQ4: 0, reference: ''
        });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MonitoringInformationComponent.prototype.removeDisbursementYearSelected = function () {
        var y = new Set(this.disbursementYearSelection.selected);
        this.disbursementYearDataList = this.disbursementYearDataList.filter(function (x) { return !y.has(x); });
        this.disbursementYearDataSource.data = this.disbursementYearDataList;
    };
    MonitoringInformationComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    MonitoringInformationComponent.prototype.openSnackBar = function (message, type) {
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
    MonitoringInformationComponent.prototype.save = function () {
        var _this = this;
        var project = this.formGroup.controls['projectId'].value;
        var year = this.formGroup.controls['monitoringYear'].value;
        var obj = {
            menuId: "Mitigation_Actions_MonitoringInformation",
            parentProject: project._id,
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            projectCode: project.projectCode,
            projectId: project.projectId,
            projectTitle: project.projectTitle,
            monitoringYear: year,
            actualGHGSavings: this.mitigationMonitoringData.actualGHGSavings,
            fileCalculation: "base64 code for file upload data",
            verification: this.mitigationMonitoringData.verification,
            fileVerification: "base64 code for file upload data",
            performanceIndicatorMI: this.disbursementYearDataList,
            remarks: this.remarksCtrl.value
        };
        this.appService.saveNDC(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.openSnackBar(res.message, 'success');
                _this.formGroup.controls['projectId'].reset();
                _this.formGroup.controls['monitoringYear'].reset();
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    MonitoringInformationComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                // this.adaptationMIForm.reset();
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
    ], MonitoringInformationComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], MonitoringInformationComponent.prototype, "matPaginator");
    MonitoringInformationComponent = __decorate([
        core_1.Component({
            selector: 'app-monitoring-information',
            templateUrl: './monitoring-information.component.html',
            styleUrls: ['./monitoring-information.component.scss']
        })
    ], MonitoringInformationComponent);
    return MonitoringInformationComponent;
}());
exports.MonitoringInformationComponent = MonitoringInformationComponent;
