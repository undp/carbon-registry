import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../../../../../app.service';
import { MrvConstants } from '../../../../../../mrv-constant';
import { ColumnNameConfig } from '../../../../../../shared/data-table/column-name-config';
import { UtilityServiceService } from '../../../../../../utility-service.service';
import { SnackbarDialogComponent } from '../../../../../modal/snackbar-dialog/snackbar-dialog.component';
import { SectorDetailsRequest } from '../../../../../model/common/sector-details-request';

@Component({
  selector: 'app-ghg-carbonates',
  templateUrl: './ghg-carbonates.component.html',
  styleUrls: ['./ghg-carbonates.component.scss']
})
export class GhgCarbonatesComponent implements OnInit {

  // form
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
  // data table config
  columnNameConfig: ColumnNameConfig[] = [];
  dataList: any[] = [];
  newRec: any;
  dataTableTitle: string;
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
    this.columnNameConfig = [
      {
        id: "use",
        value: "Types of Use",
        type: "text",
        placeHolder: "",
        readonly:true
      },
      {
        id: "carbonateConsumed",
        value: "Mass of Carbonate Consumed (tonnes)",
        type: "number",
        placeHolder: "",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "",
      }
    ];
    this.newRec = {
      use:"",
      carbonateConsumed:0,
      reference:"",
    };
    this.dataTableTitle = "Other Carbonate Data";
  }

  loadActivityData(loadType, value) {
    var obj = {
      menuId: this.formGroup.controls.menuId.value,
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
    this.dataList = [];
    this.appService.getAppData({"key": "carbonateData"})
      .subscribe(response=> {  
        console.log("response data ",response.data);
        let dataList = [];
        response.data.forEach(element=> {
          
          dataList.push({
            use: element.value,
            carbonateConsumed:  0,
            reference: ""
          })
        });
        this.dataList = dataList;
        
      },err=>{
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
      })
  }
  resetData() {
    this.formGroup.reset();
    this.dataList = [];
  }
  setFormValue(data: any) {
    console.log(this.sectorArr, this.categoryArr, this.subSectorArr);

    this.remarkCtrl.patchValue(data.remark);
    this.formGroup.controls.inventoryYear.patchValue(data.inventoryYear);
    this.formGroup.controls.sector.patchValue(data.sector);
    this.formGroup.controls.category.patchValue(data.category);
    this.formGroup.controls.subSector.patchValue(data.subSector);
    this.formGroup.controls.calculationApproach.patchValue(data.calculationApproach);
    this.dataList = data.carbonateData;
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      _id: [''],
      menuId: ['', Validators.required],
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

    if (this.formGroup.status == "INVALID" || this.remarkCtrl.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.remarkCtrl.markAsTouched();
      // this.applyTouchOnFromControl();
      return;
    }
    var obj = {
      inventoryYear: this.formGroup.controls.inventoryYear.value,
      sector: this.formGroup.controls.sector.value,
      subSector: this.formGroup.controls.subSector.value,
      category: this.formGroup.controls.category.value,
      calculationApproach: this.formGroup.controls.calculationApproach.value,

      carbonateData: this.dataList,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarkCtrl.value,
      menuId: this.formGroup.controls.menuId.value,
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
