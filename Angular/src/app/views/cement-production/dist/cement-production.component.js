"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CementProductionComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var CementProductionComponent = /** @class */ (function () {
    function CementProductionComponent(_fb, _ts, _activatedRoute, _snackBar, router, appService) {
        this._fb = _fb;
        this._ts = _ts;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.router = router;
        this.appService = appService;
        this.dataList = [];
        this.newlyAddedList = [];
        this.clickerData = {
            clinkerImport: 0,
            clinkerExport: 0,
            reference: ''
        };
        // Table related declarations
        //table related declarations
        this["true"] = true;
        this.displayedColumns = [];
        this.dataSource = new material_1.MatTableDataSource(this.dataList);
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.cementTypeCtrl = new forms_1.FormControl();
        this.amountProducedCtrl = new forms_1.FormControl();
        this.clinkerFractionCtrl = new forms_1.FormControl();
        this.referenceCtrl = new forms_1.FormControl();
        this.selection = new collections_1.SelectionModel(true, []);
        this.newSelection = new collections_1.SelectionModel(true, []);
        this.columnNames = [
            { id: "cementType", value: "Cement Type", formControl: this.cementTypeCtrl },
            { id: "amountProduced", value: "Amount of Cement produced", formControl: this.amountProducedCtrl },
            { id: "clinkerFraction", value: "Clinker Fraction in Cement(%)", formControl: this.clinkerFractionCtrl },
            { id: "reference", value: "Reference", formControl: this.referenceCtrl }
        ];
        this.filteredValues = {
            cementType: '', amountProduced: '', clinkerFraction: '', reference: ''
        };
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.dataList = [];
        this.newlyAddedList = [];
        this.dataSource.data = this.dataList;
        this.newDataSource.data = this.newlyAddedList;
        this.approvalScreen = false;
        this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
        this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
        if (this.routeFormId) {
            this.approvalScreen = true;
            this.loadActivityData('_id', this.routeFormId);
        }
        this.formGroup = this._fb.group({
            inventoryYear: [null, [forms_1.Validators.required]],
            sector: ['2-Industrial Processes and Product Use', [forms_1.Validators.required]],
            subSector: ['2.A.1-Cement Production', [forms_1.Validators.required]],
            category: ['2.A-Mineral Industry', [forms_1.Validators.required]],
            calculationApproach: ['Tier I', [forms_1.Validators.required]]
        });
    }
    CementProductionComponent_1 = CementProductionComponent;
    Object.defineProperty(CementProductionComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CementProductionComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    CementProductionComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.appService.getRecord(CementProductionComponent_1.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                _this.menu = res.data;
            }
        }, function (err) {
        });
    };
    CementProductionComponent.prototype.loadActivityData = function (type, value) {
        var _a;
        var _this = this;
        var obj = (_a = {
                menuId: CementProductionComponent_1.Constants.MENU_ID
            },
            _a[type] = value,
            _a);
        this.dataList = [];
        this.dataSource.data = this.dataList;
        if (obj)
            this.appService.getDataRecord(obj).subscribe(function (res) {
                if (res.statusCode == 200 && res.data) {
                    _this.formGroup.controls['inventoryYear'].setValue(res.data.inventoryYear);
                    _this.formGroup.controls['sector'].setValue(res.data.sector);
                    _this.formGroup.controls['calculationApproach'].setValue(res.data.calculationApproach);
                    _this.formGroup.controls['subSector'].setValue(res.data.subSector);
                    _this.formGroup.controls['category'].setValue(res.data.category);
                    _this.remarksCtrl.setValue(res.data.remark);
                    _this.dataList = res.data.cementData;
                    _this.dataSource.data = _this.dataList;
                    _this.clickerData = res.data.clinkerData;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            }, function (err) {
            });
    };
    CementProductionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yearList = [];
        this.getYears();
        this.getPermissionMenuId();
        this.dataList = [];
        this.newlyAddedList = [];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.displayedColumns.push('actions');
            this.displayedColumns.unshift('select');
        }
        // this.dataSource = new MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.referenceCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['reference'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.cementTypeCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['cementType'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.amountProducedCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['amountProduced'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.clinkerFractionCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['clinkerFraction'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
    };
    CementProductionComponent.prototype.getYears = function () {
        var _this = this;
        this._ts.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    CementProductionComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue == "required" || "ValidateDate") {
            return (form.get(field).invalid &&
                (form.get(field).touched || form.get(field).dirty) &&
                form.get(field).hasError(errorValue));
        }
        else if (errorValue == "pattern") {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError("required") &&
                form.get(field).errors.pattern);
        }
        else if (errorValue == "email") {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError("required") &&
                form.get(field).hasError("email"));
        }
    };
    CementProductionComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    CementProductionComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    CementProductionComponent.prototype.applyFilter = function (filterValue) {
        var filter = {
            cementType: filterValue.trim().toLowerCase(),
            amountProduced: filterValue.trim().toLowerCase(),
            clinkerFraction: filterValue.trim().toLowerCase(),
            reference: filterValue.trim().toLowerCase(),
            topFilter: true
        };
        this.dataSource.filter = JSON.stringify(filter);
    };
    CementProductionComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var cementType = data.cementType.toString().trim().toLowerCase().indexOf(searchString.cementType.toLowerCase()) !== -1;
            var amountProduced = data.amountProduced.toString().trim().toLowerCase().indexOf(searchString.amountProduced.toLowerCase()) !== -1;
            var clinkerFraction = data.clinkerFraction.toString().trim().toLowerCase().indexOf(searchString.clinkerFraction.toLowerCase()) !== -1;
            var reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return cementType || amountProduced || clinkerFraction || reference;
            }
            else {
                return cementType && amountProduced && clinkerFraction && reference;
            }
        };
        return myFilterPredicate;
    };
    CementProductionComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    CementProductionComponent.prototype.isAllNewSelected = function () {
        var numSelected = this.newSelection.selected.length;
        var numRows = this.newDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    CementProductionComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    CementProductionComponent.prototype.masterToggleNew = function () {
        var _this = this;
        this.isAllNewSelected() ?
            this.newSelection.clear() :
            this.newDataSource.data.forEach(function (row) { return _this.newSelection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    CementProductionComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    CementProductionComponent.prototype.checkboxLabelNew = function (row) {
        if (!row) {
            return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    CementProductionComponent.prototype.addNewRow = function () {
        var x = this.newlyAddedList.length;
        this.newlyAddedList.push({
            cementType: '', amountProduced: 0, clinkerFraction: 0, reference: ''
        });
        this.newDataSource.data = this.newlyAddedList;
    };
    CementProductionComponent.prototype.removeIndividuallyFromList = function (list, ele) {
        if (list == 'exist') {
            this.dataList.splice(ele, 1);
            this.dataSource.data = this.dataList;
        }
        if (list == 'new') {
            this.newlyAddedList.splice(ele, 1);
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    CementProductionComponent.prototype.removeSelected = function (list) {
        if (list == 'exist') {
            var y_1 = new Set(this.selection.selected);
            this.dataList = this.dataList.filter(function (x) { return !y_1.has(x); });
            this.dataSource.data = this.dataList;
        }
        if (list == 'new') {
            var y_2 = new Set(this.newSelection.selected);
            this.newlyAddedList = this.newlyAddedList.filter(function (x) { return !y_2.has(x); });
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    CementProductionComponent.prototype.openSnackBar = function (message, type) {
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
    CementProductionComponent.prototype.saveElectricityGeneration = function () {
        var _this = this;
        console.log(this.dataList);
        console.log(this.newlyAddedList);
        var obj = {
            inventoryYear: this.formGroup.controls['inventoryYear'].value,
            sector: this.formGroup.controls['sector'].value,
            subSector: this.formGroup.controls['subSector'].value,
            category: this.formGroup.controls['category'].value,
            calculationApproach: this.formGroup.controls['calculationApproach'].value,
            cementData: this.dataList.concat(this.newlyAddedList),
            clinkerData: this.clickerData,
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            remark: this.remarksCtrl.value,
            menuId: CementProductionComponent_1.Constants.MENU_ID,
            permissionMenuId: this.menu.permissionMenuId
        };
        this.appService.saveRecord(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.openSnackBar(res.message, 'success');
                _this.formGroup.controls['inventoryYear'].reset();
                _this.formGroup.controls['subCategory'].reset();
                _this.dataList = [];
                _this.dataSource.data = _this.dataList;
                _this.newlyAddedList = [];
                _this.newDataSource.data = _this.newlyAddedList;
                _this.clickerData = {
                    clinkerImport: '',
                    clinkerExport: '',
                    reference: ''
                };
            }
            else {
                _this.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    CementProductionComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this._ts.updateDataStatus(obj).subscribe(function (res) {
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
    var CementProductionComponent_1;
    CementProductionComponent.Constants = {
        MENU_ID: 'GHG_IPPU_Mineral_Industry_Cement_Production'
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], CementProductionComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], CementProductionComponent.prototype, "matPaginator");
    CementProductionComponent = CementProductionComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-cement-production',
            templateUrl: './cement-production.component.html',
            styleUrls: ['./cement-production.component.scss']
        })
    ], CementProductionComponent);
    return CementProductionComponent;
}());
exports.CementProductionComponent = CementProductionComponent;
