import { MatTableDataSource, MatPaginator } from '@angular/material';
import { GhgReportData } from '../../ghg-report/models/ghg-report-data';
import { GhgReportWrapperModel } from '../../ghg-report/models/ghg-report-wrapper-model';
import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-report-table-gas',
  templateUrl: './report-table-gas.component.html',
  styleUrls: ['./report-table-gas.component.scss']
})
export class ReportTableGasComponent implements OnInit {
  @Input()
  tabName:string;
  @Input()
  unit:string;
  @Input()
  columnNames:any[];

  @Input()
  reportDetailsMap:Map<string,GhgReportData[]>;

  reportData:GhgReportData[];
  displayedColumns:any = [];
  tableRows = [];
  dataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.reportData = this.reportDetailsMap[this.tabName];
    if(this.columnNames.length === 0){
      this.populateDisplayColumns(this.reportData);
    }
    // this.resetTable();
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.populateDataSource(this.reportData);
  }
  ngOnChanges(changes: SimpleChanges) {
    //this.resetTable();
  }
  resetTable(){
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.populateDataSource(this.reportData);
  }

  populateDisplayColumns(reportData) {
    if(!reportData || reportData.length < 2) {
      console.log("Invalid data fetched !! No valid column present");
      return;
    }
    // take the 2nd index for column data
    let keys = Object.keys(reportData[1]);
    for(var key of keys) {
      this.columnNames.push( { id: key, value: reportData[1][key]})
    }
  }

  populateDataSource(reportData){
    this.tableRows = [];
    for(let i = 0 ; i< reportData.length;i++){
      if(i <= 1)
        continue;
      let newObj:any = {};
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
      for(let j of this.columnNames){
        newObj[j.id] = reportData[i][j.id] || 0;
      }
      this.tableRows.push(newObj);
    }
    console.log(this.tableRows);
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }
}
