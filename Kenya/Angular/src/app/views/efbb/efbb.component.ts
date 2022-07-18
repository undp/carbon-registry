import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { ColumnNameConfig } from '../../shared/data-table/column-name-config';
import { SectorDetailsRequest } from '../model/common/sector-details-request';
import { UtilityServiceService } from '../../utility-service.service';
import { MrvConstants } from '../../mrv-constant';

@Component({
  selector: 'app-efbb',
  templateUrl: './efbb.component.html',
  styleUrls: ['./efbb.component.scss']
})
export class EfbbComponent implements OnInit {
  // sector details
  sectorArr:string[] = [];
  categoryArr:string[] = [];
  subSectorArr:string[] = [];
  routeFormId:string;
  routeRecordId:string;

  approvalScreen:boolean = false;
  // data table config
  columnNameConfig: ColumnNameConfig[] = [];
  biomassData: any[] = [];
  newRec:any;
  dataTableTitle:string;

  formGroup: FormGroup;
  remarksCtrl = new FormControl("", [Validators.required]);
  approverCommentCtrl = new FormControl();
  yearList: any;
  

  constructor(
    private readonly _fb: FormBuilder,
    private  utilityService: UtilityServiceService,
    private  _activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private appService: AppService
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
    
  }
  private setDataTableConfig() {
    this.columnNameConfig = [
      {
        id: "initialLandUse",
        value: "Initial Land Use",
        type: "select",
        values: ["Forest Land", "Grass Land", "CropLand", "WetlLands", "Settlements", "Other Lands"],
        placeHolder: "Initial Land Use",
      },
      {
        id: "landUseReportingYear",
        value: "Land Use Reporting Year",
        type: "select",
        values: ["Forest Land", "Grass Land", "CropLand", "WetlLands", "Settlements", "Other Lands"],
        placeHolder: "Land Use Reporting Year",
      },
      {
        id: "subcategory",
        value: "Sub category",
        type: "text",
        placeHolder: "Sub category",
      },
      {
        id: "areaBurnt",
        value: "Area Burnt(ha)",
        type: "number",
        placeHolder: "Area Burnt",
      },
      {
        id: "massFuelAvailable",
        value: "Mass of fuel available for combustion (tonne/Ha)",
        type: "number",
        placeHolder: "Mass of fuel availabled",
      },
      {
        id: "combustionFactor",
        value: "Combustion Factor",
        type: "number",
        placeHolder: "Combustion Facto",
      },
      {
        id: "efCO2",
        value: "EF CO2 (kg/tonne dm burnt)",
        type: "number",
        placeHolder: "EF CO2",
      },
      {
        id: "efNO2",
        value: "EF N2O (kg/tonne dm burnt)",
        type: "number",
        placeHolder: "EF N2O",
      },
      {
        id: "efCH4",
        value: "EF CH4 (kg/tonne dm burnt)",
        type: "number",
        placeHolder: "EF CH4",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "Reference"
      }
    ];
    this.newRec = {
      initialLandUse: "",
      landUseReportingYear: "",
      subcategory: "",
      areaBurnt: 0,
      massFuelAvailable: 0,
      combustionFactor: 0.74,
      efCO2: 1613,
      efNO2: 0.21,
      efCH4: 2.3,
      reference: "",
    };
    this.dataTableTitle = "Biomass Data";
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
      menuId : this.formGroup.controls.menuId.value,
      [type] : value
    };
    // this.dataList = [];
    // this.dataSource.data = this.dataList;
    if (obj) {
    this.appService.getDataRecord(obj).subscribe((res: any) => {
      console.log(res);
      if (res.statusCode == 200 && res.data ) {
        if (type != "_id" && res.data.length) { 
          this.setFormValue(res.data[0]);
          // this.remarksCtrl.setValue(res.data[0].remark);
          
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
    this.biomassData = dataInput.biomassData;
  }
  private buildForm() {
    this.formGroup = this._fb.group({
      menuId: ['', [Validators.required]],
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
      this.utilityService.sectorDetailsForGHGByMenu(payload,(response)=>{
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
    this.formGroup.controls.subSector.patchValue(this.subSectorArr.length ?this.subSectorArr[0] : "");
  }
  getYears() {
    this.appService.getConfigYear('mannual').subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    });
  }
  save() {
    
    if(this.formGroup.status == "INVALID") {
      this.formGroup.markAllAsTouched();
      this.utilityService.openSnackBar(MrvConstants.ERROR_ENTER_REQUIRED,MrvConstants.LOG_ERROR);
      return;
    }
    const obj = {
      inventoryYear: this.formGroup.controls['inventoryYear'].value,
      sector: this.formGroup.controls['sector'].value,
      subSector: this.formGroup.controls['subSector'].value,
      category: this.formGroup.controls['category'].value,
      calculationApproach: this.formGroup.controls['calculationApproach'].value,
      biomassData: this.biomassData,
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
      remark: this.remarksCtrl.value,
      menuId: this.formGroup.controls.menuId.value,
    };

    this.appService.saveRecord(obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.utilityService.openSnackBar(res.message,  MrvConstants.LOG_SUCCESS);
        this.resetData();
      } else {
        this.utilityService.openSnackBar(res.message,  MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message,  MrvConstants.LOG_ERROR);
    });

  }
  resetData() {
    this.formGroup.reset();
    this.populateSectorDetails();
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
