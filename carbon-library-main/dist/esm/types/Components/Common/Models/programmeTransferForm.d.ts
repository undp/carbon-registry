import { FC } from "react";
import { Programme } from "../../../Definitions/Definitions/programme.definitions";
export interface ProgrammeTransferFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    disableToCompany?: boolean;
    toCompanyDefault?: any;
    receiverLabelText: string;
    userCompanyId: number | undefined;
    companyRole: string;
    translator: any;
    ministryLevelPermission?: boolean;
}
export declare const ProgrammeTransferForm: FC<ProgrammeTransferFormProps>;
