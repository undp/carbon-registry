import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-finance-tracking',
  templateUrl: './finance-tracking.component.html',
  styleUrls: ['./finance-tracking.component.scss']
})
export class FinanceTrackingComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(46, 199, 201)' },
    { backgroundColor: 'rgb(182, 162, 222)' }
  ]
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private appService: AppService
  ) { }
  public allYearList:any = [];
  public selectedYear:string = '';
  public tableRows:any = [];
  displayedColumns:any = [];
  dataSource = new MatTableDataSource([]);
  columnNames = [
    { id: "projectId", value: "Project Id"},
    { id: "division", value: "Intervention"},
    { id: "sector", value: "Sector"},
    { id: "agency", value: "Implementing agency" },
    { id: "spent", value: "Budget Spent (USD)"},
    { id: "expected", value: "Expected Budget (USD)"},
  ];
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
  ngOnInit() {
    this.tableRows = [];
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.dataSource.paginator = this.paginator;
    this.loadData();
    this.loadAllYears();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  loadAllYears(){
    this.appService.getInventoryYears().subscribe((res: any)=>{
      if(res.data){
        console.log(res.data);
        this.allYearList = res.data;
      }
    }, err=>{
      console.error("getPermissionMenuId  ",err);
    })
  }
  loadData(){
    this._activatedRoute.data.subscribe(data=> {
      let obj = {
        'menuId':data.menuId,
        'year': this.selectedYear
      }
      this.appService.getReport(obj).subscribe((res: any)=>{
        if(res.data){
          console.log(res.data);
          this.populateData(res.data);
        }
      }, err=>{
        console.error("getPermissionMenuId  ",err);
      })
    })
  }
  populateData(data){
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
    this.tableRows = [];
    this.barChartLabels = [];
    this.barChartLabels.push(data.selectedYear);
    this.barChartLabels.push("Till Date");
    this.barChartData = [];
    data.financeOutputList.forEach((obj, index) => {
      let newObj = {
        'projectId':obj.project.projectId,
        'division':obj.project.division,
        'sector':obj.project.sector,
        'agency':obj.project.agency,
        'spent':obj.monitoringDisbursement,
        'expected':obj.disbursement,
      }
      this.tableRows.push(newObj);
      if(index === 0){
        let obj1 : any = {
          data:[obj.monitoringDisbursement,obj.monitoringDisbursementAllYear],
          label: 'Actual Spend (USD)' 
        }
        this.barChartData.push(obj1);
        let obj2 : any = {
          data:[obj.disbursement, obj.disbursementAllYear],
          label: 'Expected Spend (USD)' 
        }
        this.barChartData.push(obj2);
      }
    });
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }
}
