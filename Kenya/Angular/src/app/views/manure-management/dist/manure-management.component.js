"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ManureManagementComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var ManureManagementComponent = /** @class */ (function () {
    function ManureManagementComponent(_fb, _activatedRoute, _snackBar, router, appService) {
        this._fb = _fb;
        this._activatedRoute = _activatedRoute;
        this._snackBar = _snackBar;
        this.router = router;
        this.appService = appService;
        this.dataList = [];
        this.newlyAddedList = [];
        // Table related declarations
        // table related declarations
        this["true"] = true;
        this.displayedColumns = [];
        this.dataSource = new material_1.MatTableDataSource(this.dataList);
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.category = new forms_1.FormControl();
        this.heads = new forms_1.FormControl();
        this.ghgEmissions = new forms_1.FormControl();
        this.selection = new collections_1.SelectionModel(true, []);
        this.newSelection = new collections_1.SelectionModel(true, []);
        this.columnNames = [
            { id: 'category', value: 'Category', formControl: this.category },
            { id: 'heads', value: 'Heads', formControl: this.heads },
            { id: 'ghgEmissions', value: 'GHG Emissions (tCO2e)', formControl: this.ghgEmissions },
        ];
        this.filteredValues = {
            category: '', heads: '', ghgEmissions: ''
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
            sector: ['3-Agriculture, Forestry, and Other Land Use', [forms_1.Validators.required]],
            subSector: ['3.C.6-Indirect N2O emissions from manure management', [forms_1.Validators.required]],
            category: ['3.C-Aggregate sources and non-CO2 emissions sources on land', [forms_1.Validators.required]],
            calculationApproach: ['Tier I', [forms_1.Validators.required]]
        });
    }
    ManureManagementComponent_1 = ManureManagementComponent;
    Object.defineProperty(ManureManagementComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ManureManagementComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    ManureManagementComponent.prototype.loadActivityData = function (type, value) {
        var _a;
        var _this = this;
        var obj = (_a = {
                menuId: ManureManagementComponent_1.Constants.MENU_ID
            },
            _a[type] = value,
            _a);
        this.dataList = [];
        this.dataSource.data = this.dataList;
        if (obj) {
            this.appService.getDataRecord(obj).subscribe(function (res) {
                console.log(res);
                if (res.statusCode === 200 && res.data) {
                    _this.formGroup.controls['inventoryYear'].setValue(res.data.inventoryYear);
                    _this.formGroup.controls['sector'].setValue(res.data.sector);
                    _this.formGroup.controls['calculationApproach'].setValue(res.data.calculationApproach);
                    _this.formGroup.controls['subSector'].setValue(res.data.subSector);
                    _this.formGroup.controls['category'].setValue(res.data.category);
                    _this.remarksCtrl.setValue(res.data.remark);
                    _this.dataList = res.data.manureManagementData;
                    _this.dataSource.data = _this.dataList;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            }, function (err) {
            });
        }
    };
    ManureManagementComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.appService.getRecord(ManureManagementComponent_1.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                _this.menu = res.data;
            }
        }, function (err) {
        });
    };
    ManureManagementComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yearList = [];
        this.getYears();
        this.getPermissionMenuId();
        this.dataList = [];
        this.newlyAddedList = [];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
        // if (!this.approvalScreen) {
        //   this.displayedColumns.push('actions');
        //   this.displayedColumns.unshift('select');
        // }
        // this.dataSource = new MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.category.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['category'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.heads.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['heads'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.ghgEmissions.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['ghgEmissions'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
    };
    ManureManagementComponent.prototype.getYears = function () {
        var _this = this;
        this.appService.getInventoryYears().subscribe(function (res) {
            if (res.statusCode === 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    ManureManagementComponent.prototype.isInvalid = function (form, field, errorValue) {
        if (errorValue === 'required' || 'ValidateDate') {
            return (form.get(field).invalid &&
                (form.get(field).touched || form.get(field).dirty) &&
                form.get(field).hasError(errorValue));
        }
        else if (errorValue === 'pattern') {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError('required') &&
                form.get(field).errors.pattern);
        }
        else if (errorValue === 'email') {
            return (form.get(field).invalid &&
                form.get(field).dirty &&
                !form.get(field).hasError('required') &&
                form.get(field).hasError('email'));
        }
    };
    ManureManagementComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    ManureManagementComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    ManureManagementComponent.prototype.applyFilter = function (filterValue) {
        var filter = {
            category: filterValue.trim().toLowerCase(),
            heads: filterValue.trim().toLowerCase(),
            ghgEmissions: filterValue.trim().toLowerCase(),
            topFilter: true
        };
        this.dataSource.filter = JSON.stringify(filter);
    };
    ManureManagementComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var category = data.category.toString().trim().toLowerCase().
                indexOf(searchString.category.toLowerCase()) !== -1;
            var heads = data.heads.toString().trim().toLowerCase().indexOf(searchString.heads.toLowerCase()) !== -1;
            var ghgEmissions = data.ghgEmissions.toString().trim().toLowerCase().
                indexOf(searchString.ghgEmissions.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return category || heads || ghgEmissions;
            }
            else {
                return category && heads && ghgEmissions;
            }
        };
        return myFilterPredicate;
    };
    ManureManagementComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    ManureManagementComponent.prototype.isAllNewSelected = function () {
        var numSelected = this.newSelection.selected.length;
        var numRows = this.newDataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    ManureManagementComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    ManureManagementComponent.prototype.masterToggleNew = function () {
        var _this = this;
        this.isAllNewSelected() ?
            this.newSelection.clear() :
            this.newDataSource.data.forEach(function (row) { return _this.newSelection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    ManureManagementComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ManureManagementComponent.prototype.checkboxLabelNew = function (row) {
        if (!row) {
            return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    ManureManagementComponent.prototype.addNewRow = function () {
        var x = this.newlyAddedList.length;
        this.newlyAddedList.push({
            category: '', heads: '', ghgEmissions: ''
        });
        this.newDataSource.data = this.newlyAddedList;
    };
    ManureManagementComponent.prototype.removeIndividuallyFromList = function (list, ele) {
        if (list === 'exist') {
            this.dataList.splice(ele, 1);
            this.dataSource.data = this.dataList;
        }
        if (list === 'new') {
            this.newlyAddedList.splice(ele, 1);
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    ManureManagementComponent.prototype.removeSelected = function (list) {
        if (list === 'exist') {
            var y_1 = new Set(this.selection.selected);
            this.dataList = this.dataList.filter(function (x) { return !y_1.has(x); });
            this.dataSource.data = this.dataList;
        }
        if (list === 'new') {
            var y_2 = new Set(this.newSelection.selected);
            this.newlyAddedList = this.newlyAddedList.filter(function (x) { return !y_2.has(x); });
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    ManureManagementComponent.prototype.openSnackBar = function (message, type) {
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
    ManureManagementComponent.prototype.saveElectricityGeneration = function () {
        var _this = this;
        var obj = {
            inventoryYear: this.formGroup.controls['inventoryYear'].value,
            sector: this.formGroup.controls['sector'].value,
            subSector: this.formGroup.controls['subSector'].value,
            category: this.formGroup.controls['category'].value,
            calculationApproach: this.formGroup.controls['calculationApproach'].value,
            manureManagementData: this.dataList.concat(this.newlyAddedList),
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            remark: this.remarksCtrl.value,
            menuId: ManureManagementComponent_1.Constants.MENU_ID,
            permissionMenuId: this.menu.permissionMenuId
        };
        this.appService.saveRecord(obj).subscribe(function (res) {
            if (res.statusCode === 200) {
                _this.openSnackBar(res.message, 'success');
                _this.formGroup.controls['inventoryYear'].reset();
                _this.dataList = [];
                _this.dataSource.data = _this.dataList;
                _this.newlyAddedList = [];
                _this.newDataSource.data = _this.newlyAddedList;
            }
            else {
                _this.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    ManureManagementComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this.appService.updateDataStatus(obj).subscribe(function (res) {
            if (res.statusCode === 200) {
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
    var ManureManagementComponent_1;
    ManureManagementComponent.Constants = {
        MENU_ID: 'GHG_AFOLU_Livestock_ManureManagement'
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], ManureManagementComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], ManureManagementComponent.prototype, "matPaginator");
    ManureManagementComponent = ManureManagementComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-manure-management',
            templateUrl: './manure-management.component.html',
            styleUrls: ['./manure-management.component.scss']
        })
    ], ManureManagementComponent);
    return ManureManagementComponent;
}());
exports.ManureManagementComponent = ManureManagementComponent;
