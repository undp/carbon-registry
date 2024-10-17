import { FC } from "react";
export interface InvestmentActionModelProps {
    icon: any;
    title: string;
    investment: any;
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
declare const InvestmentActionModel: FC<InvestmentActionModelProps>;
export default InvestmentActionModel;
