import { FC } from "react";
import { ProgrammeTransfer } from "../../../Definitions";
export interface TransferActionModelProps {
    icon: any;
    title: string;
    transfer: ProgrammeTransfer;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    disableToCompany?: boolean;
    toCompanyDefault?: any;
    openModal: boolean;
    type: string;
    remarkRequired: boolean;
    translator: any;
}
export declare const TransferActionModel: FC<TransferActionModelProps>;
