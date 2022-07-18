import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MRV_APPROVALS } from '../../app.constants';
import { ApiResponseModel } from '../model/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class MyApprovalsService {

  public myHeaders = new HttpHeaders({
    "content-type" : "Application/json" , 
    "Server" : "2"
  })
  public getHeader() : HttpHeaders{
    let token = 'bearer '+localStorage.getItem('tokenId');
    return new HttpHeaders().set("Content-Type" , "Application/json" ).set("authorization" , token);
  }
  constructor( private http : HttpClient) { }
  
  public getApprovals(type){
    return this.http.get<ApiResponseModel>(MRV_APPROVALS+type , {headers : this.getHeader()});
  }
}
