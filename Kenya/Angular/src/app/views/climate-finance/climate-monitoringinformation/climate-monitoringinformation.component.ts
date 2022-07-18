import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MRV_MONITORING_YEAR_COUNT } from '../../../app.constants';
import { AppService } from '../../../app.service';
import { ElectricityGenerationComponent } from '../../electricity-generation/electricity-generation.component';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { MenuModel } from '../../model/common/menu-model';
@Component({
  selector: 'app-climate-monitoringinformation',
  templateUrl: './climate-monitoringinformation.component.html',
  styleUrls: ['./climate-monitoringinformation.component.scss']
})
export class ClimateMonitoringinformationComponent implements OnInit {
  climateFinanceMonitoringData: any = {
    monitoringYear: null,
    financialYear: null,
    appliedExchange: null,
    financingMode: null,
    budgetCode: null,
    commissioningDate: null,
    approvalDate: null,
    closureDate: null,
    projectId: null,
    disbursementDetail: []
  }
  menu:MenuModel;
  formGroup: FormGroup;
  projectList: any;
  yearList: any;

  disbursementYearDataList: any = [];


  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  // Table related declarations

  disbursementYearDisplayedColumns = [];

  disbursementYearDataSource = new MatTableDataSource(this.disbursementYearDataList);

  public disbursementYearSelection = new SelectionModel<any>(true, []);

  disbursementYearColumnNames = [
    { id: 'disbursementCategory', value: 'Disbursement Category' },
    { id: 'amountQ1', value: 'Amount Q1 (USD)' },
    { id: 'amountQ2', value: 'Amount Q2 (USD)' },
    { id: 'amountQ3', value: 'Amount Q3 (USD)' },
    { id: 'amountQ4', value: 'Amount Q4 (USD)' },
    { id: 'reference', value: 'Reference' },
  ];


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

  remarksCtrl = new FormControl("",[Validators.required]);
  monitoringYearCtrl = new FormControl("",[Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly appService: AppService) {

    this.disbursementYearDataList = [];

    this.disbursementYearDataSource.data = this.disbursementYearDataList;

    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }

    this.formGroup = this._fb.group({
      projectId: [null, [Validators.required]],
      monitoringYear: this.monitoringYearCtrl,
      remarks: this.remarksCtrl
    });
  }

  loadActivityData(loadType, value) {
    this.disbursementYearDataList = [];
    var obj = {
      [loadType]: value
    }
    if (obj) {
      this.appService.getNDC(obj).subscribe((res: any) => {
        if (res.statusCode == 200 && res.data) {
          this.climateFinanceMonitoringData = {
            // monitoringYear: res.data.monitoringYear,
            financialYear: res.data.parentProject.financialYear,
            appliedExchange: res.data.parentProject.appliedExchange,
            financingMode: res.data.parentProject.financingMode,
            budgetCode: res.data.parentProject.budgetCode,
            projectId: res.data.parentProject.projectId,
            commissioningDate: res.data.parentProject.commissioningDate,
            approvalDate: res.data.parentProject.approvalDate,
            closureDate: res.data.parentProject.closureDate,
          }
          this.getYears((this.climateFinanceMonitoringData.closureDate || res.data.parentProject.closureDate || res.data.parentProject.parentProject.closureDate));
          this.monitoringYearCtrl.patchValue(res.data.monitoringYear);
          this.remarksCtrl.patchValue(res.data.remarks);

          this.appService.getNDC({_id : res.data.parentProject._id}).subscribe((response: any) => {
            if (response.statusCode == 200 && response.data) {
              this.climateFinanceMonitoringData.commissioningDate = response.data.parentProject.commissioningDate;
              this.climateFinanceMonitoringData.approvalDate = response.data.parentProject.approvalDate;
              this.climateFinanceMonitoringData.closureDate = response.data.parentProject.closureDate;
            }
          },err=>{

          });

          this.formGroup.controls['projectId'].setValue(res.data.parentProject);
          this.remarksCtrl.setValue(res.data.remarks);

          this.disbursementYearDataList = res.data.disbursementDetail;

          this.disbursementYearDataSource.data = this.disbursementYearDataList;
        } else {
          this.openSnackBar('No Data Found', 'error');
        }
      }, err => {
        this.openSnackBar('Something went erong... try again later', 'error');
      });
    }
  }
  onProjectSelect(year){
    this.disbursementYearDataList = [];
    let project = this.formGroup.controls['projectId'].value;
    let obj = {
      'parentProject' : project._id,
      'entity' : this.menu.entity
    };
    if(year) {
      obj["monitoringYear"] = year;
    }
    this.appService.getNDC(obj).subscribe((response) => {
      console.log(response);
      if (!response.data) {
        this.setData(project, true);
      } else {
        this.setData(response.data, true);
      }
    },
      (error) => {
        console.error("Error in fetching existing record ", error);
      }
    );
  }
  onYearSelect() {
    this.onProjectSelect(this.monitoringYearCtrl.value);
  }
  setData(proj, setYears){
    this.climateFinanceMonitoringData = {};
    let finance_input_data = (proj.parentProject.parentProject && proj.parentProject.parentProject !== null && proj.parentProject.parentProject !== '') ? proj.parentProject : proj
    let obj = {
      '_id' : (proj.parentProject.parentProject && proj.parentProject.parentProject !== null && proj.parentProject.parentProject !== '') ? proj.parentProject.parentProject : proj.parentProject._id
    };
    this.appService.getNDC(obj).subscribe((response) => {
      if (response.data) {
        this.climateFinanceMonitoringData = {
          // monitoringYear: proj.monitoringYear || this.monitoringYearCtrl.value,
          financialYear: finance_input_data.financialYear,
          appliedExchange: finance_input_data.appliedExchange,
          financingMode: finance_input_data.financingMode,
          budgetCode: finance_input_data.budgetCode,
          projectId: proj.projectId,
          commissioningDate: response.data.commissioningDate,
          approvalDate: response.data.approvalDate,
          closureDate: response.data.closureDate,
          cause:response.data.cause,
          division:finance_input_data.parentProject.division
        }
        this.monitoringYearCtrl.patchValue(proj.monitoringYear || this.monitoringYearCtrl.value);
        if(this.approvalScreen){
          this.remarksCtrl.patchValue(proj.remarks || this.remarksCtrl.value);
        }
        if(proj.disbursementDetail.length) {
          this.disbursementYearDataSource = new MatTableDataSource(proj.disbursementDetail);
        } else {
          this.disbursementYearDataSource = new MatTableDataSource([]);
        }
        if(setYears) {
          this.getYears((this.climateFinanceMonitoringData.closureDate || proj.parentProject.closureDate));
        }
      }
    },
    (error) => {
      console.error("Error in fetching existing record ", error);
    }
    );
  }
  ngOnInit() {
    this.projectList = [];
    this.yearList = [];
    this.getPermissionMenuId();
    // this.getYears();

    this.disbursementYearDataList = [];

    this.disbursementYearDisplayedColumns = this.disbursementYearColumnNames.map(x => x.id);

    if (!this.approvalScreen) {
      this.disbursementYearDisplayedColumns.unshift('select');
    }

    this.disbursementYearDataSource = new MatTableDataSource(this.disbursementYearDataList);
    this.disbursementYearDataSource.paginator = this.paginator;

  }
  getPermissionMenuId(){
    this._activatedRoute.data.subscribe(data=> {
      this.appService.getRecord(data.menuId).subscribe((res: any)=>{
        if(res.data){
          //getting the menu object
          this.menu = res.data as MenuModel;
          this.menu.moduleName = data.moduleName;
          this.getProjectList();
        }
      }, err=>{
        console.error("getPermissionMenuId  ",err);
      })
    })
  }
  // getYears() {
  //   this.appService.getInventoryYears().subscribe((res: any) => {
  //     if (res.statusCode == 200) {
  //       this.yearList = res.data;
  //     }
  //   }, err => {
  //   })
  // }
  getYears(commissioningDate: Date) {
    this.yearList = [];
    let effDate = new Date(commissioningDate).getFullYear();
    for (let i = effDate; i <= effDate + MRV_MONITORING_YEAR_COUNT; i++) {
      this.yearList.push(i);
    }
  }

  getProjectList() {
    let obj = {
      status: 'approved',
      module: this.menu.moduleName
    }
    this.appService.getProjectIds(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        console.log(res);
        this.projectList = res.data;
      }
    }, err => {
    });
  }

  isInvalid(form, field, errorValue) {
    if (errorValue == 'required' || 'ValidateDate') {
      return (
        form.get(field).invalid &&
        (form.get(field).touched || form.get(field).dirty) &&
        form.get(field).hasError(errorValue)
      );
    } else if (errorValue == 'pattern') {
      return (
        form.get(field).invalid &&
        form.get(field).dirty &&
        !form.get(field).hasError('required') &&
        form.get(field).errors.pattern
      );
    } else if (errorValue == 'email') {
      return (
        form.get(field).invalid &&
        form.get(field).dirty &&
        !form.get(field).hasError('required') &&
        form.get(field).hasError('email')
      );
    }
  }

  setDataSourceAttributes() {
    this.disbursementYearDataSource.paginator = this.paginator;
    this.disbursementYearDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.disbursementYearDataSource.paginator = this.paginator;
  }

  isAllSelectedDisbursementYear() {
    const numSelected = this.disbursementYearSelection.selected.length;
    const numRows = this.disbursementYearDataSource.data.length;
    return numSelected === numRows;
  }

  masterToggleDisbursementYear() {
    this.isAllSelectedDisbursementYear() ?
      this.disbursementYearSelection.clear() :
      this.disbursementYearDataSource.data.forEach(row => this.disbursementYearSelection.select(row));
  }

  checkboxLabelDisbursementYear(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedDisbursementYear() ? 'select' : 'deselect'} all`;
    }
    return `${this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNewDisbursementYearRow() {
    this.disbursementYearDataList.push({
      disbursementCategory: '', amountQ1: 0, amountQ2: 0, amountQ3: 0, amountQ4: 0, reference: ''
    });
    this.disbursementYearDataSource.data = this.disbursementYearDataList;
  }

  removeDisbursementYearSelected() {
    const y = new Set(this.disbursementYearSelection.selected);
    this.disbursementYearDataList = this.disbursementYearDataList.filter(x => !y.has(x));
    this.disbursementYearDataSource.data = this.disbursementYearDataList;
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
  /* checkMandatoryFields(): boolean {
    var error: boolean = false;
    let project = this.formGroup.controls['projectId'].value;
    let year = this.climateFinanceMonitoringData.monitoringYear;
    let disbursementDetail = this.disbursementYearDataList;
    var unacceptedValues: any = ['', null, undefined];

    if (unacceptedValues.indexOf(project) > -1 || unacceptedValues.indexOf(year) > -1 || disbursementDetail.length < 0) {
      error = true;
    }
    if (error) {
      return false;
    }
    else {
      return true;
    }
  } */
  save() {
    if(this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    let project = this.formGroup.controls['projectId'].value
    var obj = {
      menuId: this.menu.menuId,
      parentProject: project._id,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      projectCode: project.projectCode,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      monitoringYear: this.monitoringYearCtrl.value,
      budgetCode: this.climateFinanceMonitoringData.budgetCode,
      remarks: this.remarksCtrl.value,
      cause:this.climateFinanceMonitoringData.cause,
      disbursementDetail:this.disbursementYearDataList,
      division:this.climateFinanceMonitoringData.division
    }
    this.appService.saveNDC(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.openSnackBar(res.message, 'success');
        this.resetForm();
      }
    }, err => {
      this.openSnackBar(err.message, 'error');
    });

  }
  resetForm() {
    this.formGroup.reset();
    this.disbursementYearDataList = [];
  }

  updateDataStaus(status) {
    let obj = {
      status: status,
      _id: this.routeRecordId,
      approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
      approverComment: this.approverCommentCtrl.value
    }

    this.appService.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode == 200) {
        this.openSnackBar(res.message, 'success');
        this.router.navigate(['./my-approvals']);
      }
      else {
        this.openSnackBar(res.message, 'error');
      }
    }, err => {
      this.openSnackBar(err.message, 'error');
    })
  }

  notChoosen(item){
    this.disbursementYearDataList.forEach(element => {
      if(element.disbursementCategory === item){
        return false;
      }
    });
    return true;
  }

}