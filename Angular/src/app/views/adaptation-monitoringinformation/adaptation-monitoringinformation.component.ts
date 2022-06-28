import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatBottomSheet } from "@angular/material";
import { ActivatedRoute, Router } from "@angular/router";
import { MRV_MONITORING_YEAR_COUNT } from "../../app.constants";
import { AppService } from "../../app.service";
import { UtilityServiceService } from "../../utility-service.service";
import { MenuModel } from "../model/common/menu-model";
import { OtherSDGModel } from "../model/ndc/otherSDG.model";
import { QuestionModel } from "../model/ndc/question-model";

@Component({
  selector: "app-adaptation-monitoringinformation",
  templateUrl: "./adaptation-monitoringinformation.component.html",
  styleUrls: ["./adaptation-monitoringinformation.component.scss"],
})
export class AdaptationMonitoringinformationComponent implements OnInit {
  isExistingData:boolean = false;
  menu: MenuModel;
  projects = [];
  adaptationMIForm: FormGroup;
  selectedProject: any;
  monitoringYearArr:number[] = [];
  likelihoodArr:string[] = [];
  impactArr:string[] = [];

  agricultureArr: QuestionModel[] = [];
  forestryArr: QuestionModel[] = [];
  waterArr: QuestionModel[] = [];
  energyArr: QuestionModel[] = [];
  healthArr: QuestionModel[] = [];
  riskArr: QuestionModel[] = [];
  ynArr: string[] = ["Yes", "No", "Not Applicable"];
  yearList = ["1","2"]
  // approval type
  formId: string;
  recordId: string;
  approvalScreen: boolean;
  remarksCtrl:FormControl = new FormControl("",[Validators.required]);
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private utilityService: UtilityServiceService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    this.formId = this.activatedRoute.snapshot.paramMap.get("formId");
    this.recordId = this.activatedRoute.snapshot.paramMap.get("recordId");
    if (this.formId && this.recordId) {
      this.approvalScreen = true;
    }
    this.adaptationMIForm = this.formBuilder.group({
      _id: [""],
      menuId: [""],
      remarks: this.remarksCtrl,
      updatedBy: [""],
      permissionMenuId: [""],
      projectCode: [""],
      projectId: [""],
      projectTitle: [""],
      parentProject: ["", [Validators.required]],
      approverComment: [""],

      monitoringYear: ["",[Validators.required]],
      sector: [""],
      subSector: [""],
      ndc: [""],
      napa: [""],
      agency: [""],
      otherParty: [""],
      approvalDate: [""],
      closureDate: [""],
      commissioningDate: [""],
      lifetime: [""],
      ndpObjectiveCoverage: [""],
      ndpCoverage: [[]],
      agriculture: [[]],
      forestry: [[]],
      water: [[]],
      energy: [[]],
      health: [[]],
      risk: [[]],
    });
    this.getPermissionMenuId();
  }
  populateYear(closureDate:Date) {
    let effDate = new Date(closureDate).getFullYear();
    for(let i=effDate; i<= effDate+MRV_MONITORING_YEAR_COUNT ; i++) {
      this.monitoringYearArr.push(i);
    }
  }
  loadProject(loadYear) {
    // populate year based on parent project selection
    if(loadYear && this.adaptationMIForm.controls.parentProject 
      && this.adaptationMIForm.controls.parentProject.value.closureDate) {
        this.populateYear(this.adaptationMIForm.controls.parentProject.value.closureDate);
      }
    // call api to get existing latest record
    let query = {
      entity: this.menu.entity,
      parentProject: this.adaptationMIForm.controls.parentProject.value._id,
    };
    if(this.adaptationMIForm.controls.monitoringYear.value 
      && this.adaptationMIForm.controls.monitoringYear.value != "") {
        query["monitoringYear"] = this.adaptationMIForm.controls.monitoringYear.value;
    };
    this.appService
      .getNDC(query)
      .subscribe(
        (response) => {
          // fill form with existing data
          // if no existing data found then populate data from selected project
          if (!response.data) {
            this.isExistingData = false;
            this.populateForm(this.adaptationMIForm, this.selectedProject,"parentProject");
            this.reAssignValues(this.selectedProject);
          } else {
            this.isExistingData = true;
            // this.selectedProject = response.data.parentProject;
            this.populateForm(this.adaptationMIForm, response.data,"parentProject");
            this.reAssignValues(response.data); // used fetch individual values from existing record and assign in related variables
          }
        },
        (error) => {
          console.error("Error in fetching existing record ", error);
        }
      );
  }
  getPermissionMenuId() {
    this.activatedRoute.data.subscribe((data) => {
      this.appService.getRecord(data.menuId).subscribe(
        (res: any) => {
          if (res.data) {
            //getting the menu object
            this.menu = res.data as MenuModel;
            this.menu.moduleName = data.moduleName;
            this.adaptationMIForm.controls.menuId.patchValue(this.menu.menuId);

            if (this.approvalScreen) {
              // read data from the from id
              this.appService
                .getNDC({ _id: this.formId })
                .subscribe((response) => {
                  if (response.statusCode == 200 && response.data) {
                    this.populateForm(this.adaptationMIForm, response.data);
                    this.reAssignValues(response.data); // used fetch individual values from form and assign in related variables
                    // this.selectedProject = response.data.parentProject;
                  }
                });
            } else {
              this.appService
                .projectByModule(this.menu.moduleName)
                .subscribe((response) => {
                  this.projects = response.data;
                });
            }
          }
        },
        (err) => {
          this.utilityService.openSnackBar(err.error.message, "error");
        }
      );
    });
  }

  reAssignValues(responseData) {
    // assign project from id

    this.agricultureArr = this.adaptationMIForm.controls.agriculture.value;
    this.forestryArr = this.adaptationMIForm.controls.forestry.value;
    this.waterArr = this.adaptationMIForm.controls.water.value;
    this.energyArr = this.adaptationMIForm.controls.energy.value;
    this.healthArr = this.adaptationMIForm.controls.health.value;
    this.riskArr = this.adaptationMIForm.controls.risk.value;
  }
  populateForm(form: FormGroup, data: any,...skipControls) {
    let keys = Object.keys(data);
    let pathValueObj = {};
    keys.forEach((key) => {
      if(skipControls.indexOf(key) == -1) {
        pathValueObj[key] = data[key];
      }
    });
    form.patchValue(pathValueObj);
    if(this.approvalScreen) {
      // set parent project id and monitoring year
      this.adaptationMIForm.controls.parentProject.patchValue(data.parentProject.projectId);
      this.adaptationMIForm.controls.monitoringYear.patchValue(data.monitoringYear);
    }
    else{
      this.adaptationMIForm.controls.remarks.patchValue('');
    }
  }
  
  submit() {
    console.log("form submit ",this.adaptationMIForm);
    if(this.adaptationMIForm.status == "INVALID") {
      this.adaptationMIForm.markAllAsTouched();
      this.utilityService.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    this.adaptationMIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
    this.adaptationMIForm.controls.agriculture.patchValue(this.agricultureArr);
    this.adaptationMIForm.controls.forestry.patchValue(this.forestryArr);
    this.adaptationMIForm.controls.water.patchValue(this.waterArr);
    this.adaptationMIForm.controls.energy.patchValue(this.energyArr);
    this.adaptationMIForm.controls.health.patchValue(this.healthArr);
    this.adaptationMIForm.controls.risk.patchValue(this.riskArr);
    

    this.appService.saveNDC(this.adaptationMIForm.value)
    .subscribe(response=> {
      if(response.statusCode == 200) {
        this.utilityService.openSnackBar(response.message, 'success');
      }
    },err=> {
      this.utilityService.openSnackBar(err.error.message, 'error');
    })
    
  }

  updateDataStatus(status){
    
    let obj = {
        status : status,
        _id : this.recordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.adaptationMIForm.controls.approverComment.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        // this.adaptationMIForm.reset();
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
