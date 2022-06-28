import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatBottomSheet, MatSnackBar } from '@angular/material';
import { AppService } from '../../../app.service';
import { OtherSDGModel } from '../../model/ndc/otherSDG.model';
import { QuestionModel } from '../../model/ndc/question-model';
import { OtherSdgBottomSheetComponent } from '../../other-sdg-bottom-sheet/other-sdg-bottom-sheet.component';
import { UtilityServiceService } from '../../../utility-service.service';
import { MRV_MONITORING_YEAR_COUNT } from '../../../app.constants';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';


@Component({
  selector: 'app-sdg-monitoringinformation',
  templateUrl: './sdg-monitoringinformation.component.html',
  styleUrls: ['./sdg-monitoringinformation.component.scss']
})
export class SdgMonitoringinformationComponent implements OnInit {
  isExistingData:boolean = false;
  static Constants = {
    MENU_ID: "SDG_Assessment_MonitoringInformation",
    permissionMenuId: "",
    moduleName:"SDG_MONITORING",
    entity:"SDG MONITORING"
  };
  otherSdg = {
    selectedSdgName : null
  }
  sdgMIForm: FormGroup;
  projects:any[] = [];
  // stakeholderInputArr:QuestionModel[] = [];
  povertyReductionArr:QuestionModel[] = [];
  reducingInequalityArr:QuestionModel[] = [];
  genderParityArr:QuestionModel[] = [];
  otherSDGArr:OtherSDGModel[] = [];
  likelihoodArr:string[] = [];
  impactArr:string[] = [];
  otherSdgValueArr:string[] = [];
  monitoringYears:number[] = [];
  remarksCtrl: FormControl = new FormControl("",[Validators.required]);
  // approval type
  formId:string;
  recordId:string;
  approvalScreen:boolean;
  selectedProject:any;
  constructor(
    private bottomsheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private activatedRoute:ActivatedRoute,
    private utilityService:UtilityServiceService,
    private _snackBar: MatSnackBar,
    private readonly router: Router,

     ) {
      this.sdgMIForm = this.formBuilder.group({
        _id: [""],
        menuId: [SdgMonitoringinformationComponent.Constants.MENU_ID],
        remarks: this.remarksCtrl,
        updatedBy: [""],
        permissionMenuId: [""],
        projectCode: [""],
        projectId: [""],
        projectTitle: [""],
  
        // back end properties
        entity: [""],
  
        parentProject: ["",[Validators.required]],
        monitoringYear:["",[Validators.required]],
        // stakeholderInput:[[]],
        povertyReduction:[[]],
        reducingInequality:[[]],
        genderParity:[[]],
        otherSDG:[[]],
        approverComment:[""],
      });

      
   }

  ngOnInit() {
    this.getPermissionMenuId();
    this.appService.projectByModule(SdgMonitoringinformationComponent.Constants.moduleName)
    .subscribe(response=>{
      this.projects = response.data;
    });
    this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
    this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
    if(this.formId && this.recordId){
      this.approvalScreen = true;
      // read data from the from id
      this.appService.getNDC({_id:this.formId})
      .subscribe(response=> {
        if(response.statusCode == 200 && response.data) {
          /* let keys = Object.keys(response.data);
          let pathValueObj = {};
          keys.forEach(key=> {
            pathValueObj[key] = response.data[key];
          })
          this.sdgMIForm.patchValue(pathValueObj); */
          this.populateForm(this.sdgMIForm,response.data);
          this.reAssignValues(response.data);// used fetch individual values from form and assign in related variables
        }
      })
    }
  }
  populateForm(form: FormGroup, data: any,...skipControls) {
    let keys = Object.keys(data);
    let pathValueObj = {};
    keys.forEach(key=> {
      if(skipControls.indexOf(key) == -1) {
        pathValueObj[key] = data[key];
      }
    })
    form.patchValue(pathValueObj);
    if(!this.approvalScreen){
      this.sdgMIForm.controls.remarks.patchValue('');
    }
  }
  reAssignValues(responseData) {
    // assign project from id
    if(responseData) {
      this.projects.forEach(project=> {
        if(project._id == responseData.parentProject || project._id == responseData.parentProject._id) {
          this.sdgMIForm.controls.parentProject.patchValue(project);
          this.selectedProject = (project);
        }
      })
    } else {
      responseData = this.selectedProject;
    }
    this.povertyReductionArr = responseData.povertyReduction;
    this.reducingInequalityArr = responseData.reducingInequality;
    this.genderParityArr = responseData.genderParity;
    this.otherSDGArr = responseData.otherSDG;
    // get otherSdgValueArr
    this.selectedProject.otherSDG.forEach((otherSdg:OtherSDGModel) => {
      this.otherSdgValueArr.push(otherSdg.otherSdgType);
    });
  }
  populateYears(closureDate:Date) {
    this.monitoringYears = [];
    let closureYear = new Date(closureDate).getFullYear();
    for(let i=closureYear; i<= closureYear+MRV_MONITORING_YEAR_COUNT ; i++) {
      this.monitoringYears.push(i);
    }
  }
  onProjectSelect(selectedProject, setYears:boolean) {
    if(setYears) {
      this.populateYears(this.selectedProject.parentProject.closureDate);
    }
    let query = {entity: SdgMonitoringinformationComponent.Constants.entity,parentProject:this.selectedProject._id};
    if(this.sdgMIForm.controls.monitoringYear.value) {
      query = Object.assign(query,{monitoringYear:this.sdgMIForm.controls.monitoringYear.value})
    }
    this.appService.getNDC(
      query
    ).subscribe(response=> {
      console.log("response.data   ",response);
      
      // fill form with existing data
      // if no existing data found then populate data from selected project
      if(!response.data) {
        this.isExistingData = false;
        this.populateForm(this.sdgMIForm,this.selectedProject,"parentProject");
      } else {
        this.isExistingData = true;
        this.populateForm(this.sdgMIForm,response.data);
      }
      this.reAssignValues(response.data);
    },error=> {
      this.utilityService.openSnackBar(error,"error");
      
    });
    
    // data population from selected project
    // get otherSdgValueArr
    /* this.selectedProject.otherSDG.forEach((otherSdg:OtherSDGModel) => {
      this.otherSdgValueArr.push(otherSdg.otherSdgType);
    });
    this.povertyReductionArr = (this.selectedProject.povertyReduction as QuestionModel[]).filter(poverty=>{
      if(poverty.isQuantitative) {
        return poverty;
      }
    })
    this.reducingInequalityArr = (this.selectedProject.reducingInequality as QuestionModel[]).filter(reducingInequality=>{
      if(reducingInequality.isQuantitative) {
        return reducingInequality;
      }
    })
    console.log("reducingInequalityArr ",this.reducingInequalityArr);

    this.genderParityArr = (this.selectedProject.genderParity as QuestionModel[]).filter(genderParity=>{
      if(genderParity.isQuantitative) {
        return genderParity;
      }
    })
    this.otherSDGArr = (this.selectedProject.otherSDG as OtherSDGModel[]);
    console.log("otherSDGArr ",this.otherSDGArr); */
    
  }
  
  submit() {
    if(this.sdgMIForm.status == "INVALID") {
      this.sdgMIForm.markAllAsTouched();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    console.log("povertyReductionArr  ",this.povertyReductionArr);
    console.log("otherSDGArr  ",this.otherSDGArr);
    // add rest of the form values for the question section
    this.sdgMIForm.controls.projectId.patchValue(this.sdgMIForm.controls.parentProject.value.projectId);
    this.sdgMIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
    this.sdgMIForm.controls.povertyReduction.patchValue(this.povertyReductionArr);
    this.sdgMIForm.controls.reducingInequality.patchValue(this.reducingInequalityArr);
    this.sdgMIForm.controls.genderParity.patchValue(this.genderParityArr);
    this.sdgMIForm.controls.otherSDG.patchValue(this.otherSDGArr);

    this.appService.saveNDC(this.sdgMIForm.value)
    .subscribe(response=> {
      if(response.statusCode == 200) {
        this.utilityService.openSnackBar(response.message, 'success');
      }
    })
    
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
        _id : this.recordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.sdgMIForm.controls.approverComment.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        this.sdgMIForm.reset();
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
  getPermissionMenuId() {
    this.appService
      .getRecord(SdgMonitoringinformationComponent.Constants.MENU_ID)
      .subscribe(
        (res: any) => {
          if (res.data) {
            SdgMonitoringinformationComponent.Constants.permissionMenuId =
              res.data.permissionMenuId;
          }
        },
        (err) => {
          console.error(err);
          
        }
      );
  }
  onTabChange(event) {
    console.log(event.index);
    if (event.index == 4) {
      this.openBottomSheet();
    }
  }

  openBottomSheet() {
    // Take refernce of bottom sheet
    const bottomSheetRef = this.bottomsheet.open(OtherSdgBottomSheetComponent,
      {
        data: {
                datas: this.otherSdgValueArr
              }
      }
    );

    // subscribe to observable that emit event when bottom sheet closes
    bottomSheetRef.afterDismissed().subscribe((dataFromChild) => {
      console.log(dataFromChild);
      if (dataFromChild == undefined) {
        this.openBottomSheet();
      }
      else if(dataFromChild != undefined){
        // update visible flag
        this.otherSDGArr.map(sdg=> {
          sdg.otherSdgType == dataFromChild ? sdg.isVisible = true : sdg.isVisible = false;
        })
        // do the api call for other sdg question list
      }
    });
  }

}
