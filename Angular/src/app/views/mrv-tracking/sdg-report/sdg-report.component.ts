import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-sdg-report',
  templateUrl: './sdg-report.component.html',
  styleUrls: ['./sdg-report.component.scss']
})
export class SdgReportComponent implements OnInit {
  @Input() mrvData:any;
  constructor() { }
  //Adaptation Table Details
  tableData:any = [];
  sdgImpacts:any=[];
  tableColumnNames:any = [
    { value: "Quantitative Impacts"},
    { value: "Expected Value"}
  ];
  ngOnInit() {
    //Adaptation Details Table
    // this.tableData = [];
    this.loadAdaptationTable(this.mrvData);
  }
  ngAfterViewInit() {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.loadAdaptationTable(this.mrvData);
  }
  loadAdaptationTable(mrvData){
    this.tableData = [];
    this.sdgImpacts = (mrvData.sdgImpactSummaries) ? Object.values(mrvData.sdgImpactSummaries) : [];
    this.tableColumnNames = [
      { value: "Quantitative Impacts"},
      { value: "Expected Value"}
    ];
    for(let index in mrvData.expectedSdgMap){
      let obj : any = {
        data:[mrvData.sdgCategoryMap[index]]
      }
      this.tableData.push(obj);
      for(let key in mrvData.expectedSdgMap[index]){
        obj = {
          data:[key,mrvData.expectedSdgMap[index][key]]
        }
        this.tableData.push(obj);
      }
    }
    for (let key in mrvData.actualSdgMap) {
      this.tableColumnNames.push({ value: key});
      for(let index in mrvData.actualSdgMap[key]){
        for(let table of this.tableData){
          if(table.data[0] ===  index){
            table.data.push(mrvData.actualSdgMap[key][index]);
          }
        }
      }
    }
    
  }
}
