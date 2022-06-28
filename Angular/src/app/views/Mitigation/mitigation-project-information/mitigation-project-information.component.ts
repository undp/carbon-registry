import { FileUploadModel } from './../../shared/file-upload/file-upload-model';
import { UtilityServiceService } from './../../../utility-service.service';
import { MenuModel } from './../../model/common/menu-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { ReferenceApproachComponent } from '../../reference-approach/reference-approach.component';
import { ReferenceApproachService } from '../../reference-approach/reference-approach.service';

@Component({
  selector: 'app-mitigation-project-information',
  templateUrl: './mitigation-project-information.component.html',
  styleUrls: ['./mitigation-project-information.component.scss']
})
export class MitigationProjectInformationComponent implements OnInit {
  menu:MenuModel;
  projects:any[] = [];
  miForm: FormGroup;
  selectedProject:any;
  //table related declarations
  true: boolean = true;
  public performanceIndicatorDataList:  any = [];
  public newlyAddedList;
  public permissionMenuId: string = "";

 
  performanceIndicatorDisplayedColumns = [];

  performanceIndicatorDataSource = new MatTableDataSource(this.performanceIndicatorDataList);

  public disbursementYearSelection = new SelectionModel<any>(true, []);

  disbursementYearColumnNames = [
    { id: "indicator", value: "Indicator"},
    { id: "unit", value: "Unit" },
    { id: "value", value: "Value" },
    { id: "reference", value: "Reference" }
  ];


  formGroup: FormGroup;
  yearList: any;
  indicators: any;
  valuesByType: any;

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

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
    private readonly _ras: ReferenceApproachService,
    private readonly _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private utilityService: UtilityServiceService,
    private router: Router,
    private appService: AppService) {

    this.performanceIndicatorDataList = [];
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;

    this.approvalScreen = false;

    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId){
      this.approvalScreen = true;
    }
    this.miForm = this._fb.group({
      _id: [""],
      menuId:[''],
      parentProject:['',[Validators.required]],
      projectCode:[''],
      projectTitle:[''],
      projectId:[''],
      sector:[''],
      subSector:[''],
      ndc:[''],
      location:[''],
      costAmount:[0],
      funding:[0],
      lifetime:[0],
      agency:[''],
      agencyContact:[''],
      otherParty:[''],
      otherPartyContact:[''],
      ghgReduction:['',[Validators.required]],
      targetGhg:['',[Validators.required]],
      contributions:['',[Validators.required]],
      projectStatus:['',[Validators.required]],
      beneficiary:['',[Validators.required]],
      genderIncl:['',[Validators.required]],
      projectOutput:['',[Validators.required]],
      projectImpact:['',[Validators.required]],
      marketMech:['',[Validators.required]],
      weblink:[''],
      carbonBen:[''],
      verification:['',[Validators.required]],
      commissioningDate:[''],
      approvalDate:[''],
      closureDate:[''],
      

      fileCalculation:[''],
      performanceIndicatorMI:[[]],
      // common
      remarks:this.remarksCtrl,
      approverComment:[''],
      updatedBy:[''],
    })
    
    if(this.approvalScreen) {
      // populate data from formId
      this.appService.getNDC({_id:this.routeFormId})
      .subscribe(response=>{
        this.populateForm(this.miForm,response.data);
        this.getPermissionMenuId();// load route related data
      },err=> {
        this.utilityService.openSnackBar(err,"error");
      })
    } else {
      this.getPermissionMenuId();// load route related data
    }
  }
  fileUploaded(fileUploadModel:FileUploadModel) {
    console.log("File path received ",fileUploadModel);
    this.miForm.controls[fileUploadModel.fieldName].patchValue(fileUploadModel.filePath);
  }
  onProjectSelect(){
    console.log("on select",this.selectedProject);
    this.appService.getNDC(
      {entity: this.menu.entity,parentProject:this.selectedProject._id}
    ).subscribe(response=> {
      // fill form with existing data
      // if no existing data found then populate data from selected project
      if(!response.data) {
        this.populateForm(this.miForm,this.selectedProject,"parentProject");
      } else {
        this.populateForm(this.miForm,response.data);
        
      }
    },error=> {
      console.error("Error in fetching existing record ",error);
      
    });
  }
  populateForm(form: FormGroup, data: any,...skipControls) {
    let keys = Object.keys(data);
    let pathValueObj = {};
    keys.forEach(key=> {
      if(skipControls && skipControls.indexOf(key) != -1) {
        // skip patching
      }  else {
        if(key == "parentProject") {
          // check from project list
          for(var i in this.projects) {
            if(this.projects[i]._id == data[key]._id) {
              pathValueObj[key] = this.projects[i];
              break;
            }
          }
          
        } else {
          pathValueObj[key] = data[key];
        }
      }
    })
    form.patchValue(pathValueObj);
    if(this.approvalScreen) {
      this.miForm.controls.parentProject.patchValue(data.parentProject.projectId);
    }
    this.performanceIndicatorDataList = data.performanceIndicatorMI;
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
    // this.remarksCtrl.patchValue(data.remarks);
  }
  getPermissionMenuId(){
    this._activatedRoute.data.subscribe(data=> {
      this.appService.getRecord(data.menuId).subscribe((res: any)=>{
        if(res.data){
          //getting the menu object
          this.menu = res.data as MenuModel;
          this.menu.moduleName = data.moduleName;
          this.appService.projectByModule(this.menu.moduleName)
          .subscribe(response=>{
            this.projects = response.data;
            if(this.approvalScreen) {
              this.projects.forEach(project => {
                  if(project._id == this.miForm.controls.parentProject.value._id) {
                    this.selectedProject  = project;
                  }
                  
              });
            }
          });
        }
      }, err=>{
        console.error("getPermissionMenuId  ",err);
      })
    })
  }

  ngOnInit() {
    this.yearList = [];
    this.indicators = [];
    this.valuesByType = [];
    this.getYears();

    this.performanceIndicatorDataList = [];

    this.performanceIndicatorDisplayedColumns = this.disbursementYearColumnNames.map(x => x.id);

    if (!this.approvalScreen) {
      this.performanceIndicatorDisplayedColumns.push('actions');
      this.performanceIndicatorDisplayedColumns.unshift('select');
    }

    this.performanceIndicatorDataSource = new MatTableDataSource(this.performanceIndicatorDataList);
    this.performanceIndicatorDataSource.paginator = this.paginator;


  }

  setDataSourceAttributes() {
    this.performanceIndicatorDataSource.paginator = this.paginator;
    this.performanceIndicatorDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.performanceIndicatorDataSource.paginator = this.paginator
  }

  getYears() {
    this._ras.getInventoryYears().subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    })
  }



  isInvalid(form, field, errorValue) {
    if (errorValue == 'required' || 'ValidateDate') {
      return form.get(field).invalid && (form.get(field).touched || form.get(field).dirty) && form.get(field).hasError(errorValue);
    }
    else if (errorValue == 'pattern') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).errors.pattern;
    }
    else if (errorValue == 'email') {
      return form.get(field).invalid && form.get(field).dirty && !form.get(field).hasError('required') && form.get(field).hasError('email')
    }
  }

  isAllSelectedDisbursementYear() {
    const numSelected = this.disbursementYearSelection.selected.length;
    const numRows = this.performanceIndicatorDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleDisbursementYear() {
    this.isAllSelectedDisbursementYear() ?
      this.disbursementYearSelection.clear() :
      this.performanceIndicatorDataSource.data.forEach(row => this.disbursementYearSelection.select(row));
  }

  checkboxLabelDisbursementYear(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedDisbursementYear() ? 'select' : 'deselect'} all`;
    }
    return `${this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNewDisbursementYearRow() {
    this.performanceIndicatorDataList.push({
      indicator: '', value: 0, unit: '', reference: ''
    });
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
  }

  removeDisbursementYearSelected() {
    const y = new Set(this.disbursementYearSelection.selected);
    this.performanceIndicatorDataList = this.performanceIndicatorDataList.filter(x => !y.has(x));
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
  }
  checkMandatoryFields(): boolean {
    var error: boolean = false;
    var mandatoryFields: any = ['parentProject', 'ghgReduction', 'targetGhg', 'contributions',
      'projectStatus', 'beneficiary', 'genderIncl', 'projectOutput', 'projectImpact', 'marketMech'];
      var unacceptedValues: any = ['', null, undefined];

    mandatoryFields.forEach(x => {
      if (unacceptedValues.indexOf(this.miForm.controls[x].value) > -1 || this.miForm.controls[x].value.length === 0) {
        error = true;
      }
    })
    if (error) {
      return false;
    }
    else {
      return true;
    }
  }
  submit() {
    if(this.miForm.status == "INVALID" ) {
      this.miForm.markAllAsTouched();
     
      // this.applyTouchOnFromControl();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    this.miForm.controls.menuId.patchValue(this.menu.menuId);
      this.miForm.controls.parentProject.patchValue(this.selectedProject);
      this.miForm.controls.projectCode.patchValue(this.selectedProject.projectCode);
      this.miForm.controls.projectId.patchValue(this.selectedProject.projectId);
      this.miForm.controls.projectTitle.patchValue(this.selectedProject.projectTitle);
      this.miForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
      // this.miForm.controls.remarks.patchValue(this.remarksCtrl.value);
      console.log(JSON.stringify(this.miForm.value));
      this.appService.saveNDC(this.miForm.value)
      .subscribe(response=> {
        if(response.statusCode == 200) {
          this.utilityService.openSnackBar(response.message, 'success');
        }
      },err=> {
        this.utilityService.openSnackBar(this.utilityService.processErrorMessage(err.error), 'error');
      })
  }

  removeIndividuallyFromList(ele){
      this.performanceIndicatorDataList.splice(ele, 1);
      this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
    
  }

  removeSelected(){
      let y = new Set(this.disbursementYearSelection.selected);
      this.performanceIndicatorDataList = this.performanceIndicatorDataList.filter( x => !y.has(x) );
      this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass : 'snackbar-global',
      horizontalPosition : 'center',
      verticalPosition : 'top',
      data: {
        message: message,
        type:type
      }
    });
  }

  updateDataStatus(status){
    let obj = {
        status : status,
       _id : this.routeRecordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment: this.approverCommentCtrl.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        this.miForm.reset();
        this.utilityService.openSnackBar(res.message, 'success');
        this.router.navigate(['./my-approvals']);
      }
      else{
        this.utilityService.openSnackBar(res.message, 'error');
      }
    }, err=>{
      this.utilityService.openSnackBar(err.message, 'error');
    })
  }

}
