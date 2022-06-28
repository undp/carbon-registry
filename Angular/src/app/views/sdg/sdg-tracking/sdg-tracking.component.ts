import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from '../../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sdg-tracking',
  templateUrl: './sdg-tracking.component.html',
  styleUrls: ['./sdg-tracking.component.scss']
})
export class SdgTrackingComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartColors: Color[] = [
    { backgroundColor: 'rgb(46, 199, 201)' }
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
  public menuId:string = '';
  public categoryList:any = [];
  public selectedCategory:any = [];

  public tableRows:any = [];
  displayedColumns:any = [];
  dataSource = new MatTableDataSource([]);
  columnNames = [
    { id: "projectId", value: "Project Id"},
    { id: "division", value: "Intervention"},
    { id: "sector", value: "Sector"},
    { id: "agency", value: "Implementing agency" },
    { id: "stakeholderEngagement", value: "Stackholder Consulation" },
    { id: "impactSummaries", value: "Impact Summary"},
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
    this.loadCategory();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  acceptData(data) {
    this.selectedCategory = data;
  }
  loadCategory(){
    this.categoryList = [];
    this._activatedRoute.data.subscribe(data=> {
      let obj:any = {
        'menuId': data.menuId,
        'key':'category'
      }
      this.menuId = data.menuId;
      this.appService.getAppData(obj).subscribe((res: any)=>{
        if(res.data){
          res.data.forEach((item, index) => {
            let catObj:any = {
              'name':item.label,
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
  loadData(){
    console.log('this.selectedCategory====', this.selectedCategory);
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
    for(let obj of data.sdgOutputCount.sdgOutputList){
      let newObj = {
        'projectId':obj.project.projectId,
        'division':obj.project.division,
        'sector':obj.project.sector,
        'agency':obj.project.agency,
        'stakeholderEngagement':obj.stakeholderEngagement,
        'impactSummaries':obj.impactSummaries,
      }
      this.tableRows.push(newObj);
    }
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
    // To Delegate the Graph information
    this.barChartLabels = [];
    this.barChartData = [];
    let countData = data.sdgOutputCount.countMap;
    let graphData:any = [];
    Object.keys(countData).forEach((key) => {
      this.barChartLabels.push(key);
      graphData.push(countData[key]);
    });
    this.barChartData = [
      { data: graphData, label: 'Number of Projects' }
    ]
  }
}
