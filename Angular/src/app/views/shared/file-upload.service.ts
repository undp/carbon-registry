import { FileUploadModel } from "./file-upload/file-upload-model";
import { map } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DOWNLOAD_FILE, UPLOAD_FILE,CHECK_FILE_BY_MENU } from "../../app.constants";
@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  public myHeaders = new HttpHeaders({
    'content-type' : 'Application/json' ,
    'authorization' : 'bearer '+localStorage.getItem('tokenId')
  });
  public getHeader() : HttpHeaders{
    let token = 'bearer '+localStorage.getItem('tokenId');
    return new HttpHeaders().set("Content-Type" , "Application/json" ).set("authorization" , token);
  }
  constructor(private httpClient: HttpClient) {}
  postFile(fileModel: FileUploadModel): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(
      fileModel.fieldName || "file_"+new Date().getMilliseconds(),
      fileModel.fileToUpload,
      fileModel.fileToUpload.name
    );
    let params: HttpParams = new HttpParams({
      fromString: "menuId=" + fileModel.menuId+(fileModel.dataId ? "&dataId="+fileModel.dataId: "")
                            +(fileModel.projectId ? "&projectId="+fileModel.projectId: "")
                            +(fileModel.inventoryYear ? "&inventoryYear="+fileModel.inventoryYear: "")
                            +"&token="+fileModel.token
    });
    /* let params = new HttpParams().set('menuId', fileModel.menuId);
    if(fileModel.dataId) {
      params.set("dataId",fileModel.dataId);
    }
    if(fileModel.projectId) {
      params.set("projectId",fileModel.projectId);
    } */
    return this.httpClient.post(UPLOAD_FILE, formData, {
      params: params,
      reportProgress: true,
      observe: "events",
      // headers : this.getHeader()
    });
  }
  downloadFile(menuId: String): Observable<any> {
    let params: HttpParams = new HttpParams({ fromString: "menuId=" + menuId });
    return this.httpClient.get(DOWNLOAD_FILE, {headers : this.getHeader(), params: params});
  }
  getDownloadLink(menuId:string,projectId:string=null,fieldName:string = null,inventoryYear:number=null):any {
    let queryStr = `?menuId=${menuId}`;
    if(projectId) {
      queryStr+=`&projectId=${projectId}`;
    }
    if(fieldName) {
      queryStr+=`&fieldName=${fieldName}`;
    }
    if(inventoryYear) {
      queryStr+=`&inventoryYear=${inventoryYear}`;
    }
    return `${DOWNLOAD_FILE}${queryStr}`;
  }
  checkFileExists(menuId:string,projectId:string=null,fieldName:string = null):  Observable<any> {
    let queryStr = `?menuId=${menuId}`;
    if(projectId) {
      queryStr+=`&projectId=${projectId}`;
    }
    if(fieldName) {
      queryStr+=`&fieldName=${fieldName}`;
    }
    return this.httpClient.get(`${CHECK_FILE_BY_MENU}${queryStr}`,{headers : this.getHeader()});
    
  }
}
