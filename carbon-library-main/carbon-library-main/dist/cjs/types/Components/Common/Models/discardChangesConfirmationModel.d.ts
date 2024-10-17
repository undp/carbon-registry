import { FC } from "react";
import "../../../Styles/app.scss";
export interface DiscardChangesProps {
    t: any;
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    errorMsg: any;
    loading: any;
}
declare const DiscardChangesConfirmationModel: FC<DiscardChangesProps>;
export default DiscardChangesConfirmationModel;
