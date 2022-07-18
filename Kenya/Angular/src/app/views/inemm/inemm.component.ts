import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MrvConstants } from '../../mrv-constant';
import { ColumnNameConfig } from '../../shared/data-table/column-name-config';
import { UtilityServiceService } from '../../utility-service.service';
import { SectorDetailsRequest } from '../model/common/sector-details-request';

@Component({
  selector: 'app-inemm',
  templateUrl: './inemm.component.html',
  styleUrls: ['./inemm.component.scss']
})
export class InemmComponent implements OnInit {
  showAddNew = false;
  showAction = false;
  showDelete = false;
  dataTableTitle;
  newRec;
  columnNameConfig: ColumnNameConfig[];


  formGroup: FormGroup;
  yearList: any;
  dataList: any = [];

  // sector details
  sectorArr: string[] = [];
  categoryArr: string[] = [];
  subSectorArr: string[] = [];
  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  // Table related declarations
  // table related declarations


  private paginator: MatPaginator;
  private sort: MatSort;


  remarksCtrl = new FormControl("",[Validators.required]);
  approverCommentCtrl = new FormControl();

  constructor(private readonly _fb: FormBuilder,
    private readonly _activatedRoute: ActivatedRoute,
    private readonly _snackBar: MatSnackBar,
    private readonly router: Router,
    private utilityService: UtilityServiceService,
    private readonly appService: AppService) {
      this.dataList = [];
  }

  loadActivityData(type, value) {
    const obj: any = {
      menuId : this.formGroup.controls.menuId.value,
      [type] : value
    };
    this.dataList = [];
    if (obj) {
    this.appService.getDataRecord(obj).subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200 && res.data) {
        if (type != "_id" && res.data.length) {
          this.setFormValue(res.data[0]);

        } else {
          this.setFormValue(res.data);
        }
      } else {
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_WARN);
        
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
    }
  }
  setFormValue(dataInput: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(dataInput);
    // set other values mannually
    this.dataList =dataInput.indirectN2OData;
  }
  ngOnInit() {
    this.setDataTableConfig();
    // create form 
    this.buildForm();
    // reading details from routeParams
    this.getBasicDataFromRoute();
    this.getYears();
    this.checkForApprovalPage();

    this.dataList = [];
  }
  checkForApprovalPage() {
    this.approvalScreen = false;
    this.routeFormId = this._activatedRoute.snapshot.paramMap.get('formId');
    this.routeRecordId = this._activatedRoute.snapshot.paramMap.get('recordId');
    if (this.routeFormId) {
      this.approvalScreen = true;
      this.loadActivityData('_id', this.routeFormId);
    }
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
private setDataTableConfig() {
    this.columnNameConfig = [
      {
        id: "category",
        value: "Category",
        type: "text",
        placeHolder: "Category",
        readonly:true
      },
      {
        id: "heads",
        value: "Heads",
        type: "number",
        placeHolder: "Heads",
        readonly:true
      },
      {
        id: "ghgEmissions",
        value: "GHG Emissions (tCO2e)",
        type: "number",
        placeHolder: "GHG Emissions",
        readonly:true
      },
    ];
    this.newRec = {
      category: "",
      heads: 0,
      ghgEmissions: 0,
    };
    this.dataTableTitle = "Manure Management - Indirect N2O Emissions";
    this.showAddNew = false;
  }
  getYears() {
    this.appService.getConfigYear('mannual').subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.yearList = res.data;
      }
    }, err => {
    });
  }

  save() {

    const obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      subSector: this.formGroup.controls['subSector'].value,
      category: this.formGroup.controls['category'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      indirectN2OData: this.dataList,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.formGroup.controls.menuId.value,
    };

    this.appService.saveRecord(obj).subscribe((res: any) => {
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
    this.populateSectorDetails();
    this.dataList = [];
  }
  updateDataStaus(status) {
    const obj = {
        status : status,
        _id : this.routeRecordId,
        approvedBy : JSON.parse(localStorage.getItem('loggedInUser')) ? JSON.parse(localStorage.getItem('loggedInUser'))._id : '',
        approverComment : this.approverCommentCtrl.value
      };

    this.appService.updateDataStatus(obj).subscribe(res => {
      if (res.statusCode === 200) {
        // this.openSnackBar(res.message, 'success');
        this.router.navigate(['./my-approvals']);
      } else {
        // this.openSnackBar(res.message, 'error');
      }
    }, err => {
      // this.openSnackBar(err.message, 'error');
    });
  }

}
