import { FC } from "react";
import "./programmeDocuments.scss";
export interface ProgrammeDocumentsProps {
    data: any;
    title: any;
    icon: any;
    programmeId: any;
    programmeOwnerId: any[];
    getDocumentDetails: any;
    programme: any;
    authoriseDoc2Url: any;
    setauthoriseDoc2Url: any;
    onPopupAction: any;
    updateProgrammeData: any;
    getProgrammeById: any;
    ministryLevelPermission?: boolean;
    translator: any;
    methodologyDocumentUpdated: any;
    programmeStatus?: any;
}
export declare const ProgrammeDocuments: FC<ProgrammeDocumentsProps>;
