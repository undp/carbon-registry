import { FC } from "react";
export interface ProgrammeRejectAndTransferCardItemProps {
    totalPrgrammes: number;
    authorized: number;
    pending: number;
    rejected: number;
    updatedDate: any;
    loading: boolean;
    toolTipText: string;
    t: any;
}
export declare const ProgrammeRejectAndTransferComponent: FC<ProgrammeRejectAndTransferCardItemProps>;
