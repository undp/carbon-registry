import { ApiResponseModel } from './views/model/api.response.model';
import { Action } from 'rxjs/internal/scheduler/Action';
import { MatSnackBar } from '@angular/material';
import { Injectable } from '@angular/core';
import { SnackbarDialogComponent } from './views/modal/snackbar-dialog/snackbar-dialog.component';
import { SectorDetailsRequest } from './views/model/common/sector-details-request';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class UtilityServiceService {

  constructor(
    private _snackBar:MatSnackBar,
    private appService: AppService
  ) { }

  openSnackBar(message: string, type: string) {
    this._snackBar.openFromComponent(SnackbarDialogComponent, {
      duration: 3000,
      panelClass : 'snackbar-global',
      data: {
        message: message,
        action : Action,
        type:type
      }
    });
  }
  processErrorMessage(error:ApiResponseModel) {
    if(error.statusCode == 400) {
      return error.data.message += ` ${error.data.field} can't be ${error.data.type} `;
    }
    else {
      return error.data.message;
    }
  }

  // used to get sector , category, subsector details
  sectorDetailsForGHGByMenu(payload: SectorDetailsRequest,cb:Function) {
    
    this.appService.sectorDetailsByMenu(payload).subscribe((res: any) => {
      console.log("sectorDetailsByMenu  ",res.data);
      if(res.data) {
        cb(res.data);
      }
    }, err => {
      console.error(err);
      cb(null);
    })
  }

}
