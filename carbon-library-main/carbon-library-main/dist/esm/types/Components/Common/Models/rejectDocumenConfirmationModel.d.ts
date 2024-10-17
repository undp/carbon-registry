import { FC } from "react";
import "../../../Styles/app.scss";
export interface RejectDocumentationProps {
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    errorMsg: any;
    loading: any;
    translator: any;
}
export declare const RejectDocumentationConfirmationModel: FC<RejectDocumentationProps>;
