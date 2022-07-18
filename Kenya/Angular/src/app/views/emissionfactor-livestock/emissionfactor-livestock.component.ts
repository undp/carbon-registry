import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';

@Component({
  selector: 'app-emissionfactor-livestock',
  templateUrl: './emissionfactor-livestock.component.html',
  styleUrls: ['./emissionfactor-livestock.component.scss']
})
export class EmissionfactorLivestockComponent implements OnInit {

  dataList: any = [];
  newlyAddedList: any = [];

  // Table related declarations
  // table related declarations
  true: boolean = true;
  displayedColumns = [];

  dataSource = new MatTableDataSource(this.dataList);
  newDataSource = new MatTableDataSource(this.newlyAddedList);

  livestock = new FormControl();
  efEntericFermentation = new FormControl();
  efManureManagement = new FormControl();
  nExcretionRate = new FormControl();
  typicalAnimalMass = new FormControl();
  nitrogenExcretionManaged = new FormControl();
  efDirectN2OEmissions = new FormControl();
  managedManure = new FormControl();
  fractionOfManagedLivestockNitrogen = new FormControl();
  emissionFactorForN2O = new FormControl();
  referenceCtrl = new FormControl();

  public selection = new SelectionModel<any>(true, []);
  public newSelection = new SelectionModel<any>(true, []);

  columnNames = [
    { id: 'livestock', value: 'Category', formControl: this.livestock },
    { id: 'efEntericFermentation', value: 'EF-Enteric Fermentation (kgCH4/head/year)', formControl: this.efEntericFermentation },
    { id: 'efManureManagement', value: 'EF Manure Management (kgCH4/ head/ year)', formControl: this.efManureManagement },
    { id: 'nExcretionRate', value: 'N Excretion Rate (kgN/ 1000kg animal/ day)', formControl: this.nExcretionRate },
    { id: 'typicalAnimalMass', value: 'Typical Animal Mass (kg)', formControl: this.typicalAnimalMass },
    { id: 'nitrogenExcretionManaged', value: 'Nitrogen Excretion Managed in MMS (fraction)', formControl: this.nitrogenExcretionManaged },
    { id: 'efDirectN2OEmissions', value: 'EF Direct N2O-N Emissions from MMS', formControl: this.efDirectN2OEmissions },
    { id: 'managedManure', value: 'Managed Manure N lost in MMS (%)', formControl: this.managedManure },
    {
      id: 'fractionOfManagedLivestockNitrogen', value: 'Fraction of managed livestock manure nitrogen that volatilises',
      formControl: this.fractionOfManagedLivestockNitrogen
    },
    { id: 'emissionFactorForN2O', value: 'Emission factor for N2O emissions from atmospheric deposition of nitrogen on soils and water surfaces', formControl: this.emissionFactorForN2O },
    { id: 'reference', value: 'Reference', formControl: this.referenceCtrl }
  ];

  filteredValues = {
    livestock: '',
    efEntericFermentation: '',
    efManureManagement: '',
    nExcretionRate: '',
    typicalAnimalMass: '',
    nitrogenExcretionManaged: '',
    efDirectN2OEmissions: '',
    managedManure: '',
    fractionOfManagedLivestockNitrogen: '',
    emissionFactorForN2O: '',
    reference: ''
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
    this.loadActivityData();
  }

  loadActivityData() {
    this.dataList = [];
    this.dataSource.data = this.dataList;
    this.appService.getDatabaseAfoluEmissionFactor().subscribe((res: any) => {
      if (res.statusCode === 200 && res.data) {
        this.dataList = res.data.liveStockData;
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
    this.emissionFactorForN2O.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['emissionFactorForN2O'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.fractionOfManagedLivestockNitrogen.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['fractionOfManagedLivestockNitrogen'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.managedManure.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['managedManure'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.efDirectN2OEmissions.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['efDirectN2OEmissions'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.nitrogenExcretionManaged.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['nitrogenExcretionManaged'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.typicalAnimalMass.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['typicalAnimalMass'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.nExcretionRate.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['nExcretionRate'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.efManureManagement.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['efManureManagement'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.efEntericFermentation.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['efEntericFermentation'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.livestock.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['livestock'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
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
      livestock: filterValue.trim().toLowerCase(),
      efEntericFermentation: filterValue.trim().toLowerCase(),
      efManureManagement: filterValue.trim().toLowerCase(),
      nExcretionRate: filterValue.trim().toLowerCase(),
      typicalAnimalMass: filterValue.trim().toLowerCase(),
      nitrogenExcretionManaged: filterValue.trim().toLowerCase(),
      efDirectN2OEmissions: filterValue.trim().toLowerCase(),
      managedManure: filterValue.trim().toLowerCase(),
      fractionOfManagedLivestockNitrogen: filterValue.trim().toLowerCase(),
      emissionFactorForN2O: filterValue.trim().toLowerCase(),
      reference: filterValue.trim().toLowerCase(),
      topFilter: true
    };
    this.dataSource.filter = JSON.stringify(filter);
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      const searchString = JSON.parse(filter);
      const livestock = data.livestock.toString().trim().toLowerCase().indexOf(searchString.livestock.toLowerCase()) !== -1;
      const emissionFactorForN2O =
       data.emissionFactorForN2O.toString().trim().toLowerCase().indexOf(searchString.emissionFactorForN2O.toLowerCase()) !== -1;
      const fractionOfManagedLivestockNitrogen =
        data.fractionOfManagedLivestockNitrogen.toString().trim().toLowerCase()
          .indexOf(searchString.fractionOfManagedLivestockNitrogen.toLowerCase()) !== -1;
      const managedManure = data.managedManure.toString().trim().toLowerCase().indexOf(searchString.managedManure.toLowerCase()) !== -1;
      const efDirectN2OEmissions =
        data.efDirectN2OEmissions.toString().trim().toLowerCase().indexOf(searchString.efDirectN2OEmissions.toLowerCase()) !== -1;
      const nitrogenExcretionManaged =
        data.nitrogenExcretionManaged.toString().trim().toLowerCase().indexOf(searchString.nitrogenExcretionManaged.toLowerCase()) !== -1;
      const typicalAnimalMass =
        data.typicalAnimalMass.toString().trim().toLowerCase().indexOf(searchString.typicalAnimalMass.toLowerCase()) !== -1;
      const nExcretionRate = data.nExcretionRate.toString().trim().toLowerCase().indexOf(searchString.nExcretionRate.toLowerCase()) !== -1;
      const efManureManagement =
        data.efManureManagement.toString().trim().toLowerCase().indexOf(searchString.efManureManagement.toLowerCase()) !== -1;
      const efEntericFermentation =
        data.efEntericFermentation.toString().trim().toLowerCase().indexOf(searchString.efEntericFermentation.toLowerCase()) !== -1;
      const reference = data.reference.toString().trim().toLowerCase().indexOf(searchString.reference.toLowerCase()) !== -1;
      if (searchString.topFilter) {
        return livestock || efEntericFermentation || efManureManagement || nExcretionRate || typicalAnimalMass || emissionFactorForN2O ||
          nitrogenExcretionManaged || efDirectN2OEmissions || managedManure || fractionOfManagedLivestockNitrogen || reference;
      } else {
        return livestock && efEntericFermentation && efManureManagement && nExcretionRate && typicalAnimalMass && emissionFactorForN2O &&
          nitrogenExcretionManaged && efDirectN2OEmissions && managedManure && fractionOfManagedLivestockNitrogen && reference;
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
      livestock: '',
      efEntericFermentation: '',
      efManureManagement: '',
      nExcretionRate: '',
      typicalAnimalMass: '',
      nitrogenExcretionManaged: '',
      efDirectN2OEmissions: '',
      managedManure: '',
      fractionOfManagedLivestockNitrogen: '',
      emissionFactorForN2O: '',
      reference: ''
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
      liveStockData: this.dataList.concat(this.newlyAddedList),
      updatedBy: JSON.parse(localStorage.getItem('loggedInUser'))._id,
    };
    this.appService.saveDatabaseEmissionFactor(obj).subscribe((res: any) => {
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
