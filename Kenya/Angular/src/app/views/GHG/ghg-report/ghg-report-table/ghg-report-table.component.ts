import { Component, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-ghg-report-table',
  templateUrl: './ghg-report-table.component.html',
  styleUrls: ['./ghg-report-table.component.scss']
})
export class GhgReportTableComponent implements OnInit {
  @Input()
  columnNames:any[];
  @Input()
  reportData:any;

  displayedColumns:any = [];
  tableRows = [];
  dataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  constructor() { }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.populateDataSource(this.reportData);
  }
  populateDataSource(reportData){
    this.tableRows = [];
    for(let item in reportData){
      let obj:any = reportData[item];
      obj.category = item;
      let count = item.split('-');
      if(count.length > 1){
        if(count[0].trim().length == 1){
          obj['type'] = "main";
        }else if(count[0].trim().length == 3){
          obj['type'] = "category";
        }
        else{
          obj['type'] = "sub-category";
        }
      }
      else{
        obj['type'] = "main";
      }


      this.tableRows.push(obj);
      this.dataSource.data = this.tableRows;
    }
  }

}
