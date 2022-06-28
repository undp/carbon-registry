import { Component, OnInit, Input, ViewChild} from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-fugitive-emission-table',
  templateUrl: './fugitive-emission-table.component.html',
  styleUrls: ['./fugitive-emission-table.component.scss']
})
export class FugitiveEmissionTableComponent implements OnInit {
  @Input()
  tableData:any;
  constructor() { }
  public tableRows:any = [];
  displayedColumns:any = [];
  dataSource = new MatTableDataSource([]);
  columnNames = [
    { id: "category", value: "Category",type:"label"},
    { id: "subCategory", value: "Sub Category",type:"label"},
    { id: "source", value: "source",type:"label"},
    { id: "efch4", value: "ch4 emission factor",type:"input"},
    { id: "efco2", value: "co2 emission factor",type:"input"},
    { id: "efn2o", value: "no2 emission factor",type:"input"},
    { id: "unit", value: "Unit" ,type:"label"},
    { id: "reference", value: "Reference" ,type:"input"}
  ];
  private paginator: MatPaginator;
  private sort: MatSort;
  @ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
    this.sort = ms;
  }

  @ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
  }
  ngOnInit() {
    this.tableRows = this.tableData;
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    // this.dataSource.data = this.tableRows;
    this.dataSource.paginator = this.paginator;
  }

}
