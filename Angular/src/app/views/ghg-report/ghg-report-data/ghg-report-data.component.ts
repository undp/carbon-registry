import { MatTableDataSource, MatPaginator } from '@angular/material';
import { GhgReportData } from './../models/ghg-report-data';
import { GhgReportWrapperModel } from './../models/ghg-report-wrapper-model';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-ghg-report-data',
  templateUrl: './ghg-report-data.component.html',
  styleUrls: ['./ghg-report-data.component.scss']
})
export class GhgReportDataComponent implements OnInit,OnChanges  {
  @Input()
  tabName:string;

  @Input()
  reportDetailsMap:Map<string,GhgReportData[]>;

  reportData:GhgReportData[];
  columnNames:any[] = [];
  displayedColumns:any = [];
  tableRows = [];
  dataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.reportData = this.reportDetailsMap[this.tabName];
    this.populateDisplayColumns(this.reportData);
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.populateDataSource(this.reportData);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.reportData = changes.reportDetailsMap.currentValue[this.tabName];
    this.populateDataSource(this.reportData);
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

  populateDataSource(reportData){
    this.tableRows = [];
    for(let i=0 ; i< reportData.length;i++){
      if(i <= 2)
        continue;
      let newObj = {
        'A':reportData[i].A || 0,
        'B':reportData[i].B || 0,
        'C':reportData[i].C || 0,
        'D':reportData[i].D || 0,
        'E':reportData[i].E || 0,
        'F':reportData[i].F || 0,
        'G':reportData[i].G || 0,
        'H':reportData[i].H || 0
      }
      let count = reportData[i]['A'].split('-');
      if(count.length > 1){
        if(count[0].trim().length == 1){
          newObj['type'] = "main";
        }else if(count[0].trim().length == 2){
          newObj['type'] = "category";
        }
        else{
          newObj['type'] = "sub-category";
        }
      }
      else{
        newObj['type'] = "main";
      }
      this.tableRows.push(newObj);
    }
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }

}
