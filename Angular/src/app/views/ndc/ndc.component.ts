import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';

@Component({
  selector: 'app-ndc',
  templateUrl: './ndc.component.html',
  styleUrls: ['./ndc.component.scss']
})
export class NdcComponent implements OnInit {

  public selection = new SelectionModel<any>(true, []);

  yearList: any;
  fuelTypes: any;
  fuelsByType: any;

  routeFormId: string;
  routeRecordId: string;
  approvalScreen: boolean;

  remarksCtrl = new FormControl();
  approverCommentCtrl = new FormControl();


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }

  public dataList: any = [];
  displayedColumns = [];
  dataSource = new MatTableDataSource([]);

  projectId = new FormControl();
  division = new FormControl();
  sector = new FormControl();
  subSector = new FormControl();
  agency = new FormControl();
  commissioningDate = new FormControl();
  columnNames = [
    { id: "projectId", value: "Project Id", formControl: this.projectId },
    { id: "division", value: "Intervention", formControl: this.division },
    { id: "sector", value: "Sector", formControl: this.sector },
    { id: "subSector", value: "Sub Sector", formControl: this.subSector },
    { id: "agency", value: "Implementing Agency", formControl: this.agency },
    { id: "commissioningDate", value: "Commissioning Date", formControl: this.commissioningDate }
  ];
  filteredValues = { projectId: '', division: '', sector: '', subSector: '', agency: '', commissioningDate: '' };


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

  constructor(private router: Router, private appService: AppService, private _snackBar: MatSnackBar) {

  }

  goToItem(item) {
    this.router.navigate(['NDC_Actions/'+ item._id]);
  }

  ngOnInit() {
    this.dataList = [];
    this.loadData();
    this.displayedColumns = this.columnNames.map(x => x.id);

    this.displayedColumns.push('actions');
    // this.displayedColumns.unshift('select');


    this.dataSource = new MatTableDataSource(this.dataList);
    this.dataSource.paginator = this.paginator;

    this.projectId.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['projectId'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.division.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['division'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.sector.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['sector'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.subSector.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['subSector'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.agency.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['agency'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });
    this.commissioningDate.valueChanges.subscribe((positionFilterValue) => {
      this.filteredValues['commissioningDate'] = positionFilterValue;
      this.dataSource.filter = JSON.stringify(this.filteredValues);
      this.filteredValues['topFilter'] = false;
      this.dataSource.filterPredicate = this.customFilterPredicate();
    });

    this.dataSource.filterPredicate = this.customFilterPredicate();
  }

  loadData() {
    this.dataList = [];
    this.dataSource.data = this.dataList;
    this.appService.getNDCActionList().subscribe((res: any) => {
      // please create getNdcData service in appService
      if (res.statusCode == 200 && res.data) {
        console.log(res);
        this.dataList = res.data;
        console.log(this.dataList);
        this.dataSource.data = this.dataList;
      }
    }, err => {

    })
  }

  gotouserdetaillist(user) {
    sessionStorage.setItem('current-user', JSON.stringify(user));
    this.router.navigate(['/user/user-details']);
  }

  applyFilter(filterValue: string) {
    let filter = {
      projectId: filterValue.trim().toLowerCase(),
      division: filterValue.trim().toLowerCase(),
      sector: filterValue.trim().toLowerCase(),
      ector: filterValue.trim().toLowerCase(),
      agency: filterValue.trim().toLowerCase(),
      commissioningDate: filterValue.trim().toLowerCase(),
      topFilter: true
    }
    this.dataSource.filter = JSON.stringify(filter)
  }

  public customFilterPredicate() {
    const myFilterPredicate = function (data: any, filter: string): boolean {
      let searchString = JSON.parse(filter);
      let projectIdFound = data.projectId.toString().trim().toLowerCase().indexOf(searchString.projectId.toLowerCase()) !== -1
      let divisionFound = data.division.toString().trim().toLowerCase().indexOf(searchString.division.toLowerCase()) !== -1
      let sectorFound = data.sector.toString().trim().toLowerCase().indexOf(searchString.sector.toLowerCase()) !== -1
      let subSectorFound = data.subSector.toString().trim().toLowerCase().indexOf(searchString.subSector.toLowerCase()) !== -1
      let agencyFound = data.agency.toString().trim().toLowerCase().indexOf(searchString.agency.toLowerCase()) !== -1
      let commissioningDateFound = data.commissioningDate.toString().trim().toLowerCase().indexOf(searchString.commissioningDate.toLowerCase()) !== -1
      if (searchString.topFilter) {
        return projectIdFound || divisionFound || sectorFound || agencyFound || subSectorFound || commissioningDateFound
      } else {
        return projectIdFound && divisionFound && sectorFound && agencyFound && subSectorFound || commissioningDateFound
      }
    }
    return myFilterPredicate;

  }

  goToNewNDC() {
    this.router.navigate(['/NDC_Actions']);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  removeIndividuallyFromList(ele, element) {
    this.appService.deleteNDC(element._id).subscribe((res: any)=>{
      if (res.statusCode == 200 ){
        this.dataList.splice(ele, 1);
        this.dataSource.data = this.dataList;
        this.openSnackBar('Deleted Successfully', 'success');
      }
    }, err=>{
    })
  }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass : 'snackbar-global',
      horizontalPosition : 'center',
      verticalPosition : 'top',
      data: {
        message: message,
        type:type
      }
    });
  }

  removeSelected(list) {
    if (list == 'exist') {
      let y = new Set(this.selection.selected);
      this.dataList = this.dataList.filter(x => !y.has(x));
      this.dataSource.data = this.dataList;
    }
  }
}