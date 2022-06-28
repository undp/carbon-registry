import { MenuModel } from './../model/common/menu-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { RNACService } from './rnac.service';
import { SectorDetailsRequest } from '../model/common/sector-details-request';
import { UtilityServiceService } from '../../utility-service.service';
import { MrvConstants } from '../../mrv-constant';

@Component({
  selector: 'app-rnac',
  templateUrl: './rnac.component.html',
  styleUrls: ['./rnac.component.scss']
})
export class RnacComponent implements OnInit {

  // sector details
  sectorArr: string[] = [];
  categoryArr: string[] = [];
  subSectorArr: string[] = [];

  formGroup: FormGroup;
  yearList: any;

  dataList: any = [];
  dataList1: any = [];

  newlyAddedList: any = [];
  newlyAddedList1: any = [];

  gasConsumedList: any = [];

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  true: boolean = true;
  displayedColumns = [];
  displayedColumns1 = [];

  dataSource = new MatTableDataSource(this.dataList);
  dataSource1 = new MatTableDataSource(this.dataList1);

  newDataSource = new MatTableDataSource(this.newlyAddedList);
  newDataSource1 = new MatTableDataSource(this.newlyAddedList1);

  gasConsumedCtrl = new FormControl();
  amountCtrl = new FormControl();
  unitCtrl = new FormControl();
  referenceCtrl = new FormControl();

  gasConsumedCtrl1 = new FormControl();
  amountCtrl1 = new FormControl();
  unitCtrl1 = new FormControl();
  referenceCtrl1 = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  public selection1 = new SelectionModel<any>(true, []);

  public newSelection = new SelectionModel<any>(true, []);
  public newSelection1 = new SelectionModel<any>(true, []);

  columnNames = [
    { id: 'gasConsumed', value: 'Gas Consumed', formControl: this.gasConsumedCtrl },
    { id: 'unit', value: 'Unit', formControl: this.unitCtrl },
    { id: 'amount', value: 'Amount', formControl: this.amountCtrl },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
  ];

  columnNames1 = [
    { id: 'gasConsumed', value: 'Gas Consumed', formControl: this.gasConsumedCtrl1 },
    { id: 'unit', value: 'Unit', formControl: this.unitCtrl1 },
    { id: 'amount', value: 'Amount', formControl: this.amountCtrl1 },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl1 }
  ];

  filteredValues = {
    gasConsumed: '', unit: '', reference: '', amount: ''
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

  remarksCtrl = new FormControl("", [Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly activatedRoute: ActivatedRoute,
    private readonly rnacs: RNACService,
    private snackBar: MatSnackBar,
    private router: Router,
    private utilityService: UtilityServiceService,
    private readonly appService: AppService) {

    this.dataList = [];
    this.dataList1 = [];

    this.newlyAddedList = [];
    this.newlyAddedList1 = [];

    this.dataSource.data = this.dataList;
    this.dataSource1.data = this.dataList1;

    this.newDataSource.data = this.newlyAddedList;
    this.newDataSource1.data = this.newlyAddedList1;
  }

  getGasConsumed() {
    this.rnacs.getGasConsumed().subscribe((res: any) => {
      if (res.data) {
        this.gasConsumedList = res.data;
      }
    }, err => {

    })
  }

  loadActivityData(type, value) {
    var obj: any = {
      menuId: this.formGroup.controls.menuId.value,
      [type]: value
    }
    this.dataList = [];
    this.dataSource.data = this.dataList;
    this.dataList1 = [];

    this.dataSource1.data = this.dataList1;
    if (obj) {
      this.appService.getDataRecord(obj).subscribe((res: any) => {
        if (res.statusCode == 200 && res.data) {
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
    this.dataList = data.refrigerationAirConditioning;
    this.dataSource.data = this.dataList;

    this.dataList1 = data.mobileAirConditioning;
    this.dataSource1.data = this.dataList1;
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource1.paginator = this.paginator;
    this.dataSource1.sort = this.sort;
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      const searchString = JSON.parse(filter);
      const gasConsumed = data.gasConsumed.toString().trim().toLowerCase().indexOf(searchString.gasConsumed.toLowerCase()) !== -1;
      const amount = data.amount.toString().trim().toLowerCase().indexOf(searchString.amount.toLowerCase()) !== -1;
      const unit = data.unit.toString().trim().toLowerCase().indexOf(searchString.unit.toLowerCase()) !== -1;
      const reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
      if (searchString.topFilter) {
        return gasConsumed || amount || reference || unit;
      } else {
        return gasConsumed && amount && reference && unit;
      }
    };
    return myFilterPredicate;

  }





  ngOnInit() {
    this.yearList = [];
    this.newlyAddedList = [];

    this.dataList1 = [];
    this.newlyAddedList1 = [];
    this.buildForm();
    // reading details from routeParams
    this.getBasicDataFromRoute();
    this.getYears();
    this.getGasConsumed();

    this.dataList = [];

    this.displayedColumns = this.columnNames.map(x => x.id);
    this.displayedColumns1 = this.columnNames1.map(x => x.id);
    if (!this.approvalScreen) {
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');

      this.displayedColumns1.push('actions');
      this.displayedColumns1.unshift('select');
    }

    this.dataSource.paginator = this.paginator;

    this.newDataSource = new MatTableDataSource(this.newlyAddedList);
    this.newDataSource1 = new MatTableDataSource(this.newlyAddedList1);

    this.referenceCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['reference'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.gasConsumedCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['gasConsumed'] = positionFilterValue;
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


    this.referenceCtrl1.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['reference'] = positionFilterValue;
      this.dataSource1.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource1.filterPredicate = this.customFilterPredicate();
    });

    this.gasConsumedCtrl1.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['gasConsumed'] = positionFilterValue;
      this.dataSource1.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource1.filterPredicate = this.customFilterPredicate();
    });
    this.amountCtrl1.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['amount'] = positionFilterValue;
      this.dataSource1.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource1.filterPredicate = this.customFilterPredicate();
    });
    this.unitCtrl1.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['unit'] = positionFilterValue;
      this.dataSource1.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource1.filterPredicate = this.customFilterPredicate();
    });


    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.dataSource1.filterPredicate = this.customFilterPredicate();

    this.checkForApprovalPage();

  }
  private checkForApprovalPage() {
    this.approvalScreen = false;
    this.routeFormId = this.activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this.activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }
  }

  private getBasicDataFromRoute() {
    this.activatedRoute.data.subscribe(routeData => {
      this.formGroup.controls.menuId.patchValue(routeData.menuId);
      let payload: SectorDetailsRequest = {
        menuId: routeData.menuId,
        subSector: routeData.subSector
      }
      this.utilityService.sectorDetailsForGHGByMenu(payload, (response) => {
        this.sectorArr = response.sectorArr;
        this.categoryArr = response.categoryArr;
        this.subSectorArr = response.subSectorArr;
        this.populateSectorDetails();
      });
    });
  }
  populateSectorDetails() {
    this.formGroup.controls.sector.patchValue(this.sectorArr.length ? this.sectorArr[0] : "");
    this.formGroup.controls.category.patchValue(this.categoryArr.length ? this.categoryArr[0] : "");
    this.formGroup.controls.subSector.patchValue(this.subSectorArr.length ? this.subSectorArr[0] : "");
  }
  private buildForm() {
    this.formGroup = this._fb.group({
      menuId: ['', [Validators.required]],
      inventoryYear: ['', [Validators.required]],
      sector: ['', [Validators.required]],
      subSector: ['', [Validators.required]],
      category: ['', [Validators.required]],
      calculationApproach: ['', [Validators.required]],
      remark: this.remarksCtrl
    });
  }

  getYears() {
    this.rnacs.getInventoryYears().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource1.paginator = this.paginator;
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

  isAllSelected1() {
    const numSelected = this.selection1.selected.length;
    const numRows = this.dataSource1.data.length;
    return numSelected === numRows;
  }

  isAllNewSelected1() {
    const numSelected = this.newSelection1.selected.length;
    const numRows = this.newDataSource1.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  masterToggle1() {
    this.isAllSelected1() ?
      this.selection1.clear() :
      this.dataSource1.data.forEach(row => this.selection1.select(row));
  }

  masterToggleNew() {
    this.isAllNewSelected() ?
      this.newSelection.clear() :
      this.newDataSource.data.forEach(row => this.newSelection.select(row));
  }

  masterToggleNew1() {
    this.isAllNewSelected1() ?
      this.newSelection1.clear() :
      this.newDataSource1.data.forEach(row => this.newSelection1.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabel1(row?: any): string {
    if (!row) {
      return `${this.isAllSelected1() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection1.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelNew(row?: any): string {
    if (!row) {
      return `${this.isAllNewSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.newSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelNew1(row?: any): string {
    if (!row) {
      return `${this.isAllNewSelected1() ? 'select' : 'deselect'} all`;
    }
    return `${this.newSelection1.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNewRow() {
    console.log(this.newlyAddedList);
    const x = this.newlyAddedList.length;
    this.newlyAddedList.push({
      gasConsumed: '', unit: 'tonnes', amount: 0, reference: ''
    });
    this.newDataSource.data = this.newlyAddedList;
  }

  addNewRow1() {
    const x = this.newlyAddedList1.length;
    this.newlyAddedList1.push({
      gasConsumed: '', unit: 'tonnes', amount: 0, reference: ''
    });
    this.newDataSource1.data = this.newlyAddedList1;
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

  removeIndividuallyFromList1(list, ele) {
    if (list == 'exist') {
      this.dataList1.splice(ele, 1);
      this.dataSource1.data = this.dataList1;
    }
    if (list == 'new') {
      this.newlyAddedList1.splice(ele, 1);
      this.newDataSource1.data = this.newlyAddedList1;
    }
  }

  removeSelected(list) {
    if (list == 'exist') {
      const y = new Set(this.selection.selected);
      this.dataList = this.dataList.filter(x => !y.has(x));
      this.dataSource.data = this.dataList;
    }
    if (list == 'new') {
      const y = new Set(this.newSelection.selected);
      this.newlyAddedList = this.newlyAddedList.filter(x => !y.has(x));
      this.newDataSource.data = this.newlyAddedList;
    }
  }

  removeSelected1(list) {
    if (list == 'exist') {
      const y = new Set(this.selection1.selected);
      this.dataList1 = this.dataList1.filter(x => !y.has(x));
      this.dataSource1.data = this.dataList1;
    }
    if (list == 'new') {
      const y = new Set(this.newSelection1.selected);
      this.newlyAddedList1 = this.newlyAddedList1.filter(x => !y.has(x));
      this.newDataSource1.data = this.newlyAddedList1;
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
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      refrigerationAirConditioning: this.dataList.concat(this.newlyAddedList),
      mobileAirConditioning: this.dataList1.concat(this.newlyAddedList1),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.formGroup.controls.menuId.value,
    };

    // console.log(obj);

    this.appService.saveRecord(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.formGroup.controls['inventoryYear'].reset();

        this.dataList = [];
        this.dataSource.data = this.dataList;
        this.newlyAddedList = [];
        this.newDataSource.data = this.newlyAddedList;

        this.dataList1 = [];
        this.dataSource1.data = this.dataList1;
        this.newlyAddedList1 = [];
        this.newDataSource1.data = this.newlyAddedList1;

      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }

  updateDataStaus(status) {
    const obj = {
      status: status,
      _id: this.routeRecordId,
      approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
      approverComment: this.approverCommentCtrl.value
    };

    this.rnacs.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode == 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.router.navigate(['./my-approvals']);
      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }



}
