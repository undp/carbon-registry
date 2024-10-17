import React from "react";
import "./ndcActionDetails.scss";
import "../../../Styles/common.table.scss";
export interface NdcActionDetailsProps {
    isBackBtnVisible: boolean;
    onFormSubmit: any;
    ndcActionDetails: any;
    translator: any;
    programmeDetails?: any;
    onClickedBackBtn?: any;
}
declare const NdcActionDetails: (props: NdcActionDetailsProps) => React.JSX.Element;
export default NdcActionDetails;
