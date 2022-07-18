import { MenuModel } from './../model/common/menu-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { TransportService } from './transport.service';
import { SectorDetailsRequest } from '../model/common/sector-details-request';
import { UtilityServiceService } from '../../utility-service.service';
import { MrvConstants } from '../../mrv-constant';

@Component({
  selector: 'app-transport',
  templateUrl: './transport.component.html',
  styleUrls: ['./transport.component.scss']
})
export class TransportComponent implements OnInit {
 
  // sector details
  menuId:string;
  sectorArr:string[] = [];
  categoryArr:string[] = [];
  subSectorArr:string[] = [];
  subCategoryArr:string[] = [];

  formGroup: FormGroup;
  yearList: any;

  dataList: any = [];
  newlyAddedList: any = [];

  fuelTypes: any;
  fuelsByType: any;

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  // Table related declarations
  // table related declarations
  true: boolean = true;
  displayedColumns:any = [];

  dataSource = new MatTableDataSource(this.dataList);
  newDataSource = new MatTableDataSource(this.newlyAddedList);


  fuelTypeCtrl = new FormControl();
  fuelCtrl = new FormControl();
  unitCtrl = new FormControl();
  amountCtrl = new FormControl();
  referenceCtrl = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  public newSelection = new SelectionModel<any>(true, []);

  columnNames = [
    { id: 'fuelType', value: 'Fuel Type', formControl: this.fuelTypeCtrl },
    { id: 'fuel', value: 'Fuel', formControl: this.fuelCtrl },
    { id: 'unit', value: 'Unit', formControl: this.unitCtrl },
    { id: 'amount', value: 'Amount', formControl: this.amountCtrl },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
  ];

  filteredValues = {
    fuelType: '', fuel: '', unit: '', amount: '', reference: ''
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

  remarksCtrl = new FormControl('',[Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly _ts: TransportService,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private utilityService:UtilityServiceService,
    private readonly appService: AppService) {
      this.dataList = [];
      this.newlyAddedList = [];

    this.dataSource.data = this.dataList;
    this.newDataSource.data = this.newlyAddedList;
  }

  

  loadActivityData(type, value) {
    const obj: any = {
      menuId: this.menuId,
      [type]: value
    };
    if (type === 'inventoryYear') {
      obj.subCategory = this.formGroup.controls['subCategory'].value;
    }
    this.dataList = [];
    this.dataSource.data = this.dataList;
    if (obj) {
    this.appService.getDataRecord(obj).subscribe((res: any)=>{
      if (res.statusCode == 200 && res.data ) {
        if (type != "_id" && res.data.length) { 
          this.setFormValue(res.data[0]);
          // this.remarksCtrl.setValue(res.data[0].remark);
          
        } else {
          this.setFormValue(res.data);
        }
      } else {
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_WARN);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
    }
  }
  setFormValue(data: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(data);
    // set other values mannually
    this.dataList = data.energyData;
    this.dataSource.data = this.dataList;
  }
  onSubCategoryChange() {
    if (this.formGroup.controls['subCategory'].value) {
      if(this.dataList.length < 1){
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
      }
    }
  }

  ngOnInit() {
    this.yearList = [];
    this.fuelTypes = [];
    this.fuelsByType = [];
    // create form 
    this.buildForm();
    // reading details from routeParams
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

    // this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;

    this.newDataSource = new MatTableDataSource(this.newlyAddedList);

    this.referenceCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['reference'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.amountCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['amount'] = positionFilterValue;
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
  private checkForApprovalPage() {
    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }
  }

private buildForm() {
  this.formGroup = this._fb.group({
    // menuId: ['', [Validators.required]],
    inventoryYear: ['', [Validators.required]],
    sector: ['', [Validators.required]],
    subSector: ['', [Validators.required]],
    category: ['', [Validators.required]],
    subCategory: ['', [Validators.required]],
    calculationApproach: ['', [Validators.required]],
    remark: this.remarksCtrl
  });
  }
  private getBasicDataFromRoute() {
    this._activatedRoute.data.subscribe(routeData => {
      this.menuId = routeData.menuId;
      let payload: SectorDetailsRequest = {
        menuId: routeData.menuId,
        subSector: routeData.subSector
      }
      this.utilityService.sectorDetailsForGHGByMenu(payload,(response)=>{
        this.sectorArr = response.sectorArr;
        this.categoryArr = response.categoryArr;
        this.subSectorArr = response.subSectorArr;
        this.subCategoryArr = response.subCategoryArr;
        this.populateSectorDetails();
      });
    });
  }
  populateSectorDetails() {
    this.formGroup.controls.sector.patchValue(this.sectorArr.length ? this.sectorArr[0] : "");
    this.formGroup.controls.category.patchValue(this.categoryArr.length ? this.categoryArr[0] : "");
    this.formGroup.controls.subSector.patchValue(this.subSectorArr.length ?this.subSectorArr[0] : "");
    // this.formGroup.controls.subCategory.patchValue(this.subCategoryArr.length ?this.subCategoryArr[0] : "");
  }
  getYears() {
    this._ts.getInventoryYears().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    });
  }
  getFuelTypes() {
    this.appService.getDatabaseEnergyEmissionFactor().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.fuelTypes = this.appService.getFuelandFuelType(res.data.emissionFactor);
      }
    }, err => {

    });
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    const filter = {
      fuelType: filterValue.trim().toLowerCase(),
      fuel: filterValue.trim().toLowerCase(),
      unit: filterValue.trim().toLowerCase(),
      amount: filterValue.trim().toLowerCase(),
      reference: filterValue.trim().toLowerCase(),
      topFilter: true
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      const searchString = JSON.parse(filter);
      const fuelType = data.fuelType.toString().trim().toLowerCase().indexOf(searchString.fuelType.toLowerCase()) !== -1;
      const fuel = data.fuel.toString().trim().toLowerCase().indexOf(searchString.fuel.toLowerCase()) !== -1;
      const unit = data.unit.toString().trim().toLowerCase().indexOf(searchString.unit.toLowerCase()) !== -1;
      const amount = data.amount.toString().trim().toLowerCase().indexOf(searchString.amount.toLowerCase()) !== -1;
     const reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
      if (searchString.topFilter) {
        return fuelType || fuel || unit || amount || reference;
      } else {
        return fuelType && fuel && unit && amount && reference;
      }
    };
    return myFilterPredicate;

  }

  getFuelsByType(fuelType, id) {
    this.newlyAddedList.forEach(element => {
      if (element.id == id) {
        let obj = this.fuelTypes.find(( item ) => item.fuelType == fuelType);
        element.fuelsByType = obj.fuels;
      }
    });
  }

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
    const x = this.newlyAddedList.length;
    this.newlyAddedList.push({
      id: x + 1, fuelType: '', fuel: '', unit: 'tonnes', amount: 0, reference: '', fuelsByType: []
    });
    this.newDataSource.data = this.newlyAddedList;
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
      const y = new Set(this.selection.selected);
      this.dataList = this.dataList.filter( x => !y.has(x) );
      this.dataSource.data = this.dataList;
    }
    if (list == 'new') {
      const y = new Set(this.newSelection.selected);
      this.newlyAddedList = this.newlyAddedList.filter( x => !y.has(x) );
      this.newDataSource.data = this.newlyAddedList;
    }

  }

  saveElectricityGeneration() {
    if(this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.utilityService.openSnackBar(MrvConstants.ERROR_ENTER_REQUIRED,MrvConstants.LOG_ERROR);
      return;
    }
    let obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      subSector: this.formGroup.controls['subSector'].value,
      category: this.formGroup.controls['category'].value,
      subCategory: this.formGroup.controls['subCategory'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      energyData: this.dataList.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.menuId
    };

    // console.log(obj);

    this.appService.saveRecord(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.utilityService.openSnackBar(res.message,  MrvConstants.LOG_SUCCESS);
        this.resetData();
      } else {
        this.utilityService.openSnackBar(res.message,  MrvConstants.LOG_WARN);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message,  MrvConstants.LOG_ERROR);
    });

  }
  resetData() {
    this.dataList = [];
    this.dataSource.data = this.dataList;
    this.newlyAddedList = [];
    this.newDataSource.data = this.newlyAddedList;
    this.formGroup.reset();
    this.populateSectorDetails();
  }

  updateDataStaus(status) {
    const obj = {
        status : status,
        _id : this.routeRecordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.approverCommentCtrl.value
      };

    this._ts.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode == 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.router.navigate(['./my-approvals']);
      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_WARN);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }


}
