import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";
import { AppService } from "../../app.service";

@Component({
  selector: 'app-mrv-tracking',
  templateUrl: './mrv-tracking.component.html',
  styleUrls: ['./mrv-tracking.component.scss']
})
export class MrvTrackingComponent implements OnInit {
  mrvDetails:any;
  projectList:any = [];
  selectedProject:any;
  menuId:string = '';
  constructor(
      private activatedRoute: ActivatedRoute,
      private appService: AppService
  ) { }
  //Project Details Table Data
  public projectDetails:any = [];
  public projectDetailsData:any = [
    {'id':'projectTitle','name':'Project Title'},
    {'id':'costAmount','name':'Project Cost (USD)'},
    {'id':'location','name':'Location name'},
    {'id':'agency','name':'Implementing Agency'},
    {'id':'otherParty','name':'Other Party'},
    {'id':'startDate','name':'startDate'},
    {'id':'lifetime','name':'Operation Lifetime'}
  ];
  projectDetailsColumnNames = [
    { id: "position", value: "Sl.No"},
    { id: "indicator", value: "Indicator"},
    { id: "value", value: "Value"}
  ];
  projectDetailsColumn:any = [];
  projectDetailsdataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  private sort: MatSort;
  
  
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes(this.projectDetailsdataSource, this.paginator, this.sort);
  }
  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes(this.projectDetailsdataSource, this.paginator, this.sort);
  }
  setDataSourceAttributes(dataSource, pagination, sort) {
    dataSource.paginator = pagination;
    dataSource.sort = sort;
  }
  ngOnInit() {
    //Project Details Table
    this.projectDetails = [];
    this.projectDetailsColumn = this.projectDetailsColumnNames.map(x => x.id);
    this.projectDetailsdataSource = new MatTableDataSource(this.projectDetails);
    this.projectDetailsdataSource.paginator = this.paginator;
    this.loadProject();
  }
  ngAfterViewInit() {
    this.projectDetailsdataSource.paginator = this.paginator;
  }
  loadProject(){
    this.activatedRoute.data.subscribe((data) => {
        this.menuId = data.menuId;
        this.appService
        .projectByModule(data.moduleName)
        .subscribe((response) => {
          this.projectList = response.data;
        });
    })
  }
  onProjectSelect(project){
    console.log("on select",project);
    this.selectedProject = project.projectId;
  }
  getReport(){
    let obj = {
        'menuId':this.menuId,
        'projectId':this.selectedProject
    }
    this.appService.getReport(obj).subscribe((res: any)=>{
        if(res.data){
            console.log(res.data);
            this.mrvDetails = res.data.mrvOutput;
            this.loadData(res.data);
        }
      }, err=>{
        console.error("getPermissionMenuId  ",err);
      })
  }
  loadData(data){
      console.log("Test ===", this.mrvDetails);
    this.projectDetails = [];
    let mrvData = data.mrvOutput;
    this.projectDetailsData.forEach((item, index) => {
      let obj:any = {
        'position':index+1,
        'indicator':item.name,
        'value':mrvData.project[item.id]
      }
      this.projectDetails.push(obj);
    })
    this.projectDetailsdataSource.data = this.projectDetails;
    this.projectDetailsdataSource.paginator = this.paginator;
  }
}
