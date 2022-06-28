"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.WtdComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var iobw_component_1 = require("../iobw/iobw.component");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var WtdComponent = /** @class */ (function () {
    function WtdComponent(_fb, activatedRoute, rnacs, snackBar, router, appService) {
        this._fb = _fb;
        this.activatedRoute = activatedRoute;
        this.rnacs = rnacs;
        this.snackBar = snackBar;
        this.router = router;
        this.appService = appService;
        this.dataList = [];
        this.dataList1 = [];
        this.newlyAddedList = [];
        this.newlyAddedList1 = [];
        this["true"] = true;
        this.displayedColumns = [];
        this.displayedColumns1 = [];
        this.dataSource = new material_1.MatTableDataSource(this.dataList);
        this.dataSource1 = new material_1.MatTableDataSource(this.dataList1);
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.newDataSource1 = new material_1.MatTableDataSource(this.newlyAddedList1);
        this.population = new forms_1.FormControl();
        this.degradableOrganic = new forms_1.FormControl();
        this.correctionFactor = new forms_1.FormControl();
        this.methaneProducing = new forms_1.FormControl();
        this.referenceCtrl = new forms_1.FormControl();
        this.population1 = new forms_1.FormControl();
        this.perCapitaProtein = new forms_1.FormControl();
        this.nitrogenFraction = new forms_1.FormControl();
        this.emissionFactor = new forms_1.FormControl();
        this.referenceCtrl1 = new forms_1.FormControl();
        this.selection = new collections_1.SelectionModel(true, []);
        this.selection1 = new collections_1.SelectionModel(true, []);
        this.newSelection = new collections_1.SelectionModel(true, []);
        this.newSelection1 = new collections_1.SelectionModel(true, []);
        this.columnNames = [
            { id: 'population', value: 'Population', formControl: this.population },
            { id: 'correctionFactor', value: 'Correction Factor for Industrial BOD Discharged in Sewers', formControl: this.correctionFactor },
            { id: 'degradableOrganic', value: 'Degradable Organic Component (kgBOD/capita/year)', formControl: this.degradableOrganic },
            { id: 'methaneProducing', value: 'Methane Producing Capacity (kgCH4/kgBOD)', formControl: this.methaneProducing },
            { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
        ];
        this.columnNames1 = [
            { id: 'population', value: 'Population', formControl: this.population1 },
            { id: 'perCapitaProtein', value: 'Per capita Protein Consumption (kg/person/year)', formControl: this.perCapitaProtein },
            { id: 'nitrogenFraction', value: 'Nitrogen Fraction in Protein', formControl: this.nitrogenFraction },
            { id: 'emissionFactor', value: 'Emission factor (kgN2O-N/kgN)', formControl: this.emissionFactor },
            { id: 'reference', value: 'Reference', formControl: this.referenceCtrl1 }
        ];
        this.filteredValues = {
            population: '', correctionFactor: '', reference: '', degradableOrganic: '', methaneProducing: '',
            perCapitaProtein: '', nitrogenFraction: '', emissionFactor: ''
        };
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.dataList = [];
        this.dataList1 = [];
        this.newlyAddedList = [];
        this.newlyAddedList1 = [];
        this.dataSource.data = this.dataList;
        this.dataSource1.data = this.dataList1;
        this.newDataSource.data = this.newlyAddedList;
        this.newDataSource1.data = this.newlyAddedList1;
        this.approvalScreen = false;
        this.routeFormId = this.activatedRoute.snapshot.paramMap.get('formId');
        this.routeRecordId = this.activatedRoute.snapshot.paramMap.get('recordId');
        if (this.routeFormId) {
            this.approvalScreen = true;
            this.loadActivityData('_id', this.routeFormId);
        }
        this.formGroup = this._fb.group({
            inventoryYear: [null, [forms_1.Validators.required]],
            sector: ['4-Waste', [forms_1.Validators.required]],
            subSector: ['4.D-Domestic Wastewaster Treatment and Discharge', [forms_1.Validators.required]],
            category: ['4.D-Wastewater Treatment and Discharge', [forms_1.Validators.required]],
            calculationApproach: ['Tier I', [forms_1.Validators.required]]
        });
    }
    WtdComponent_1 = WtdComponent;
    Object.defineProperty(WtdComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(WtdComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    WtdComponent.prototype.loadActivityData = function (type, value) {
        var _a;
        var _this = this;
        var obj = (_a = {
                menuId: WtdComponent_1.Constants.MENU_ID
            },
            _a[type] = value,
            _a);
        this.dataList = [];
        this.dataSource.data = this.dataList;
        this.dataList1 = [];
        this.dataSource1.data = this.dataList1;
        if (obj) {
            this.appService.getDataRecord(obj).subscribe(function (res) {
                if (res.statusCode == 200 && res.data) {
                    _this.formGroup.controls['inventoryYear'].setValue(res.data.inventoryYear);
                    _this.formGroup.controls['sector'].setValue(res.data.sector);
                    _this.formGroup.controls['calculationApproach'].setValue(res.data.calculationApproach);
                    _this.formGroup.controls['subSector'].setValue(res.data.subSector);
                    _this.formGroup.controls['category'].setValue(res.data.category);
                    _this.remarksCtrl.setValue(res.data.remark);
                    _this.dataList = res.data.cH4Emissions;
                    _this.dataSource.data = _this.dataList;
                    _this.dataList1 = res.data.n2OEmissions;
                    _this.dataSource1.data = _this.dataList1;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            });
        }
    };
    WtdComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
    };
    WtdComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var population = data.population.toString().trim().toLowerCase()
                .indexOf(searchString.population.toLowerCase()) !== -1;
            var degradableOrganic = data.degradableOrganic.toString().trim().toLowerCase().indexOf(searchString.degradableOrganic.toLowerCase()) !== -1;
            var correctionFactor = data.correctionFactor.toString().trim().toLowerCase().indexOf(searchString.correctionFactor.toLowerCase()) !== -1;
            var methaneProducing = data.methaneProducing.toString().trim().toLowerCase()
                .indexOf(searchString.methaneProducing.toLowerCase()) !== -1;
            var perCapitaProtein = data.perCapitaProtein.toString().trim().toLowerCase()
                .indexOf(searchString.perCapitaProtein.toLowerCase()) !== -1;
            var nitrogenFraction = data.nitrogenFraction.toString().trim().toLowerCase()
                .indexOf(searchString.nitrogenFraction.toLowerCase()) !== -1;
            var emissionFactor = data.emissionFactor.toString().trim().toLowerCase()
                .indexOf(searchString.emissionFactor.toLowerCase()) !== -1;
            var reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return population || degradableOrganic || reference || correctionFactor || methaneProducing ||
                    population || perCapitaProtein || nitrogenFraction || emissionFactor;
            }
            else {
                return population && degradableOrganic && reference && correctionFactor && methaneProducing &&
                    population && perCapitaProtein && nitrogenFraction && emissionFactor;
            }
        };
        return myFilterPredicate;
    };
    WtdComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.appService.getRecord(iobw_component_1.IobwComponent.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                _this.menu = res.data;
            }
        });
    };
    WtdComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yearList = [];
        this.getYears();
        this.getPermissionMenuId();
        this.dataList = [];
        this.newlyAddedList = [];
        this.dataList1 = [];
        this.newlyAddedList1 = [];
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
        this.displayedColumns1 = this.columnNames1.map(function (x) { return x.id; });
        if (!this.approvalScreen) {
            this.displayedColumns.push('actions');
            this.displayedColumns.unshift('select');
            this.displayedColumns1.push('actions');
            this.displayedColumns1.unshift('select');
        }
        this.dataSource.paginator = this.paginator;
        this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
        this.newDataSource1 = new material_1.MatTableDataSource(this.newlyAddedList1);
        this.emissionFactor.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['emissionFactor'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.nitrogenFraction.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['nitrogenFraction'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.perCapitaProtein.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['perCapitaProtein'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.population1.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['population'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.methaneProducing.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['methaneProducing'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.referenceCtrl.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['reference'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.population.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['population'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.degradableOrganic.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['degradableOrganic'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.correctionFactor.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['correctionFactor'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.referenceCtrl1.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['reference'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
        this.dataSource1.filterPredicate = this.customFilterPredicate();
    };
    WtdComponent.prototype.getYears = function () {
        var _this = this;
        this.rnacs.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    WtdComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    WtdComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource1.paginator = this.paginator;
    };
    WtdComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    WtdComponent.prototype.isAllNewSelected = function () {
        var numSelected = this.newSelection.selected.length;
        var numRows = this.newDataSource.data.length;
        return numSelected === numRows;
    };
    WtdComponent.prototype.isAllSelected1 = function () {
        var numSelected = this.selection1.selected.length;
        var numRows = this.dataSource1.data.length;
        return numSelected === numRows;
    };
    WtdComponent.prototype.isAllNewSelected1 = function () {
        var numSelected = this.newSelection1.selected.length;
        var numRows = this.newDataSource1.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    WtdComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    WtdComponent.prototype.masterToggle1 = function () {
        var _this = this;
        this.isAllSelected1() ?
            this.selection1.clear() :
            this.dataSource1.data.forEach(function (row) { return _this.selection1.select(row); });
    };
    WtdComponent.prototype.masterToggleNew = function () {
        var _this = this;
        this.isAllNewSelected() ?
            this.newSelection.clear() :
            this.newDataSource.data.forEach(function (row) { return _this.newSelection.select(row); });
    };
    WtdComponent.prototype.masterToggleNew1 = function () {
        var _this = this;
        this.isAllNewSelected1() ?
            this.newSelection1.clear() :
            this.newDataSource1.data.forEach(function (row) { return _this.newSelection1.select(row); });
    };
    /** The label for the checkbox on the passed row */
    WtdComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    WtdComponent.prototype.checkboxLabel1 = function (row) {
        if (!row) {
            return (this.isAllSelected1() ? 'select' : 'deselect') + " all";
        }
        return (this.selection1.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    WtdComponent.prototype.checkboxLabelNew = function (row) {
        if (!row) {
            return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    WtdComponent.prototype.checkboxLabelNew1 = function (row) {
        if (!row) {
            return (this.isAllNewSelected1() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection1.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    WtdComponent.prototype.addNewRow = function () {
        console.log(this.newlyAddedList);
        var x = this.newlyAddedList.length;
        this.newlyAddedList.push({
            population: '', correctionFactor: '', degradableOrganic: '', methaneProducing: '', reference: ''
        });
        this.newDataSource.data = this.newlyAddedList;
    };
    WtdComponent.prototype.addNewRow1 = function () {
        var x = this.newlyAddedList1.length;
        this.newlyAddedList1.push({
            population: '', perCapitaProtein: '', nitrogenFraction: '',
            emissionFactor: '', reference: ''
        });
        this.newDataSource1.data = this.newlyAddedList1;
    };
    WtdComponent.prototype.removeIndividuallyFromList = function (list, ele) {
        if (list == 'exist') {
            this.dataList.splice(ele, 1);
            this.dataSource.data = this.dataList;
        }
        if (list == 'new') {
            this.newlyAddedList.splice(ele, 1);
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    WtdComponent.prototype.removeIndividuallyFromList1 = function (list, ele) {
        if (list == 'exist') {
            this.dataList1.splice(ele, 1);
            this.dataSource1.data = this.dataList1;
        }
        if (list == 'new') {
            this.newlyAddedList1.splice(ele, 1);
            this.newDataSource1.data = this.newlyAddedList1;
        }
    };
    WtdComponent.prototype.removeSelected = function (list) {
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
    WtdComponent.prototype.removeSelected1 = function (list) {
        if (list == 'exist') {
            var y_3 = new Set(this.selection1.selected);
            this.dataList1 = this.dataList1.filter(function (x) { return !y_3.has(x); });
            this.dataSource1.data = this.dataList1;
        }
        if (list == 'new') {
            var y_4 = new Set(this.newSelection1.selected);
            this.newlyAddedList1 = this.newlyAddedList1.filter(function (x) { return !y_4.has(x); });
            this.newDataSource1.data = this.newlyAddedList1;
        }
    };
    WtdComponent.prototype.openSnackBar = function (message, type) {
        this.snackBar.openFromComponent(snackbar_dialog_component_1.SnackbarDialogComponent, {
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
    WtdComponent.prototype.saveElectricityGeneration = function () {
        var _this = this;
        var obj = {
            inventoryYear: this.formGroup.controls['inventoryYear'].value,
            sector: this.formGroup.controls['sector'].value,
            subSector: this.formGroup.controls['subSector'].value,
            category: this.formGroup.controls['category'].value,
            calculationApproach: this.formGroup.controls['calculationApproach'].value,
            cH4Emissions: this.dataList.concat(this.newlyAddedList),
            n2OEmissions: this.dataList1.concat(this.newlyAddedList1),
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            remark: this.remarksCtrl.value,
            menuId: WtdComponent_1.Constants.MENU_ID,
            permissionMenuId: this.menu.permissionMenuId
        };
        // console.log(obj);
        this.appService.saveRecord(obj).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.openSnackBar(res.message, 'success');
                _this.formGroup.controls['inventoryYear'].reset();
                _this.dataList = [];
                _this.dataSource.data = _this.dataList;
                _this.newlyAddedList = [];
                _this.newDataSource.data = _this.newlyAddedList;
                _this.dataList1 = [];
                _this.dataSource1.data = _this.dataList1;
                _this.newlyAddedList1 = [];
                _this.newDataSource1.data = _this.newlyAddedList1;
            }
            else {
                _this.openSnackBar(res.message, 'error');
            }
        }, function (err) {
            _this.openSnackBar(err.message, 'error');
        });
    };
    WtdComponent.prototype.updateDataStaus = function (status) {
        var _this = this;
        var obj = {
            status: status,
            _id: this.routeRecordId,
            approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
            approverComment: this.approverCommentCtrl.value
        };
        this.rnacs.updateDataStatus(obj).subscribe(function (res) {
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
    var WtdComponent_1;
    WtdComponent.Constants = {
        MENU_ID: 'GHG_Waste_Wastewater_Treatment_Discharge'
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], WtdComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], WtdComponent.prototype, "matPaginator");
    WtdComponent = WtdComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-wtd',
            templateUrl: './wtd.component.html',
            styleUrls: ['./wtd.component.scss']
        })
    ], WtdComponent);
    return WtdComponent;
}());
exports.WtdComponent = WtdComponent;
