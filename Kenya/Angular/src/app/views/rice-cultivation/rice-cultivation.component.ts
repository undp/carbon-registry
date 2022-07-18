import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MrvConstants } from '../../mrv-constant';
import { ColumnNameConfig } from '../../shared/data-table/column-name-config';
import { UtilityServiceService } from '../../utility-service.service';
import { AppDataModel } from '../model/common/app-data-model';
import { SectorDetailsRequest } from '../model/common/sector-details-request';

@Component({
  selector: 'app-rice-cultivation',
  templateUrl: './rice-cultivation.component.html',
  styleUrls: ['./rice-cultivation.component.scss']
})
export class RiceCultivationComponent implements OnInit {
  // sector details
  sectorArr: string[] = [];
  categoryArr: string[] = [];
  subSectorArr: string[] = [];
  routeFormId: string;
  routeRecordId: string;

  approvalScreen: boolean = false;
  // data table config
  columnNameConfig: ColumnNameConfig[] = [];
  riceData: any[] = [];
  newRec: any;
  dataTableTitle: string;
  showAddNew: boolean = false;
  showAction:boolean = false;
  showDelete:boolean = false;

  formGroup: FormGroup;
  remarksCtrl = new FormControl("", [Validators.required]);
  approverCommentCtrl = new FormControl();

  yearList: any;
  constructor(
    private readonly _fb: FormBuilder,
    private appSrvc: AppService,
    private _activatedRoute: ActivatedRoute,
    private utilityService: UtilityServiceService,
    private router: Router,
  ) {

  }

  ngOnInit() {



    this.setDataTableConfig();
    // create form 
    this.buildForm();
    // reading details from routeParams
    this.getBasicDataFromRoute();
    this.getYears();
    this.checkForApprovalPage();
    this.getYears();
  }
  private setDataTableConfig() {
    this.columnNameConfig = [
      {
        id: "ecosystem",
        value: "Ecosystem",
        type: "text",
        placeHolder: "",
        readonly:true
      },
      {
        id: "upland",
        value: "Upland",
        type: "number",
        placeHolder: "",
      },
      {
        id: "irrigated",
        value: "Irrigated",
        type: "text",
        placeHolder: "",
      },
      {
        id: "rainfed",
        value: "Rainfed",
        type: "text",
        placeHolder: "",
      },
      {
        id: "deepwater",
        value: "Deep water",
        type: "text",
        placeHolder: "",
      }
    ];
    this.newRec = {
      ecosystem: "",
      upland: 0,
      irrigated: 0,
      rainfed: "",
      deepwater: "",
    };
    this.dataTableTitle = "Rice Data";
  }

  private checkForApprovalPage() {
    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }
  }
  loadActivityData(type, value) {
    const obj: any = {
      menuId: this.formGroup.controls.menuId.value,
      [type]: value
    };
    // this.dataList = [];
    // this.dataSource.data = this.dataList;
    if (obj) {
      this.appSrvc.getDataRecord(obj).subscribe((res: any) => {
        console.log(res);
        if (res.statusCode == 200 && res.data) {
          if (type != "_id" && res.data.length) {
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
  }
  initDataList() {
    this.appSrvc.getAppData({"key": "riceCultivation"})
      .subscribe(response=> {  
        console.log("response data ",response.data);
        let riceData = [];
        response.data.forEach(element=> {
          
          riceData.push({
            ecosystem: element.value,
            upland: element.details ? element.details.upland : 0,
            irrigated: element.details ? element.details.irrigated : 0,
            rainfed: element.details ? element.details.rainfed : 0,
            deepwater: element.details ? element.details.deepwater : 0,
          })
        });
        this.riceData = riceData;
        
      },err=>{
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
      })
  }
  setFormValue(dataInput: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(dataInput);
    // set other values mannually
    this.riceData = dataInput.riceData;
  }

  private buildForm() {
    this.formGroup = this._fb.group({
      menuId: [null, [Validators.required]],
      inventoryYear: [null, [Validators.required]],
      sector: [null, [Validators.required]],
      category: [null, [Validators.required]],
      subSector: [null, [Validators.required]],
      calculationApproach: [null, [Validators.required]],
      remark: this.remarksCtrl
    })
  }
  private getBasicDataFromRoute() {
    this._activatedRoute.data.subscribe(routeData => {
      this.formGroup.controls.menuId.patchValue(routeData.menuId);
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
  populateSectorDetails() {
    this.formGroup.controls.sector.patchValue(this.sectorArr.length ? this.sectorArr[0] : "");
    this.formGroup.controls.category.patchValue(this.categoryArr.length ? this.categoryArr[0] : "");
    this.formGroup.controls.subSector.patchValue(this.subSectorArr.length ? this.subSectorArr[0] : "");
  }
  getYears() {
    this.appSrvc.getConfigYear('mannual').subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    });
  }
  save() {

    if (this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.utilityService.openSnackBar(MrvConstants.ERROR_ENTER_REQUIRED, MrvConstants.LOG_ERROR);
      return;
    }
    const obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      subSector: this.formGroup.controls['subSector'].value,
      category: this.formGroup.controls['category'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      riceData: this.riceData,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.formGroup.controls.menuId.value,
    };

    this.appSrvc.saveRecord(obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.resetData();
      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });

  }
  resetData() {
    this.formGroup.reset();
    this.initDataList();
    this.populateSectorDetails();
  }
  updateDataStaus(status) {
    const obj = {
      status: status,
      _id: this.routeRecordId,
      approvedBy: JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
      approverComment: this.approverCommentCtrl.value
    };

    this.appSrvc.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode === 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.router.navigate(['./my-approvals']);
      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }

}
