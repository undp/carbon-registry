import { DocType, DocumentStatus } from "../Definitions";
export declare const linkDocVisible: (docStatus: DocumentStatus) => boolean;
export declare const uploadDocUserPermission: (userInfoState: any, docType: DocType, programmeOwnerId: any[], ministryLevelPermission?: boolean) => boolean;
