"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.SolventUseComponent = void 0;

var collections_1 = require("@angular/cdk/collections");

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var material_1 = require("@angular/material");

var snackbar_dialog_component_1 = require("../modal/snackbar-dialog/snackbar-dialog.component");

var SolventUseComponent =
/** @class */
function () {
  function SolventUseComponent(_fb, _sus, _activatedRoute, _snackBar, _router) {
    this._fb = _fb;
    this._sus = _sus;
    this._activatedRoute = _activatedRoute;
    this._snackBar = _snackBar;
    this._router = _router;
    this.dataList = [];
    this.newlyAddedList = []; // Table related declarations
    //table related declarations

    this["true"] = true;
    this.displayedColumns = [];
    this.dataSource = new material_1.MatTableDataSource(this.dataList);
    this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
    this.solventNameCtrl = new forms_1.FormControl();
    this.amountProducedCtrl = new forms_1.FormControl();
    this.carbonContentCtrl = new forms_1.FormControl();
    this.fractionOxidisedCtrl = new forms_1.FormControl();
    this.referenceCtrl = new forms_1.FormControl();
    this.selection = new collections_1.SelectionModel(true, []);
    this.newSelection = new collections_1.SelectionModel(true, []);
    this.columnNames = [{
      id: "solventName",
      value: "Solvent Name",
      formControl: this.solventNameCtrl
    }, {
      id: "amountProduced",
      value: "Amount Consumed (TJ)",
      formControl: this.amountProducedCtrl
    }, {
      id: "carbonContent",
      value: "Carbon Content (tonne C/TJ)",
      formControl: this.carbonContentCtrl
    }, {
      id: "fractionOxidised",
      value: "Fraction Oxidised (fraction)",
      formControl: this.fractionOxidisedCtrl
    }, {
      id: "reference",
      value: "Reference",
      formControl: this.referenceCtrl
    }];
    this.filteredValues = {
      solventName: '',
      amountProduced: '',
      reference: '',
      carbonContent: '',
      fractionOxidised: ''
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
      subSector: ['2.D.3-Solvent Use', [forms_1.Validators.required]],
      category: ['2.D-Non-Energy Products from Fuels and Solvent Use', [forms_1.Validators.required]],
      calculationApproach: ['Tier I', [Validators.required]]
    });
  }

  SolventUseComponent_1 = SolventUseComponent;
  Object.defineProperty(SolventUseComponent.prototype, "matSort", {
    set: function set(ms) {
      this.sort = ms;
      this.setDataSourceAttributes();
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(SolventUseComponent.prototype, "matPaginator", {
    set: function set(mp) {
      this.paginator = mp;
      this.setDataSourceAttributes();
    },
    enumerable: false,
    configurable: true
  });

  SolventUseComponent.prototype.loadActivityData = function (type, value) {
    var _this = this;

    var obj = {
      type: type,
      value: value
    };
    this.dataList = [];
    this.dataSource.data = this.dataList;
    if (obj.value) this._sus.getEData(obj).subscribe(function (res) {
      if (res.statusCode == 200 && res.data) {
        _this.formGroup.controls['inventoryYear'].setValue(res.data.inventoryYear);

        _this.formGroup.controls['sector'].setValue(res.data.sector);

        _this.formGroup.controls['calculationApproach'].setValue(res.data.calculationApproach);

        _this.formGroup.controls['subSector'].setValue(res.data.subSector);

        _this.formGroup.controls['category'].setValue(res.data.category);

        _this.remarksCtrl.setValue(res.data.remark);

        _this.dataList = res.data.solventData;
        _this.dataSource.data = _this.dataList;
      } else {
        _this.openSnackBar('No Data Found', 'error');
      }
    }, function (err) {});
  };

  SolventUseComponent.prototype.ngOnInit = function () {
    var _this = this;

    this.yearList = [];
    this.getYears();
    this.dataList = [];
    this.newlyAddedList = [];
    this.displayedColumns = this.columnNames.map(function (x) {
      return x.id;
    });

    if (!this.approvalScreen) {
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');
    } // this.dataSource = new MatTableDataSource(this.dataList);


    this.dataSource.paginator = this.paginator;
    this.newDataSource = new material_1.MatTableDataSource(this.newlyAddedList);
    this.referenceCtrl.valueChanges.subscribe(function (positionFilterValue) {
      _this.filteredValues['reference'] = positionFilterValue;
      _this.dataSource.filter = JSON.stringify(_this.filteredValues);
      _this.filteredValues['topFilter'] = false;
      _this.dataSource.filterPredicate = _this.customFilterPredicate();
    });
    this.solventNameCtrl.valueChanges.subscribe(function (positionFilterValue) {
      _this.filteredValues['solventName'] = positionFilterValue;
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
    this.carbonContentCtrl.valueChanges.subscribe(function (positionFilterValue) {
      _this.filteredValues['carbonContent'] = positionFilterValue;
      _this.dataSource.filter = JSON.stringify(_this.filteredValues);
      _this.filteredValues['topFilter'] = false;
      _this.dataSource.filterPredicate = _this.customFilterPredicate();
    });
    this.fractionOxidisedCtrl.valueChanges.subscribe(function (positionFilterValue) {
      _this.filteredValues['fractionOxidised'] = positionFilterValue;
      _this.dataSource.filter = JSON.stringify(_this.filteredValues);
      _this.filteredValues['topFilter'] = false;
      _this.dataSource.filterPredicate = _this.customFilterPredicate();
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
  };

  SolventUseComponent.prototype.getYears = function () {
    var _this = this;

    this._sus.getInventoryYears().subscribe(function (res) {
      if (res.statusCode == 200) {
        _this.yearList = res.data;
      }
    }, function (err) {});
  };

  SolventUseComponent.prototype.isInvalid = function (form, field, errorValue) {
    if (errorValue == "required" || "ValidateDate") {
      return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
    } else if (errorValue == "pattern") {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError("required") && form.get(field).errors.pattern;
    } else if (errorValue == "email") {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError("required") && form.get(field).hasError("email");
    }
  };

  SolventUseComponent.prototype.setDataSourceAttributes = function () {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  };

  SolventUseComponent.prototype.ngAfterViewInit = function () {
    this.dataSource.paginator = this.paginator;
  };

  SolventUseComponent.prototype.applyFilter = function (filterValue) {
    var filter = {
      solventName: filterValue.trim().toLowerCase(),
      amountProduced: filterValue.trim().toLowerCase(),
      fractionOxidised: filterValue.trim().toLowerCase(),
      carbonContent: filterValue.trim().toLowerCase(),
      reference: filterValue.trim().toLowerCase(),
      topFilter: true
    };
    this.dataSource.filter = JSON.stringify(filter);
  };

  SolventUseComponent.prototype.customFilterPredicate = function () {
    var myFilterPredicate = function myFilterPredicate(data, filter) {
      var searchString = JSON.parse(filter);
      var solventName = data.solventName.toString().trim().toLowerCase().indexOf(searchString.solventName.toLowerCase()) !== -1;
      var amountProduced = data.amountProduced.toString().trim().toLowerCase().indexOf(searchString.amountProduced.toLowerCase()) !== -1;
      var fractionOxidised = data.fractionOxidised.toString().trim().toLowerCase().indexOf(searchString.fractionOxidised.toLowerCase()) !== -1;
      var carbonContent = data.carbonContent.toString().trim().toLowerCase().indexOf(searchString.carbonContent.toLowerCase()) !== -1;
      var reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;

      if (searchString.topFilter) {
        return solventName || amountProduced || reference || fractionOxidised || carbonContent;
      } else {
        return solventName && amountProduced && reference && fractionOxidised || carbonContent;
      }
    };

    return myFilterPredicate;
  };

  SolventUseComponent.prototype.isAllSelected = function () {
    var numSelected = this.selection.selected.length;
    var numRows = this.dataSource.data.length;
    return numSelected === numRows;
  };

  SolventUseComponent.prototype.isAllNewSelected = function () {
    var numSelected = this.newSelection.selected.length;
    var numRows = this.newDataSource.data.length;
    return numSelected === numRows;
  };
  /** Selects all rows if they are not all selected; otherwise clear selection. */


  SolventUseComponent.prototype.masterToggle = function () {
    var _this = this;

    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(function (row) {
      return _this.selection.select(row);
    });
  };

  SolventUseComponent.prototype.masterToggleNew = function () {
    var _this = this;

    this.isAllNewSelected() ? this.newSelection.clear() : this.newDataSource.data.forEach(function (row) {
      return _this.newSelection.select(row);
    });
  };
  /** The label for the checkbox on the passed row */


  SolventUseComponent.prototype.checkboxLabel = function (row) {
    if (!row) {
      return (this.isAllSelected() ? 'select' : 'deselect') + " all";
    }

    return (this.selection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
  };

  SolventUseComponent.prototype.checkboxLabelNew = function (row) {
    if (!row) {
      return (this.isAllNewSelected() ? 'select' : 'deselect') + " all";
    }

    return (this.newSelection.isSelected(row) ? 'deselect' : 'select') + " row " + (row.position + 1);
  };

  SolventUseComponent.prototype.addNewRow = function () {
    var x = this.newlyAddedList.length;
    this.newlyAddedList.push({
      solventName: '',
      amountProduced: '',
      reference: '',
      fractionOxidised: '',
      carbonContent: ''
    });
    this.newDataSource.data = this.newlyAddedList;
  };

  SolventUseComponent.prototype.removeIndividuallyFromList = function (list, ele) {
    if (list == 'exist') {
      this.dataList.splice(ele, 1);
      this.dataSource.data = this.dataList;
    }

    if (list == 'new') {
      this.newlyAddedList.splice(ele, 1);
      this.newDataSource.data = this.newlyAddedList;
    }
  };

  SolventUseComponent.prototype.removeSelected = function (list) {
    if (list == 'exist') {
      var y_1 = new Set(this.selection.selected);
      this.dataList = this.dataList.filter(function (x) {
        return !y_1.has(x);
      });
      this.dataSource.data = this.dataList;
    }

    if (list == 'new') {
      var y_2 = new Set(this.newSelection.selected);
      this.newlyAddedList = this.newlyAddedList.filter(function (x) {
        return !y_2.has(x);
      });
      this.newDataSource.data = this.newlyAddedList;
    }
  };

  SolventUseComponent.prototype.openSnackBar = function (message, type) {
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

  SolventUseComponent.prototype.saveElectricityGeneration = function () {
    var _this = this;

    var obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      subSector: this.formGroup.controls['subSector'].value,
      category: this.formGroup.controls['category'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      solventData: this.dataList.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      entity: SolventUseComponent_1.Constants.ENTITY,
      entityUrl: SolventUseComponent_1.Constants.ENTITY_URL,
      entityId: this.formGroup.controls['sector'].value + ">" + this.formGroup.controls['category'].value + ">" + this.formGroup.controls['subSector'].value + ">" + this.formGroup.controls['inventoryYear'].value,
      permissionMenuId: SolventUseComponent_1.Constants.PERMISSION_MENU_ID
    }; // console.log(obj);

    this._sus.saveElectricityGeneration(obj).subscribe(function (res) {
      if (res.statusCode == 200) {
        _this.openSnackBar(res.message, 'success');

        _this.formGroup.controls['inventoryYear'].reset();

        _this.formGroup.controls['subCategory'].reset();

        _this.dataList = [];
        _this.dataSource.data = _this.dataList;
        _this.newlyAddedList = [];
        _this.newDataSource.data = _this.newlyAddedList;
      } else {
        _this.openSnackBar(res.message, 'error');
      }
    }, function (err) {
      _this.openSnackBar(err.message, 'error');
    });
  };

  SolventUseComponent.prototype.updateDataStaus = function (status) {
    var _this = this;

    var obj = {
      status: status,
      _id: this.routeRecordId,
      approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
      approverComment: this.approverCommentCtrl.value
    };

    this._sus.updateDataStatus(obj).subscribe(function (res) {
      if (res.statusCode == 200) {
        _this.openSnackBar(res.message, 'success');

        _this._router.navigate(['electricity-generation']);
      } else {
        _this.openSnackBar(res.message, 'error');
      }
    }, function (err) {
      _this.openSnackBar(err.message, 'error');
    });
  };

  var SolventUseComponent_1;
  SolventUseComponent.Constants = {
    ENTITY: "GHG INPUT>IPPU",
    ENTITY_URL: '/solvent-use',
    PERMISSION_MENU_ID: '6085473a97c27b328445369d'
  };

  __decorate([core_1.ViewChild(material_1.MatSort, {
    "static": false
  })], SolventUseComponent.prototype, "matSort");

  __decorate([core_1.ViewChild(material_1.MatPaginator, {
    "static": false
  })], SolventUseComponent.prototype, "matPaginator");

  SolventUseComponent = SolventUseComponent_1 = __decorate([core_1.Component({
    selector: 'app-solvent-use',
    templateUrl: './solvent-use.component.html',
    styleUrls: ['./solvent-use.component.scss']
  })], SolventUseComponent);
  return SolventUseComponent;
}();

exports.SolventUseComponent = SolventUseComponent;