import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-adaptation-tracking',
  templateUrl: './adaptation-tracking.component.html',
  styleUrls: ['./adaptation-tracking.component.scss']
})
export class AdaptationTrackingComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  menuId:any = '';
  public categoryList:any = [];
  public selectedCategory:any = [];
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(46, 199, 201)' },
    { backgroundColor: 'rgb(182, 162, 222)' }
  ]
  public barChartData: ChartDataSets[] = [];
  
  constructor(
    private readonly _activatedRoute: ActivatedRoute,
    private appService: AppService
  ) { }

  public tableRows:any = [];
  displayedColumns:any = [];
  dataSource = new MatTableDataSource([]);
  columnNames = [
    { id: "projectId", value: "Project Id"},
    { id: "division", value: "Intervention"},
    { id: "sector", value: "Sector"},
    { id: "agency", value: "Implementing agency" },
    { id: "summary", value: "Impact Summary"},
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
    // this.getReportData();
    this.loadCategory();
  }
  loadCategory(){
    this.categoryList = [];
    this._activatedRoute.data.subscribe(data=> {
      this.menuId = data.menuId;
      let obj:any = {
        'menuId': data.menuId,
        'key':'category'
      }
      this.appService.getAppData(obj).subscribe((res: any)=>{
        if(res.data){
          res.data.forEach((item, index) => {
            let catObj:any = {
              'name':item.value,
              'id':item.value
            }
            this.categoryList.push(catObj);
          })
        }
      }, err=>{
        console.error("getPermissionMenuId  ",err);
      })
    })

  }
  acceptData(data) {
    this.selectedCategory = data;
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  getReportData(){
    let obj:any = {
      'menuId':this.menuId,
      'category':this.selectedCategory.toString()
    }
    this.appService.getReport(obj).subscribe((res: any)=>{
      if(res.data){
        console.log(res.data);
        this.populateData(res.data);
      }
    }, err=>{
      console.error("getPermissionMenuId  ",err);
    })
  }
  populateData(data){
    this.tableRows = [];
    for(let obj of data.adaptationOutputCount.adaptationOutputList){
      if(obj.project != null){
        let newObj = {
          'projectId':obj.project.projectId,
          'division':obj.project.division,
          'sector':obj.project.sector,
          'agency':obj.project.agency,
          'summary':obj.impactSummaries,
        }
        this.tableRows.push(newObj);
      }
    }
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;

    //Load Chat 
    this.barChartLabels = [];
    this.barChartData = [];
    let obj = { data: [], label: 'Number of Projects' };
    for(let key in data.adaptationOutputCount.countMap){
      this.barChartLabels.push(key);
      obj.data.push(data.adaptationOutputCount.countMap[key]);
    }
    this.barChartData.push(obj);
  }

}
