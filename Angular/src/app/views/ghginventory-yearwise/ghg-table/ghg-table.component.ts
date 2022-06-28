import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { unix } from 'moment';

@Component({
  selector: 'app-ghg-table',
  templateUrl: './ghg-table.component.html',
  styleUrls: ['./ghg-table.component.scss']
})
export class GhgTableComponent implements OnInit,OnChanges {
  @Input()
  tabName:string;
  @Input()
  unit:string;
  @Input()
  columnNames:any[];

  @Input()
  reportDetailsMap:any;
  reportData:any[];
  displayedColumns:any = [];
  tableRows = [];
  dataSource = new MatTableDataSource([]);
  private paginator: MatPaginator;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("changes  ",changes);
    
  }

  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.populateDataSource();
  }

  populateDisplayColumns(reportData) {
    if(!reportData || reportData.length < 2) {
      console.log("Invalid data fetched !! No valid column present");
      return;
    }
    // take the 2nd index for column data
    let keys = Object.keys(reportData[2]);
    for(var key of keys) {
      this.columnNames.push( { id: key, value: reportData[2][key]})
    }
  }

  populateDataSource(){
    console.log(this.reportDetailsMap);
    this.tableRows = [];
    for(let obj of this.reportDetailsMap){
      for(let i = 0 ; i < obj.data[this.tabName].length ; i++){
        if(i <= 2)
          continue;
        let tableItem = obj.data[this.tabName][i];
        let newObj:any = {};
        for(let curObj of this.tableRows){
          if(curObj.A === tableItem['A']){
            newObj = curObj
          }
        }
        if(Object.keys(newObj).length > 0){
          newObj[obj.inventoryYear] = tableItem[this.unit] || 0;
        }else{
          let count = tableItem['A'].split('-');
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
          for(let j = 0; j < this.columnNames.length; j++){
            let column = this.columnNames[j];
            if(j > 0){
              if(column['id'] == obj.inventoryYear){
                newObj[column['id']] = tableItem[this.unit] || 0;
              }
            }
            else {
              newObj[column['id']] = tableItem[column['id']];
            }
          }
          this.tableRows.push(newObj);
        }
      }
    }
    console.log(this.tableRows);
    this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }

}
