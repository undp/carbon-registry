import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-mitigation-report',
  templateUrl: './mitigation-report.component.html',
  styleUrls: ['./mitigation-report.component.scss']
})
export class MitigationReportComponent implements OnInit {
  @Input() mrvData:any;
  constructor() { }
  //Adaptation Table Details
  public isTableData:boolean = false;
  public tableData:any = [];
  tableColumn:any = [];
  tableColumnNames:any = [
    { id: "summary", value: "Mitigation Summary"},
    { id: "unit", value: "Unit"},
    { id: "expectedValue", value: "Expected Value"}
  ];
  tableDataSource = new MatTableDataSource([]);
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
  setDataSourceAttributes() {
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.sort;
  }
  ngOnInit() {
    //Adaptation Details Table
    this.tableData = [];
    this.tableColumn = this.tableColumnNames.map(x => x.id);
    this.tableDataSource = new MatTableDataSource(this.tableData);
    this.tableDataSource.paginator = this.paginator;
    this.loadMitigationTable(this.mrvData);
  }
  ngAfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.loadMitigationTable(this.mrvData);
  }
  loadMitigationTable(mrvData){
    this.tableData = [];
    this.isTableData = false;
    if(mrvData.mitigationInputIndicatorMap && Object.keys(mrvData.mitigationInputIndicatorMap).length > 0){
      this.isTableData = true;

      for(let index in mrvData.mitigationMonitoringIndicatorMap){
        this.tableColumnNames.push({'id':index,'value':index});
      }
      for (let key in mrvData.mitigationInputIndicatorMap) {
        let i = 0;
        let value = mrvData.mitigationInputIndicatorMap[key];
        let obj:any = {
          "summary":value.indicator,
          "unit":value.unit,
          "expectedValue":value.value
        }
        for(let index in mrvData.mitigationMonitoringIndicatorMap){
          obj[index] = mrvData.mitigationMonitoringIndicatorMap[index][i].value;
        }
        i++;
        this.tableData.push(obj);
      }
      this.tableColumn = this.tableColumnNames.map(x => x.id);
      this.tableDataSource.data = this.tableData;
      this.tableDataSource.paginator = this.paginator;
    }
  }

}
