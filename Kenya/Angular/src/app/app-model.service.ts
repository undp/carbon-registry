import { AppDataModel } from './views/model/common/app-data-model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppModelService {

  private appDataModel: AppDataModel[];

  public setAppDataModel(data:AppDataModel[]) {
    this.appDataModel = data;
  }
  
  /*
  * used to return app data model complete list or specific values based on filter
  */
  public getAppDataModel(key:string=null,output:string=null):AppDataModel[]|AppDataModel|string[] {
    let filterData = [];
    if(!key)
    return this.appDataModel;
    else if(key) {
      filterData =  this.appDataModel.filter((dataModel)=> {
        // console.log("this.appDataModel  ",dataModel,key);
        if(dataModel.key.trim() === key.trim()) {
          return output ? dataModel[output.trim()] : dataModel;
        }
      })
      return filterData;
    }
  }
}
