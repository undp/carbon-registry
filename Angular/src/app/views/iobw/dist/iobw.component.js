"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IobwComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var IobwComponent = /** @class */ (function () {
    function IobwComponent(_fb, activatedRoute, rnacs, snackBar, router, appService) {
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
        this.wasteIncinerated = new forms_1.FormControl();
        this.dryMatter = new forms_1.FormControl();
        this.carbonFraction = new forms_1.FormControl();
        this.fossilCarbonFraction = new forms_1.FormControl();
        this.oxidationFactor = new forms_1.FormControl();
        this.referenceCtrl = new forms_1.FormControl();
        this.urbanPopulation = new forms_1.FormControl();
        this.wastePerCapita = new forms_1.FormControl();
        this.fractionOfPopulation = new forms_1.FormControl();
        this.dryMatterFraction = new forms_1.FormControl();
        this.carbonFraction1 = new forms_1.FormControl();
        this.fossilCarbonFraction1 = new forms_1.FormControl();
        this.oxidationFactor1 = new forms_1.FormControl();
        this.referenceCtrl1 = new forms_1.FormControl();
        this.selection = new collections_1.SelectionModel(true, []);
        this.selection1 = new collections_1.SelectionModel(true, []);
        this.newSelection = new collections_1.SelectionModel(true, []);
        this.newSelection1 = new collections_1.SelectionModel(true, []);
        this.columnNames = [
            { id: 'wasteIncinerated', value: 'Waste Incinerated (wet weight) (tonnes)', formControl: this.wasteIncinerated },
            { id: 'carbonFraction', value: 'Carbon Fraction in dry matter-CF', formControl: this.carbonFraction },
            { id: 'dryMatter', value: 'Dry Matter Fraction-DM', formControl: this.dryMatter },
            { id: 'fossilCarbonFraction', value: 'Fossil Carbon Fraction in Total carbon- FCF', formControl: this.fossilCarbonFraction },
            { id: 'oxidationFactor', value: 'Oxidation Factor- OF', formControl: this.oxidationFactor },
            { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
        ];
        this.columnNames1 = [
            { id: 'urbanPopulation', value: 'Urban Population', formControl: this.urbanPopulation },
            { id: 'wastePerCapita', value: 'Waste Per Capita (kg/year)', formControl: this.wastePerCapita },
            { id: 'fractionOfPopulation', value: 'Fraction of Population Burning Waste', formControl: this.fractionOfPopulation },
            { id: 'dryMatterFraction', value: 'Dry Matter Fraction-DM', formControl: this.dryMatterFraction },
            { id: 'carbonFraction', value: 'Carbon Fraction in Dry Matter-CF', formControl: this.carbonFraction1 },
            { id: 'fossilCarbonFraction', value: 'Fossil carbon Fraction in Total Carbon- FCF', formControl: this.fossilCarbonFraction1 },
            { id: 'oxidationFactor', value: 'Oxidation Factor- OF', formControl: this.oxidationFactor1 },
            { id: 'reference', value: 'Reference', formControl: this.referenceCtrl1 }
        ];
        this.filteredValues = {
            wasteIncinerated: '', carbonFraction: '', reference: '', dryMatter: '', fossilCarbonFraction: '', oxidationFactor: '',
            urbanPopulation: '', wastePerCapita: '', fractionOfPopulation: '', dryMatterFraction: ''
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
            subSector: ['4.C-Incineration and Open Burning of Waste', [forms_1.Validators.required]],
            category: ['4.C-Incineration and Open Burning of Waste', [forms_1.Validators.required]],
            calculationApproach: ['Tier I', [forms_1.Validators.required]]
        });
    }
    IobwComponent_1 = IobwComponent;
    Object.defineProperty(IobwComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(IobwComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    IobwComponent.prototype.loadActivityData = function (type, value) {
        var _a;
        var _this = this;
        var obj = (_a = {
                menuId: IobwComponent_1.Constants.MENU_ID
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
                    _this.dataList = res.data.incinerationData;
                    _this.dataSource.data = _this.dataList;
                    _this.dataList1 = res.data.openBurningData;
                    _this.dataSource1.data = _this.dataList1;
                }
                else {
                    _this.openSnackBar('No Data Found', 'error');
                }
            });
        }
    };
    IobwComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource1.paginator = this.paginator;
        this.dataSource1.sort = this.sort;
    };
    IobwComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var wasteIncinerated = data.wasteIncinerated.toString().trim().toLowerCase()
                .indexOf(searchString.wasteIncinerated.toLowerCase()) !== -1;
            var dryMatter = data.dryMatter.toString().trim().toLowerCase().indexOf(searchString.dryMatter.toLowerCase()) !== -1;
            var carbonFraction = data.carbonFraction.toString().trim().toLowerCase().indexOf(searchString.carbonFraction.toLowerCase()) !== -1;
            var fossilCarbonFraction = data.fossilCarbonFraction.toString().trim().toLowerCase()
                .indexOf(searchString.fossilCarbonFraction.toLowerCase()) !== -1;
            var oxidationFactor = data.oxidationFactor.toString().trim().toLowerCase()
                .indexOf(searchString.oxidationFactor.toLowerCase()) !== -1;
            var urbanPopulation = data.urbanPopulation.toString().trim().toLowerCase()
                .indexOf(searchString.urbanPopulation.toLowerCase()) !== -1;
            var wastePerCapita = data.wastePerCapita.toString().trim().toLowerCase()
                .indexOf(searchString.wastePerCapita.toLowerCase()) !== -1;
            var fractionOfPopulation = data.fractionOfPopulation.toString().trim().toLowerCase()
                .indexOf(searchString.fractionOfPopulation.toLowerCase()) !== -1;
            var dryMatterFraction = data.dryMatterFraction.toString().trim().toLowerCase()
                .indexOf(searchString.dryMatterFraction.toLowerCase()) !== -1;
            var reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return wasteIncinerated || dryMatter || reference || carbonFraction || fossilCarbonFraction || oxidationFactor ||
                    urbanPopulation || wastePerCapita || fractionOfPopulation || dryMatterFraction;
            }
            else {
                return wasteIncinerated && dryMatter && reference && carbonFraction && fossilCarbonFraction && oxidationFactor &&
                    urbanPopulation && wastePerCapita && fractionOfPopulation && dryMatterFraction;
            }
        };
        return myFilterPredicate;
    };
    IobwComponent.prototype.getPermissionMenuId = function () {
        var _this = this;
        this.appService.getRecord(IobwComponent_1.Constants.MENU_ID).subscribe(function (res) {
            if (res.data) {
                _this.menu = res.data;
            }
        });
    };
    IobwComponent.prototype.ngOnInit = function () {
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
        this.oxidationFactor1.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['oxidationFactor'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.fossilCarbonFraction1.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['fossilCarbonFraction'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.carbonFraction1.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['carbonFraction'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.dryMatterFraction.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['dryMatterFraction'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.fractionOfPopulation.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['fractionOfPopulation'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.wastePerCapita.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['wastePerCapita'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.urbanPopulation.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['urbanPopulation'] = positionFilterValue;
            _this.dataSource1.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource1.filterPredicate = _this.customFilterPredicate();
        });
        this.oxidationFactor.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['oxidationFactor'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.fossilCarbonFraction.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['fossilCarbonFraction'] = positionFilterValue;
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
        this.wasteIncinerated.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['wasteIncinerated'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.dryMatter.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['dryMatter'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.carbonFraction.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['carbonFraction'] = positionFilterValue;
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
    IobwComponent.prototype.getYears = function () {
        var _this = this;
        this.rnacs.getInventoryYears().subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.yearList = res.data;
            }
        }, function (err) {
        });
    };
    IobwComponent.prototype.isInvalid = function (form, field, errorValue) {
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
    IobwComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource1.paginator = this.paginator;
    };
    IobwComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    IobwComponent.prototype.isAllNewSelected = function () {
        var numSelected = this.newSelection.selected.length;
        var numRows = this.newDataSource.data.length;
        return numSelected === numRows;
    };
    IobwComponent.prototype.isAllSelected1 = function () {
        var numSelected = this.selection1.selected.length;
        var numRows = this.dataSource1.data.length;
        return numSelected === numRows;
    };
    IobwComponent.prototype.isAllNewSelected1 = function () {
        var numSelected = this.newSelection1.selected.length;
        var numRows = this.newDataSource1.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    IobwComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    IobwComponent.prototype.masterToggle1 = function () {
        var _this = this;
        this.isAllSelected1() ?
            this.selection1.clear() :
            this.dataSource1.data.forEach(function (row) { return _this.selection1.select(row); });
    };
    IobwComponent.prototype.masterToggleNew = function () {
        var _this = this;
        this.isAllNewSelected() ?
            this.newSelection.clear() :
            this.newDataSource.data.forEach(function (row) { return _this.newSelection.select(row); });
    };
    IobwComponent.prototype.masterToggleNew1 = function () {
        var _this = this;
        this.isAllNewSelected1() ?
            this.newSelection1.clear() :
            this.newDataSource1.data.forEach(function (row) { return _this.newSelection1.select(row); });
    };
    /** The label for the checkbox on the passed row */
    IobwComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    IobwComponent.prototype.checkboxLabel1 = function (row) {
        if (!row) {
            return (this.isAllSelected1() ? 'select' : 'deselect') + " all";
        }
        return (this.selection1.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    IobwComponent.prototype.checkboxLabelNew = function (row) {
        if (!row) {
            return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    IobwComponent.prototype.checkboxLabelNew1 = function (row) {
        if (!row) {
            return (this.isAllNewSelected1() ? 'select' : 'deselect') + " all";
        }
        return (this.newSelection1.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    IobwComponent.prototype.addNewRow = function () {
        console.log(this.newlyAddedList);
        var x = this.newlyAddedList.length;
        this.newlyAddedList.push({
            wasteIncinerated: '', carbonFraction: '', dryMatter: '', fossilCarbonFraction: '', oxidationFactor: '', reference: ''
        });
        this.newDataSource.data = this.newlyAddedList;
    };
    IobwComponent.prototype.addNewRow1 = function () {
        var x = this.newlyAddedList1.length;
        this.newlyAddedList1.push({
            urbanPopulation: '', carbonFraction: '', wastePerCapita: '', fractionOfPopulation: '',
            dryMatterFraction: '', fossilCarbonFraction: '', oxidationFactor: '', reference: ''
        });
        this.newDataSource1.data = this.newlyAddedList1;
    };
    IobwComponent.prototype.removeIndividuallyFromList = function (list, ele) {
        if (list == 'exist') {
            this.dataList.splice(ele, 1);
            this.dataSource.data = this.dataList;
        }
        if (list == 'new') {
            this.newlyAddedList.splice(ele, 1);
            this.newDataSource.data = this.newlyAddedList;
        }
    };
    IobwComponent.prototype.removeIndividuallyFromList1 = function (list, ele) {
        if (list == 'exist') {
            this.dataList1.splice(ele, 1);
            this.dataSource1.data = this.dataList1;
        }
        if (list == 'new') {
            this.newlyAddedList1.splice(ele, 1);
            this.newDataSource1.data = this.newlyAddedList1;
        }
    };
    IobwComponent.prototype.removeSelected = function (list) {
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
    IobwComponent.prototype.removeSelected1 = function (list) {
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
    IobwComponent.prototype.openSnackBar = function (message, type) {
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
    IobwComponent.prototype.saveElectricityGeneration = function () {
        var _this = this;
        var obj = {
            inventoryYear: this.formGroup.controls['inventoryYear'].value,
            sector: this.formGroup.controls['sector'].value,
            subSector: this.formGroup.controls['subSector'].value,
            category: this.formGroup.controls['category'].value,
            calculationApproach: this.formGroup.controls['calculationApproach'].value,
            incinerationData: this.dataList.concat(this.newlyAddedList),
            openBurningData: this.dataList1.concat(this.newlyAddedList1),
            updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
            remark: this.remarksCtrl.value,
            menuId: IobwComponent_1.Constants.MENU_ID,
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
    IobwComponent.prototype.updateDataStaus = function (status) {
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
    var IobwComponent_1;
    IobwComponent.Constants = {
        MENU_ID: 'GHG_Waste_Incineration_Waste'
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], IobwComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], IobwComponent.prototype, "matPaginator");
    IobwComponent = IobwComponent_1 = __decorate([
        core_1.Component({
            selector: 'app-iobw',
            templateUrl: './iobw.component.html',
            styleUrls: ['./iobw.component.scss']
        })
    ], IobwComponent);
    return IobwComponent;
}());
exports.IobwComponent = IobwComponent;
