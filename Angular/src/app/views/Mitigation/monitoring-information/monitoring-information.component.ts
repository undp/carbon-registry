import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { MenuModel } from '../../model/common/menu-model';
import { ReferenceApproachComponent } from '../../reference-approach/reference-approach.component';
import { ReferenceApproachService } from '../../reference-approach/reference-approach.service';
import { FileUploadModel } from '../../shared/file-upload/file-upload-model';
import {MRV_MONITORING_YEAR_COUNT } from './../../../app.constants';
@Component({
  selector: 'app-monitoring-information',
  templateUrl: './monitoring-information.component.html',
  styleUrls: ['./monitoring-information.component.scss']
})
export class MonitoringInformationComponent implements OnInit {
  // static Constants = {
  //   MENU_ID : "GHG_Energy_Reference_Approach"
  // };
  picker3:any;
  selectedProject:any;
  menu:MenuModel = {menuId: "Mitigation_Actions_MonitoringInformation"} as MenuModel;
  mitigationMonitoringData: any = {
    sector: null,
    subSector: null,
    ndc: null,
    location: null,
    agency: null,
    agencyContact: null,
    otherParty: null,
    otherPartyContact: null,
    costAmount: null,
    funding: null,
    commissioningDate: null,
    approvalDate: null,
    closureDate: null,
    lifetime: null,
    targetGhg: null,
    contributions: null,
    projectStatus: null,
    beneficiary: null,
    genderIncl: null,
    projectOutput: null,
    projectImpact: null,
    actualGHGSavings: null,
    fileCalculation: null,
    marketMech: null,
    weblink: null,
    carbonBen: null,
    verification: null,
    fileVerification: null,
    performanceIndicatorMI: []
  }

  formGroup: FormGroup;
  projectList: any;
  yearList: any;

  performanceIndicatorDataList: any = [];

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  performanceIndicatorDisplayedColumns = [];

  performanceIndicatorDataSource = new MatTableDataSource(this.performanceIndicatorDataList);

  // public disbursementYearSelection = new SelectionModel<any>(true, []);

  disbursementYearColumnNames = [
    { id: "indicator", value: "Indicator" },
    { id: "unit", value: "Unit" },
    { id: "value", value: "Value" },
    { id: "reference", value: "Reference" }
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
  actualGHGSavingsCtrl = new FormControl(0,[Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly router: Router,
    private readonly _activatedRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private appService: AppService) {
  }
  fileUploaded(fileUploadModel:FileUploadModel) {
    console.log("File path received ",fileUploadModel);
    this.formGroup.controls[fileUploadModel.fieldName].patchValue(fileUploadModel.filePath);
  }
  loadActivityData(loadType, value) {
    var obj = {
      [loadType]: value
    }
    if (obj) {
      this.appService.getNDC(obj).subscribe((res: any) => {
        if (res.statusCode == 200 && res.data) {
          res.data.parentProject.monitoringYear = res.data.monitoringYear;// explicitely setting to maintain same flow
          this.setData(res.data.parentProject,false);

          this.mitigationMonitoringData.actualGHGSavings = res.data.actualGHGSavings;
          this.mitigationMonitoringData.fileCalculation = res.data.fileCalculation;
          this.mitigationMonitoringData.fileVerification = res.data.fileVerification;
          this.mitigationMonitoringData.verification = res.data.verification;

          this.formGroup.controls['projectId'].patchValue(res.data.parentProject.projectId);
          this.formGroup.controls['monitoringYear'].patchValue(res.data.monitoringYear);
          this.remarksCtrl.patchValue(res.data.remarks);

        } else {
          this.openSnackBar('No Data Found', 'error');
        }
      }, err => {
        this.openSnackBar('Something went erong... try again later', 'error');
      });
    }
  }


  ngOnInit() {
    this.projectList = [];
    this.yearList = [];
    this.getProjectList();
    // this.getYears();
    this.performanceIndicatorDisplayedColumns = this.disbursementYearColumnNames.map(x => x.id);

    // if (!this.approvalScreen) {
    //   this.performanceIndicatorDisplayedColumns.unshift('select');
    // }

    this.formGroup = this._fb.group({
      monitoringYear: [null, [Validators.required]],
      projectId: [null, [Validators.required]],
      remarks:this.remarksCtrl,
      actualGHGSavings:this.actualGHGSavingsCtrl,

    });
    this.performanceIndicatorDataList = [];
    this.performanceIndicatorDataSource = new MatTableDataSource(this.performanceIndicatorDataList);
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
    this.performanceIndicatorDataSource.paginator = this.paginator;


    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }

  }

  /*
* getYears used populate monitoring years based on commissioningDate of parent project
* @param loadedProject exists populate year from loadedProject
*/
  getYears(commissioningDate: Date,loadedProject) {
      
    let effDate = new Date(commissioningDate).getFullYear();
    for (let i = effDate; i <= effDate + MRV_MONITORING_YEAR_COUNT; i++) {
      this.yearList.push(i);
    }
    if(loadedProject) {
      this.formGroup.controls["monitoringYear"].patchValue(loadedProject.monitoringYear);
    }

    
  }

  getProjectList() {
    let obj = {
      status: 'approved',
      module: 'MITIGATION_MONITORING'
    }
    this.appService.getProjectIds(obj).subscribe((res: any) => {
      if (res.statusCode == 200) {
        console.log(res);
        this.projectList = res.data;
      }
    }, err => {
    });
  }

  setData(project,setYears) {
    
    let mitigation_input_data = (project.parentProject.parentProject && project.parentProject.parentProject !== null && project.parentProject.parentProject !== '') ? project.parentProject : project
    let obj = {
      '_id' : (project.parentProject.parentProject && project.parentProject.parentProject !== null && project.parentProject.parentProject !== '') ? project.parentProject.parentProject : project.parentProject._id
    };
    this.appService.getNDC(obj).subscribe((response) => {
      if (response.data) {
        this.mitigationMonitoringData = {
          sector: mitigation_input_data.sector,
          subSector: mitigation_input_data.subSector,
          ndc: mitigation_input_data.ndc,
          location: mitigation_input_data.location,
          agency: mitigation_input_data.agency,
          agencyContact: mitigation_input_data.agencyContact,
          otherParty: mitigation_input_data.otherParty,
          otherPartyContact: mitigation_input_data.otherPartyContact,
          costAmount: mitigation_input_data.costAmount,
          funding: mitigation_input_data.funding,
          commissioningDate: response.data.commissioningDate,
          approvalDate: response.data.approvalDate,
          closureDate: response.data.closureDate,
          lifetime: mitigation_input_data.lifetime,
          targetGhg: mitigation_input_data.targetGhg,
          contributions: mitigation_input_data.contributions,
          projectStatus: mitigation_input_data.projectStatus,
          beneficiary: mitigation_input_data.beneficiary,
          genderIncl: mitigation_input_data.genderIncl,
          projectOutput: mitigation_input_data.projectOutput,
          projectImpact: mitigation_input_data.projectImpact,
          actualGHGSavings: project ? project.actualGHGSavings :  mitigation_input_data.actualGHGSavings,
          fileCalculation: mitigation_input_data.fileCalculation,
          marketMech: mitigation_input_data.marketMech,
          weblink: mitigation_input_data.weblink,
          carbonBen: mitigation_input_data.carbonBen,
          verification: mitigation_input_data.verification,
          fileVerification: mitigation_input_data.fileVerification,
          performanceIndicatorMI: mitigation_input_data.performanceIndicatorMI
        }
        if(this.approvalScreen){
          this.remarksCtrl.patchValue(project ? project.remarks :  mitigation_input_data.remarks);
        }
        // get inventory year from project else from parent project
        if(setYears) {
          this.getYears((this.mitigationMonitoringData.commissioningDate || project.parentProject.commissioningDate),project);
        }
        // get inventory year
        this.performanceIndicatorDataList = mitigation_input_data.performanceIndicatorMI
        this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
      }
    }, err=> {
      // handle error
      console.error("Error in calling ndc api , ",err);
      
    });
    
  }

  loadProjectData(params,setYears:boolean) {
    let obj = params;
    obj.entity = 'MITIGATION MONITORING';
    // console.log(obj);

    this.appService.getNDC(obj).subscribe((response) => {
      // console.log(response);
      if (!response.data) {
        let project = this.formGroup.controls['projectId'].value;
        this.setData(project,setYears);
      } else {
        this.setData(response.data,setYears);
      }
    },
      (error) => {
        console.error("Error in fetching existing record ", error);
      }
    );

  }

  setDataSourceAttributes() {
    this.performanceIndicatorDataSource.paginator = this.paginator;
    this.performanceIndicatorDataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.performanceIndicatorDataSource.paginator = this.paginator;
  }

  // isAllSelectedDisbursementYear() {
  //   const numSelected = this.disbursementYearSelection.selected.length;
  //   const numRows = this.performanceIndicatorDataSource.data.length;
  //   return numSelected === numRows;
  // }

  // masterToggleDisbursementYear() {
  //   this.isAllSelectedDisbursementYear() ?
  //     this.disbursementYearSelection.clear() :
  //     this.performanceIndicatorDataSource.data.forEach(row => this.disbursementYearSelection.select(row));
  // }

  // checkboxLabelDisbursementYear(row?: any): string {
  //   if (!row) {
  //     return `${this.isAllSelectedDisbursementYear() ? 'select' : 'deselect'} all`;
  //   }
  //   return `${this.disbursementYearSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  // }

  addNewDisbursementYearRow() {
    this.performanceIndicatorDataList.push({
      disbursementCategory: '', amountQ1: 0, amountQ2: 0, amountQ3: 0, amountQ4: 0, reference: ''
    });
    this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
  }

  // removeDisbursementYearSelected() {
  //   const y = new Set(this.disbursementYearSelection.selected);
  //   this.performanceIndicatorDataList = this.performanceIndicatorDataList.filter(x => !y.has(x));
  //   this.performanceIndicatorDataSource.data = this.performanceIndicatorDataList;
  // }



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
    let year = this.formGroup.controls['monitoringYear'].value;
    let actualGhg = this.mitigationMonitoringData.actualGHGSavings;

    var unacceptedValues: any = ['', null, undefined, []];

    if (unacceptedValues.indexOf(project) > -1 || unacceptedValues.indexOf(year) > -1 || unacceptedValues.indexOf(actualGhg) > -1) {
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
    console.log("this.formGroup  ",this.formGroup);
    if(this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    let project = this.formGroup.controls['projectId'].value
      let year = this.formGroup.controls['monitoringYear'].value
      var obj = {
        menuId: "Mitigation_Actions_MonitoringInformation",
        parentProject: project._id,
        updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
        projectCode: project.projectCode,
        projectId: project.projectId,
        projectTitle: project.projectTitle,
        monitoringYear: year,
        actualGHGSavings: this.mitigationMonitoringData.actualGHGSavings,
        fileCalculation: "base64 code for file upload data",
        verification: this.mitigationMonitoringData.verification,
        fileVerification: "base64 code for file upload data",
        performanceIndicatorMI: this.performanceIndicatorDataList,
        remarks: this.remarksCtrl.value,
      }
      this.appService.saveNDC(obj).subscribe((res: any) => {
        if (res.statusCode == 200) {
          this.openSnackBar(res.message, 'success');
          this.formGroup.controls['projectId'].reset();
          this.formGroup.controls['monitoringYear'].reset();
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
        // this.adaptationMIForm.reset();
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