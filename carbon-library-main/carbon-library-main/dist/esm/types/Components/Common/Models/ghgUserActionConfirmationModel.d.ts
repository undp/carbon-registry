import { FC } from "react";
import "../../../Styles/app.scss";
export interface UserActionProps {
    t: any;
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    errorMsg: any;
    loading: any;
}
declare const GHGUserActionConfirmationModel: FC<UserActionProps>;
export default GHGUserActionConfirmationModel;
