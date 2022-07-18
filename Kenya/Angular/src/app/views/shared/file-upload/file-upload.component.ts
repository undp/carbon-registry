import { UtilityServiceService } from './../../../utility-service.service';
import { FileUploadModel } from './file-upload-model';
import { FileUploadService } from './../file-upload.service';
import { Component, OnInit, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit,OnChanges {
  @Input() menuId: string;
  @Input() projectId: string = null;
  @Input() dataId: string = null;
  @Input() fieldName: string = null;
  @Input() inventoryYear: number = null;
  @Output() fileUploadedEmit = new EventEmitter<FileUploadModel>();

  @ViewChild("file",{static:true}) fileView:ElementRef;
  // fileToUpload: File = null;
  fileModel:FileUploadModel = {} as FileUploadModel;
  constructor(private fileUploadService:FileUploadService, private utilityService:UtilityServiceService) { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("On changes ",this.projectId, this.dataId);
    
  }
 
  ngOnInit() {
    // check if file exists for menu then enable download button
    this.checkFileExists();
  }

  handleFileInput(files: FileList) {
    this.fileModel.fileToUpload = files.item(0);
  }
  uploadFile(file) {
    if(!this.fileModel.fileToUpload) {
      alert("No file selected!");
      return;
    }
    if(!this.menuId) {
      alert("Invalid Menu");
      return;
    }
    this.fileModel.menuId = this.menuId;
    this.fileModel.projectId = this.projectId;
    this.fileModel.dataId = this.dataId;
    this.fileModel.fieldName = this.fieldName;
    this.fileModel.inventoryYear = this.inventoryYear;
    this.fileModel.token = localStorage.getItem("tokenId");
    this.fileUploadService.postFile(this.fileModel).subscribe(data => {
      console.log("After file upload ",data);
       // emit event to add the file path in response
       if(data && data.body && data.body.data) {
         this.fileUploadedEmit.emit(data.body.data as FileUploadModel);
         this.fileModel.filePath = data.body.data.filePath;
       }
      // this.fileView.nativeElement.value = null;
      }, error => {
        console.log(error);
        this.utilityService.openSnackBar(error.error.data.message,'error');
      });
  }
  checkFileExists() {
    this.fileUploadService.checkFileExists(this.menuId,this.projectId,this.fieldName).subscribe(data => {
      this.fileModel = data.data || {} as FileUploadModel ;
      }, error => {
        console.log(error);
        this.fileModel = {} as FileUploadModel;
      });
  }
  getDownloadLink() {
    return this.fileUploadService.getDownloadLink(this.menuId,this.projectId,this.fieldName,this.inventoryYear);
  }

}
