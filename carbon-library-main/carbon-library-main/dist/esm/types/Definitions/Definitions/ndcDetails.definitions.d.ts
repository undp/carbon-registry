export type Period = {
    key: string;
    label: string;
    startYear: number;
    endYear: number;
    finalized: boolean;
    deleted: boolean;
};
export type NdcDetail = {
    id: number;
    actionType: NdcDetailsActionType;
    nationalPlanObjective: string;
    kpi: number | string;
    kpiUnit: string;
    ministryName: string;
    periodId?: number;
    status: NdcDetailsActionStatus;
    parentActionId?: number;
};
export type DateRange = {
    startYear: number;
    endYear: number;
};
export declare enum NdcDetailsActionType {
    MainAction = "MainAction",
    SubAction = "SubAction"
}
export declare enum NdcDetailsActionStatus {
    New = "New",
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
}
export declare const getNdcActionStatusEnumVal: (value: string) => string;
export declare const getNdcActionStatusTagType: (status: NdcDetailsActionStatus) => "error" | "processing" | "default" | "success";
export type PopupInfo = {
    title: string;
    icon: any;
    actionBtnText: string;
    okAction: any;
    type: "primary" | "danger";
    remarkRequired: boolean;
};
