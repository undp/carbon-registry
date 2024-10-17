import React from "react";
import "./coBenifits.scss";
export interface CoBenefitProps {
    onClickedBackBtn?: any;
    onFormSubmit?: any;
    coBenefitsDetails?: any;
    submitButtonText?: any;
    viewOnly?: boolean;
    coBenifitsViewDetails?: any;
    loading?: any;
    sdgGoalImages?: any;
    translator?: any;
}
export declare const CoBenifitsComponent: (props: CoBenefitProps) => React.JSX.Element;
