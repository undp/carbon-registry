import { GhgReportWrapperModel } from './models/ghg-report-wrapper-model';
import { ApiResponseModel } from './../model/api.response.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileUploadModel } from './../shared/file-upload/file-upload-model';
import { AppService } from "./../../app.service";
import { ActivatedRoute } from "@angular/router";
import { MenuModel } from "./../model/common/menu-model";
import { Component, OnInit } from "@angular/core";
import  {
  MRV_GHG_REPORT_TAB
} from "./../../app.constants";
@Component({
  selector: "app-ghg-report",
  templateUrl: "./ghg-report.component.html",
  styleUrls: ["./ghg-report.component.scss"],
})
export class GhgReportComponent implements OnInit {
  menu: MenuModel;
  ghgFileUploadForm: FormGroup;
  ghgReportWrapperModel: GhgReportWrapperModel;
  tabs:string[];
  tab:string = MRV_GHG_REPORT_TAB;
  inventoryYear:number;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private appService: AppService,
    private readonly _fb: FormBuilder,
    private appsrvc :AppService
  ) {}
  yearList: any = [];

  ngOnInit() {
    this.ghgFileUploadForm = this._fb.group({
      ghgReport: [null],
      inventoryYear:[""]
    });
    this.getPermissionMenuId();
    // load report data
    this.yearList = [];
    this.getYears();
  
  }

  getPermissionMenuId() {
    this._activatedRoute.data.subscribe((data) => {
      this.appService.getRecord(data.menuId).subscribe((res: any) => {
        if (res.data) {
          //getting the menu object
          this.menu = res.data as MenuModel;
          
        } else {
          console.error("Invalid menu !!")
        }
      });
    });
  }
  loadGHGReportData() {
    let payload = {
      inventoryYear: this.ghgFileUploadForm.controls.inventoryYear.value
    }
    this.inventoryYear = this.ghgFileUploadForm.controls.inventoryYear.value;
    this.appService.getGHGReports(payload).subscribe( (res: ApiResponseModel) => {
      if (res.data && res.data.length) {
        this.ghgReportWrapperModel = res.data[0] as GhgReportWrapperModel;
        this.tabs = Object.keys(this.ghgReportWrapperModel.data);
      } else {
        console.log("No reports found !!!")
      }
    },(err)=> {
      console.error(err)
    });
  }
  fileUploaded(fileUploadModel:FileUploadModel) {
    console.log("File path received ",fileUploadModel);
    // this.formGroup.controls[fileUploadModel.fieldName].patchValue(fileUploadModel.filePath);
    //this.loadGHGReportData(); // need to check why its not loading table here
    window.location.reload();
  }
  getYears() {
    this.appsrvc.getConfigYear('file').subscribe((res: any) => {
      if (res.statusCode == 200) {
        this.yearList = res.data;
      }
    }, err => {
    })
  }
  getTemplateLink() {
    return this.appService.getTemplateLink();
  }
}
