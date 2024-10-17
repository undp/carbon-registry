import { FC } from "react";
import "../../../Styles/app.scss";
export interface ApproveDocumentationProps {
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    list_certificateur: any;
    onChangeCertificator: any;
    errorMsg: any;
    loading: any;
    translator: any;
}
export declare const ApproveDocumentationConfirmationModel: FC<ApproveDocumentationProps>;
