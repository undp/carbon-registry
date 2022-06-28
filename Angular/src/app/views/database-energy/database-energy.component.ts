import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';

@Component({
  selector: 'app-database-energy',
  templateUrl: './database-energy.component.html',
  styleUrls: ['./database-energy.component.scss']
})
export class DatabaseEnergyComponent implements OnInit {


  dataList: any = [];
  newlyAddedList: any = [];

  fuelTypes: any;
  fuelsByType: any;
  true: boolean = true;
  displayedColumns = [];

  dataSource = new MatTableDataSource(this.dataList);
  newDataSource = new MatTableDataSource(this.newlyAddedList);


  fuelTypeCtrl = new FormControl();
  fuelCtrl = new FormControl();
  ncvCtrl = new FormControl();
  efCO2Ctrl = new FormControl();
  efCH4Ctrl = new FormControl();
  efN2OCtrl = new FormControl();
  referenceCtrl = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  public newSelection = new SelectionModel<any>(true, []);

  columnNames = [
    { id: 'fuelType', value: 'Fuel Type', formControl: this.fuelTypeCtrl },
    { id: 'fuel', value: 'Fuel', formControl: this.fuelCtrl },
    { id: 'ncv', value: 'NCV (TJ/Gg)', formControl: this.ncvCtrl },
    { id: 'efCO2', value: 'CO2 Emission Factor', formControl: this.efCO2Ctrl },
    { id: 'efCH4', value: 'CH4 Emission Factor', formControl: this.efCH4Ctrl },
    { id: 'efN2O', value: 'N2O Emission Factor', formControl: this.efN2OCtrl },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
  ];

  filteredValues = {
    fuelType: '', fuel: '', ncv: '', efCO2: '', efCH4: '', efN2O: '', reference: ''
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
    private readonly appService: AppService) {
    this.dataList = [];
    this.newlyAddedList = [];
    this.dataSource.data = this.dataList;
    this.newDataSource.data = this.newlyAddedList;
    this.loadActivityData();
  }

  loadActivityData() {
    this.dataList = [];
    this.dataSource.data = this.dataList;
      this.appService.getDatabaseEnergyEmissionFactor().subscribe((res: any) => {
        if (res.statusCode === 200 && res.data.emissionFactor) {
          this.dataList = res.data.emissionFactor;
          this.dataSource.data = this.dataList;
        } else {
          this.openSnackBar('No Data Found', 'error');
        }
      }, err => {
        this.openSnackBar('Something went erong... try again later', 'error');
      });
  }


  ngOnInit() {
    this.fuelTypes = [];
    this.fuelsByType = [];
    this.getFuelTypes();
    this.dataList = [];
    this.newlyAddedList = [];

    this.displayedColumns = this.columnNames.map(x => x.id);
      this.displayedColumns.push('actions');
      this.displayedColumns.unshift('select');

    this.dataSource.paginator = this.paginator;
    this.newDataSource = new MatTableDataSource(this.newlyAddedList);

  }

  getFuelTypes() {
    this.appService.getFuelTypes().subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.fuelTypes = res.data;
      }
    }, err => {
    });
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
      fuelType: filterValue.trim().toLowerCase(),
      fuel: filterValue.trim().toLowerCase(),
      ncv: filterValue.trim().toLowerCase(),
      efCO2: filterValue.trim().toLowerCase(),
      efCH4: filterValue.trim().toLowerCase(),
      efN2O: filterValue.trim().toLowerCase(),
      reference: filterValue.trim().toLowerCase(),
      topFilter: true
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  /* getFuelsByType(fuel, id) {
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
  } */

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
      id: x + 1, fuelType: '', fuel: '', ncv: '', efN2O : '', efCO2: '', efCH4: '', reference: '', fuelsByType: []
    });
    this.newDataSource.data = this.newlyAddedList;
  }

  removeIndividuallyFromList(list, ele) {
    if (list === 'exist') {
      this.dataList.splice(ele, 1);
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

  saveElectricityGeneration() {
    const obj = {
      emissionFactor: this.dataSource.data.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
    };
    this.appService.saveDatabaseEnergyEmissionFactor(obj).subscribe((res: any) => {
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
