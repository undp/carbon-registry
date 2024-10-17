import { ProgrammeTransfer } from "../Entities/programmeTransfer";
import { ProgrammeStageR, ProgrammeStageMRV, ProgrammeStageUnified } from "../Enums/programmeStage.enum";
import { TypeOfMitigation } from "../Enums/typeOfMitigation.enum";
import { CreditTransferStage } from "../Enums/creditTransferStage.enum";
import { RcFile } from "rc-upload/lib/interface";
import { CarbonSystemType } from "../Enums/carbonSystemType.enum";
export declare const getStageEnumVal: (value: string) => string;
export declare const getCreditStageVal: (value: string) => string;
export declare const getStageTransferEnumVal: (value: string, transfer: ProgrammeTransfer) => string;
export declare const getStageTagType: (stage: ProgrammeStageR | ProgrammeStageUnified) => "purple" | "error" | "processing" | "default";
export declare const getStageTagTypeMRV: (stage: ProgrammeStageMRV) => "purple" | "error" | "processing" | "default";
export declare const getTransferStageTagType: (stage: CreditTransferStage, transfer: ProgrammeTransfer) => "orange" | "purple" | "error" | "processing" | "default" | "success";
export declare class UnitField {
    unit: string;
    value: any;
    constructor(unit: string, value: any);
}
export interface ProgrammeProperties {
    maxInternationalTransferAmount: string;
    creditingPeriodInYears: number;
    sourceOfFunding: any;
    grantEquivalentAmount: number;
    carbonPriceUSDPerTon: number;
    buyerCountryEligibility: string;
    geographicalLocation: string[];
    greenHouseGasses: any[];
    creditYear: number;
    programmeMaterials: [];
    projectMaterial: [];
}
export interface ProgrammePropertiesR extends ProgrammeProperties {
    programmeCostUSD: number;
    estimatedProgrammeCostUSD: number;
}
export interface ProgrammePropertiesT extends ProgrammeProperties {
    estimatedProgrammeCostUSD: number;
}
export interface ProgrammePropertiesU extends ProgrammeProperties {
    estimatedProgrammeCostUSD: number;
    programmeCostUSD: number;
}
export interface Programme {
    programmeId: string;
    externalId: string;
    serialNo: string;
    title: string;
    sectoralScope: string;
    sector: string;
    countryCodeA2: string;
    currentStage: ProgrammeStageR | ProgrammeStageMRV | ProgrammeStageUnified;
    startTime: number;
    endTime: number;
    creditChange: number;
    creditIssued: number;
    creditEst: number;
    creditBalance: number;
    creditTransferred: number[];
    creditRetired: number[];
    creditFrozen: number[];
    constantVersion: string;
    proponentTaxVatId: string[];
    companyId: number[];
    proponentPercentage: number[];
    creditOwnerPercentage: number[];
    certifierId: any[];
    certifier: any[];
    company: any[];
    creditUnit: string;
    programmeProperties: ProgrammeProperties;
    agricultureProperties: any;
    solarProperties: any;
    txTime: number;
    createdTime: number;
    txRef: string;
    typeOfMitigation: TypeOfMitigation;
    geographicalLocationCordintes: any;
    mitigationActions: any;
    environmentalAssessmentRegistrationNo: any;
    article6trade: boolean;
}
export interface ProgrammeR extends Programme {
    currentStage: ProgrammeStageR;
    programmeProperties: ProgrammePropertiesR;
}
export interface ProgrammeT extends Programme {
    currentStage: ProgrammeStageMRV;
    programmeProperties: ProgrammePropertiesT;
    emissionReductionExpected: number;
    emissionReductionAchieved: number;
}
export interface ProgrammeU extends Programme {
    currentStage: ProgrammeStageUnified;
    programmeProperties: ProgrammePropertiesU;
    emissionReductionExpected: number;
    emissionReductionAchieved: number;
}
export declare const getGeneralFields: (programme: Programme | ProgrammeU | ProgrammeR | ProgrammeT, system?: CarbonSystemType) => Record<string, any>;
export declare const addCommSep: (value: any) => string;
export declare const addCommSepRound: (value: any) => string;
export declare const addRoundNumber: (value: any) => number;
export declare const addSpaces: (text: string) => string;
export declare const getFinancialFields: (programme: ProgrammeU | ProgrammeR | ProgrammeT) => {
    estimatedProgrammeCostUSD: string;
    creditEst: string;
    financingType: string;
    grantEquivalent: UnitField;
    carbonPriceUSDPerTon: string;
};
export declare const getCompanyBgColor: (item: string) => "rgba(185, 226, 244, 0.56)" | "rgba(254, 241, 173, 0.55)" | "rgba(128, 255, 0, 0.12)";
export declare const getRetirementTypeString: (retirementType: string | null) => "-" | "CROSS BORDER TRANSFER" | "LEGAL ACTION" | "OTHER" | undefined;
export declare const sumArray: (arrList: any[]) => any;
export declare const getBase64: (file: RcFile) => Promise<string>;
