import { Observable, Subject } from "rxjs";
import { AppModelService } from "./app-model.service";
import { ReportByGasReq } from "./views/model/reports/report-by-gas-req";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import {
  MRV_APPROVALS,
  MRV_DATABASE_AFOLU_EMISSION_FACTOR,
  MRV_DATABASE_AFOLU_POPULATION,
  MRV_DATABASE_ENERGY_EMISSION_FACTOR,
  MRV_DATABASE_IPPU_EMISSION_FACTOR,
  MRV_DATABASE_IPPU_GWP,
  MRV_DATABASE_WASTE_POPULATION,
  MRV_FUEL_BY_FUEL_TYPE,
  MRV_FUEL_TYPE,
  MRV_GHG_AFOLU_EMISSIONFACTOR,
  MRV_GHG_DATA,
  MRV_INVENTORY_YEAR,
  MRV_SHARED_RECORD,
  MRV_SHARED_APP_DATA,
  MRV_REPORT_GAS,
  MRV_NDC_SECTOR_MAPPING,
  MRV_NDC,
  MRV_NDC_PROJECT_BY_MODULE,
  MRV_MITIGATION_REPORT,
  MRV_REPORT_YEARS,
  MRV_GHG_REPORT,
  MRV_GHG_REPORT_TEMPLATE_LINK,
  MRV_GHG_SECTOR_MAPPING,
  MRV_GHG_SECTOR_MAPPING_BY_MENU,
  MRV_USER,
  MRV_DATABASE_IPPU_EMMISION_FACTOR,
  MRV_UPDATE_PASSWORD
} from "./app.constants";

import { ApiResponseModel } from "./views/model/api.response.model";
import { AppDataModel } from "./views/model/common/app-data-model";
import { SectorDetailsRequest } from "./views/model/common/sector-details-request";
import * as _ from 'lodash';
@Injectable({
  providedIn: "root",
})
export class AppService {
  public appDataLoadedSubject = new Subject<AppDataModel[]>();
  constructor(
    private http: HttpClient,
    private appModelService: AppModelService
    ) {}
  public sectorDetailsByMenu(payload: SectorDetailsRequest) {
    return this.http.post(`${MRV_GHG_SECTOR_MAPPING_BY_MENU}`, payload, {
      headers: this.getHeader(),
    });
    }
  public myHeaders = new HttpHeaders({
    "content-type": "Application/json",
    authorization: "bearer " + localStorage.getItem("tokenId"),
  });
  public getHeader(): HttpHeaders {
    let token = "bearer " + localStorage.getItem("tokenId");
    return new HttpHeaders()
      .set("Content-Type", "Application/json")
      .set("authorization", token);
  }

  public getInventoryYears(type?:any) {
    if(type){
      return this.http.get<ApiResponseModel>(`${MRV_INVENTORY_YEAR+"?config="+type}`, {
        headers: this.getHeader(),
      });
    }
    else{
      return this.http.get<ApiResponseModel>(`${MRV_INVENTORY_YEAR}`, {
        headers: this.getHeader(),
      });
    }
  }

  public getFuelTypes() {
    return this.http.get<ApiResponseModel>(`${MRV_FUEL_TYPE}`, {
      headers: this.getHeader(),
    });
  }
  public getFuelByType(type) {
    return this.http.get<ApiResponseModel>(MRV_FUEL_BY_FUEL_TYPE + type, {
      headers: this.getHeader(),
    });
  }

  public getDataState(type) {
    return this.http.get<ApiResponseModel>(MRV_APPROVALS + type, {
      headers: this.getHeader(),
    });
  }

  getRecord(data) {
    const myParams = new HttpParams()
      .set("collection", "menu")
      .set("attr", "menuId")
      .set("attrValue", data);
    return this.http.get(`${MRV_SHARED_RECORD}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }

  projectByModule(moduleName: string) {
    const myParams = new HttpParams()
      .set("status", "approved")
      .set("module", moduleName);
    return this.http.get<ApiResponseModel>(`${MRV_NDC_PROJECT_BY_MODULE}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  saveRecord(data) {
    return this.http.post(`${MRV_GHG_DATA}`, data, {
      headers: this.getHeader(),
    });
  }
  getDataRecord(data) {
    const keys = Object.keys(data);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, data[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_GHG_DATA}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  getAppData(data) {
    const keys = Object.keys(data);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, data[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_SHARED_APP_DATA}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  saveAppData(data) {
    return this.http.post<ApiResponseModel>(`${MRV_SHARED_APP_DATA}`, data, {
      headers: this.getHeader(),
    });
  }
  fetchAllAppData() {
    this.http
      .get<ApiResponseModel>(`${MRV_SHARED_APP_DATA}`, {
        headers: this.getHeader(),
      })
      .subscribe((response) => {
        let data = response.data as AppDataModel[];
        this.appModelService.setAppDataModel(data);
        // trigger event
        this.appDataLoadedSubject.next(data);
      });
  }
  getAppDataWithFilter(key: string = null, output: string = null) {
    return this.appModelService.getAppDataModel(key, output);
  }

  getNDCActionList(): Observable<ApiResponseModel> {
    return this.http.get<ApiResponseModel>(`${MRV_NDC}`, {
      headers: this.getHeader(),
    });
  }

  getNdcData(data): Observable<ApiResponseModel> {
    let myParams = new HttpParams().set("module", data.module);
    return this.http.get<ApiResponseModel>(`${MRV_NDC}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }

  getNDCSector(data): Observable<ApiResponseModel> {
    const keys = Object.keys(data);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, data[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_NDC_SECTOR_MAPPING}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  getGHGSectorMapping(data): Observable<ApiResponseModel> {
    const keys = Object.keys(data);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, data[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_GHG_SECTOR_MAPPING}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  saveNDC(data): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(`${MRV_NDC}`, data, {
      headers: this.getHeader(),
    });
  }
  deleteNDC(data): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(`${MRV_NDC + "/" + data}`, {
      headers: this.getHeader(),
    });
  }
  getNDC(data): Observable<ApiResponseModel> {
    const keys = Object.keys(data);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, data[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_NDC}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  getReportByGas(payload: ReportByGasReq) {
    const keys = Object.keys(payload);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, payload[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_REPORT_GAS}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  getGHGReports(payload): Observable<ApiResponseModel> {
    const keys = Object.keys(payload);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, payload[key]);
    });
    return this.http.get<ApiResponseModel>(`${MRV_GHG_REPORT}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }

  getProjectIds(data) {
    let myParams = new HttpParams()
      .set("status", data.status)
      .set("module", data.module);
    return this.http.get<ApiResponseModel>(`${MRV_NDC_PROJECT_BY_MODULE}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }

  getCategories() {
    return this.http.get(`${MRV_GHG_AFOLU_EMISSIONFACTOR}`, {
      headers: this.getHeader(),
    });
  }

  public updateDataStatus(body) {
    return this.http.put<ApiResponseModel>(MRV_APPROVALS + "status", body, {
      headers: this.getHeader(),
    });
  }

  getDatabaseEnergyEmissionFactor() {
    return this.http.get(`${MRV_DATABASE_ENERGY_EMISSION_FACTOR}`, {
      headers: this.getHeader(),
    });
  }

  saveDatabaseEnergyEmissionFactor(data) {
    return this.http.post(`${MRV_DATABASE_ENERGY_EMISSION_FACTOR}`, data, {
      headers: this.getHeader(),
    });
  }

  getDatabaseIPPUEmissionFactor() {
    return this.http.get(`${MRV_DATABASE_IPPU_EMISSION_FACTOR}`, {
      headers: this.getHeader(),
    });
  }

  saveDatabaseIPPUEmissionFactor(data) {
    return this.http.post(`${MRV_DATABASE_IPPU_EMISSION_FACTOR}`, data, {
      headers: this.getHeader(),
    });
  }

  getDatabaseIPPUGwp() {
    return this.http.get(`${MRV_DATABASE_IPPU_GWP}`, {
      headers: this.getHeader(),
    });
  }

  saveDatabaseIPPUGwp(data) {
    return this.http.post(`${MRV_DATABASE_IPPU_GWP}`, data, {
      headers: this.getHeader(),
    });
  }

  getDatabaseAfoluPopulation(data) {
    const myParams: HttpParams = new HttpParams().set("inventoryYear", data);
    return this.http.get(`${MRV_DATABASE_AFOLU_POPULATION}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }

  saveDatabaseAfoluPopulation(data) {
    return this.http.post(`${MRV_DATABASE_AFOLU_POPULATION}`, data, {
      headers: this.getHeader(),
    });
  }

  getDatabaseAfoluEmissionFactor() {
    return this.http.get(`${MRV_DATABASE_AFOLU_EMISSION_FACTOR}`, {
      headers: this.getHeader(),
    });
  }

  saveDatabaseEmissionFactor(data) {
    return this.http.post(`${MRV_DATABASE_AFOLU_EMISSION_FACTOR}`, data, {
      headers: this.getHeader(),
    });
  }

  getDatabaseWastePopulation() {
    return this.http.get(`${MRV_DATABASE_WASTE_POPULATION}`, {
      headers: this.getHeader(),
    });
  }

  saveDatabaseWastePopulation(data) {
    return this.http.post(`${MRV_DATABASE_WASTE_POPULATION}`, data, {
      headers: this.getHeader(),
    });
  }
  getReport(param) {
    const keys = Object.keys(param);
    let myParams = new HttpParams();
    keys.forEach((key) => {
      myParams = myParams.set(key, param[key]);
    });
    return this.http.get(`${MRV_MITIGATION_REPORT}`, {
      headers: this.getHeader(),
      params: myParams,
    });
  }
  getAllYear() {
    return this.http.get(`${MRV_REPORT_YEARS}`, { headers: this.getHeader() });
  }
  getConfigYear(type:string="mannual") {
    return this.http.get<ApiResponseModel>(`${MRV_INVENTORY_YEAR+"?config="+type}`, {
      headers: this.getHeader(),
    });
  }
  getTemplateLink() {
    return MRV_GHG_REPORT_TEMPLATE_LINK;
  }
  public getAllUsers(type){
    let params = new HttpParams().set("type", type);
    return this.http.get(`${MRV_USER}`, {headers : this.getHeader(), params: params });
  }
  public createUser(body){
    return this.http.post(`${MRV_USER}` , body , {headers : this.getHeader()})
  }
 /*  getIPPUEmissionFactor(){
    return this.http.get(`${MRV_DATABASE_IPPU_EMMISION_FACTOR}`, {
      headers: this.getHeader(),
    });
  } */
  updateIPPUEmissionFactor(obj){
    return this.http.post(`${MRV_DATABASE_IPPU_EMMISION_FACTOR}`, obj, {
      headers: this.getHeader(),
    });
  }
  getApi(url:string,param = null):Observable<ApiResponseModel> {
    let httpParams = new HttpParams();
    if(param) {
      const keys = Object.keys(param);
      httpParams = new HttpParams();
      keys.forEach((key) => {
        httpParams = httpParams.set(key, param[key]);
      });

    }
    return this.http.get<ApiResponseModel>(url, {
      headers: this.getHeader(),
      params: httpParams,
    });
  }
  postApi(url:string,data:any = null):Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(url, data, {
      headers: this.getHeader(),
    });
  }
  getFuelandFuelType(arrayData){
    let fuelAndFuelTye:any = [];
    for(let item of arrayData){
      if(_.find(fuelAndFuelTye, {'fuelType' : item.fuelType})){
        _.find(fuelAndFuelTye, {'fuelType' : item.fuelType}).fuels.push(item.fuel)
      }
      else{
        let obj = {
          'fuelType' : item.fuelType,
          'fuels':[item.fuel]
        }
        fuelAndFuelTye.push(obj);
      }
    }
    return fuelAndFuelTye;
  }
  public updateUser(body) {
    return this.http.put<ApiResponseModel>(`${MRV_USER}`, body, {
      headers: this.myHeaders,
    });
  }
  public updatePassword(body) {
    return this.http.put<ApiResponseModel>(`${MRV_UPDATE_PASSWORD}`, body, {
      headers: this.myHeaders,
    });
  }
}
