import { MenuModel } from './../model/common/menu-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { UtilityServiceService } from '../../utility-service.service';
import { OtherSDGModel } from '../model/ndc/otherSDG.model';
import { QuestionModel } from '../model/ndc/question-model';
import { Question2Model } from '../model/ndc/question2.model';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-adaptation-projectinformation',
  templateUrl: './adaptation-projectinformation.component.html',
  styleUrls: ['./adaptation-projectinformation.component.scss']
})
export class AdaptationProjectinformationComponent implements OnInit {
  menu:MenuModel;
  projects = [];
  adaptationPIForm:FormGroup;
  selectedProject:any;
  ndpObjectiveCoverageArr:string[] = [];
  ndpCoverageArr:string[] = [];
  likelihoodArr:string[] = [];
  impactArr:string[] = [];
  
  agricultureArr:QuestionModel[] = [];
  forestryArr:QuestionModel[] = [];
  waterArr:QuestionModel[] = [];
  energyArr:QuestionModel[] = [];
  healthArr:QuestionModel[] = [];
  riskArr:QuestionModel[] = [];
  ynArr:string[] = ["Yes","No","Not Applicable"];
  remarksCtrl: FormControl = new FormControl("",[Validators.required]);
  // approval type
  formId:string;
  recordId:string;
  approvalScreen:boolean;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private utilityService:UtilityServiceService,
    private _activatedRoute:ActivatedRoute,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
    
  }

  ngOnInit() {
    this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
    this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
    if(this.formId && this.recordId) {
      this.approvalScreen = true;
    }
    this.adaptationPIForm = this.formBuilder.group({
      _id: [""],
      menuId: [""],
      remarks: this.remarksCtrl,
      updatedBy: [""],
      permissionMenuId: [""],
      projectCode: [""],
      projectId: [""],
      projectTitle: [""],
      parentProject: ["",[Validators.required]],
      approverComment:[""],

      sector:[''],
      subSector:[''],
      ndc:[''],
      nap:[''],
      agency:[''],
      otherParty:[''],
      commissioningDate:[''],
      approvalDate:[''],
      closureDate:[''],
      lifetime:[''],
      ndpObjectiveCoverage:['',[Validators.required]],
      ndpCoverage:['',[Validators.required]],
      agriculture:[[]],
      forestry:[[]],
      water:[[]],
      energy:[[]],
      health:[[]],
      risk:[[]],
    });
    this.getPermissionMenuId();
    
  }
  loadData() {
    this.populateData("likelihoodArr",{key:"Likelihood",outputValue:"value"});
    this.populateData("impactArr",{key:"Impact",outputValue:"value"});
    this.populateData("ndpObjectiveCoverageArr",{"menuId":this.menu.menuId,
        key:"NDPObjectiveCoverage",outputValue:"value"});
    this.populateData("ndpCoverageArr",{"menuId":this.menu.menuId,key:"NDPCoverage",outputValue:"value"});

    // dynamic data
    this.populateData("agricultureArr",{"menuId":this.menu.menuId,
      "key": "Agriculture","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("agricultureArr",{"menuId":this.menu.menuId,
      "key": "Agriculture","section":"quantitativeImpact",outputValue:"value"});

    
    this.populateData("forestryArr",{"menuId":this.menu.menuId,
      "key": "Forestry","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("forestryArr",{"menuId":this.menu.menuId,
      "key": "Forestry","section":"quantitativeImpact",outputValue:"value"});

    
    this.populateData("waterArr",{"menuId":this.menu.menuId,
      "key": "Water","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("waterArr",{"menuId":this.menu.menuId,
      "key": "Water","section":"quantitativeImpact",outputValue:"value"});

    
    this.populateData("energyArr",{"menuId":this.menu.menuId,
      "key": "Energy","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("energyArr",{"menuId":this.menu.menuId,
      "key": "Energy","section":"quantitativeImpact",outputValue:"value"});

    
    this.populateData("healthArr",{"menuId":this.menu.menuId,
      "key": "Health","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("healthArr",{"menuId":this.menu.menuId,
      "key": "Health","section":"quantitativeImpact",outputValue:"value"});

    
    this.populateData("riskArr",{"menuId":this.menu.menuId,
      "key": "RiskManagement","section":"qualitativeImpact",outputValue:"value"});
    this.populateData("riskArr",{"menuId":this.menu.menuId,
      "key": "RiskManagement","section":"quantitativeImpact",outputValue:"value"});

    
  }
  populateData(fieldName:any,filter:any) {
    this.appService.getAppData(filter)
    .subscribe(response=> {
      if(fieldName == "likelihoodArr") {
        this.likelihoodArr = response.data;
        return;
      }
      else if(fieldName == "impactArr") {
        this.impactArr = response.data;
        return;
      }
      else if(fieldName == "ndpObjectiveCoverageArr") {
        this.ndpObjectiveCoverageArr = response.data;
        return;
      }
      else if(fieldName == "ndpCoverageArr") {
        this.ndpCoverageArr = response.data;
        return;
      }
      else {
        response.data =  response.data.map(data=> {
          const question:QuestionModel = {} as QuestionModel;
          if(filter["key"] ==  "Agriculture" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Agriculture" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Forestry" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Forestry" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
  
          else if(filter["key"] ==  "Water" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Water" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Energy" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Energy" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Health" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "Health" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "RiskManagement" && filter["section"] == "qualitativeImpact") {
            question.question = data;
            question.isQualitative = true;
            question.dataSource = "";
          }
          else if(filter["key"] ==  "RiskManagement" && filter["section"] == "quantitativeImpact") {
            question.question = data;
            question.isQuantitative = true;
            question.data = 0;
            question.dataSource = "";
          }
  
  
          return question;
        });

        if(fieldName == "agricultureArr") {
          this.agricultureArr = this.agricultureArr.concat(response.data);
        } else if(fieldName == "forestryArr") {
          this.forestryArr = this.forestryArr.concat(response.data);
        } else if(fieldName == "waterArr") {
          this.waterArr = this.waterArr.concat(response.data);
        } else if(fieldName == "energyArr") {
          this.energyArr = this.energyArr.concat(response.data);
        } else if(fieldName == "healthArr") {
          this.healthArr = this.healthArr.concat(response.data);
        } else if(fieldName == "riskArr") {
          this.riskArr = this.riskArr.concat(response.data);
        }

      }
    
      //this.adaptationPIForm.controls[controlName].setValue(response.data);
    });
  }
  getPermissionMenuId(){
    this._activatedRoute.data.subscribe(data=> {
      this.appService.getRecord(data.menuId).subscribe((res: any)=>{
        if(res.data){
          //getting the menu object
          this.menu = res.data as MenuModel;
          this.menu.moduleName = data.moduleName;
          this.adaptationPIForm.controls.menuId.patchValue(this.menu.menuId);

          this.loadData(); // load static data
          if(this.approvalScreen) {
            // read data from the from id
            this.appService.getNDC({_id:this.formId})
            .subscribe(response=> {
              if(response.statusCode == 200 && response.data) {
                this.populateForm(this.adaptationPIForm,response.data)
                this.reAssignValues(response.data);// used fetch individual values from form and assign in related variables
                this.selectedProject  = response.data.parentProject;
              }
            })
          } else {
            this.appService.projectByModule(this.menu.moduleName)
            .subscribe(response=>{
              this.projects = response.data;
            });

          }
          
        }
      }, err=>{
        this.utilityService.openSnackBar(err.error.message,"error");
      })
    })
  }
  onProjectSelect() {
    // call api to get existing latest record
    this.appService.getNDC(
      {entity: this.menu.entity,parentProject:this.adaptationPIForm.controls.parentProject.value._id}
    ).subscribe(response=> {
      // fill form with existing data
      // if no existing data found then populate data from selected project
      if(!response.data) {
        this.populateForm(this.adaptationPIForm,this.selectedProject,"parentProject");
      } else {
        // this.selectedProject = response.data.parentProject;
        this.populateForm(this.adaptationPIForm,response.data);
        this.reAssignValues(response.data);// used fetch individual values from existing record and assign in related variables
        
      }
    },error=> {
      console.error("Error in fetching existing record ",error);
      
    });
    
  }
  reAssignValues(responseData) {
    // assign project from id
    
    this.agricultureArr = this.adaptationPIForm.controls.agriculture.value;
    this.forestryArr = this.adaptationPIForm.controls.forestry.value;
    this.waterArr = this.adaptationPIForm.controls.water.value;
    this.energyArr = this.adaptationPIForm.controls.energy.value;
    this.healthArr = this.adaptationPIForm.controls.health.value;
    this.riskArr = this.adaptationPIForm.controls.risk.value;
  }
  populateForm(form: FormGroup, data: any,...skipControls) {
    let keys = Object.keys(data);
    let pathValueObj = {};
    keys.forEach(key=> {
      if(skipControls.indexOf(key) == -1) {
        if(key == "parentProject") {
          let parentProject = this.projects.filter(project=> {
            if(project._id == data.parentProject._id) {
               return project;
            }
          })
          pathValueObj[key] = parentProject[0];
        } else {
          pathValueObj[key] = data[key];
        }

      }
    });
    form.patchValue(pathValueObj);
    // if(data.entity && data.entity == this.menu.entity) {
    //   form.controls.parentProject = data.parentProject;
    //   this.selectedProject = data.parentProject;
    // }
    if(this.approvalScreen){
      form.controls['parentProject'].setValue(data.parentProject.projectId);
    }
    /* else{
      form.controls['parentProject'].setValue(data.parentProject);
    } */
    // this.selectedProject = data.parentProject;

  }

  onTabChange(event) {
    console.log(event.index);
  }

  /* checkMandatoryFields(): boolean {
    var error: boolean = false;
    let project = this.adaptationPIForm.controls['parentProject'].value;
    let noc = this.adaptationPIForm.controls['ndpObjectiveCoverage'].value;
    let nc = this.adaptationPIForm.controls['ndpCoverage'].value;
    var unacceptedValues: any = ['', null, undefined];

    if (unacceptedValues.indexOf(project) > -1 || unacceptedValues.indexOf(noc) > -1 || nc.length === 0) {
      error = true;
    }
    if (error) {
      return false;
    }
    else {
      return true;
    }
  } */

  submit() {
    if(this.adaptationPIForm.status == "INVALID") {
      this.adaptationPIForm.markAllAsTouched();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    this.adaptationPIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
      this.adaptationPIForm.controls.agriculture.patchValue(this.agricultureArr);
      this.adaptationPIForm.controls.forestry.patchValue(this.forestryArr);
      this.adaptationPIForm.controls.water.patchValue(this.waterArr);
      this.adaptationPIForm.controls.energy.patchValue(this.energyArr);
      this.adaptationPIForm.controls.health.patchValue(this.healthArr);
      this.adaptationPIForm.controls.risk.patchValue(this.riskArr);
      
      this.appService.saveNDC(this.adaptationPIForm.value)
      .subscribe(response=> {
        if(response.statusCode == 200) {
          this.utilityService.openSnackBar(response.message, 'success');
        }
      },err=> {
        this.utilityService.openSnackBar(err.error.message, 'error');
      })
    
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass: 'snackbar-global',
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      data: {
        message: message,
        type: type
      }
    });
  }

  updateDataStatus(status){
    
    let obj = {
        status : status,
        _id : this.recordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.adaptationPIForm.controls.approverComment.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        // this.adaptationPIForm.reset();
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
