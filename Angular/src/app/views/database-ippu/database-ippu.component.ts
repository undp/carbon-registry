import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AppService } from '../../app.service';
import { MRV_DATABASE_IPPU_EMMISION_FACTOR } from '../../app.constants';
import { SnackbarDialogComponent } from '../modal/snackbar-dialog/snackbar-dialog.component';
import { UtilityServiceService } from '../../utility-service.service';
import { MrvConstants } from '../../mrv-constant';

@Component({
  selector: 'app-database-ippu',
  templateUrl: './database-ippu.component.html',
  styleUrls: ['./database-ippu.component.scss']
})
export class DatabaseIppuComponent implements OnInit {
  staticJson:any = [
    {
      'sub_sector':'Cement',
      'emissionFactor':'12.0',
      'unit':'tCO2/ton of clinker',
      'reference':'Test1',
    },
    {
      'sub_sector':'Lime',
      'emissionFactor':'12.0',
      'unit':'tCO2/ton of clinker',
      'reference':'Test2',
    }
  ]
  constructor(
    private appService: AppService,
    private utilityService: UtilityServiceService,
    private readonly _snackBar: MatSnackBar
  ) { }
  public tableRows:any = [];
  displayedColumns:any = [];
  dataSource = new MatTableDataSource([]);
  columnNames = [
    { id:"subSector",value:"Sub sector"},
    { id: "emissionFactor", value: "Emission Factor"},
    { id: "unit", value: "Unit"},
    { id: "reference", value: "Reference" }
  ];
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
  ngOnInit() {
    this.displayedColumns = this.columnNames.map(x => x.id);
    this.dataSource = new MatTableDataSource(this.tableRows);
    this.dataSource.paginator = this.paginator;
    this.loadActivityData();
  }
  loadActivityData(){
    this.tableRows = [];
    this.dataSource.data = this.tableRows;
    this.appService.getApi(MRV_DATABASE_IPPU_EMMISION_FACTOR).subscribe((res: any) => {
      if (res.statusCode === 200 && res.data.emissionFactor) {
        this.tableRows = res.data.emissionFactor;
        this.dataSource.data = this.tableRows;
      } else {
        this.utilityService.openSnackBar(MrvConstants.ERROR_NO_DATA, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });
  }
  setDataSourceAttributes(){

  }
  saveIPPUEmissionFactor() {
    const obj = {
      emissionFactor: this.tableRows,
    };
    this.appService.updateIPPUEmissionFactor(obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
        this.tableRows = [];
        this.dataSource.data = this.tableRows;
        this.loadActivityData();
      } else {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_ERROR);
      }
    }, err => {
      this.utilityService.openSnackBar(err.message, MrvConstants.LOG_ERROR);
    });

  }
}
  