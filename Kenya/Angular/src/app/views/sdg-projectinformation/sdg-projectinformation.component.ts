import { ActivatedRoute, Router } from '@angular/router';
import { Question2Model } from './../model/ndc/question2.model';
import { OtherSDGModel } from '../model/ndc/otherSDG.model';
import { QuestionModel } from '../model/ndc/question-model';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { MatBottomSheet, MatSnackBar } from "@angular/material";
import { convertCompilerOptionsFromJson } from "typescript";
import { OtherSdgBottomSheetComponent } from "../other-sdg-bottom-sheet/other-sdg-bottom-sheet.component";
import { AppService } from "../../app.service";
import { UtilityServiceService } from '../../utility-service.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';

@Component({
  selector: "app-sdg-projectinformation",
  templateUrl: "./sdg-projectinformation.component.html",
  styleUrls: ["./sdg-projectinformation.component.scss"],
})
export class SdgProjectinformationComponent implements OnInit {
  static Constants = {
    MENU_ID: "SDG_Assessment_ProjectInformation",
    permissionMenuId: "",
    moduleName:"SDG_INPUT",
    entity:"SDG INPUT"
  };
  sdgPIForm: FormGroup;
  projects:any[] = [];
  stakeholderInputArr:QuestionModel[] = [];
  povertyReductionArr:QuestionModel[] = [];
  reducingInequalityArr:QuestionModel[] = [];
  genderParityArr:QuestionModel[] = [];
  otherSDGArr:OtherSDGModel[] = [];
  likelihoodArr:string[] = [];
  impactArr:string[] = [];
  otherSdgValueArr:string[] = [];
  remarksCtrl: FormControl = new FormControl("",[Validators.required]);

  // approval type
  formId:string;
  recordId:string;
  approvalScreen:boolean;

  constructor(
    private bottomsheet: MatBottomSheet,
    private formBuilder: FormBuilder,
    private appService: AppService,
    private utilityService:UtilityServiceService,
    private activatedRoute:ActivatedRoute,
    private _snackBar: MatSnackBar,
    private readonly router: Router
  ) {
    this.sdgPIForm = this.formBuilder.group({
      _id: [""],
      menuId: [SdgProjectinformationComponent.Constants.MENU_ID],
      remarks: this.remarksCtrl,
      updatedBy: [""],
      permissionMenuId: [""],
      projectCode: [""],
      projectId: [""],
      projectTitle: [""],

      // back end properties
      entity: [""],
      
      showImpacts:[""],
      parentProject: ["",[Validators.required]],
      screeningApproach: [""],
      stakeholderInput:[[]],
      povertyReduction:[[]],
      reducingInequality:[[]],
      genderParity:[[]],
      otherSDG:[[]],
      approverComment:[""],
    });
  }

  ngOnInit() {
    this.getPermissionMenuId();
    this.appService.projectByModule(SdgProjectinformationComponent.Constants.moduleName)
    .subscribe((response)=>{
      this.projects = response.data;
      this.checkForApprovalScreenData();
    });
    this.populateData("likelihoodArr",{key:"Likelihood",outputValue:"value"});
    this.populateData("impactArr",{key:"Impact",outputValue:"value"});
    this.populateData("otherSdgValueArr",{"element": "select",
    "menuId":SdgProjectinformationComponent.Constants.MENU_ID,
    "key": "otherSDG",outputValue:"value"});
    // check for formId and record id
    

    
  }
  checkForApprovalScreenData() {
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
          this.sdgPIForm.patchValue(pathValueObj); */
          this.populateForm(this.sdgPIForm,response.data)
          this.reAssignValues(response.data);// used fetch individual values from form and assign in related variables
        }
      })
    }
    // populate data
    if(!this.approvalScreen) {
     
      this.populateData("stakeholderInputArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "stackHolderFeedback",outputValue:"value"});
  
      this.populateData("povertyReductionArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "povertyReduction","section":"qualitativeImpact",outputValue:"value"});
      this.populateData("povertyReductionArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "povertyReduction","section":"quantitativeImpact",outputValue:"value"});
  
      this.populateData("reducingInequalityArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "reducingInequality","section":"qualitativeImpact",outputValue:"value"});
      this.populateData("reducingInequalityArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "reducingInequality","section":"quantitativeImpact",outputValue:"value"});
  
      this.populateData("genderParityArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "genderParity","section":"qualitativeImpact",outputValue:"value"});
      this.populateData("genderParityArr",{"menuId":SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "genderParity","section":"quantitativeImpact",outputValue:"value"});
    }
  }
  reAssignValues(responseData) {
    // assign project from id
    this.projects.forEach(project=> {
      if(project._id == responseData.parentProject) {
        this.sdgPIForm.controls.parentProject.patchValue(project);
      }
    })
    this.stakeholderInputArr = responseData.stakeholderInput;
    this.povertyReductionArr = responseData.povertyReduction;
    this.reducingInequalityArr = responseData.reducingInequality;
    this.genderParityArr = responseData.genderParity;
    this.otherSDGArr = responseData.otherSDG;
  }
  async populateOthersSDG(count:number) {
    let otherSDGData = [];
    let qualitativeArr = [];
    let quantitativeArr = [];
    let question2Map = {};
    if(!this.otherSdgValueArr.length || count > this.otherSdgValueArr.length-1 )
    {
      console.log("populated SDG data ",this.otherSDGArr);
      
      return;
    }
    // create element of OtherSDGModel with value of otherSdgValueArr
    const otherSdg:OtherSDGModel = {
      otherSdgType:this.otherSdgValueArr[count],
      qualitativeImpact:[],
      quantitativeImpact2:[],
      quantitativeImpact:[]
    };
    // call api to get other sdg info based on otherSdgType
    this.appService.getAppData({
      "element": "question",
      "menuId": SdgProjectinformationComponent.Constants.MENU_ID,
      "key": "otherSDG",
      "section":this.otherSdgValueArr[count]
    }).subscribe(response=> {
      otherSDGData = response.data;
      this.populateOtherSDGSection(otherSDGData,otherSdg,count);
    })

    
  }
  populateOtherSDGSection(otherSDGData:any[],otherSdg:OtherSDGModel,count:number ) {
    let qualitativeArr = [];
    let quantitativeArr = [];
    let question2Map = {};
    // populate the array structure based on value of otherSdgValueArr
    switch (this.otherSdgValueArr[count]) {
      case "Infrastructure, Innovation, Industry":
      case "Environment":
        qualitativeArr = otherSDGData.filter(element=> {
          if(element["subSection"] == "qualitativeImpact") {
            return element;
          }
        });
        qualitativeArr.forEach(element => {
          otherSdg.qualitativeImpact.push({
            question:element["value"],
            isQualitative:true,
          });
        });
        quantitativeArr = otherSDGData.filter(element=> {
          if(element["subSection"] == "quantitativeImpact") {
            return element;
          }
        });
        quantitativeArr.forEach(element => {
          // crate map of label and question
          if(element["subSection2"]) {
            if(!question2Map[element["subSection2"]]) {
              question2Map[element["subSection2"]] = [element["value"]];
            } else {
              question2Map[element["subSection2"]].push(element["value"]);
            }
          }
        });
        // create quantitativeImpact2 array
        let question2:Question2Model;
        Object.keys(question2Map).forEach(key=>{
          otherSdg.quantitativeImpact2.push({
            label:key,
            questions: []
          });
          let lastIndex = otherSdg.quantitativeImpact2[otherSdg.quantitativeImpact2.length-1]; // get the last record
          // get the array of values based on key in question2Map
          question2Map[key].forEach(value => {
            lastIndex.questions.push({
              isQuantitative:true,
              question: value
            })
          });
        })
        break;
      /* case "Environment":
        
        break; */
      case "Employment":
      case "Education and Learning":
      case "Food Security and Hunger":
      case "Water and Sanitation":
      case "Health and Well Being":
        qualitativeArr = otherSDGData.filter(element=> {
          if(element["subSection"] == "qualitativeImpact") {
            return element;
          }
        });
        qualitativeArr.forEach(element => {
          otherSdg.qualitativeImpact.push({
            question:element["value"],
            isQualitative:true,
          });
        });

        quantitativeArr = otherSDGData.filter(element=> {
          if(element["subSection"] == "quantitativeImpact") {
            return element;
          }
        });
        quantitativeArr.forEach(element => {
          otherSdg.quantitativeImpact.push({
            question:element["value"],
            isQuantitative:true,
          });
        });
        break;
    
      default:
        console.error("Invalid other sdg!!!");
        
        return;
        break;
    }
    // add to main otherSDGArr
    this.otherSDGArr.push(otherSdg);
    this.populateOthersSDG(++count);
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
      else if(fieldName == "otherSdgValueArr") {
        this.otherSdgValueArr = response.data;
        console.log('otherSdgValueArr', this.otherSdgValueArr);
        // populate other sdg each section
        if(!this.approvalScreen)
          this.populateOthersSDG(0);
        return;
      }
      response.data =  response.data.map(data=> {
        const question:QuestionModel = {} as QuestionModel;
        if(filter.key == "stackHolderFeedback") {
          question.label = data;
          question.strengths = "";
          question.opportunities = "";
          question.threats = "";
          question.weakness = "";
        }
        else if(filter["key"] ==  "povertyReduction" && filter["section"] == "qualitativeImpact") {
          question.question = data;
          question.isQualitative = true;
          question.likelihood = "";
          question.impact = "";
        }
        else if(filter["key"] ==  "povertyReduction" && filter["section"] == "quantitativeImpact") {
          question.question = data;
          question.isQuantitative = true;
          question.data = 0;
          question.dataSource = "";
        }
        else if(filter["key"] ==  "reducingInequality" && filter["section"] == "qualitativeImpact") {
          question.question = data;
          question.isQualitative = true;
          question.likelihood = "";
          question.impact = "";
        }
        else if(filter["key"] ==  "reducingInequality" && filter["section"] == "quantitativeImpact") {
          question.question = data;
          question.isQuantitative = true;
          question.likelihood = "";
          question.impact = "";
        }

        
        else if(filter["key"] ==  "genderParity" && filter["section"] == "qualitativeImpact") {
          question.question = data;
          question.isQualitative = true;
          question.likelihood = "";
          question.impact = "";
        }
        else if(filter["key"] ==  "genderParity" && filter["section"] == "quantitativeImpact") {
          question.question = data;
          question.isQuantitative = true;
          question.likelihood = "";
          question.impact = "";
        }


        return question;
      });
      if(fieldName == "stakeholderInputArr") {
        this.stakeholderInputArr = response.data;
      } else if(fieldName == "povertyReductionArr") {
        this.povertyReductionArr = this.povertyReductionArr.concat(response.data);
      } else if(fieldName == "reducingInequalityArr") {
        this.reducingInequalityArr = this.reducingInequalityArr.concat(response.data);
      } else if(fieldName == "genderParityArr") {
        this.genderParityArr= this.genderParityArr.concat(response.data);
      }
      //this.sdgPIForm.controls[controlName].setValue(response.data);
    });
  }
  getPermissionMenuId() {
    this.appService
      .getRecord(SdgProjectinformationComponent.Constants.MENU_ID)
      .subscribe(
        (res: any) => {
          if (res.data) {
            SdgProjectinformationComponent.Constants.permissionMenuId =
              res.data.permissionMenuId;
          }
        },
        (err) => {
          console.error(err);
          
        }
      );
  }
  submit() {
    if(this.sdgPIForm.status == "INVALID") {
      this.sdgPIForm.markAllAsTouched();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    console.log("stakeholderInputArr  ",this.stakeholderInputArr);
    console.log("povertyReductionArr  ",this.povertyReductionArr);
    console.log("otherSDGArr  ",this.otherSDGArr);
    // add rest of the form values for the question section
    this.sdgPIForm.controls.projectId.patchValue(this.sdgPIForm.controls.parentProject.value.projectId);
    this.sdgPIForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
    this.sdgPIForm.controls.stakeholderInput.patchValue(this.stakeholderInputArr);
    this.sdgPIForm.controls.povertyReduction.patchValue(this.povertyReductionArr);
    this.sdgPIForm.controls.reducingInequality.patchValue(this.reducingInequalityArr);
    this.sdgPIForm.controls.genderParity.patchValue(this.genderParityArr);
    this.sdgPIForm.controls.otherSDG.patchValue(this.otherSDGArr);

    this.appService.saveNDC(this.sdgPIForm.value)
    .subscribe(response=> {
      if(response.statusCode == 200) {
        this.utilityService.openSnackBar(response.message, 'success');
      }
    },err=> {
      this.utilityService.openSnackBar(err, 'error');
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
  onProjectSelect(value) {
    this.appService.getNDC(
      {entity: SdgProjectinformationComponent.Constants.entity,parentProject:this.sdgPIForm.controls.parentProject.value._id}
    ).subscribe(response=> {
      console.log("response.data   ",response);
      
      // fill form with existing data
      // if no existing data found then populate data from selected project
      if(!response.data) {
        /* this.sdgPIForm.controls.projectCode.setValue(this.sdgPIForm.controls.parentProject.value.projectCode);
        this.sdgPIForm.controls.projectTitle.setValue(this.sdgPIForm.controls.parentProject.value.projectTitle);
        this.sdgPIForm.controls.projectId.setValue(this.sdgPIForm.controls.parentProject.value.projectId); */
        this.populateForm(this.sdgPIForm,this.sdgPIForm.controls.parentProject);
      } else {
        this.populateForm(this.sdgPIForm,response.data);
        this.reAssignValues(response.data);// used fetch individual values from form and assign in related variables
        
      }
    },error=> {
      console.error("Error in fetching existing record ",error);
      
    });
    // console.log(this.sdgPIForm.controls.parentProject.value);
    
    // call api to get existing latest record

    
  }
  
  populateForm(form: FormGroup, data: any) {
    let keys = Object.keys(data);
    let pathValueObj = {};
    keys.forEach(key=> {
      // check for parent project in projects array
      if(key == "parentProject") {
        for(var i in this.projects) {
          if(this.projects[i]._id == data.parentProject._id) {
            pathValueObj[key] = this.projects[i];
            break;
          }
        }
      } else {
        pathValueObj[key] = data[key];
      }
    })
    form.patchValue(pathValueObj);
  }
  onTabChange(event) {
    console.log(event.index);
    // if (event.index == 4) {
    //   this.openBottomSheet();
    // }
  }
  updateDataStatus(status){
    
    let obj = {
        status : status,
        _id : this.recordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.sdgPIForm.controls.approverComment.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        this.sdgPIForm.reset();
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
  showSDGImpacts(showImpacts){
    this.otherSDGArr.map(sdg=> {
      sdg.otherSdgType == showImpacts ? sdg.isVisible = true : sdg.isVisible = false;
    })
  }
}
