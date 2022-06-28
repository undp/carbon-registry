import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  MRV_GET_MENU_GROUP,
  MRV_UPDATE_USER_STATUS,
  MRV_USER,
} from "../../app.constants";
@Injectable({
  providedIn: "root",
})
export class RegisterService {
  public myHeaders = new HttpHeaders({
    "content-type": "Application/json",
    Server: "2",
  });
  public getHeader(): HttpHeaders {
    let token = "bearer " + localStorage.getItem("tokenId");
    return new HttpHeaders()
      .set("Content-Type", "Application/json")
      .set("authorization", token);
  }
  constructor(private readonly _http: HttpClient) {}
  getMenuGroup() {
    return this._http.get(`${MRV_GET_MENU_GROUP}`, {
      headers: this.getHeader(),
    });
  }

  register(data) {
    return this._http.post(`${MRV_USER}`, data, { headers: this.getHeader() });
  }

  updateStatus(data) {
    return this._http.put(`${MRV_UPDATE_USER_STATUS}`, data, {
      headers: this.getHeader(),
    });
  }
}
