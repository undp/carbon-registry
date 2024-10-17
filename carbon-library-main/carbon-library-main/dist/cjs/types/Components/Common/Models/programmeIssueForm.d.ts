import { FC } from "react";
import { Programme } from "../../../Definitions/Definitions/programme.definitions";
export interface ProgrammeIssueFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    enableIssue: boolean;
    translator: any;
    ndcActions?: any[];
}
export declare const getValidNdcActions: (programme: any) => any[];
export declare const ProgrammeIssueForm: FC<ProgrammeIssueFormProps>;
