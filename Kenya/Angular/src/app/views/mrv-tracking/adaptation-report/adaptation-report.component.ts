import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-adaptation-report',
  templateUrl: './adaptation-report.component.html',
  styleUrls: ['./adaptation-report.component.scss']
})
export class AdaptationReportComponent implements OnInit {
  @Input() mrvData:any;
  constructor() { }
  //Adaptation Table Details
  public isAdaptationData:boolean = false;
  public adaptationDetails:any = [];
  adaptationDetailsColumn:any = [];
  adaptationDetailsColumnNames:any = [
    { id: "impacts", value: "Quantitative Impacts"},
    { id: "expectedValue", value: "Expected Value"}
  ];
  adaptationDetailsdataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.resetTable();
  }
  setDataSourceAttributes() {
    this.adaptationDetailsdataSource.paginator = this.paginator;
    this.adaptationDetailsdataSource.sort = this.sort;
  }
  resetTable(){
    this.adaptationDetailsColumnNames = [
      { id: "impacts", value: "Quantitative Impacts"},
      { id: "expectedValue", value: "Expected Value"}
    ];
    this.adaptationDetails = [];
    this.adaptationDetailsColumn = this.adaptationDetailsColumnNames.map(x => x.id);
    this.adaptationDetailsdataSource = new MatTableDataSource(this.adaptationDetails);
    this.adaptationDetailsdataSource.paginator = this.paginator;
    this.loadAdaptationTable(this.mrvData);
  }
  ngOnInit() {
    this.resetTable();
    //Adaptation Details Table
  }
  ngAfterViewInit() {
    this.adaptationDetailsdataSource.paginator = this.paginator;
  }
  loadAdaptationTable(mrvData){
    this.adaptationDetails = [];
    this.isAdaptationData = false;
    if(mrvData.expectedAdapMap && Object.keys(mrvData.expectedAdapMap).length > 0){
      this.isAdaptationData = true;
      if(mrvData.actualAdapMap && Object.keys(mrvData.actualAdapMap).length > 0){
        for(let index in mrvData.actualAdapMap){
          this.adaptationDetailsColumnNames.push({'id':index,'value':index});
        }
      }
      for (let key in mrvData.expectedAdapMap) {
        let obj :any = {
          "impacts":key,
          "expectedValue" :'',
        }
        this.adaptationDetails.push(obj);
        for(let index in mrvData.expectedAdapMap[key]){
          let value = mrvData.expectedAdapMap[key][index];
          let obj:any = {
            "impacts":index,
            "expectedValue":value
          }
          for(let item in mrvData.actualAdapMap){
            obj[item] = mrvData.actualAdapMap[item][index];
          }
          this.adaptationDetails.push(obj);
        }
      }
      this.adaptationDetailsColumn = this.adaptationDetailsColumnNames.map(x => x.id);
      this.adaptationDetailsdataSource.data = this.adaptationDetails;
      this.adaptationDetailsdataSource.paginator = this.paginator;
    }
  }

}
