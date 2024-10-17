export declare enum InvestmentLevel {
    NATIONAL = "National",
    INTERNATIONAL = "International"
}
export declare enum InvestmentStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    CANCELLED = "Cancelled"
}
export declare const getInvestmentStatusEnumVal: (value: string) => string;
export declare const getStatusTagType: (status: InvestmentStatus) => "error" | "processing" | "default" | "success";
export declare enum InvestmentType {
    PUBLIC = "Public",
    PRIVATE = "Private"
}
export declare enum InvestmentCreationType {
    EXISTING = "Existing",
    NEW = "New"
}
export declare enum InvestmentOwnershipType {
    PROJECT = "Project",
    NATIONAL = "National"
}
export declare enum InvestmentStream {
    CLIMATE_FINANCE = "ClimateFinance",
    CARBON_MARKET = "CarbonMarket"
}
