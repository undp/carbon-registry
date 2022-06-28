import { MenuModel } from './../model/common/menu-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MRV_DATABASE_WASTE_POPULATION } from '../../app.constants';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { SolventUseComponent } from '../solvent-use/solvent-use.component';
import { SolventUseService } from '../solvent-use/solvent0use.service';
import { MrvConstants } from '../../mrv-constant';
import { UtilityServiceService } from '../../utility-service.service';
import { ColumnNameConfig } from '../../shared/data-table/column-name-config';
import { SectorDetailsRequest } from '../model/common/sector-details-request';

@Component({
  selector: 'app-solidwaste-disposal',
  templateUrl: './solidwaste-disposal.component.html',
  styleUrls: ['./solidwaste-disposal.component.scss']
})
export class SolidwasteDisposalComponent implements OnInit {
  // sector details
  sectorArr: string[] = [];
  categoryArr: string[] = [];
  subSectorArr: string[] = [];
  routeFormId: string;
  routeRecordId: string;

  approvalScreen: boolean = false;
  // data table config
  columnNameConfig: ColumnNameConfig[] = [];
  solidWasteData: any[] = [];
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
        id: "urbanPopulation",
        value: "Urban Population",
        type: "number",
        placeHolder: "Urban Population",
        readonly:true
      },
      {
        id: "wastePerCapita",
        value: "Waste Per Capita (kg/capita/year)",
        type: "number",
        placeHolder: "Waste PerCapita",
      },
      {
        id: "fractionOfWaste",
        value: "Fraction of waste going to SWDS",
        type: "number",
        placeHolder: "Fraction Of Waste",
      },
      {
        id: "cH4Generation",
        value: "CH4 Generation per ton of waste (kg/tonne)",
        type: "number",
        placeHolder: "cH4 Generation",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "reference",
      }
    ];
    this.newRec = {
      urbanPopulation: 0,
      wastePerCapita: 0,
      fractionOfWaste: 0.69,
      cH4Generation: 0,
      reference: "",
    };
    this.dataTableTitle = "Solid Waste Data";
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
        // call to get population details for the selected year.
        this.getWastePopulationByYear(this.formGroup.controls.inventoryYear.value);
      }, err => {
        this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
      });
    }
  }
  getWastePopulationByYear(inventoryYear: number) {
    
    this.appSrvc.getApi(MRV_DATABASE_WASTE_POPULATION).subscribe((res: any) => {
      
      if (res.statusCode == 200 && res.data) {
        // set the urban population in datalist by selected inventory year
        res.data.populationData.forEach(populationData => {
          if(populationData.inventoryYear == inventoryYear) {
            this.solidWasteData[0].urbanPopulation = populationData.urbanPopulation;
          }
        });
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }
  initDataList() {
    this.solidWasteData = [];
    this.solidWasteData.push(this.newRec);
  }
  setFormValue(dataInput: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(dataInput);
    // set other values mannually
    this.solidWasteData = dataInput.solidWasteData;
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
      solidWasteData: this.solidWasteData,
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
