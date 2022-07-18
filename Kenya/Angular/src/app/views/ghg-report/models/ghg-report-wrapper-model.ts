import { GhgReportData } from './ghg-report-data';
export interface GhgReportWrapperModel {
    _id:string;
    srcId:string;
    lastUpdated:Date;
    menuId:string;
    data:Map<string,GhgReportData[]>;

}
