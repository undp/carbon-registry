import { ReportByGasRow } from './../model/reports/report-by-gas-row';
import { ReportByGasReq } from './../model/reports/report-by-gas-req';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiResponseModel } from './../model/api.response.model';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { MRV_GHG_REPORT_TAB } from './../../app.constants';

@Component({
  selector: 'app-ghginventory-yearwise',
  templateUrl: './ghginventory-yearwise.component.html',
  styleUrls: ['./ghginventory-yearwise.component.scss']
})
export class GhginventoryYearwiseComponent implements OnInit {
  public yearList:string[] = [];
  public endYearList:string[] = [];

  public inventoryUnitArr:string[]= [];
  public reportByGasFormGrp:FormGroup;
  public reportByGasData:any;
  public totalChatData: ReportByGasRow;
  constructor(private appService:AppService) { }
  tabs:string[];
  isDataAvailable = false;
  unit:any;
  tab:string = MRV_GHG_REPORT_TAB;
  ghgReportWrapperModel:any;
  columnNames:any = [];
  tableList:any = [];
  chartLevel = [];
  ngOnInit() {
    this.getYears();
    this.getInventoryUnit();
    this.reportByGasFormGrp = new FormGroup({
      fromInventoryYear: new FormControl('',[Validators.required]),
      toInventoryYear: new FormControl('',[Validators.required]),
      inventoryUnit: new FormControl('',[Validators.required]),
    });
  }
  getYears() {
    this.appService.getInventoryYears('file').subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.yearList = res.data;
      }
    }, err => {
      console.error(err);
    });
  }
  getInventoryUnit() {
    var obj = {
      key:"inventoryUnit",
      outputValue:"value"
    }
    this.appService.getAppData(obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        // res.data.pop();
        this.inventoryUnitArr = res.data;
      }
    }, err => {
      console.error(err);
    });
  }
  getReports() {
    this.columnNames = [];
    this.chartLevel = [];
    this.tableList = [];
    this.isDataAvailable = false;
    if(this.reportByGasFormGrp.value.inventoryUnit === 'tCO2e'){
        let column = {
            'id':'A',
            'value':'GHG EMissions (tCO2e)'
        }
        this.unit = 'E';        
        this.columnNames.push(column);
    }
    else{
        let column = {
            'id':'A',
            'value':'GHG EMissions (GgCO2e)'
        }
        this.unit = 'E';
        this.columnNames.push(column);
    }
    let  obj = {
        'reportType':'year',
        'startYear':this.reportByGasFormGrp.value.fromInventoryYear,
        'endYear':this.reportByGasFormGrp.value.toInventoryYear,
    }
    this.appService.getGHGReports(obj).subscribe( (res: ApiResponseModel) => {
        if (res.data && res.data.length > 0) {
            this.ghgReportWrapperModel = res.data;
            for(let item of res.data){
                let objItem = {
                    'id':item.inventoryYear.toString(),
                    'value':item.inventoryYear.toString()
                }
                this.columnNames.push(objItem);
                this.chartLevel.push(item.inventoryYear.toString());
            }
            this.isDataAvailable = true;
            
        } else {
          console.log("No reports found !!!")
        }
      },(err)=> {
        console.error(err)
      });
  }
  updateEndYear(){
      this.endYearList = [];
      for(let year of this.yearList){
          if(year >= this.reportByGasFormGrp.value.fromInventoryYear){
              this.endYearList.push(year);
          }
      }

  }

}
