"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NdcComponent = void 0;
var collections_1 = require("@angular/cdk/collections");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var material_1 = require("@angular/material");
var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");
var NdcComponent = /** @class */ (function () {
    function NdcComponent(router, appService, _snackBar) {
        this.router = router;
        this.appService = appService;
        this._snackBar = _snackBar;
        this.selection = new collections_1.SelectionModel(true, []);
        this.remarksCtrl = new forms_1.FormControl();
        this.approverCommentCtrl = new forms_1.FormControl();
        this.dataList = [];
        this.displayedColumns = [];
        this.dataSource = new material_1.MatTableDataSource([]);
        this.projectId = new forms_1.FormControl();
        this.division = new forms_1.FormControl();
        this.sector = new forms_1.FormControl();
        this.subSector = new forms_1.FormControl();
        this.agency = new forms_1.FormControl();
        this.startDate = new forms_1.FormControl();
        this.columnNames = [
            { id: "projectId", value: "Project Id", formControl: this.projectId },
            { id: "division", value: "Intervention", formControl: this.division },
            { id: "sector", value: "Sector", formControl: this.sector },
            { id: "subSector", value: "Sub Sector", formControl: this.subSector },
            { id: "agency", value: "Implementing Agency", formControl: this.agency },
            { id: "startDate", value: "startDate", formControl: this.startDate }
        ];
        this.filteredValues = { projectId: '', division: '', sector: '', subSector: '', agency: '', startDate: '' };
    }
    NdcComponent.prototype.setDataSourceAttributes = function () {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    };
    NdcComponent.prototype.ngAfterViewInit = function () {
        this.dataSource.paginator = this.paginator;
    };
    Object.defineProperty(NdcComponent.prototype, "matSort", {
        set: function (ms) {
            this.sort = ms;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(NdcComponent.prototype, "matPaginator", {
        set: function (mp) {
            this.paginator = mp;
            this.setDataSourceAttributes();
        },
        enumerable: false,
        configurable: true
    });
    NdcComponent.prototype.goToItem = function (item) {
        this.router.navigate(['NDC_Actions/' + item._id]);
    };
    NdcComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.dataList = [];
        this.loadData();
        this.displayedColumns = this.columnNames.map(function (x) { return x.id; });
        this.displayedColumns.push('actions');
        // this.displayedColumns.unshift('select');
        this.dataSource = new material_1.MatTableDataSource(this.dataList);
        this.dataSource.paginator = this.paginator;
        this.projectId.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['projectId'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.division.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['division'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.sector.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['sector'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.subSector.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['subSector'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.agency.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['agency'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.startDate.valueChanges.subscribe(function (positionFilterValue) {
            _this.filteredValues['startDate'] = positionFilterValue;
            _this.dataSource.filter = JSON.stringify(_this.filteredValues);
            _this.filteredValues['topFilter'] = false;
            _this.dataSource.filterPredicate = _this.customFilterPredicate();
        });
        this.dataSource.filterPredicate = this.customFilterPredicate();
    };
    NdcComponent.prototype.loadData = function () {
        var _this = this;
        this.dataList = [];
        this.dataSource.data = this.dataList;
        this.appService.getNDCActionList().subscribe(function (res) {
            // please create getNdcData service in appService
            if (res.statusCode == 200 && res.data) {
                console.log(res);
                _this.dataList = res.data;
                console.log(_this.dataList);
                _this.dataSource.data = _this.dataList;
            }
        }, function (err) {
        });
    };
    NdcComponent.prototype.gotouserdetaillist = function (user) {
        sessionStorage.setItem('current-user', JSON.stringify(user));
        this.router.navigate(['/user/user-details']);
    };
    NdcComponent.prototype.applyFilter = function (filterValue) {
        var filter = {
            projectId: filterValue.trim().toLowerCase(),
            division: filterValue.trim().toLowerCase(),
            sector: filterValue.trim().toLowerCase(),
            ector: filterValue.trim().toLowerCase(),
            agency: filterValue.trim().toLowerCase(),
            startDate: filterValue.trim().toLowerCase(),
            topFilter: true
        };
        this.dataSource.filter = JSON.stringify(filter);
    };
    NdcComponent.prototype.customFilterPredicate = function () {
        var myFilterPredicate = function (data, filter) {
            var searchString = JSON.parse(filter);
            var projectIdFound = data.projectId.toString().trim().toLowerCase().indexOf(searchString.projectId.toLowerCase()) !== -1;
            var divisionFound = data.division.toString().trim().toLowerCase().indexOf(searchString.division.toLowerCase()) !== -1;
            var sectorFound = data.sector.toString().trim().toLowerCase().indexOf(searchString.sector.toLowerCase()) !== -1;
            var subSectorFound = data.subSector.toString().trim().toLowerCase().indexOf(searchString.subSector.toLowerCase()) !== -1;
            var agencyFound = data.agency.toString().trim().toLowerCase().indexOf(searchString.agency.toLowerCase()) !== -1;
            var startDateFound = data.startDate.toString().trim().toLowerCase().indexOf(searchString.startDate.toLowerCase()) !== -1;
            if (searchString.topFilter) {
                return projectIdFound || divisionFound || sectorFound || agencyFound || subSectorFound || startDateFound;
            }
            else {
                return projectIdFound && divisionFound && sectorFound && agencyFound && subSectorFound || startDateFound;
            }
        };
        return myFilterPredicate;
    };
    NdcComponent.prototype.goToNewNDC = function () {
        this.router.navigate(['/NDC_Actions']);
    };
    NdcComponent.prototype.isAllSelected = function () {
        var numSelected = this.selection.selected.length;
        var numRows = this.dataSource.data.length;
        return numSelected === numRows;
    };
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    NdcComponent.prototype.masterToggle = function () {
        var _this = this;
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(function (row) { return _this.selection.select(row); });
    };
    /** The label for the checkbox on the passed row */
    NdcComponent.prototype.checkboxLabel = function (row) {
        if (!row) {
            return (this.isAllSelected() ? 'select' : 'deselect') + " all";
        }
        return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
    };
    NdcComponent.prototype.removeIndividuallyFromList = function (ele, element) {
        var _this = this;
        this.appService.deleteNDC(element._id).subscribe(function (res) {
            if (res.statusCode == 200) {
                _this.dataList.splice(ele, 1);
                _this.dataSource.data = _this.dataList;
                _this.openSnackBar('Deleted Successfully', 'success');
            }
        }, function (err) {
        });
    };
    NdcComponent.prototype.openSnackBar = function (message, type) {
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
    NdcComponent.prototype.removeSelected = function (list) {
        if (list == 'exist') {
            var y_1 = new Set(this.selection.selected);
            this.dataList = this.dataList.filter(function (x) { return !y_1.has(x); });
            this.dataSource.data = this.dataList;
        }
    };
    __decorate([
        core_1.ViewChild(material_1.MatSort, { static: false })
    ], NdcComponent.prototype, "matSort");
    __decorate([
        core_1.ViewChild(material_1.MatPaginator, { static: false })
    ], NdcComponent.prototype, "matPaginator");
    NdcComponent = __decorate([
        core_1.Component({
            selector: 'app-ndc',
            templateUrl: './ndc.component.html',
            styleUrls: ['./ndc.component.scss']
        })
    ], NdcComponent);
    return NdcComponent;
}());
exports.NdcComponent = NdcComponent;
