import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from '../../../app.service';
import { StickyDirection } from '@angular/cdk/table';

@Component({
  selector: 'app-mitigation-tracking',
  templateUrl: './mitigation-tracking.component.html',
  styleUrls: ['./mitigation-tracking.component.scss']
})
export class MitigationTrackingComponent implements OnInit {
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private appService: AppService
  ) { }

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(46, 199, 201)' },
    { backgroundColor: 'rgb(182, 162, 222)' }
  ]
  public barChartLabels: any = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
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
    { id: "emisionAchived", value: "Emission Reductions Achieved (tCO2e)"},
    { id: "emisionExpected", value: "Emission Reductions Expected (tCO2e)"},
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
    this.loadAllYears();
    this.tableRows = [];
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.dataSource.paginator = this.paginator;
    // this.loadData()
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
    this.tableRows = [];
    let graphObj:any = {
      mitigationExpected:0,
      mitigationAchivd:0,
      mitigationExpectedAll:0,
      mitigationAchivdAll:0,
    }
    this.barChartLabels = [];
    this.barChartLabels.push(data.selectedYear);
    this.barChartLabels.push("Till Date");
    this.barChartData = [];
    data.mitigationOutputList.forEach((obj, index) => {
      let newObj = {
        'projectId':obj.project.projectId,
        'division':obj.project.division,
        'sector':obj.project.sector,
        'agency':obj.project.agency,
        'emisionAchived':obj.mitigationMonitoringGHG,
        'emisionExpected':obj.mitigationInputGHG,
      }
      this.tableRows.push(newObj);
      graphObj.mitigationExpected = graphObj.mitigationExpected + obj.mitigationInputGHG;
      graphObj.mitigationExpectedAll = graphObj.mitigationExpectedAll + obj.mitigationInputAllYearGHG;
      graphObj.mitigationAchivd = graphObj.mitigationAchivd + obj.mitigationMonitoringGHG;
      graphObj.mitigationAchivdAll = graphObj.mitigationAchivdAll + obj.mitigationMonitoringGHGAllYears;
    });
    let obj1 = {
      data:[graphObj.mitigationAchivd, graphObj.mitigationAchivdAll],
      label: 'GHG Emissions Achieved (tCO2e)' 
    }
    this.barChartData.push(obj1);
    let obj2 = {
      data:[graphObj.mitigationExpected, graphObj.mitigationExpectedAll],
      label: 'GHG Emissions Expected (tCO2e)' 
    }
    this.barChartData.push(obj2);
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }
}
