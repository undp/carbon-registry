import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';

@Component({
  selector: 'app-gwp-database',
  templateUrl: './gwp-database.component.html',
  styleUrls: ['./gwp-database.component.scss']
})
export class GwpDatabaseComponent implements OnInit {


  dataList: any = [];
  newlyAddedList: any = [];

  // Table related declarations
  // table related declarations
  true: boolean = true;
  displayedColumns = [];

  dataSource = new MatTableDataSource(this.dataList);
  newDataSource = new MatTableDataSource(this.newlyAddedList);

  gas = new FormControl();
  gwp = new FormControl();
  referenceCtrl = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  public newSelection = new SelectionModel<any>(true, []);

  columnNames = [
    { id: 'gas', value: 'Gas Name', formControl: this.gas },
    { id: 'gwp', value: 'GWP', formControl: this.gwp },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
  ];

  filteredValues = {
    gas: '', gwp: '', reference: ''
  };

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

  constructor(
    private readonly _snackBar: MatSnackBar,
    private readonly _router: Router,
    private readonly appService: AppService) {
    this.dataList = [];
    this.newlyAddedList = [];
    this.dataSource.data = this.dataList;
    this.newDataSource.data = this.newlyAddedList;
  }

  loadActivityData() {
    this.dataList = [];
    this.dataSource.data = this.dataList;
      this.appService.getDatabaseIPPUGwp().subscribe((res: any) => {
        if (res.statusCode === 200 && res.data.gwpData) {
          this.dataList = res.data.gwpData;
          this.dataSource.data = this.dataList;
        } else {
          this.openSnackBar('No Data Found', 'error');
        }
      }, err => {
        this.openSnackBar('Something went erong... try again later', 'error');
      });
  }


  ngOnInit() {
    this.dataList = [];
    this.newlyAddedList = [];

    this.displayedColumns = this.columnNames.map(x => x.id);
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');

    this.dataSource.paginator = this.paginator;
    this.newDataSource = new MatTableDataSource(this.newlyAddedList);

    this.referenceCtrl.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['reference'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.gas.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['gas'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.gwp.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['gwp'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.dataSource.filterPredicate = this.customFilterPredicate();
    this.loadActivityData();
  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    const filter = {
      gas: filterValue.trim().toLowerCase(),
      gwp: filterValue.trim().toLowerCase(),
      reference: filterValue.trim().toLowerCase(),
      topFilter: true
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      const searchString = JSON.parse(filter);
      const gas = data.gas.toString().trim().toLowerCase().indexOf(searchString.gas.toLowerCase()) !== -1;
      const gwp = data.gwp.toString().trim().toLowerCase().indexOf(searchString.gwp.toLowerCase()) !== -1;
      const reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
      if (searchString.topFilter) {
        return gas || gwp || reference;
      } else {
        return gas && gwp &&  reference;
      }
    };
    return myFilterPredicate;

  }

  getFuelsByType(fuel, id) {
    this.appService.getFuelByType(fuel).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.newlyAddedList.forEach(element => {
          if (element.id === id) {
            element.fuelsByType = res.data;
          }
        });
      }
    }, err => {

    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isAllNewSelected() {
    const numSelected = this.newSelection.selected.length;
    const numRows = this.newDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
  masterToggleNew() {
    this.isAllNewSelected() ?
      this.newSelection.clear() :
      this.newDataSource.data.forEach(row => this.newSelection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  checkboxLabelNew(row?: any): string {
    if (!row) {
      return `${this.isAllNewSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.newSelection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  addNewRow() {
    const x = this.newlyAddedList.length;
    this.newlyAddedList.push({
      gas: '', gwp: '', reference: ''
    });
    this.newDataSource.data = this.newlyAddedList;
  }

  removeIndividuallyFromList(list, ele) {
    if (list === 'exist') {
      this.dataList.splice(ele, 1);
      this.dataSource.data = [];
      this.dataSource.data = this.dataList;
    }
    if (list === 'new') {
      this.newlyAddedList.splice(ele, 1);
      this.newDataSource.data = this.newlyAddedList;
    }
  }
  removeSelected(list) {
    if (list === 'exist') {
      const y = new Set(this.selection.selected);
      this.dataList = this.dataList.filter(x => !y.has(x));
      this.dataSource.data = this.dataList;
    }
    if (list === 'new') {
      const y = new Set(this.newSelection.selected);
      this.newlyAddedList = this.newlyAddedList.filter(x => !y.has(x));
      this.newDataSource.data = this.newlyAddedList;
    }

  }
  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass: 'snackbar-global',
      horizontalPosition: 'center',
      verticalPosition: 'top',
      data: {
        message: message,
        type: type
      }
    });
  }

  saveGWPRecords() {
    const obj = {
      gwpData: this.dataSource.data.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
    };
    this.appService.saveDatabaseIPPUGwp(obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.openSnackBar(res.message, 'success');
        this.dataList = [];
        this.dataSource.data = this.dataList;
        this.newlyAddedList = [];
        this.newDataSource.data = this.newlyAddedList;
        this.loadActivityData();
      } else {
        this.openSnackBar(res.message, 'error');
      }
    }, err => {
      this.openSnackBar(err.message, 'error');
    });

  }


}
