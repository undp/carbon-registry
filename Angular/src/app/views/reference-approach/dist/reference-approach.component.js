"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReferenceApproachComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var ReferenceApproachComponent = /** @class */ (function () {
    function ReferenceApproachComponent(_fb, _ras, _activatedRoute, _snackBar, appService, router) {
        this._fb = _fb;
        this._ras = _ras;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.appService = appService;
        this.router = router;
        //table related declarations
        this["true"] = true;
        this.permissionMenuId = "";
        this.displayedColumns = [];
        this.dataSource = new material_1.MatTableDataSource([]);
        this.newDataSource = new material_1.MatTableDataSource([]);
        this.fuelTypeCtrl = new forms_1.FormControl();
        this.fuelCtrl = new forms_1.FormControl();
        this.unitCtrl = new forms_1.FormControl();
        this.productionCtrl = new forms_1.FormControl();
        this.importsCtrl = new forms_1.FormControl();
        this.exportsCtrl = new forms_1.FormControl();
        this.internationalBunkersCtrl = new forms_1.FormControl();
        this.stockChangeCtrl = new forms_1.FormControl();
        this.excludedConsumptionCtrl = new forms_1.FormControl();
        this.referenceCtrl = new forms_1.FormControl();
        this.selection = new collections_1.SelectionModel(true, []);
        this.newSelection = new collections_1.SelectionModel(true, []);
        this.columnNames = [
            { id: "fuelType", value: "Fuel Type", formControl: this.fuelTypeCtrl },
            { id: "fuel", value: "Fuel", formControl: this.fuelCtrl },
            { id: "unit", value: "Unit", formControl: this.unitCtrl },
            { id: "production", value: "Production", formControl: this.productionCtrl },
            { id: "imports", value: "Imports", formControl: this.importsCtrl },
            { id: "exports", value: "Exports", formControl: this.exportsCtrl },
            { id: "internationalBunkers", value: "International Bunkers", formControl: this.internationalBunkersCtrl },
            { id: "stockChange", value: "Stock Change", formControl: this.stockChangeCtrl },
            { id: "excludedConsumption", value: "Excluded Consumption", formControl: this.excludedConsumptionCtrl },
            { id: "reference", value: "Reference", formControl: this.referenceCtrl }
        ];
        this.filteredValues = {
            fuelType: '', fuel: '', unit: '', production: '', imports: '', exports: '',
            internationalBunkers: '', stockChange: '', excludedConsumption: '', reference: ''
        };
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.approvalScreen = false;
        this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
        this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
        if (this.routeFormId) {
            this.approvalScreen = true;
            this.loadActivityData('_id', this.routeFormId);
        }
        this.formGroup = this._fb.group({
            inventoryYear: [null, [forms_1.Validators.required]],
            sector: ['1-Energy', [forms_1.Validators.required]],
            calculationApproach: ['Tier I', [forms_1.Validators.required]]
        });
    }
    ReferenceApproachComponent_1 = ReferenceApproachComponent;
    Object.defineProperty(ReferenceApproachComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ReferenceApproachComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    ReferenceApproachComponent.prototype.loadActivityData = function (loadType, value) {
        var _a;
        var _this = this;
        var obj = (_a = {
                menuId: ReferenceApproachComponent_1.Constants.MENU_ID
            },
            _a[loadType] = value,
            _a);
        this.dataList = [];
        this.dataSource.data = this.dataList;
        this.appService.getDataRecord(obj).subscribe(function (res) {
            if (res.statusCode == 200 && res.data) {
                _this.formGroup.controls['inventoryYear'].setValue(res.data.inventoryYear);
                _this.formGroup.controls['sector'].setValue(res.data.sector);
                _this.formGroup.controls['calculationApproach'].setValue(res.data.calculationApproach);
                _this.remarksCtrl.setValue(res.data.remark);
                _this.dataList = res.data.activityData;
                _this.dataSource.data = _this.dataList;
            }
        }, function (err) {
        });
    };
    ReferenceApproachComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.appService.getRecord(ReferenceApproachComponent_1.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                _this.permissionMenuId = res.data.permissionMenuId;
            }
        }, function (err) {
        });
    };
    ReferenceApproachComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yearList = [];
        this.fuelTypes = [];
        this.fuelsByType = [];
        this.getYears();
        this.getFuelTypes();
        this.getPermissionMenuId();
        this.dataList = [];
        this.newlyAddedList = [];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.displayedColumns.push('actions');
            this.displayedColumns.unshift('select');
        }
        this.dataSource = new material_1.MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.referenceCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['reference'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.excludedConsumptionCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['excludedConsumption'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.stockChangeCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['stockChange'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.internationalBunkersCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['internationalBunkers'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.exportsCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['exports'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.importsCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['imports'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.productionCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['production'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.unitCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['unit'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.fuelCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['fuel'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.fuelTypeCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['fuelType'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
    };
    ReferenceApproachComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ReferenceApproachComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    ReferenceApproachComponent.prototype.applyFilter = function (filterValue) {
        var filter = {
            fuelType: filterValue.trim().toLowerCase(),
            fuel: filterValue.trim().toLowerCase(),
            unit: filterValue.trim().toLowerCase(),
            production: filterValue.trim().toLowerCase(),
            imports: filterValue.trim().toLowerCase(),
            exports: filterValue.trim().toLowerCase(),
            internationalBunkers: filterValue.trim().toLowerCase(),
            stockChange: filterValue.trim().toLowerCase(),
            excludedConsumption: filterValue.trim().toLowerCase(),
            reference: filterValue.trim().toLowerCase(),
            topFilter: true
        };
        this.dataSource.filter = JSON.stringify(filter);
    };
    ReferenceApproachComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var fuelType = data.fuelType.toString().trim().toLowerCase().indexOf(searchString.fuelType.toLowerCase()) !== -1;
            var fuel = data.fuel.toString().trim().toLowerCase().indexOf(searchString.fuel.toLowerCase()) !== -1;
            var unit = data.unit.toString().trim().toLowerCase().indexOf(searchString.unit.toLowerCase()) !== -1;
            var production = data.production.toString().trim().toLowerCase().indexOf(searchString.production.toLowerCase()) !== -1;
            var imports = data.imports.toString().trim().toLowerCase().indexOf(searchString.imports.toLowerCase()) !== -1;
            var exports = data.exports.toString().trim().toLowerCase().indexOf(searchString.exports.toLowerCase()) !== -1;
            var internationalBunkers = data.internationalBunkers.toString().trim().toLowerCase().indexOf(searchString.internationalBunkers.toLowerCase()) !== -1;
            var stockChange = data.stockChange.toString().trim().toLowerCase().indexOf(searchString.stockChange.toLowerCase()) !== -1;
            var excludedConsumption = data.excludedConsumption.toString().trim().toLowerCase().indexOf(searchString.excludedConsumption.toLowerCase()) !== -1;
            var reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return fuelType || fuel || unit || production || imports || exports || internationalBunkers || stockChange ||
                    excludedConsumption || reference;
            }
            else {
                return fuelType && fuel && unit && production && imports && exports && internationalBunkers && stockChange &&
                    excludedConsumption && reference;
            }
        };
        return myFilterPredicate;
    };
    ReferenceApproachComponent.prototype.getYears = function () {
        var _this = this;
        this._ras.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    ReferenceApproachComponent.prototype.getFuelTypes = function () {
        var _this = this;
        this._ras.getFuelTypes().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.fuelTypes = res.data;
            }
        }, function (err) {
        });
    };
    ReferenceApproachComponent.prototype.getFuelsByType = function (fuel, id) {
        var _this = this;
        this._ras.getFuelByType(fuel).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.newlyAddedList.forEach(function (element) {
                    if (element.id == id) {
                        element.fuelsByType = res.data;
                    }
                });
            }
        }, function (err) {
        });
    };
    ReferenceApproachComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    ReferenceApproachComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ReferenceApproachComponent.prototype.isAllNewSelected = function () {
        var numSelected = this.newSelection.selected.length;
        var numRows = this.newDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    ReferenceApproachComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ReferenceApproachComponent.prototype.masterToggleNew = function () {
        var _this = this;
        this.isAllNewSelected() ?
            this.newSelection.clear() :
            this.newDataSource.data.forEach(function (row) { return _this.newSelection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    ReferenceApproachComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ReferenceApproachComponent.prototype.checkboxLabelNew = function (row) {
        if (!row) {
            return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ReferenceApproachComponent.prototype.addNewRow = function () {
        var x = this.newlyAddedList.length;
        this.newlyAddedList.push({
            id: x + 1, fuelType: '', fuel: '', unit: 'tonnes', production: 0, imports: 0, exports: 0,
            internationalBunkers: 0, stockChange: 0, excludedConsumption: 0, reference: '', fuelsByType: []
        });
        this.newDataSource.data = this.newlyAddedList;
    };
    ReferenceApproachComponent.prototype.saveReferenceApproach = function () {
        var _this = this;
        var obj = {
            inventoryYear: this.formGroup.controls['inventoryYear'].value,
            sector: this.formGroup.controls['sector'].value,
            calculationApproach: this.formGroup.controls['calculationApproach'].value,
            activityData: this.dataList.concat(this.newlyAddedList),
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            remark: this.remarksCtrl.value,
            menuId: ReferenceApproachComponent_1.Constants.MENU_ID,
            permissionMenuId: this.permissionMenuId
        };
        // console.log(obj);
        this.appService.saveRecord(obj).subscribe(function (res) {
            _this.openSnackBar(res.message, 'success');
            _this.formGroup.controls['inventoryYear'].reset();
            _this.dataList = [];
            _this.dataSource.data = _this.dataList;
            _this.newlyAddedList = [];
            _this.newDataSource.data = _this.newlyAddedList;
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    ReferenceApproachComponent.prototype.removeIndividuallyFromList = function (list, ele) {
        if (list == 'exist') {
            this.dataList.splice(ele, 1);
            this.dataSource.data = this.dataList;
        }
        if (list == 'new') {
            this.newlyAddedList.splice(ele, 1);
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    ReferenceApproachComponent.prototype.removeSelected = function (list) {
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
    ReferenceApproachComponent.prototype.openSnackBar = function (message, type) {
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
    ReferenceApproachComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this._ras.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.router.navigate(['./my-approvals']);
                _this.openSnackBar(res.message, 'success');
            }
            else {
                _this.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    var ReferenceApproachComponent_1;
    ReferenceApproachComponent.Constants = {
        MENU_ID: "GHG_Energy_Reference_Approach"
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], ReferenceApproachComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], ReferenceApproachComponent.prototype, "matPaginator");
    ReferenceApproachComponent = ReferenceApproachComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-reference-approach',
            templateUrl: './reference-approach.component.html',
            styleUrls: ['./reference-approach.component.scss']
        })
    ], ReferenceApproachComponent);
    return ReferenceApproachComponent;
}());
exports.ReferenceApproachComponent = ReferenceApproachComponent;
