import { MenuModel } from './../model/common/menu-model';
import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';
import { MRV_DATABASE_WASTE_POPULATION } from '../../app.constants';
import { IobwComponent } from '../iobw/iobw.component';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { RNACService } from '../rnac/rnac.service';
import { ColumnNameConfig } from '../../shared/data-table/column-name-config';
import { UtilityServiceService } from '../../utility-service.service';
import { MrvConstants } from '../../mrv-constant';
import { SectorDetailsRequest } from '../model/common/sector-details-request';

@Component({
  selector: 'app-wtd',
  templateUrl: './wtd.component.html',
  styleUrls: ['./wtd.component.scss']
})
export class WtdComponent implements OnInit {
  // sector details
  sectorArr: string[] = [];
  categoryArr: string[] = [];
  subSectorArr: string[] = [];
  routeFormId: string;
  routeRecordId: string;

  approvalScreen: boolean = false;
  // data table config ch4Emissions
  ch4EmissionsColumnNameConfig: ColumnNameConfig[] = [];
  ch4EmissionsData: any[] = [];
  ch4EmissionsNewRec: any;
  ch4EmissionsDataTableTitle: string;
  
  // data table config openBurningData
  n2oEmissionsColumnNameConfig: ColumnNameConfig[] = [];
  n2oEmissionsData: any[] = [];
  n2oEmissionsNewRec: any;
  n2oEmissionsTableTitle: string;

  // data table config openBurningData
  industrialColumnNameConfig: ColumnNameConfig[] = [];
  industrialData: any[] = [];
  industrialNewRec: any;
  industrialTableTitle: string;

  
  showAddNew: boolean = false;
  showAction: boolean = false;
  showDelete: boolean = false;

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
    // ch4Emissions
    this.ch4EmissionsColumnNameConfig = [
      {
        id: "population",
        value: "Population",
        type: "number",
        placeHolder: "Population",
        readonly:true
      },
      {
        id: "degradableOrganic",
        value: "Degradable Organic Component (kgBOD/capita/year)",
        type: "number",
        placeHolder: "Degradable Organic Component",
      },
      {
        id: "correctionFactor",
        value: "Correction Factor for Industrial BOD Discharged in Sewers",
        type: "number",
        placeHolder: "Correction Factor",
      },
      {
        id: "methaneProducing",
        value: "Methane Producing Capacity (kgCH4/kgBOD)",
        type: "number",
        placeHolder: "Methane Producing",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "Reference",
      }
    ];
    this.ch4EmissionsNewRec = {
      population:0,
    degradableOrganic:0,
    correctionFactor:1.25,
    methaneProducing:0.6,
    reference:""
    };
    this.ch4EmissionsDataTableTitle = "Wastewater Treatment and Discharge - CH4 Emissions";
    // n2oEmissions
    this.n2oEmissionsColumnNameConfig = [
      {
        id: "population",
        value: "Population",
        type: "number",
        placeHolder: "Population",
        readonly:true
      },
      {
        id: "perCapitaProtein",
        value: "Per capita Protein Consumption (kg/person/year)",
        type: "number",
        placeHolder: "Per capita Protein",
      },
      {
        id: "nitrogenFraction",
        value: "Nitrogen Fraction in Protein",
        type: "number",
        placeHolder: "Nitrogen Fraction",
      },
      {
        id: "emissionFactor",
        value: "Emission factor (kgN2O-N/kgN)",
        type: "number",
        placeHolder: "Emission factor",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "Reference",
      }
    ];
    this.n2oEmissionsNewRec = {
      population:0,
      perCapitaProtein:0,
      nitrogenFraction:0.16,
      emissionFactor:0.005,
      reference:""
    };
    this.n2oEmissionsTableTitle = "Wastewater Treatment and Discharge - N2O Emissions";

    // industrialWastewater
    this.industrialColumnNameConfig = [
      {
        id: "industrySector",
        value: "Industry Sector",
        type: "text",
        placeHolder: "Industry Sector",
      },
      {
        id: "treatmentType",
        value: "Treatment Type",
        type: "text",
        placeHolder: "Per capita Protein",
      },
      {
        id: "production",
        value: "Production (tonnes/year)",
        type: "number",
        placeHolder: "Production",
      },
      {
        id: "wasteWaterGenerated",
        value: "Waste Water Generated (m3/tonne)",
        type: "number",
        placeHolder: "Waste Water Generated",
      },
      {
        id: "cod",
        value: "COD (kgCOD/m3)",
        type: "number",
        placeHolder: "Emission factor",
      },
      {
        id: "maximumMethaneCapacity",
        value: "Maximum Methane Producing Capacity (kgCH4/kgCOD)",
        type: "number",
        placeHolder: "Methane Producing Capacity",
      },
      {
        id: "methaneCorrectionFactor",
        value: "Methane Correction Factor (fraction)",
        type: "number",
        placeHolder: "Methane Correction Factor",
      },
      {
        id: "sludgeRemoved",
        value: "Sludge Removed (kgCOD/year)",
        type: "number",
        placeHolder: "Sludge Removed",
      },
      {
        id: "methaneRecovered",
        value: "Methane Recovered (kgCH4/year)",
        type: "number",
        placeHolder: "Methane Recovered",
      },
      {
        id: "reference",
        value: "Reference",
        type: "text",
        placeHolder: "Reference",
      }
    ];
    this.industrialNewRec = {
      industrySector:"",
    treatmentType:"",
    production :0,
    wasteWaterGenerated:0,
    cod:0,
    maximumMethaneCapacity:0,
    methaneCorrectionFactor:0,
    sludgeRemoved:0,
    methaneRecovered:0,
    reference:""
    };
    this.industrialTableTitle = "Industrial Wastewater Treatment and Discharge";
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
            this.ch4EmissionsData[0].population = populationData.urbanPopulation + populationData.ruralPopulation;
            this.n2oEmissionsData[0].population = populationData.urbanPopulation + populationData.ruralPopulation;
          }
        });
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }
  initDataList() {
    this.ch4EmissionsData = [];
    this.ch4EmissionsData.push(this.ch4EmissionsNewRec);

    this.n2oEmissionsData = [];
    this.n2oEmissionsData.push(this.n2oEmissionsNewRec);

    this.industrialData = [];
    this.industrialData.push(this.industrialNewRec);
  }
  setFormValue(dataInput: any) {
    // set form values as per object heirarchy
    this.formGroup.patchValue(dataInput);
    // set other values mannually
    this.ch4EmissionsData = dataInput.cH4Emissions;
    this.n2oEmissionsData = dataInput.n2OEmissions;
    this.industrialData = dataInput.industrialData;
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
      cH4Emissions: this.ch4EmissionsData,
      n2OEmissions: this.n2oEmissionsData,
      industrialData: this.industrialData,
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
