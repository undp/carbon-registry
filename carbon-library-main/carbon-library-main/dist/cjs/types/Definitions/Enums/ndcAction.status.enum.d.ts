export declare enum NdcActionStatus {
    PENDING = "Pending",
    APPROVED = "Approved"
}
export declare const getNdcActionStatusEnumVal: (value: string) => string;
export declare const getNdcStatusTagType: (status: NdcActionStatus) => "processing" | "default" | "success";
