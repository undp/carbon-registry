import { FC } from "react";
import { Programme } from "../../../Definitions/Definitions/programme.definitions";
export interface ProgrammeRetireFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText?: string;
    hideType: boolean;
    myCompanyId?: number;
    translator: any;
}
export declare const ProgrammeRetireForm: FC<ProgrammeRetireFormProps>;
