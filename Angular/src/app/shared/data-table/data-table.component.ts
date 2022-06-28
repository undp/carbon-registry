import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ColumnNameConfig } from './column-name-config';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent implements OnInit {
  @Input() approvalScreen:boolean;
  @Input() dataList: any = [];
  @Input() columnNameConfig: ColumnNameConfig[];
  @Input() newRec: any;
  @Input() dataTableTitle: string;
  @Input() showAddNew:boolean = true;
  @Input() showAction:boolean = true;
  @Input() showDelete:boolean = true;
/* table declarations starts */
displayedColumns = [];
dataSource = new MatTableDataSource(this.dataList);
public selectedData = new SelectionModel<any>(true, []);

private paginator: MatPaginator;
private sort: MatSort;
public tableRows: any = [];
@ViewChild(MatSort, { static: false }) set matSort(ms: MatSort) {
  this.sort = ms;
  this.setDataSourceAttributes();
}

@ViewChild(MatPaginator, { static: false }) set matPaginator(mp: MatPaginator) {
  this.paginator = mp;
  this.setDataSourceAttributes();
}
  constructor() { }

  ngOnInit() {
    console.log("columnNameConfig ",this.columnNameConfig);
    console.log(`@input Details \n dataList: ${this.dataList} \n
    columnNameConfig: ${this.columnNameConfig} \n
    newRec: ${this.newRec} \n
    showAddNew: ${this.showAddNew} \n
    showAction: ${this.showAction} \n
    approvalScreen: ${this.approvalScreen}
    `);
    
    this.displayedColumns = this.columnNameConfig.map(x => x.id);

    if (!this.approvalScreen && this.showAction) {
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');
    }
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.dataList) {
      this.refreshDataList(changes);
    }
  }
  private refreshDataList(changes: SimpleChanges) {
    this.dataList = changes.dataList.currentValue;
    this.dataSource.data = this.dataList;
  }

  /* table code starts */
  addNewDisbursementYearRow() {
    this.dataList.push({...this.newRec});
    this.dataSource.data = this.dataList;
  }
  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleDisbursementYear() {
    this.isAllSelectedDisbursementYear() ?
      this.selectedData.clear() :
      this.dataSource.data.forEach(row => this.selectedData.select(row));
  }
  isAllSelectedDisbursementYear() {
    const numSelected = this.selectedData.selected.length;
    const numRows = this.dataSource.data ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }
  checkboxLabelDisbursementYear(row?: any): string {
    if (!row) {
      return `${this.isAllSelectedDisbursementYear() ? 'select' : 'deselect'} all`;
    }
    return `${this.selectedData.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  removeIndividuallyFromList(ele) {
    this.dataList.splice(ele, 1);
    this.dataSource.data = this.dataList;

  }

  removeSelected() {
    let y = new Set(this.selectedData.selected);
    this.dataList = this.dataList.filter(x => !y.has(x));
    this.dataSource.data = this.dataList;
  }

}
