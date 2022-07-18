import { UtilityServiceService } from './../../../utility-service.service';
import { AppService } from './../../../app.service';
import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators , FormControl} from '@angular/forms';
import { MatSnackBar, MatDialog, MatTableDataSource } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { AuthService } from '../../../guards/auth.service';
import { SnackbarDialogComponent } from '../../modal/snackbar-dialog/snackbar-dialog.component';
import { FormConstants } from '../../../form-constants';
import { Subscription } from 'rxjs';
import {MRV_INVENTORY_SECTOR_SPLIT} from '../../../app.constants';

@Component({
  selector: 'app-create-ndc',
  templateUrl: './create-ndc.component.html',
  styleUrls: ['./create-ndc.component.scss']
})
export class CreateNdcComponent implements OnInit ,OnDestroy{

  ndcCreateForm: FormGroup;
  subscription: Subscription;
  causeArr:string[] = [];
  ndcAreaArr:string[] = [];
  divisionArr:string[] = [];
  locationArr:string[] = [];
  fundingArr:string[] = [];
  sectorArr:string[] = [];
  subSectorArr:string[] = [];
  approvalScreen : boolean
  toolTipPrincipal = "Definition for Principal - A climate action project/programme can be marked principal when the objective (climate change mitigation or adaptation) is explicitly stated as fundamental in the design of, or the motivation for, the project/programme. Promoting the objective will thus be stated in the project documentation as one of the principal reasons to undertake it. In other words, the activity would not have been funded (or designed that way) but for that objective.";
  toolTipSignificant = "Definition for Significant - A climate action project/programme can be marked significant when the objective (climate change mitigation or adaptation) is explicitly stated but it is not the fundamental driver or motivation. Instead, the project/programme has other prime objectives, but has been formulated or adjusted to help meet relevant climate concerns.";
  private formId:string;
  private recordId:string;
  private appDataLoaded:boolean = false;

  static Constants = {
    MENU_ID : "NDC_Actions",
    permissionMenuId:"",
  };
  routesArr : any;
  public errors:any = {
    noSourceDestination : false
  }
  areaToolTip: string;


  constructor(private formBuilder: FormBuilder,
    private _authService: AuthService,
    private router: Router ,
    private activatedRoute:ActivatedRoute,
    private _snackBar:MatSnackBar,
    private appService:AppService,
    public dialog: MatDialog,
    private utilityService:UtilityServiceService
 ) {
   this.subscription = this.appService.appDataLoadedSubject.subscribe((data)=> {
     console.log("app data loaded  >>>>> ",data);
     console.log("app data loaded  11  >>>>> ",this.appService.getAppDataWithFilter(null,null));
     
     this.appDataLoaded = true;
      this.initArr();
   })
  }
  onAreaChange(selectedArea:string) {
    if(selectedArea == "Principle") {
      this.areaToolTip = this.toolTipPrincipal;
    } else {
      this.areaToolTip = this.toolTipSignificant;
    }
  }
  initArr() {
    console.log("loaded app data in ndc");
    
    this.causeArr = ["Climate Change","Sustainable Development"];//this.appService.getAppDataWithFilter(FormConstants.NDC_CAUSE,FormConstants.VALUE) as string[];
    this.ndcAreaArr = this.appService.getAppDataWithFilter(FormConstants.NDC_AREA,FormConstants.VALUE) as string[];
    this.locationArr = this.appService.getAppDataWithFilter(FormConstants.LOCATION,FormConstants.VALUE) as string[];
    this.fundingArr = this.appService.getAppDataWithFilter(FormConstants.FUNDING,FormConstants.VALUE) as string[];
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


 getPermissionMenuId(){
  this.appService.getRecord(CreateNdcComponent.Constants.MENU_ID).subscribe((res: any)=>{
    if(res.data){
      CreateNdcComponent.Constants.permissionMenuId = res.data.permissionMenuId;
    }
  }, err=>{

  })
}
  ngOnInit() {
    this.approvalScreen = false;
    this.routesArr = [];
    // init form
      this.ndcCreateForm = this.formBuilder.group({
        _id: [''],
        menuId: [''],
        // cause: ['',[Validators.required]],
        division: ['',[Validators.required]],
        sector: ['',[Validators.required]],
        subSector: ['',[Validators.required]],
        area: ['',[Validators.required]],
        projectTitle: ['',[Validators.required]],
        agency: ['',[Validators.required]],
        otherParty: [''],
        lifetime: [''],
        commissioningDate: ['',[Validators.required]],
        approvalDate: ['',[Validators.required]],
        closureDate: ['',[Validators.required]],
        napa: ['',[Validators.required]],
        ndc: ['',[Validators.required]],
        location: ['',[Validators.required]],
        coordinates: [''],
        costAmount: ['',[Validators.required]],
        funding: ['',[Validators.required]],
        remarks: [''],
        updatedBy: [''],
        permissionMenuId: [''],
        // back end properties
        status: [''],
        entity: [''],
        projectCode: [''],
        projectId: [''],
        approverComment:['']


    });
    if(!this.appDataLoaded) {
      setTimeout(()=> { // timeout to load data due to sync issue
        this.initArr();
      },2000)
    }
    this.appService.getNDCSector({outputValue:"type",distinct:"true"})
    .subscribe(response=>{
      this.divisionArr = response.data as string[];
      
    })

    // check routes for record update
    this.formId = this.activatedRoute.snapshot.paramMap.get('formId');
    this.recordId = this.activatedRoute.snapshot.paramMap.get('recordId');
    if(this.formId && this.recordId){
      this.approvalScreen = true;
    }
    if(this.formId) {
      this.appService.getNDC({_id:this.formId})
      .subscribe(response=> {
        if(response.statusCode == 200 && response.data) {
          let keys = Object.keys(response.data);
          let pathValueObj = {};
          keys.forEach(key=> {
            pathValueObj[key] = response.data[key];
          })
          this.ndcCreateForm.patchValue(pathValueObj);
          // re-populate  dropdown
          this.mappingChange('division');
          this.mappingChange('sector')
        }
      })
    }
  }

  mappingChange(type:string) {
    // console.log(this.ndcCreateForm);
    
    switch (type) {
      case "division":
        // call sector
        this.appService.getNDCSector({outputValue:"sector",type:this.ndcCreateForm.controls.division.value,distinct:"true"})
        .subscribe(response=>{
          this.sectorArr = response.data as string[];
          
        })
        break;
      case "sector":
        // call sector
        this.appService.getNDCSector({outputValue:"subSector",type:this.ndcCreateForm.controls.division.value,sector:this.ndcCreateForm.controls.sector.value.join(MRV_INVENTORY_SECTOR_SPLIT),distinct:"true"})
        .subscribe(response=>{
          this.subSectorArr = response.data as string[];
          
        })
        break;
    
      default:
        break;
    }
    
  }
  
  /* addNewRow(){
    this.routesArr.push(
      {
        cause : null,
        division :0,
        sector : 0,
        subSector : null,
        area : null,
        agency : null,
        otherParty : null,
        projectTitle : null,
        lifetime : null,
        napa : null,
        ndc : null,
        location : null,
        coordinates : null,
        costAmount : null,
        funding : null,
        startDate : null,
        endDate : null,
        closureDate : null
       
      }
    )
  } */
  addNewCostFactor(i){
    this.routesArr[i].travelcost.factors.push({name : null, cost:0})
  }
  removeFromList(i) {
    this.routesArr.splice(i, 1);
  }
  invalidTripArray(){
    let noValues = [null, '', undefined];
    if(this.routesArr.length <= 0){
      return true;
    }
    if(this.routesArr.filter(x => noValues.indexOf(x.name) > -1 ||
     noValues.indexOf(x.roadcondition.overallCondition) > -1 ||
     noValues.indexOf(x.wayDetails) > -1 || 
     noValues.indexOf(x.pros) > -1 ||
     noValues.indexOf(x.cons) > -1).length > 0){
      return true;
    }
    if(this.routesArr.filter(z => z.travelcost.factors.filter(x=> noValues.indexOf(x.name) > -1).length > 0).length > 0){
      return true;
    }
    if(this.routesArr.filter(y=>y.intermediateLocation.length <= 0).length > 0){
      return true;
    }
    return false;
  }
  removeFromFactorList(i,j){
    this.routesArr[i].travelcost.factors.splice(j,1);
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass : 'snackbar-global',
      data: {
        message: message,
        action : Action,
        type:type
      }
    });
  }
  customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      let searchString = JSON.parse(filter);
      let nameFound = data.name.toString().trim().toLowerCase().indexOf(searchString.name.toLowerCase()) !== -1
      let sourceFound = data.sourceName.toString().trim().toLowerCase().indexOf(searchString.sourceName.toLowerCase()) !== -1
      let idFound = data.id.toString().trim().toLowerCase().indexOf(searchString.id.toLowerCase()) !== -1
      let destinationFound = data.destinationName.toString().trim().toLowerCase().indexOf(searchString.destinationName.toLowerCase()) !== -1
      let routesFound = data.routesNo.toString().trim().toLowerCase().indexOf(searchString.routesNo.toLowerCase()) !== -1
      if (searchString.topFilter) {
        return nameFound || idFound || sourceFound || destinationFound || routesFound
      } else {
        return nameFound && idFound && sourceFound && destinationFound && routesFound
      }
    }
    return myFilterPredicate;
  }
  applyFilter(filterValue: string) {
    let filter = {
      name: filterValue.trim().toLowerCase(),
      id: filterValue.trim().toLowerCase(),
      sourceName: filterValue.trim().toLowerCase(),
      routesNo: filterValue.trim().toLowerCase(),
      destinationName: filterValue.trim().toLowerCase(),
      topFilter: true
    }
  }


  getTotalCost(i){
    var overAllCost = 0;
    this.routesArr[i].travelcost.factors.forEach(factor=>{
      if(factor.cost){
        overAllCost += parseInt(factor.cost);
      }
    })
    this.routesArr[i].travelcost.totalCost = overAllCost;
    return overAllCost;
  }

  saveNDC(){
    if(this.ndcCreateForm.status == "INVALID") {
      this.ndcCreateForm.markAllAsTouched();
      // this.applyTouchOnFromControl();
      this.openSnackBar('Please fill all the mandatory fields with * mark', 'error');
      return;
    }
    this.ndcCreateForm.controls.menuId.patchValue(CreateNdcComponent.Constants.MENU_ID);
    this.ndcCreateForm.controls.permissionMenuId.patchValue(CreateNdcComponent.Constants.permissionMenuId);
    this.ndcCreateForm.controls.updatedBy.patchValue(JSON.parse(localStorage.getItem('loggedInUser'))._id);
    // check for update
    if(this.formId && !this.recordId) {
      this.ndcCreateForm.controls.status.patchValue("update");
    }
    this.appService.saveNDC(this.ndcCreateForm.value)
    .subscribe(response=> {
      if(response.statusCode == 200) {
        this.openSnackBar(response.message, 'success');
        this.router.navigate(["/dashboard"]);
      }
    })
    /* var obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      activityData: this.dataList.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId : CreateNdcComponent.Constants.MENU_ID,
      permissionMenuId: this.permissionMenuId
    }; */
  }

  updateDataStatus(status){
    
    let obj = {
        status : status,
        _id : this.recordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.ndcCreateForm.controls.approverComment.value
      }

    this.appService.updateDataStatus(obj).subscribe(res=>{
      if(res.statusCode ==200){
        this.ndcCreateForm.reset();
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

