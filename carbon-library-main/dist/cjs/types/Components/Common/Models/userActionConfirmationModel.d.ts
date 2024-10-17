import { FC } from "react";
import "../../../Styles/app.scss";
export interface UserActionProps {
    t: any;
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    uploadmodal: any;
    onUploadLetter: any;
    handleFileChange: any;
    errorMsg: any;
    loading: any;
}
declare const UserActionConfirmationModel: FC<UserActionProps>;
export default UserActionConfirmationModel;
