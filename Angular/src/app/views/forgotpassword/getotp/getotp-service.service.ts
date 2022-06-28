import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http'
import { MRV_FORGOT_PASSWORD ,MRV_RESET_PASSWORD } from '../../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class GetotpServiceService {

  constructor(private http : HttpClient) { }
  public getHeaders() : HttpHeaders{
    return new HttpHeaders().set("Content-Type" , "Application/json" );
  }


  public ForgotPassword(body){
    var myHeaders = this.getHeaders();
    return this.http.post(`${MRV_FORGOT_PASSWORD}` , body , {headers : myHeaders})
  }
  public resetPassword(body){
    var myHeaders = this.getHeaders();
      return this.http.post(`${MRV_RESET_PASSWORD}` , body , {headers : myHeaders})
  }

}
