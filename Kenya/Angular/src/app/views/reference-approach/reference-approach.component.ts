import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { ReferenceApproachService } from './reference-approach.service';
import { UtilityServiceService } from './../../utility-service.service';

@Component({
  selector: 'app-reference-approach',
  templateUrl: './reference-approach.component.html',
  styleUrls: ['./reference-approach.component.scss']
})



export class ReferenceApproachComponent implements OnInit {


  menuId: string;
  //table related declarations
  true: boolean = true;
  public dataList;
  public newlyAddedList;

  displayedColumns = [];

  dataSource = new MatTableDataSource([]);
  newDataSource = new MatTableDataSource([]);

  fuelTypeCtrl = new FormControl();
  fuelCtrl = new FormControl();
  unitCtrl = new FormControl();
  productionCtrl = new FormControl();
  importsCtrl = new FormControl();
  exportsCtrl = new FormControl();
  internationalBunkersCtrl = new FormControl();
  stockChangeCtrl = new FormControl();
  excludedConsumptionCtrl = new FormControl();
  referenceCtrl = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  newSelection = new SelectionModel<any>(true, []);

  columnNames = [
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


  filteredValues = {
    fuelType: '', fuel: '', unit: '', production: '', imports: '', exports: '',
    internationalBunkers: '', stockChange: '', excludedConsumption: '', reference: ''
  };

  private paginator: MatPaginator;
  private sort: MatSort;

  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  formGroup: FormGroup;
  yearList: any;
  fuelTypes: any;
  fuelsByType: any;

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  remarksCtrl = new FormControl("", [Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly _ras: ReferenceApproachService,
    private readonly _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private utilityService: UtilityServiceService,
    private appService: AppService, private router: Router) {


  }

  loadActivityData(loadType, value) {
    var obj = {
      menuId: this.menuId,
      [loadType]: value
    }
    this.dataList = [];
    this.dataSource.data = this.dataList;
    this.appService.getDataRecord(obj).subscribe((res: any) => {
      if (res.statusCode == 200 && res.data) {
        if (loadType != "_id" && res.data.length) {
          this.setFormValue(res.data[0]);
          // this.remarksCtrl.setValue(res.data[0].remark);
          // this.dataList = res.data[0].activityData;
        } else {
          this.setFormValue(res.data);
          // this.remarksCtrl.setValue(res.data.remark);
          // this.dataList = res.data.activityData;
        }
        this.dataSource.data = this.dataList;
        console.log("this.dataSource.data  11", this.dataSource.data);

      } else {
        // this.resetData();
      }
    }, err => {
      console.error("loadActivityData ", err.message);
      this.utilityService.openSnackBar(err.message, "error");
    })
  }
  resetData() {
    this.formGroup.reset();
    
  }
  setFormValue(data: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(data);
    // set other values mannually
    this.dataList = data.activityData;
  }

  

  ngOnInit() {
    this.yearList = [];
    this.fuelTypes = [];
    this.fuelsByType = [];
    // create form 
    this.buildForm();
    this.getBasicDataFromRoute();

    this.getYears();
    this.getFuelTypes();

    this.dataList = [];
    this.newlyAddedList = [];

    this.displayedColumns = this.columnNames.map(x => x.id);
    if (!this.approvalScreen) {
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');
    }

    this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;

    this.newDataSource = new MatTableDataSource(this.newlyAddedList)

    this.referenceCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['reference'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.excludedConsumptionCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['excludedConsumption'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.stockChangeCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['stockChange'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.internationalBunkersCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['internationalBunkers'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.exportsCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['exports'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.importsCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['imports'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.productionCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['production'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.unitCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['unit'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.fuelCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['fuel'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.fuelTypeCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['fuelType'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();

    this.checkForApprovalPage();

  }
  checkForApprovalPage() {
    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }

  }
  private getBasicDataFromRoute() {
    this._activatedRoute.data.subscribe(routeData => {
      this.menuId = (routeData.menuId);
    });
  }

  buildForm() {
    this.formGroup = this._fb.group({
      inventoryYear: [null, [Validators.required]],
      sector: ['1-Energy', [Validators.required]],
      calculationApproach: ['Tier I', [Validators.required]],
      remark: this.remarksCtrl,
    });
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  applyFilter(filterValue: string) {
    let filter = {
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
    }
    this.dataSource.filter = JSON.stringify(filter)
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      let searchString = JSON.parse(filter);
      let fuelType = data.fuelType.toString().trim().toLowerCase().indexOf(searchString.fuelType.toLowerCase()) !== -1
      let fuel = data.fuel.toString().trim().toLowerCase().indexOf(searchString.fuel.toLowerCase()) !== -1
      let unit = data.unit.toString().trim().toLowerCase().indexOf(searchString.unit.toLowerCase()) !== -1
      let production = data.production.toString().trim().toLowerCase().indexOf(searchString.production.toLowerCase()) !== -1
      let imports = data.imports.toString().trim().toLowerCase().indexOf(searchString.imports.toLowerCase()) !== -1
      let exports = data.exports.toString().trim().toLowerCase().indexOf(searchString.exports.toLowerCase()) !== -1
      let internationalBunkers = data.internationalBunkers.toString().trim().toLowerCase().indexOf(searchString.internationalBunkers.toLowerCase()) !== -1
      let stockChange = data.stockChange.toString().trim().toLowerCase().indexOf(searchString.stockChange.toLowerCase()) !== -1
      let excludedConsumption = data.excludedConsumption.toString().trim().toLowerCase().indexOf(searchString.excludedConsumption.toLowerCase()) !== -1
      let reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1
      if (searchString.topFilter) {
        return fuelType || fuel || unit || production || imports || exports || internationalBunkers || stockChange ||
          excludedConsumption || reference
      } else {
        return fuelType && fuel && unit && production && imports && exports && internationalBunkers && stockChange &&
          excludedConsumption && reference
      }
    }
    return myFilterPredicate;

  }

  getYears() {
    this._ras.getInventoryYears('mannual').subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    })
  }

  getFuelTypes() {
    this.appService.getDatabaseEnergyEmissionFactor().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.fuelTypes = this.appService.getFuelandFuelType(res.data.emissionFactor);
      }
    }, err => {

    });
  }

  getFuelsByType(fuelType, id) {
    this.newlyAddedList.forEach(element => {
      if (element.id == id) {
        let obj = this.fuelTypes.find(( item ) => item.fuelType == fuelType);
        element.fuelsByType = obj.fuels;
      }
    });
  }

  /* isInvalid(form, field, errorValue) {
    if (errorValue == 'required' || 'ValidateDate') {
      return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
    }
    else if (errorValue == 'pattern') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
    }
    else if (errorValue == 'email') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).hasError('email')
    }
  } */

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllNewSelected() {
    const numSelected = this.newSelection.selected.length;
    const numRows = this.newDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  masterToggleNew() {
    this.isAllNewSelected() ?
      this.newSelection.clear() :
      this.newDataSource.data.forEach(row => this.newSelection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelNew(row?: any): string {
    if (!row) {
      return `${this.isAllNewSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.newSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNewRow() {
    let x = this.newlyAddedList.length;
    this.newlyAddedList.push({
      id: x + 1, fuelType: '', fuel: '', unit: 'tonnes', production: 0, imports: 0, exports: 0,
      internationalBunkers: 0, stockChange: 0, excludedConsumption: 0, reference: '', fuelsByType: []
    });
    this.newDataSource.data = this.newlyAddedList
  }

  saveReferenceApproach() {
    if (this.formGroup.status == "INVALID") {
      console.log("this.formGroup  ", this.formGroup);

      this.formGroup.markAllAsTouched();
      return;
    }
    var obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      activityData: this.dataList.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.menuId
    };

    // console.log(obj);

    this.appService.saveRecord(obj).subscribe((res: any) => {
      this.utilityService.openSnackBar(res.message, 'success');
      this.formGroup.controls['inventoryYear'].reset();
      this.dataList = [];
      this.dataSource.data = this.dataList;
      this.newlyAddedList = [];
      this.newDataSource.data = this.newlyAddedList;
      this.remarksCtrl.reset();
    }, err => {
      this.utilityService.openSnackBar(err.message, 'error');
    })

  }

  removeIndividuallyFromList(list, ele) {
    if (list == 'exist') {
      this.dataList.splice(ele, 1);
      this.dataSource.data = this.dataList;
    }
    if (list == 'new') {
      this.newlyAddedList.splice(ele, 1);
      this.newDataSource.data = this.newlyAddedList;
    }
  }
  removeSelected(list) {
    if (list == 'exist') {
      let y = new Set(this.selection.selected);
      this.dataList = this.dataList.filter(x => !y.has(x));
      this.dataSource.data = this.dataList;
    }
    if (list == 'new') {
      let y = new Set(this.newSelection.selected);
      this.newlyAddedList = this.newlyAddedList.filter(x => !y.has(x));
      this.newDataSource.data = this.newlyAddedList;
    }

  }
  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass: 'snackbar-global',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: type
      }
    });
  }

  updateDataStatus(status) {
    let obj = {
      status: status,
      _id: this.routeRecordId,
      approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
      approverComment: this.approverCommentCtrl.value
    }

    this._ras.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode == 200) {
        this.router.navigate(['./my-approvals']);
        this.utilityService.openSnackBar(res.message, 'success');
      }
      else {
        this.utilityService.openSnackBar(res.message, 'error');
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, 'error');
    })
  }

}
