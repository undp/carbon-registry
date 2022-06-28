import { Component, OnInit, ViewChild, Input, SimpleChanges } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-finance-report',
  templateUrl: './finance-report.component.html',
  styleUrls: ['./finance-report.component.scss']
})
export class FinanceReportComponent implements OnInit {
  @Input() mrvData:any;
  constructor() { }
  //Finance Table Details
  public financeDetails:any = [];
  financeDetailsColumn:any = [];
  financeDetailsColumnNames:any = [
    { id: "financeData", value: "Finance Data"},
  ];
  financeDetailsdataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort4(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator4(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  setDataSourceAttributes() {
    this.financeDetailsdataSource.paginator = this.paginator;
    this.financeDetailsdataSource.sort = this.sort;
  }
  ngOnInit() {
    //Adaptation Details Table
    this.resetTable();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.resetTable();
  }
  resetTable(){
    this.financeDetailsColumnNames = [
      { id: "financeData", value: "Finance Data"},
    ];
    this.financeDetails = [];
    this.financeDetailsColumn = this.financeDetailsColumnNames.map(x => x.id);
    this.financeDetailsdataSource = new MatTableDataSource(this.financeDetails);
    this.financeDetailsdataSource.paginator = this.paginator;
    this.loadData();
  }
  ngAfterViewInit() {
    this.financeDetailsdataSource.paginator = this.paginator;
  }
  loadData(){
    this.financeDetails = [];
    if(this.mrvData && Object.keys(this.mrvData).length > 0){
      let obj:any = {
        'financeData':'Amount Spent (USD)'
      }
      let obj1:any = {
        'financeData':'Expected Spend (USD)'
      }
      this.mrvData.financeYears.sort();
      for(let index of this.mrvData.financeYears){
        let name = (index) ? ''+index:'';
        this.financeDetailsColumnNames.push({'id':name,'value':name});
        obj[index] = (this.mrvData.financeMonitoringMap[index]) ? this.mrvData.financeMonitoringMap[index]: '' ;
        obj1[index] = (this.mrvData.disbursementMap[index]) ? this.mrvData.disbursementMap[index] : '';
      }
      this.financeDetailsColumn = this.financeDetailsColumnNames.map(x => x.id);
      this.financeDetails.push(obj);
      this.financeDetails.push(obj1);
      this.financeDetailsdataSource.data = this.financeDetails;
      this.financeDetailsdataSource.paginator = this.paginator;
    }
  }

}
