import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { AppService } from '../../../../app.service';
import { UtilityServiceService } from '../../../../utility-service.service';
import { MRV_DATABASE_ENERGY_FUGITIVE } from '../../../../app.constants';
import { MrvConstants } from '../../../../mrv-constant';
import { Fugitive } from './fugitive-model';

@Component({
  selector: 'app-fugitive-emission-factor',
  templateUrl: './fugitive-emission-factor.component.html',
  styleUrls: ['./fugitive-emission-factor.component.scss']
})
export class FugitiveEmissionFactorComponent implements OnInit {
  fugitiveGasList: Fugitive[] = [];
  fugitiveOilList: Fugitive[] = [];


  constructor(
    private appService: AppService,
    private utilityService: UtilityServiceService
  ) { }
  ngOnInit() {
    this.appService.getApi(MRV_DATABASE_ENERGY_FUGITIVE).subscribe((response) => {
      if (response.statusCode == 200) {
        this.utilityService.openSnackBar(response.message, MrvConstants.LOG_SUCCESS);
        response.data.emissionFactor = response.data.emissionFactor || [];
        this.getFugitiveByType(response.data.emissionFactor as Fugitive[]);
      }
    }, (error) => {
      this.utilityService.openSnackBar(error.message, MrvConstants.LOG_ERROR);
    })
  }
  getFugitiveByType(fugitiveData: Fugitive[]) {
    fugitiveData.forEach(data => {
      if (data.type == MrvConstants.FUGITIVE_TYPE_GAS) {
        this.fugitiveGasList.push(data);
      } else {
        this.fugitiveOilList.push(data);

      }
    })
  }
  save() {
    const obj = {
      emissionFactor: this.fugitiveGasList.concat(this.fugitiveOilList),
    };
    this.appService.postApi(MRV_DATABASE_ENERGY_FUGITIVE,obj).subscribe((res: any) => {
      if (res.statusCode === 200) {
        this.utilityService.openSnackBar(res.message, MrvConstants.LOG_SUCCESS);
      }
    }, error => {
      this.utilityService.openSnackBar(error.message, MrvConstants.LOG_ERROR);
    })
  }
}
