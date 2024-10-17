import { FC } from "react";
import { Programme } from "../../../Definitions/Definitions/programme.definitions";
export interface ProgrammeRevokeFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    showCertifiers: boolean;
    translator: any;
}
export declare const ProgrammeRevokeForm: FC<ProgrammeRevokeFormProps>;
