import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { MRV_LOGIN } from '../../app.constants';
import { ApiResponseModel } from '../model/api.response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  public myHeaders = new HttpHeaders({
    "content-type" : "Application/json" , 
  })
  constructor( private http : HttpClient) { }

  public loginUser(body){
    return this.http.post<ApiResponseModel>(`${MRV_LOGIN}` , body , {headers : this.myHeaders})
  }
}
