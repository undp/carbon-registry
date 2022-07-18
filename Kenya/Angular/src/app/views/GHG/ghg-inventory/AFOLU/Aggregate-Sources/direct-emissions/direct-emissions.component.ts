import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../../../app.service';
import { MrvConstants } from '../../../../../../mrv-constant';
import { ColumnNameConfig } from '../../../../../../shared/data-table/column-name-config';
import { UtilityServiceService } from '../../../../../../utility-service.service';
import { SectorDetailsRequest } from '../../../../../model/common/sector-details-request';

@Component({
  selector: 'app-direct-emissions',
  templateUrl: './direct-emissions.component.html',
  styleUrls: ['./direct-emissions.component.scss']
})
export class DirectEmissionsComponent implements OnInit {

  // form
 public subTitle: string;
 public menuId: string;
 public formGroup: FormGroup;
 public yearList: number[];
 public sectorArr: string[] = [];
 public subSectorArr: string[] = [];
 public categoryArr: string[] = [];
 public routeFormId: string;
 public routeRecordId: string;
 remarkCtrl = new FormControl('', [Validators.required]);
 approverCommentCtrl = new FormControl('');
 approvalScreen = false;
 // data table config managedSoilData
 columnNameConfigManagedSoil: ColumnNameConfig[] = [];
 dataListManagedSoil: any[] = [];
 newRecManagedSoil: any;
 dataTableTitleManagedSoil: string;

 // data table config FloodedRiceData
 columnNameConfigFloodedRice: ColumnNameConfig[] = [];
 dataListFloodedRice: any[] = [];
 newRecFloodedRice: any;
 dataTableTitleFloodedRice: string;

  // data table config organicSoilData
  columnNameConfigOrganicSoil: ColumnNameConfig[] = [];
  dataListOrganicSoil: any[] = [];
  newRecOrganicSoil: any;
  dataTableTitleOrganicSoil: string;

  // data table config grazedSoilData
  columnNameConfigGrazedSoil: ColumnNameConfig[] = [];
  dataListGrazedSoil: any[] = [];
  newRecGrazedSoil: any;
  dataTableTitleGrazedSoil: string;


 showAddNew: boolean = false;
 showAction: boolean = false;
 showDelete: boolean = false;
 constructor(private activatedRoute: ActivatedRoute, private appService: AppService,
   private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private router: Router,
   private utilityService: UtilityServiceService) {

 }
 ngOnInit() {
   this.setDataTableConfig();
   // create form 
   this.buildForm();
   // reading details from routeParams
   this.getBasicDataFromRoute();
   // get years
   this.getYears();
   this.checkForApprovalPage();
 }
 checkForApprovalPage() {
   this.approvalScreen = false;
   this.routeFormId = this.activatedRoute.snapshot.paramMap.get('formId');
   this.routeRecordId = this.activatedRoute.snapshot.paramMap.get('recordId');
   if (this.routeFormId) {
     this.approvalScreen = true;
     this.loadActivityData('_id', this.routeFormId);
   }

 }
 private setDataTableConfig() {
   this.columnNameConfigManagedSoil = [
     {
       id: "inputType",
       value: "Anthropogenic N input type",
       type: "text",
       placeHolder: "",
       readonly:true
     },
     {
       id: "amount",
       value: "Amount(kg/yr)",
       type: "number",
       placeHolder: "",
     },
     {
       id: "emissionFactor",
       value: "Emission factor(kg N2O-N Per kg N input)",
       type: "number",
       placeHolder: "",
     },
     {
       id: "reference",
       value: "Reference",
       type: "text",
       placeHolder: "",
     },
   ];
   this.newRecManagedSoil = {
      inputType:"",
      amount:0,
      emissionFactor:0,
      reference:"",
   };
   this.dataTableTitleManagedSoil = "";

   // flooded rice data
   this.columnNameConfigFloodedRice = [
    {
      id: "inputType",
      value: "Anthropogenic N input type",
      type: "text",
      placeHolder: "",
      readonly:true
    },
    {
      id: "amount",
      value: "Amount(kg/yr)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "emissionFactor",
      value: "Emission factor(kg N2O-N Per kg N input)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "reference",
      value: "Reference",
      type: "text",
      placeHolder: "",
    },
  ];
  this.newRecFloodedRice = {
     inputType:"",
     amount:0,
     emissionFactor:0,
     reference:"",
  };
  this.dataTableTitleFloodedRice = "";

  // Organic Soil data
  this.columnNameConfigOrganicSoil = [
    {
      id: "inputType",
      value: "Anthropogenic N input type",
      type: "text",
      placeHolder: "",
      readonly:true
    },
    {
      id: "amount",
      value: "Amount(kg/yr)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "emissionFactor",
      value: "Emission factor(kg N2O-N Per kg N input)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "reference",
      value: "Reference",
      type: "text",
      placeHolder: "",
    },
  ];
  this.newRecOrganicSoil = {
     inputType:"",
     amount:0,
     emissionFactor:0,
     reference:"",
  };
  this.dataTableTitleOrganicSoil = "";

  // Grazed soil data
  this.columnNameConfigGrazedSoil = [
    {
      id: "inputType",
      value: "Anthropogenic N input type",
      type: "text",
      placeHolder: "",
      readonly:true
    },
    {
      id: "amount",
      value: "Amount(kg/yr)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "emissionFactor",
      value: "Emission factor(kg N2O-N Per kg N input)",
      type: "number",
      placeHolder: "",
    },
    {
      id: "reference",
      value: "Reference",
      type: "text",
      placeHolder: "",
    },
  ];
  this.newRecGrazedSoil = {
     inputType:"",
     amount:0,
     emissionFactor:0,
     reference:"",
  };
  this.dataTableTitleGrazedSoil = "";

 }

 loadActivityData(loadType, value) {
   var obj = {
     menuId: this.menuId,
     [loadType]: value
   }
   this.appService.getDataRecord(obj).subscribe((res: any) => {
     if (res.statusCode == 200 && res.data) {
       if (loadType != "_id" && res.data.length) {
         this.setFormValue(res.data[0]);
         // this.remarksCtrl.setValue(res.data[0].remark);

       } else {
         this.setFormValue(res.data);
       }
     } else {
       this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_WARN);
       // crate static rows for datatable
       this.initDataList();
     }
   }, err => {
     this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
   });
 }
 initDataList() {
   this.dataListManagedSoil = [];
   this.appService.getAppData({"key": "directEmission_managedSoil"})
     .subscribe(response=> {  
       console.log("response data ",response.data);
       let dataList = [];
       response.data.forEach(element=> {
         
         dataList.push({
          inputType: element.value,
          amount: element.details ? element.details.amount : 0,
          emissionFactor:  element.details ? element.details.emissionFactor : 0,
           reference: element.details ? element.details.reference : 0,
         })
       });
       this.dataListManagedSoil = dataList;
       
     },err=>{
       this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
     })
     // flooded rice
   this.appService.getAppData({"key": "directEmission_floodedRiceData"})
     .subscribe(response=> {  
       console.log("response data ",response.data);
       let dataList = [];
       response.data.forEach(element=> {
         
         dataList.push({
          inputType: element.value,
          amount: element.details ? element.details.amount : 0,
          emissionFactor:  element.details ? element.details.emissionFactor : 0,
           reference: element.details ? element.details.reference : 0,
         })
       });
       this.dataListFloodedRice = dataList;
       
     },err=>{
       this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
     })

     // organic soil
     this.appService.getAppData({"key": "directEmission_organicSoilData"})
     .subscribe(response=> {  
       console.log("response data ",response.data);
       let dataList = [];
       response.data.forEach(element=> {
         
         dataList.push({
          inputType: element.value,
          amount: element.details ? element.details.amount : 0,
          emissionFactor:  element.details ? element.details.emissionFactor : 0,
           reference: element.details ? element.details.reference : 0,
         })
       });
       this.dataListOrganicSoil = dataList;
       
     },err=>{
       this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
     });

     // grazed soil
     this.appService.getAppData({"key": "directEmission_grazedSoilData"})
     .subscribe(response=> {  
       console.log("response data ",response.data);
       let dataList = [];
       response.data.forEach(element=> {
         
         dataList.push({
          inputType: element.value,
          amount: element.details ? element.details.amount : 0,
          emissionFactor:  element.details ? element.details.emissionFactor : 0,
           reference: element.details ? element.details.reference : 0,
         })
       });
       this.dataListGrazedSoil = dataList;
       
     },err=>{
       this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
     })

 }
 resetData() {
   this.formGroup.reset();
   this.dataListManagedSoil = [];
   this.dataListFloodedRice = [];
   this.dataListOrganicSoil = [];
   this.dataListGrazedSoil = [];
 }
 setFormValue(data: any) {
   console.log(this.sectorArr, this.categoryArr, this.subSectorArr);

   this.remarkCtrl.patchValue(data.remark);
   this.formGroup.controls.inventoryYear.patchValue(data.inventoryYear);
   this.formGroup.controls.sector.patchValue(data.sector);
   this.formGroup.controls.category.patchValue(data.category);
   this.formGroup.controls.subSector.patchValue(data.subSector);
   this.formGroup.controls.calculationApproach.patchValue(data.calculationApproach);
   this.dataListManagedSoil = data.managedSoilData;
   this.dataListFloodedRice = data.floodedRiceData;
   this.dataListOrganicSoil = data.organicSoilData;
   this.dataListGrazedSoil = data.grazedSoilData;
 }

 private buildForm() {
   this.formGroup = this.formBuilder.group({
     _id: [''],
     // menuId: ['', Validators.required],
     inventoryYear: ['', [Validators.required]],
     sector: ['', [Validators.required]],
     subSector: ['', [Validators.required]],
     category: ['', [Validators.required]],
     calculationApproach: ['', [Validators.required]],
     remark: this.remarkCtrl
   });
   
 }

 private getBasicDataFromRoute() {
   this.activatedRoute.data.subscribe(routeData => {
     this.subTitle = routeData.subTitle;
     this.menuId = routeData.menuId;
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
 /*
 * used to populate sector details after db call
 */
 populateSectorDetails() {
   this.formGroup.controls.sector.patchValue(this.sectorArr.length ? this.sectorArr[0] : "");
   this.formGroup.controls.category.patchValue(this.categoryArr.length ? this.categoryArr[0] : "");
   this.formGroup.controls.subSector.patchValue(this.subSectorArr.length ? this.subSectorArr[0] : "");
 }

 getYears() {
   this.appService.getInventoryYears('mannual').subscribe((res: any) => {
     if (res.statusCode == 200) {
       this.yearList = res.data;
     }
   }, err => {
   })
 }

 submit() {
   console.log("formGroup  ", this.formGroup);

   if (this.formGroup.status == "INVALID") {
     this.formGroup.markAllAsTouched();
     this.remarkCtrl.markAsTouched();
     this.utilityService.openSnackBar(MrvConstants.ERROR_ENTER_REQUIRED, MrvConstants.LOG_ERROR);
     return;
   }
   var obj = {
     inventoryYear: this.formGroup.controls.inventoryYear.value,
     sector: this.formGroup.controls.sector.value,
     subSector: this.formGroup.controls.subSector.value,
     category: this.formGroup.controls.category.value,
     calculationApproach: this.formGroup.controls.calculationApproach.value,

     managedSoilData: this.dataListManagedSoil,
     floodedRiceData: this.dataListFloodedRice,
     organicSoilData: this.dataListOrganicSoil,
     grazedSoilData: this.dataListGrazedSoil,
     updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
     remark: this.remarkCtrl.value,
     menuId: this.menuId,
   };

   // console.log(obj);

   this.appService.saveRecord(obj).subscribe((res: any) => {
     this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
     this.resetData();
   }, err => {
     this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
   })
 }



 updateDataStatus(status) {
   let obj = {
     status: status,
     _id: this.routeRecordId,
     approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
     approverComment: this.approverCommentCtrl.value
   }

   this.appService.updateDataStatus(obj).subscribe(res => {
     if (res.statusCode == 200) {
       this.router.navigate(['./my-approvals']);
       this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
     }
     else {
       this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
     }
   }, err => {
     this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
   })
 }
}

  