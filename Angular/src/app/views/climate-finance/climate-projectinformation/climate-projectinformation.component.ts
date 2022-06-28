import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { MRV_MONITORING_YEAR_COUNT } from '../../../app.constants';
import { AppService } from '../../../app.service';
import { ElectricityGenerationComponent } from '../../electricity-generation/electricity-generation.component';
import { ElectricityGenerationService } from '../../electricity-generation/electricity-generation.service';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { MenuModel } from '../../model/common/menu-model';

@Component({
  selector: 'app-climate-projectinformation',
  templateUrl: './climate-projectinformation.component.html',
  styleUrls: ['./climate-projectinformation.component.scss']
})
export class ClimateProjectinformationComponent implements OnInit {

  climateFinanceData: any = {
    commissioningDate: null,
    approvalDate: null,
    closureDate: null,
    targetGhg: [],
    contributions: [],
    financialYear: null,
    appliedExchange: 0,
    financingMode: null,
    budgetCode: null,
    projectSize: null,
    projectCost: 0,
    nationalBudget: 0,
    subNationalBudget: 0,
    greenBonds: "0",
    others: 0,
    sourceOfFinance: [],
    detailBudget: [],
    disbursementSchedule: [],
    entity: "FINANCE INPUT",
    projectId: null,
    performanceIndicatorMI: [],
  }
  menu:MenuModel;
  formGroup: FormGroup;
  projectList: any;
  yearList: any;

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  // Table related declarations

  sourceOfFinanceDisplayedColumns = [];
  detailedBudgetDisplayedColumns = [];
  disbursementYearDisplayedColumns = [];

  sourceOfFinanceDataSource = new MatTableDataSource(this.climateFinanceData.sourceOfFinance);
  detailedBudgetDataSource = new MatTableDataSource(this.climateFinanceData.detailBudget);
  disbursementYearDataSource = new MatTableDataSource(this.climateFinanceData.disbursementSchedule);
  public sourceOfFinanceSelection = new SelectionModel<any>(true, []);
  public detailedBudgetSelection = new SelectionModel<any>(true, []);
  public disbursementYearSelection = new SelectionModel<any>(true, []);

  sourceOfFinanceColumnNames = [
    { id: 'fundingType', value: 'FINANCIAL INSTRUMENT' },
    { id: 'nationalInternational', value: 'National/International' },
    { id: 'amount', value: 'Amount (USD)' },
    { id: 'channel', value: 'CHANNEL' },
    { id: 'fundingAgency', value: 'FUNDING AGENCY/FINANCE PROVIDER' }
  ];

  detailedBudgetColumnNames = [
    { id: 'category', value: 'Disbursement Category' },
    { id: 'amount', value: 'Amount (USD)' },
    { id: 'reference', value: 'Reference' }
  ];

  disbursementYearColumnNames = [
    { id: 'year', value: 'Disbursement Year' },
    { id: 'amount', value: 'Amount (USD)' },
    { id: 'reference', value: 'Reference' }
  ];


  // private paginator: MatPaginator;
  // private sort: MatSort;

  // @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
  //   this.sort = ms;
  //   this.setDataSourceAttributes();
  // }

  // @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
  //   this.paginator = mp;
  //   this.setDataSourceAttributes();
  // }
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();

  remarksCtrl = new FormControl("",[Validators.required]);
  financialYearCtrl = new FormControl("",[Validators.required]);
  approverCommentCtrl = new FormControl("",[Validators.required]);
  appliedExchangeCtrl = new FormControl("",[Validators.required]);
  financingModeCtrl = new FormControl("",[Validators.required]);
  projectSizeCtrl = new FormControl("",[Validators.required]);
  nationalBudgetCtrl = new FormControl("",[Validators.required]);
  subNationalBudgetCtrl = new FormControl("",[Validators.required]);

  constructor(private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    public dialog :MatDialog,
    private readonly appService: AppService) {

    this.climateFinanceData.sourceOfFinance = [];
    this.climateFinanceData.detailBudget = [];
    this.climateFinanceData.disbursementSchedule = [];

    this.sourceOfFinanceDataSource.data = this.climateFinanceData.sourceOfFinance;
    this.detailedBudgetDataSource.data = this.climateFinanceData.detailBudget;
    this.disbursementYearDataSource.data = this.climateFinanceData.disbursementSchedule;

    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }

    this.formGroup = this._fb.group({
      projectId: [null, [Validators.required]],
      financialYear: this.financialYearCtrl,
      appliedExchange: this.appliedExchangeCtrl,
      financingMode: this.financingModeCtrl,
      projectSize: this.projectSizeCtrl,
      nationalBudget: this.nationalBudgetCtrl,
      subNationalBudget: this.subNationalBudgetCtrl,
      remarks: this.remarksCtrl,

    });
  }

  loadActivityData(loadType, value) {
    var obj = {
      [loadType]: value
    }
    if (obj) {
      this.appService.getNDC(obj).subscribe((res: any) => {
        if (res.statusCode == 200 && res.data) {
          this.formGroup.controls['projectId'].setValue(res.data.parentProject);
          this.setData(res.data, false);
        } else {
          this.openSnackBar('No Data Found', 'error');
        }
      }, err => {
        this.openSnackBar('Something went erong... try again later', 'error');
      });
    }
  }
  onProjectSelect(){
    let project = this.formGroup.controls['projectId'].value;
    let obj = {
      'parentProject' : project._id,
      'entity' : this.menu.entity
    };
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
  setData(proj, setYears){
    let ndc_data = (proj.parentProject) ? proj.parentProject : proj;
    this.climateFinanceData = {
      financialYear: proj.financialYear,
      appliedExchange:proj.appliedExchange,
      financingMode: proj.financingMode,
      budgetCode: proj.budgetCode,
      commissioningDate: ndc_data.commissioningDate,
      approvalDate: ndc_data.approvalDate,
      closureDate: ndc_data.closureDate,
      projectSize: proj.projectSize,
      projectCost: ndc_data.costAmount,
      projectId: proj.projectId,
      nationalBudget: proj.nationalBudget ? proj.nationalBudget.toString(): '0',
      subNationalBudget: proj.subNationalBudget ? proj.subNationalBudget.toString(): '0',
      greenBonds: proj.greenBonds ? proj.greenBonds.toString():  '0', 
      sourceOfFinance:proj.sourceOfFinance,
      detailBudget:proj.detailBudget,
      disbursementSchedule: proj.disbursementSchedule
    }
    if(setYears) {
      this.getYears((this.climateFinanceData.closureDate || proj.parentProject.closureDate));
    }
    this.calculateOthers('all', false);
    this.remarksCtrl.setValue(proj.remarks);
    this.sourceOfFinanceDataSource.data = this.climateFinanceData.sourceOfFinance;
    this.detailedBudgetDataSource.data = this.climateFinanceData.detailBudget;
    this.disbursementYearDataSource.data = this.climateFinanceData.disbursementSchedule;
  }

  ngOnInit() {
    this.projectList = [];
    this.yearList = [];
    // this.getYears();
    this.getPermissionMenuId();
    this.sourceOfFinanceDisplayedColumns = this.sourceOfFinanceColumnNames.map(x => x.id);
    this.detailedBudgetDisplayedColumns = this.detailedBudgetColumnNames.map(x => x.id);
    this.disbursementYearDisplayedColumns = this.disbursementYearColumnNames.map(x => x.id);

    if (!this.approvalScreen) {
      this.sourceOfFinanceDisplayedColumns.unshift('select');
      this.detailedBudgetDisplayedColumns.unshift('select');
      this.disbursementYearDisplayedColumns.unshift('select');
    }

    this.sourceOfFinanceDataSource = new MatTableDataSource(this.climateFinanceData.sourceOfFinance);
    this.sourceOfFinanceDataSource.paginator = this.paginator.toArray()[0];

    this.detailedBudgetDataSource = new MatTableDataSource(this.climateFinanceData.detailBudget);
    this.detailedBudgetDataSource.paginator = this.paginator.toArray()[1];

    this.disbursementYearDataSource = new MatTableDataSource(this.climateFinanceData.disbursementSchedule);
    this.disbursementYearDataSource.paginator = this.paginator.toArray()[2];

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
  calculateOthers(field, element){
    let sourceAmount = 0;
    for(let item of this.climateFinanceData.sourceOfFinance){
      sourceAmount += item.amount;
    }
    let expend = (sourceAmount + parseFloat(this.climateFinanceData.nationalBudget) + parseFloat(this.climateFinanceData.subNationalBudget) + parseFloat(this.climateFinanceData.greenBonds));
    if(expend > this.climateFinanceData.projectCost){
      if(!element){
        this.climateFinanceData[field] = 0;
      }
      else{
        element[field] = 0;
      }
      alert('The amount should not be more than Other USD amount');

    }
    else {
      this.climateFinanceData.others = parseFloat(this.climateFinanceData.projectCost) - expend;
    }
  }
  calculateBudget(element){
    let budgetAmount = 0;
    for(let item of this.climateFinanceData.detailBudget){
      budgetAmount += item.amount;
    }
    if(budgetAmount > this.climateFinanceData.projectCost){
      element['amount'] = 0;
      alert('The amount should not be more than Project Cost');
    }
  }
  checkCategrySelection(element){
    console.log(element);
    console.log(this.climateFinanceData.detailBudget);
  }
  /*
  *getDisabled : used to disabled option which was selected 
  */
  getDisabled(value,option){
    let isAvailable = false;

    if(option === 'budget'){
      for(let obj of this.climateFinanceData.detailBudget){
        if(obj.category === value){
          isAvailable = true;
        }
      }
    }
    else if(option === 'year'){
      for(let obj of this.climateFinanceData.disbursementSchedule){
        if(obj.year === value){
          isAvailable = true;
        }
      }
    }
    return isAvailable;
    // console.log(this.climateFinanceData.detailBudget);
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
    this.sourceOfFinanceDataSource.paginator = this.paginator.toArray()[0];
    this.sourceOfFinanceDataSource.sort = this.sort.toArray()[0];
    this.detailedBudgetDataSource.paginator = this.paginator.toArray()[1];
    this.detailedBudgetDataSource.sort = this.sort.toArray()[1];
    this.disbursementYearDataSource.paginator = this.paginator.toArray()[2];
    this.disbursementYearDataSource.sort = this.sort.toArray()[2];
    
    // this.sourceOfFinanceDataSource.paginator = this.paginator;
    // this.sourceOfFinanceDataSource.sort = this.sort;

    // this.detailedBudgetDataSource.paginator = this.paginator;
    // this.detailedBudgetDataSource.sort = this.sort;

    // this.disbursementYearDataSource.paginator = this.paginator;
    // this.disbursementYearDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.paginator.changes.subscribe((r) => {
      this.setDataSourceAttributes();
    });
    // this.detailedBudgetDataSource.paginator = this.paginator;
    // this.detailedBudgetDataSource.paginator = this.paginator;
    // this.disbursementYearDataSource.paginator = this.paginator;
  }


  isAllSelectedSourceFinance() {
    const numSelected = this.sourceOfFinanceSelection.selected.length;
    const numRows = this.sourceOfFinanceDataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelectedDetailedBudget() {
    const numSelected = this.detailedBudgetSelection.selected.length;
    const numRows = this.detailedBudgetDataSource.data.length;
    return numSelected === numRows;
  }

  isAllSelectedDisbursementYear() {
    const numSelected = this.disbursementYearSelection.selected.length;
    const numRows = this.disbursementYearDataSource.data.length;
    return numSelected === numRows;
  }


  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleSourceFinance() {
    this.isAllSelectedSourceFinance() ?
      this.sourceOfFinanceSelection.clear() :
      this.sourceOfFinanceDataSource.data.forEach(row => this.sourceOfFinanceSelection.select(row));
  }

  masterToggleDetailedBudget() {
    this.isAllSelectedDetailedBudget() ?
      this.detailedBudgetSelection.clear() :
      this.detailedBudgetDataSource.data.forEach(row => this.detailedBudgetSelection.select(row));
  }

  masterToggleDisbursementYear() {
    this.isAllSelectedDisbursementYear() ?
      this.disbursementYearSelection.clear() :
      this.disbursementYearDataSource.data.forEach(row => this.disbursementYearSelection.select(row));
  }


  /** The label for the checkbox on the passed row */
  checkboxLabelSourceFinance(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedSourceFinance() ? 'select' : 'deselect'} all`;
    }
    return `${this.sourceOfFinanceSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelDetailedBudget(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedDetailedBudget() ? 'select' : 'deselect'} all`;
    }
    return `${this.detailedBudgetSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelDisbursementYear(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedDisbursementYear() ? 'select' : 'deselect'} all`;
    }
    return `${this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }


  addNewSourceOfFinanceRow() {
    this.climateFinanceData.sourceOfFinance.push({
      fundingType: '', nationalInternational: '', amount: 0, channel: '', fundingAgency: ''
    });
    this.sourceOfFinanceDataSource.data = this.climateFinanceData.sourceOfFinance;
  }

  addNewDetailedBudgetRow() {
    this.climateFinanceData.detailBudget.push({
      category: '', amount: 0, reference: ''
    });
    this.detailedBudgetDataSource.data = this.climateFinanceData.detailBudget;
  }

  addNewDisbursementYearRow() {
    this.climateFinanceData.disbursementSchedule.push({
      year: '', amount: 0, reference: ''
    });
    this.disbursementYearDataSource.data = this.climateFinanceData.disbursementSchedule;
  }

  removeSourceSelected() {
    const y = new Set(this.sourceOfFinanceSelection.selected);
    this.climateFinanceData.sourceOfFinance = this.climateFinanceData.sourceOfFinance.filter(x => !y.has(x));
    this.sourceOfFinanceDataSource.data = this.climateFinanceData.sourceOfFinance;
  }

  removeDetailedBudgetSelected() {
    const y = new Set(this.detailedBudgetSelection.selected);
    this.climateFinanceData.detailBudget = this.climateFinanceData.detailBudget.filter(x => !y.has(x));
    this.detailedBudgetDataSource.data = this.climateFinanceData.detailBudget;
  }

  removeDisbursementYearSelected() {
    const y = new Set(this.disbursementYearSelection.selected);
    this.climateFinanceData.disbursementSchedule = this.climateFinanceData.disbursementSchedule.filter(x => !y.has(x));
    this.disbursementYearDataSource.data = this.climateFinanceData.disbursementSchedule;
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
  checkMandatoryFields(): string {
    let error: string = null;
    let mandatoryFields: any = ['financialYear', 'appliedExchange', 'financingMode',
      'budgetCode', 'projectSize', 'nationalBudget', 'subNationalBudget',  'sourceOfFinance','detailBudget','disbursementSchedule'];
    let unacceptedValues: any = ['', null, undefined];
    if(this.formGroup.controls['projectId'].value === null || this.formGroup.controls['projectId'].value === ''){
      // error = "Invalid Project Id"; // will be handled from form
    }
    mandatoryFields.forEach(x => {
      if (unacceptedValues.indexOf(this.climateFinanceData[x]) > -1 || this.climateFinanceData[x].length === 0) {
        // error = `${x} is invalid`; // will be handled from form
      }
    })
    if(!this.climateFinanceData.sourceOfFinance.length || this.climateFinanceData.sourceOfFinance.fundingType === '' || this.climateFinanceData.sourceOfFinance.nationalInternational === '' || this.climateFinanceData.sourceOfFinance.channel === '' || this.climateFinanceData.sourceOfFinance.fundingAgency === '' || this.climateFinanceData.sourceOfFinance.amount === ''){
      error = "Source Of Finance is invalid";
    }
    if(!this.climateFinanceData.detailBudget.length || this.climateFinanceData.detailBudget.category === '' || this.climateFinanceData.detailBudget.amount === '' ){
      error = "Detail Budget is invalid";
    }
    if(!this.climateFinanceData.disbursementSchedule.length || this.climateFinanceData.disbursementSchedule.year === '' || this.climateFinanceData.disbursementSchedule.amount === '' ){
      error = "Disbursement Schedule is invalid";
    }
    return error;
  }
  save() {
    console.log("formGroup  ",this.formGroup);
    let error = this.checkMandatoryFields();
    if(this.formGroup.status == "INVALID" || error) {// Note: Project Cost Breakdown,Sources of Finance, Disbursement Schedule yet to be validated as in checkMandatoryFields
      this.formGroup.markAllAsTouched();
      
      this.openSnackBar(this.formGroup.status == "INVALID" ?  'Please fill all the mandatory fields with * mark' : error, 'error');
      return;
    }
    let project = this.formGroup.controls['projectId'].value
    const obj = {
      menuId:this.menu.menuId,
      parentProject: project._id,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      projectCode: project.projectCode,
      projectId: project.projectId,
      projectTitle: project.projectTitle,
      financialYear: this.climateFinanceData.financialYear,
      appliedExchange: this.climateFinanceData.appliedExchange,
      financingMode: this.climateFinanceData.financingMode,
      budgetCode: this.climateFinanceData.budgetCode,
      projectSize: this.climateFinanceData.projectSize,
      nationalBudget: this.climateFinanceData.nationalBudget,
      subNationalBudget: this.climateFinanceData.subNationalBudget,
      greenBonds: this.climateFinanceData.greenBonds,
      others: this.climateFinanceData.others,
      costAmount:this.climateFinanceData.projectCost,
      sourceOfFinance: this.climateFinanceData.sourceOfFinance,
      detailBudget: this.climateFinanceData.detailBudget,
      disbursementSchedule: this.climateFinanceData.disbursementSchedule,
      remarks: this.remarksCtrl.value,
    }
    this.appService.saveNDC(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.openSnackBar(res.message, 'success');
        this.formGroup.controls['projectId'].reset();
      }
    }, err => {
      this.openSnackBar(err.message, 'error');
    });

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


}