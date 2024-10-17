import { FC } from "react";
import "./ndcActionBody.scss";
export interface NdcActionBodyProps {
    data?: any;
    progressIcon?: any;
    programmeId?: any;
    canUploadMonitorReport?: boolean;
    programmeOwnerId?: any;
    getProgrammeDocs?: any;
    ministryLevelPermission?: boolean;
    translator: any;
    onFinish?: any;
    programme?: any;
}
export declare const NdcActionBody: FC<NdcActionBodyProps>;
