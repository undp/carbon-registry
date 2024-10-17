import { FC } from "react";
import "../../../Styles/app.scss";
export interface ChangePasswordProps {
    t: any;
    onPasswordChanged: any;
    onFieldsChanged: any;
    onCanceled: any;
    openModal: any;
    errorMsg: any;
    loadingBtn: boolean;
    themeColor: string;
}
declare const ChangePasswordModel: FC<ChangePasswordProps>;
export default ChangePasswordModel;
