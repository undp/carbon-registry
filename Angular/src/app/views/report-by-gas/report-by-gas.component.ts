import { ReportByGasRow } from './../model/reports/report-by-gas-row';
import { ReportByGasReq } from './../model/reports/report-by-gas-req';
import { ApiResponseModel } from './../model/api.response.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from './../../app.service';
import { Component, OnInit } from '@angular/core';
import { GhgReportWrapperModel } from '../ghg-report/models/ghg-report-wrapper-model';
import { MRV_GHG_REPORT_TAB, staticData} from './../../app.constants';


@Component({
  selector: 'app-report-by-gas',
  templateUrl: './report-by-gas.component.html',
  styleUrls: ['./report-by-gas.component.scss']
})
export class ReportByGasComponent implements OnInit {
  public yearList:string[] = [];
  public inventoryUnitArr:string[]= [];
  public reportByGasFormGrp:FormGroup;
  public reportByGasData:any;
  public totalChatData: any;
  // public totalChatData: any;
  constructor(private appService:AppService) { }
  isDataAvailable = false;
  // reportData:any = {};
  tab:string = MRV_GHG_REPORT_TAB;
  columnNames = [
    { id: "A", value: "Inventory Year: 2010"},
    { id: "B", value: "CO2 Emissions"},
    { id: "C", value: "CH4 Emissions"},
    { id: "D", value: "N2O Emissions" },
    { id: '', value:'Total Emmsions(CO2e)'}
    // { id: "category", value: "Inventory Year: 2010"},
    // { id: "CO2", value: "CO2 Emissions"},
    // { id: "CH4", value: "CH4 Emissions"},
    // { id: "N20", value: "N2O Emissions" },
    // { id: 'CO2eq.', value:'Total GHG Emmsions(tCO2e)'}
  ];
  chartLevel = ['CO2','CH4','N2O','CO2eq'];
  ghgReportWrapperModel:GhgReportWrapperModel
  ngOnInit() {
    this.getYears();
    this.getInventoryUnit();
    this.reportByGasFormGrp = new FormGroup({
      inventoryYear: new FormControl('',[Validators.required]),
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
        this.inventoryUnitArr = res.data;
      }
    }, err => {
      console.error(err);
    });
  }
  populateDisplayColumns(reportData) {
    if(!reportData || reportData.length < 2) {
      console.log("Invalid data fetched !! No valid column present");
      return;
    }
    // take the 2nd index for column data
    let keys = Object.keys(reportData[2]);
    console.log("keys ",keys);

    for(var key of keys) {
      this.columnNames.push( { id: key, value: reportData[2][key]})
    }
    console.log("this.columnNames" ,this.columnNames);
  }
  getReports() {
    this.isDataAvailable = false;
    if(this.reportByGasFormGrp.value.inventoryUnit === 'tCO2e'){
      this.columnNames[this.columnNames.length-1].value = 'Total GHG Emmsions(tCO2)';
    }
    else{
      this.columnNames[this.columnNames.length-1].value = 'Total GHG Emmsions(Gg)';
    }
    this.columnNames[0].value = 'Inventory Year: '+ this.reportByGasFormGrp.value.inventoryYear;
    // let  obj = {
    //   'fromYear':this.reportByGasFormGrp.value.inventoryYear,
    //   'toYear':this.reportByGasFormGrp.value.inventoryYear,
    //   'inventoryUnit': this.reportByGasFormGrp.value.inventoryUnit
    // }
    let  obj = {
      'reportType':'gas',
      'inventoryYear':this.reportByGasFormGrp.value.inventoryYear
    }
    this.appService.getGHGReports(obj).subscribe( (res: ApiResponseModel) => {
      if (res.data && res.data.length > 0) {
        console.log(res);
        // this.reportData = res.data[this.reportByGasFormGrp.value.inventoryYear];
        this.ghgReportWrapperModel = res.data[0] as GhgReportWrapperModel;
        let mapData:any;
        if(this.ghgReportWrapperModel.data[this.tab].length > 0){
          this.populateDisplayColumns(this.ghgReportWrapperModel.data[this.tab]);
          mapData = this.ghgReportWrapperModel.data[this.tab][3];
        }
        let dataArray = [];
        for(let item of this.ghgReportWrapperModel.data[this.tab]){
          let count = item['A'].split('-');
          if(count.length === 2){
            let type = count[0].trim();
            if(type == '1' || type == '2' || type == '3' || type == '4'){
              let obj =  {
                'co2': item.B || 0,
                'ch4': item.C || 0,
                'n2o':  item.D || 0,
                'co2eq':  item.E || 0,
                'type' : type
              }
              dataArray.push(obj);
            }
          }
        }
        let obj = {
          'label':'GHG Inventory '+ this.reportByGasFormGrp.value.inventoryUnit,
          'dataArray':dataArray,
          'piData': mapData
        }
        this.totalChatData = obj;
        this.isDataAvailable = true;
      } else {
        console.log("No reports found !!!")
      }
    },(err)=> {
      console.error(err)
    });
  }
}
