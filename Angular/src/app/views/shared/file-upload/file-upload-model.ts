export interface FileUploadModel {
    menuId:string,
    filePath:string;
    fileToUpload:File;
    projectId:string;
    fieldName:string;
    dataId:string;
    inventoryYear?:number;
    token?:string;
}
