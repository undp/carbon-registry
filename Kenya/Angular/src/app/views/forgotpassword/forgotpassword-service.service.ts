import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { MRV_FORGOT_PASSWORD } from '../../app.constants';

@Injectable({
  providedIn: 'root'
})
export class ForgotpasswordServiceService {

  constructor(private http : HttpClient) { }
  public getHeader() : HttpHeaders{
    let token = 'bearer '+localStorage.getItem('tokenId');
    return new HttpHeaders().set("Content-Type" , "Application/json" ).set("authorization" , token);
  }
  public ForgotPassword(body){
    var myHeaders = this.getHeader();
    return this.http.post(`${MRV_FORGOT_PASSWORD}` ,body ,  {headers : myHeaders})
  }

}
