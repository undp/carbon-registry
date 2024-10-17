import React, { FC, ReactNode } from 'react';
import { RcFile } from 'rc-upload/lib/interface';
import { RawAxiosResponseHeaders, AxiosResponseHeaders, AxiosRequestConfig } from 'axios';
import { BuildingType } from '@undp/carbon-credit-calculator';

declare const CompanyManagementComponent: (props: any) => React.JSX.Element;

declare const IdeaNoteManagementComponent: (props: any) => React.JSX.Element;

declare const IdeaNoteDetailComponent: (props: any) => React.JSX.Element;

declare const IdeaNoteDetail2Component: (props: any) => React.JSX.Element;

declare const AddNewCompanyComponent: (props: any) => React.JSX.Element;

declare const CompanyProfileComponent: (props: any) => React.JSX.Element;

declare const ProgrammeManagementComponent: (props: any) => React.JSX.Element;

declare const ProgrammeCreationComponent: (props: any) => React.JSX.Element;

declare const AddNewUserComponent: (props: any) => React.JSX.Element;

declare const UserProfileComponent: (props: any) => React.JSX.Element;

declare const UserManagementComponent: (props: any) => React.JSX.Element;

declare const InvestmentCreationComponent: (props: any) => React.JSX.Element;

declare const InvestmentManagementComponent: (props: any) => React.JSX.Element;

declare const SupportCreationComponent: (props: any) => React.JSX.Element;

declare const SupportManagementComponent: (props: any) => React.JSX.Element;

declare const NdcActionManagementComponent: (props: any) => React.JSX.Element;

declare const AddNdcActionComponent: (props: any) => React.JSX.Element;

declare const NdcActionViewComponent: (props: any) => React.JSX.Element;

declare const CreditTransferComponent: (props: any) => React.JSX.Element;

declare const MrvDashboardComponent: (props: any) => React.JSX.Element;

declare const RegistryDashboardComponent: (props: any) => React.JSX.Element;

declare const NdcDetailsComponent: (props: any) => React.JSX.Element;

declare const Loading: () => React.JSX.Element;

interface LegendItemItemProps {
    text: string;
    color: string;
}
declare const LegendItem: FC<LegendItemItemProps>;

declare enum MapTypes {
    Mapbox = "Mapbox",
    None = "None"
}
interface MarkerData {
    id?: number;
    color?: string;
    location: number[];
    element?: any;
}
interface MapSourceData {
    key: string;
    data: any;
}
interface MapPopupData {
    html: string;
}
interface MapComponentProps {
    mapType: string;
    center: number[];
    markers?: MarkerData[];
    zoom: number;
    mapSource?: MapSourceData;
    onClick?: any;
    showPopupOnClick?: boolean;
    onMouseMove?: any;
    layer?: any;
    height: number;
    style: string;
    onRender?: any;
    accessToken?: any;
}

declare const MapComponent: (props: MapComponentProps) => React.JSX.Element;

declare const MapboxComponent: (props: MapComponentProps) => React.JSX.Element;

interface StasticCardItemProps {
    value: number;
    title: string;
    updatedDate: any;
    icon: any;
    loading: boolean;
    companyRole: any;
    tooltip: any;
    t: any;
}
declare const StasticCard: FC<StasticCardItemProps>;

interface ProfileIconProps {
    icon: any;
    bg: string;
    name: string;
}
declare const isBase64: (str: string) => boolean;
declare const ProfileIcon: FC<ProfileIconProps>;

interface RoleIconProps {
    icon: any;
    bg: string;
    color: string;
}
declare const RoleIcon: FC<RoleIconProps>;

interface InfoViewProps {
    data: any;
    title?: any;
    icon?: any;
    hiddenColumns?: any;
}
declare const InfoView: FC<InfoViewProps>;

interface CoBenefitProps {
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
declare const CoBenifitsComponent: (props: CoBenefitProps) => React.JSX.Element;

declare const ImgWithFallback: ({ src, alt, fallbackSrc, mediaType, className, ...delegated }: {
    src: string;
    alt: string;
    fallbackSrc: string;
    mediaType: string;
    className: string;
}) => React.JSX.Element;

interface InvestmentBodyProps {
    data: any;
    translator: any;
}
declare const InvestmentBody: FC<InvestmentBodyProps>;

declare enum CreditTransferStage {
    Pending = "Pending",
    Approved = "Accepted",
    Rejected = "Rejected",
    Cancelled = "Cancelled",
    Recognised = "Recognised",
    NotRecognised = "NotRecognised"
}

declare enum RetireType {
    CROSS_BORDER = "0",
    LEGAL_ACTION = "1",
    OTHER = "2"
}

declare class BaseEntity {
}

declare class ProgrammeTransfer implements BaseEntity {
    [x: string]: any;
    requestId?: number;
    programmeId?: string;
    initiator?: number;
    initiatorCompanyId?: number;
    toCompanyId?: number;
    toAccount?: string;
    fromCompanyId?: number;
    creditAmount?: number;
    comment?: string;
    txRef?: string;
    txTime?: number;
    status?: CreditTransferStage;
    isRetirement?: boolean;
    companyId?: number[];
    creditOwnerPercentage?: number[];
    createdTime?: number;
    retirementType?: RetireType;
    toCompanyMeta?: any;
    omgePercentage?: any;
}

declare enum ProgrammeStageR {
    AwaitingAuthorization = "Pending",
    Approved = "Approved",
    Authorised = "Authorised",
    Rejected = "Rejected"
}
declare enum ProgrammeStageMRV {
    AwaitingAuthorization = "Pending",
    Authorised = "Authorised",
    Approved = "Approved",
    Rejected = "Rejected"
}
declare enum ProgrammeStageUnified {
    AwaitingAuthorization = "Pending",
    Authorised = "Authorised",
    Approved = "Approved",
    Rejected = "Rejected"
}
declare enum ProgrammeStageLegend {
    AUTHORISED = "Authorised",
    REJECTED = "Rejected",
    AWAITING_AUTHORIZATION = "AwaitingAuthorization"
}

declare enum TypeOfMitigation {
    AGRICULTURE = "Agriculture",
    SOLAR = "Solar",
    EE_HOUSEHOLDS = "EEHouseholds"
}
declare enum SubTypeOfMitigation {
    SOIL_ENRICHMENT_BIOCHAR = "SoilEnrichmentBiochar",
    RICE_CROPS = "RiceCrops",
    SOLAR_PHOTOVOLTAICS_PV = "SolarPhotovoltaicsPV",
    SOLAR_WATER_PUMPING_OFF_GRID = "SolarWaterPumpingOffGrid",
    SOLAR_WATER_PUMPING_ON_GRID = "SolarWaterPumpingOnGrid",
    STOVES_HOUSES_IN_NAMIBIA = "StovesHousesInNamibia"
}

declare enum CarbonSystemType {
    REGISTRY = 0,
    MRV = 1,
    UNIFIED = 2
}

declare const getStageEnumVal: (value: string) => string;
declare const getCreditStageVal: (value: string) => string;
declare const getStageTransferEnumVal: (value: string, transfer: ProgrammeTransfer) => string;
declare const getStageTagType: (stage: ProgrammeStageR | ProgrammeStageUnified) => "purple" | "error" | "processing" | "default";
declare const getStageTagTypeMRV: (stage: ProgrammeStageMRV) => "purple" | "error" | "processing" | "default";
declare const getTransferStageTagType: (stage: CreditTransferStage, transfer: ProgrammeTransfer) => "orange" | "purple" | "error" | "processing" | "default" | "success";
declare class UnitField {
    unit: string;
    value: any;
    constructor(unit: string, value: any);
}
interface ProgrammeProperties {
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
interface ProgrammePropertiesR extends ProgrammeProperties {
    programmeCostUSD: number;
    estimatedProgrammeCostUSD: number;
}
interface ProgrammePropertiesT extends ProgrammeProperties {
    estimatedProgrammeCostUSD: number;
}
interface ProgrammePropertiesU extends ProgrammeProperties {
    estimatedProgrammeCostUSD: number;
    programmeCostUSD: number;
}
interface Programme {
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
interface ProgrammeR extends Programme {
    currentStage: ProgrammeStageR;
    programmeProperties: ProgrammePropertiesR;
}
interface ProgrammeT extends Programme {
    currentStage: ProgrammeStageMRV;
    programmeProperties: ProgrammePropertiesT;
    emissionReductionExpected: number;
    emissionReductionAchieved: number;
}
interface ProgrammeU extends Programme {
    currentStage: ProgrammeStageUnified;
    programmeProperties: ProgrammePropertiesU;
    emissionReductionExpected: number;
    emissionReductionAchieved: number;
}
declare const getGeneralFields: (programme: Programme | ProgrammeU | ProgrammeR | ProgrammeT, system?: CarbonSystemType) => Record<string, any>;
declare const addCommSep: (value: any) => string;
declare const addCommSepRound: (value: any) => string;
declare const addRoundNumber: (value: any) => number;
declare const addSpaces: (text: string) => string;
declare const getFinancialFields: (programme: ProgrammeU | ProgrammeR | ProgrammeT) => {
    estimatedProgrammeCostUSD: string;
    creditEst: string;
    financingType: string;
    grantEquivalent: UnitField;
    carbonPriceUSDPerTon: string;
};
declare const getCompanyBgColor: (item: string) => "rgba(185, 226, 244, 0.56)" | "rgba(254, 241, 173, 0.55)" | "rgba(128, 255, 0, 0.12)";
declare const getRetirementTypeString: (retirementType: string | null) => "-" | "CROSS BORDER TRANSFER" | "LEGAL ACTION" | "OTHER" | undefined;
declare const sumArray: (arrList: any[]) => any;
declare const getBase64: (file: RcFile) => Promise<string>;

interface ProgrammeIssueFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    enableIssue: boolean;
    translator: any;
    ndcActions?: any[];
}
declare const getValidNdcActions: (programme: any) => any[];
declare const ProgrammeIssueForm: FC<ProgrammeIssueFormProps>;

interface ProgrammeRetireFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText?: string;
    hideType: boolean;
    myCompanyId?: number;
    translator: any;
}
declare const ProgrammeRetireForm: FC<ProgrammeRetireFormProps>;

interface ProgrammeRevokeFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    showCertifiers: boolean;
    translator: any;
}
declare const ProgrammeRevokeForm: FC<ProgrammeRevokeFormProps>;

interface ProgrammeTransferFormProps {
    programme: Programme;
    onCancel: any;
    actionBtnText: string;
    onFinish: any;
    subText: string;
    disableToCompany?: boolean;
    toCompanyDefault?: any;
    receiverLabelText: string;
    userCompanyId: number | undefined;
    companyRole: string;
    translator: any;
    ministryLevelPermission?: boolean;
}
declare const ProgrammeTransferForm: FC<ProgrammeTransferFormProps>;

interface RejectDocumentationProps {
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    errorMsg: any;
    loading: any;
    translator: any;
}
declare const RejectDocumentationConfirmationModel: FC<RejectDocumentationProps>;

interface ApproveDocumentationProps {
    actionInfo: any;
    onActionConfirmed: any;
    onActionCanceled: any;
    openModal: any;
    list_certificateur: any;
    onChangeCertificator: any;
    errorMsg: any;
    loading: any;
    translator: any;
}
declare const ApproveDocumentationConfirmationModel: FC<ApproveDocumentationProps>;

declare enum CompanyManagementColumns {
    logo = "logo",
    name = "name",
    taxId = "taxId",
    companyRole = "companyRole",
    programmeCount = "programmeCount",
    creditBalance = "creditBalance",
    companyState = "status",
    action = "action"
}

declare enum IdeaNoteManagementColumns {
    logo = "logo",
    denomination = "denomination",
    ref_note_idee = "ref_note_idee",
    Statut = "Statut",
    date_soumission = "date_soumission",
    action = "action"
}

declare enum UserManagementColumns {
    logo = "logo",
    name = "name",
    email = "email",
    phoneNo = "phoneNo",
    company = "company",
    companyRole = "companyRole",
    role = "role",
    actions = "actions"
}

declare enum ProgrammeManagementColumns {
    title = "title",
    company = "company",
    sector = "sector",
    currentStage = "currentStage",
    creditIssued = "creditIssued",
    creditBalance = "creditBalance",
    creditTransferred = "creditTransferred",
    certifierId = "certifierId",
    serialNo = "serialNo",
    action = "action",
    emissionReductionExpected = "emissionReductionExpected",
    emissionReductionAchieved = "emissionReductionAchieved",
    emissionReductionAchievedandCreditIssued = "emissionReductionAchievedandCreditIssued"
}

declare enum InvestmentLevel {
    NATIONAL = "National",
    INTERNATIONAL = "International"
}
declare enum InvestmentStatus {
    PENDING = "Pending",
    APPROVED = "Approved",
    REJECTED = "Rejected",
    CANCELLED = "Cancelled"
}
declare const getInvestmentStatusEnumVal: (value: string) => string;
declare const getStatusTagType: (status: InvestmentStatus) => "error" | "processing" | "default" | "success";
declare enum InvestmentType {
    PUBLIC = "Public",
    PRIVATE = "Private"
}
declare enum InvestmentCreationType {
    EXISTING = "Existing",
    NEW = "New"
}
declare enum InvestmentOwnershipType {
    PROJECT = "Project",
    NATIONAL = "National"
}
declare enum InvestmentStream {
    CLIMATE_FINANCE = "ClimateFinance",
    CARBON_MARKET = "CarbonMarket"
}

declare enum MitigationTypes {
    AGRICULTURE = "Agriculture",
    BIOMASS_ENERGY = "BiomassEnergy",
    CCS = "CCS",
    CEMENT = "Cement",
    COAL_MINE = "Coal/Mine",
    EE_HOUSEHOLDS = "EEHouseholds",
    EE_INDUSTRY = "EEIndustry",
    EE_OWN_GENERATION = "EEOwnGeneration",
    EE_SERVICE = "EEService",
    EE_SUPPLY_SIDE = "EESupplySide",
    ENERGY_DISTRIBUTION = "EnergyDistribution",
    FORESTRY = "Forestry",
    FOSSIL_FUEL = "FossilFuel",
    FUGITIVE = "Fugitive",
    GEOTHERMAL = "Geothermal",
    HFC_PFCS_SF6 = "HFC_PFCs_SF6",
    HYDRO = "Hydro",
    LANDFILLS = "Landfills",
    MARINE = "Marine",
    METHANE_AVOIDANCE = "MethaneAvoidance",
    N20 = "N20",
    SOLAR = "Solar",
    TRANSPORT = "Transport",
    WIND = "Wind",
    CO2_USAGE = "CO2Usage",
    TIDAL = "Tidal"
}
declare enum MitigationSubTypes {
    IRRIGATION = "Irrigation",
    ENERGY_EFFICIENCY = "EnergyEfficiency",
    ALTERNATIVE_FERTILISER = "AlternativeFertilisers",
    NO_TILLAGE = "NoTillage",
    SOIL_ENRICHMENT_BIOCHAR = "SoilEnrichmentBiochar",
    RICE_CROPS = "RiceCrops",
    BAGASSE_POWER = "BagassePower",
    PALM_OIL_SOLID_WASTE = "Palm oil solid waste",
    AGRICULTURAL_RESIDUES_OTHER_KINDS = "AgriculturalResiduesOtherKinds",
    AGRICULTURAL_RESIDUES_RICE_HUSK = "AgriculturalResiduesRiceHusk",
    AGRICULTURAL_RESIDUES_MUSTARD_CROP = "AgriculturalResiduesMustardCrop",
    AGRICULTURAL_RESIDUES_POULTRY_LITTER = "AgriculturalResiduesPoultryLitter",
    BLACK_LIQUOR = "BlackLiquor",
    FOREST_RESIDUES_SAWMILL_WASTE = "ForestResiduesSawmillWaste",
    FOREST_RESIDUES_OTHER = "ForestResiduesOther",
    FOREST_BIOMASS = "ForestBiomass",
    INDUSTRIAL_WASTE = "IndustrialWaste",
    GASIFICATION_OF_BIOMASS = "GasificationOfBiomass",
    SWITCH_FROM_FOSSIL_FUEL_TO_PIPED_BIOGAS = "SwitchFromFossilFuelToPipedBiogas",
    BIOMASS_BRIQUETTES_OR_PELLETS = "BiomassBriquettesOrPellets",
    BIODIESEL = "Biodiesel",
    BIODIESEL_FROM_WASTE_OIL = "BiodieselFromWasteOil",
    ETHANOL = "Ethanol",
    CLINKER_REPLACEMENT = "ClinkerReplacement",
    COAL_MINE_METHANE = "CoalMineMethane",
    COAL_BED_METHANE = "CoalBedMethane",
    CMM_VENTILATION_AIR_METHANE = "CMMVentilationAirMethane",
    VENTILATION_AIR_METHANE = "VentilationAirMethane",
    LIGHTING = "Lighting",
    SOLAR_LAMPS = "SolarLamps",
    STOVES = "Stoves",
    STOVES_SCHOOL_IN_GHANA = "StovesSchoolInGhana",
    STOVES_HOUSES_IN_NAMIBIA = "StovesHousesInNamibia",
    LIGHTING_INSULATION_SOLAR = "LightingInsulationSolar",
    APPLIANCES = "Appliances",
    CHEMICALS = "Chemicals",
    PETROCHEMICALS = "Petrochemicals",
    PAPER = "Paper",
    CEMENT = "Cement",
    IRON_STEEL = "IronSteel",
    MACHINERY = "Machinery",
    TEXTILES = "Textiles",
    ELECTRONICS = "Electronics",
    FOOD = "Food",
    BUILDING_MATERIALS = "BuildingMaterials",
    GLASS = "Glass",
    NON_FERROUS_METALS = "NonFerrousMetals",
    COKE_OVEN = "CokeOven",
    Mining = "Mining",
    CONSTRUCTION = "Construction",
    METAL_PRODUCTS = "MetalProducts",
    WOOD = "Wood",
    RECYCLING = "Recycling",
    CHEMICALS_HEAT = "ChemicalsHeat",
    PETROCHEMICALS_HEAT = "PetrochemicalsHeat",
    CARBON_BLACK_GAS = "CarbonBlackGas",
    CEMENT_HEAT = "CementHeat",
    IRON_STEEL_HEAT = "IronSteelHeat",
    BUILDING_MATERIALS_HEAT = "BuildingMaterialsHeat",
    GLASS_HEAT = "GlassHeat",
    NON_FERROUS_METALS_HEAT = "NonFerrousMetalsHeat",
    COKE_OVEN_GAS = "CokeOvenGas",
    HVAC_LIGHTING = "HvacLighting",
    AIR_CONDITIONING = "AirConditioning",
    EE_NEW_BUILDINGS = "EeNewBuildings",
    STREET_LIGHTING = "StreetLighting",
    LIGHTING_IN_SERVICE = "LightingInService",
    WATER_PUMPING = "WaterPumping",
    WATER_PURIFICATION = "WaterPurification",
    EE_PUBLIC_STOVES = "EePublicStoves",
    EE_PUBLIC_BUILDINGS = "EePublicBuildings",
    EE_COMMERCIAL_BUILDINGS = "EeCommercialBuildings",
    SINGLE_CYCLE_TO_COMBINED_CYCLE = "SingleCycleToCombinedCycle",
    COGENERATION = "Cogeneration",
    CO_FIRING_WITH_BIOMASS = "CoFiringWithBiomass",
    HIGHER_EFFICIENCY_COAL_POWER = "HigherEfficiencyCoalPower",
    HIGHER_EFFICIENCY_OIL_POWER = "HigherEfficiencyOilPower",
    HIGHER_EFFICIENCY_USING_WASTE_HEAT = "HigherEfficiencyUsingWasteHeat",
    POWER_PLANT_REHABILITATION = "PowerPlantRehabilitation",
    HIGHER_EFFICIENCY_STEAM_BOILER = "HigherEfficiencySteamBoiler",
    DISTRICT_HEATING = "DistrictHeating",
    REPLACEMENT_OF_DISTRICT_HEATING_BOILERS = "ReplacementOfDistrictHeatingBoilers",
    CONNECTION_OF_ISOLATED_GRID = "ConnectionOfIsolatedGrid",
    DISTRICT_COOLING = "DistrictCooling",
    EFFICIENT_ELECTRICITY_DISTRIBUTION = "EfficientElectricityDistribution",
    AFFORESTATION = "Afforestation",
    MANGROVES = "Mangroves",
    AGROFORESTRY = "Agroforestry",
    REFORESTATION = "Reforestation",
    COAL_TO_NATURAL_GAS = "CoalToNaturalGas",
    COAL_TO_OIL = "CoalToOil",
    LIGNITE_TO_NATURAL_GAS = "LigniteToNaturalGas",
    NEW_NATURAL_GAS_PLANT = "NewNaturalGasPlant",
    NEW_NATURAL_GAS_PLANT_USING_LNG = "NewNaturalGasPlantUsingLng",
    OIL_TO_ELECTRICITY = "OilToElectricity",
    OIL_TO_LPG = "OilToLpg",
    OIL_TO_NATURAL_GAS = "OilToNaturalGas",
    OIL_FIELD_FLARING_REDUCTION = "OilFieldFlaringReduction",
    OIL_AND_GAS_PROCESSING_FLARING = "OilAndGasProcessingFlaring",
    NATURAL_GAS_PIPELINES = "NaturalGasPipelines",
    NON_HYDROCARBON_MINING = "NonHydrocarbonMining",
    SPONTANEOUSLY_IGNITION_OF_COAL_PILES = "SpontaneouslyIgnitionOfCoalPiles",
    CHARCOAL_PRODUCTION = "CharcoalProduction",
    GEOTHERMAL_ELECTRICITY = "GeothermalElectricity",
    GEOTHERMAL_HEATING = "GeothermalHeating",
    HFC23 = "Hfc23",
    HFC134A = "Hfc134A",
    PFCS = "Pfcs",
    SF6 = "Sf6",
    RUN_OF_RIVER = "RunOfRiver",
    EXISTING_DAM = "ExistingDam",
    HIGHER_EFFICIENCY_HYDRO_POWER = "HigherEfficiencyHydroPower",
    NEW_DAM = "NewDam",
    LANDFILL_FLARING = "LandfillFlaring",
    LANDFILL_POWER = "LandfillPower",
    COMBUSTION_OF_MSW = "CombustionOfMsw",
    GASIFICATION_OF_MSW = "GasificationOfMsw",
    BIOGAS_FROM_MSW = "BiogasFromMsw",
    LANDFILL_AERATION = "LandfillAeration",
    INTEGRATED_SOLID_WASTE_MANAGEMENT = "IntegratedSolidWasteManagement",
    SWITCH_FROM_FOSSIL_FUEL_TO_PIPED_LANDFILL_GAS = "SwitchFromFossilFuelToPipedLandfillGas",
    LANDFILL_COMPOSTING = "LandfillComposting",
    MANURE = "Manure",
    DOMESTIC_MANURE = "DomesticManure",
    WASTE_WATER = "WasteWater",
    INDUSTRIAL_SOLID_WASTE = "IndustrialSolidWaste",
    PALM_OIL_WASTE = "PalmOilWaste",
    AEROBIC_TREATMENT_OF_WASTE_WATER = "AerobicTreatmentOfWasteWater",
    COMPOSTING = "Composting",
    ADIPIC_ACID = "AdipicAcid",
    NITRIC_ACID = "NitricAcid",
    CAPROLACTAM = "Caprolactam",
    SOLAR_PHOTOVOLTAICS_PV = "SolarPhotovoltaicsPV",
    SOLAR_WATER_PUMPING_OFF_GRID = "SolarWaterPumpingOffGrid",
    SOLAR_WATER_PUMPING_ON_GRID = "SolarWaterPumpingOnGrid",
    SOLAR_PV_WATER_DISINFECTION = "SolarPVWaterDisinfection",
    SOLAR_THERMAL_POWER = "SolarThermalPower",
    SOLAR_THERMAL_HEAT = "SolarThermalHeat",
    SOLAR_WATER_HEATING = "SolarWaterHeating",
    SOLAR_COOKING = "SolarCooking",
    BUS_RAPID_TRANSIT = "BusRapidTransit",
    BUS_RAPID_TRANSIT_GREEN_HYDROGEN = "BusRapidTransitGreenHydrogen",
    MOTORBIKES = "Motorbikes",
    MODE_SHIFT_ROAD_TO_RAIL = "ModeShiftRoadToRail",
    MORE_EFFICIENT_TRAIN_SYSTEM = "MoreEfficientTrainSystem",
    MORE_EFFICIENT_VEHICLES = "MoreEfficientVehicles",
    RAIL_REGENERATIVE_BRAKING = "RailRegenerativeBraking",
    RAIL_GREEN_HYDROGEN = "RailGreenHydrogen",
    RAIL_EFFICIENT_OPERATION = "RailEfficientOperation",
    METRO_EFFICIENT_OPERATION = "MetroEfficientOperation",
    CARS_GREEN_HYDROGEN = "CarsGreenHydrogen",
    CARS_EFFICIENT_OPERATION = "CarsEfficientOperation",
    SCRAPPING_OLD_VEHICLES = "ScrappingOldVehicles",
    BIODIESEL_FOR_TRANSPORT = "BiodieselForTransport",
    CABLE_CARS = "CableCars",
    WIND = "Wind",
    OFFSHORE_WIND = "OffshoreWind",
    CO2_RECYCLING = "CO2Recycling",
    CO2_REPLACEMENT = "CO2Replacement",
    TIDAL = "Tidal"
}
declare const mitigationTypeList: {
    value: string;
    label: string;
}[];
declare const sectorMitigationTypesListMapped: any;
declare const mitigationSubTypeList: {
    label: string;
    value: string;
}[];
declare const mitigationSubTypesListMapped: any;
declare const methodologyOptions: string[];

declare enum ESGType {
    AAA = "AAA",
    AA = "AA",
    A = "A",
    AR = "A(R)",
    BBB = "BBB",
    BB = "BB",
    B = "B",
    BR = "B(R)",
    B13 = "B13",
    B13R = "B13(R)",
    CCC = "CCC",
    C = "C",
    CR = "C(R)",
    FI = "FI"
}

declare enum Instrument {
    LOAN = "Loan",
    RESULT_BASED = "ResultBased",
    GRANT = "Grant",
    EQUITY = "Equity",
    GUARANTEE = "Guarantee",
    INKIND = "In-Kind",
    CONLOAN = "ConcessionalLoan",
    NONCONLOAN = "Non-ConcessionalLoan",
    INSURANCE = "Insurance",
    OTHER = "Other"
}

declare enum NdcActionStatus {
    PENDING = "Pending",
    APPROVED = "Approved"
}
declare const getNdcActionStatusEnumVal: (value: string) => string;
declare const getNdcStatusTagType: (status: NdcActionStatus) => "processing" | "default" | "success";

declare enum NdcActionTypes {
    Mitigation = "mitigation",
    Adaptation = "adaptation",
    Enablement = "enablement",
    CrossCutting = "crosscutting"
}
declare const ndcActionTypeList: {
    value: string;
    label: string;
}[];

declare enum Role {
    Root = "Root",
    Admin = "Admin",
    Manager = "Manager",
    ViewOnly = "ViewOnly"
}

declare enum SectoralScope {
    "Energy Industries (Renewable – / Non-Renewable Sources)" = "1",
    "Energy Distribution" = "2",
    "Energy Demand" = "3",
    "Manufacturing Industries" = "4",
    "Chemical Industries" = "5",
    "Construction" = "6",
    "Transport" = "7",
    "Mining/Mineral Production" = "8",
    "Metal Production" = "9",
    "Fugitive Emissions From Fuels (Solid, Oil and Gas)" = "10",
    "Fugitive Emissions From Production and Consumption of Halocarbons and Sulphur Hexafluoride" = "11",
    "Solvent Use" = "12",
    "Waste Handling and Disposal" = "13",
    "Afforestation and Reforestation" = "14",
    "Agriculture" = "15"
}

declare enum TxType {
    CREATE = "0",
    REJECT = "1",
    ISSUE = "2",
    TRANSFER = "3",
    CERTIFY = "4",
    RETIRE = "5",
    REVOKE = "6",
    FREEZE = "7",
    AUTH = "8",
    UNFREEZE = "9",
    OWNERSHIP_UPDATE = "12"
}

declare enum CompanyRole {
    ACADEMICS = "Academics",
    SERVICE_PROVIDER = "ServiceProvider",
    MITIGATION_ACTIVITY_PARTNER = "MitigationActivityParticipant",
    CARBON_CREDIT_BROKER = "CarbonCreditBroker",
    VALIDATION_VERIFICATION_ENTITY = "ValidationVerificationEntities",
    COMMERCIAL_BANKS = "CommercialBanks",
    INVESTORS = "InvestorsFinanciers",
    GOV_REGULATOR = "GovernmentRegulators",
    OBSERVERS = "Observers",
    CIVIL_SOCIETY_ORG = "CivilSocietyOrganization",
    CERTIFIER = "Certifier",
    INTERNAL_ORGANIZATION = "InternationalOrganization",
    PROGRAMME_DEVELOPER = "ProgrammeDeveloper",
    MRV = "MRV",
    GOVERNMENT = "Government",
    MINISTRY = "Ministry",
    API = "API"
}

declare enum EnergyGenerationUnits {
    Wh = "Wh/year/unit",
    mWh = "mWh/year/unit",
    kWh = "kWh/year/unit",
    MWh = "MWh/year/unit",
    GWh = "GWh/year/unit",
    J = "J/year/unit",
    KJ = "kJ/year/unit"
}
declare const energyGenerationUnitList: {
    value: string;
    label: string;
}[];

declare enum LandAreaUnits {
    mm2 = "mm2",
    cm2 = "cm2",
    m2 = "m2",
    ha = "ha",
    km2 = "km2",
    in2 = "in2",
    ft2 = "ft2",
    ac = "ac",
    Mi2 = "Mi2"
}
declare const landAreaUnitList: {
    value: string;
    label: string;
}[];

declare const consumerGroupList: {
    value: string;
    label: string;
}[];

declare enum Sector {
    Energy = "Energy",
    Health = "Health",
    Education = "Education",
    Transport = "Transport",
    Manufacturing = "Manufacturing",
    Hospitality = "Hospitality",
    Forestry = "Forestry",
    Waste = "Waste",
    Agriculture = "Agriculture",
    Other = "Other"
}
declare enum EmissionSector {
    'energyEmissions' = "Energy",
    'industrialProcessesProductUse' = "Industrial Processes & Product Use",
    'agricultureForestryOtherLandUse' = "Agriculture, Forestry, and Other Land Use",
    'waste' = "Waste",
    'other' = "Other"
}
declare enum EmissionGas {
    'co2' = "CO<sub>2</sub>",
    'ch4' = "CH<sub>4</sub>",
    'n2o' = "N<sub>2</sub>O",
    'co2eq' = "CO<sub>2</sub>-eq"
}
declare enum EmissionSubSectors {
    fuelCombustionActivities = "Fuel Combustion Activities",
    fugitiveEmissionsFromFuels = "Fugitive emissions from fuels",
    carbonDioxideTransportStorage = "Carbon dioxide Transport and Storage",
    mineralIndustry = "Mineral Industry",
    chemicalIndustry = "Chemical Industry",
    metalIndustry = "Metal Industry",
    nonEnergyProductsFuelsSolventUse = "Non-Energy Products from Fuels and Solvent Use",
    electronicsIndustry = "Electronics Industry",
    productUsesSubstOzoneDepletingSubs = "Product Uses as Substitutes for Ozone Depleting Substances",
    otherProductManufactureUse = "Other Product Manufacture and Use",
    otherIndustrialProcessesProductUse = "Other (Industrial Processes & Product Use)",
    livestock = "Livestock",
    land = "Land",
    aggregateNonCo2SourcesLand = "Aggregate sources and non-CO2 emissions sources on land",
    otherAgricultureForestryOtherLandUse = "Other (Agriculture, Forestry, and Other Land Use)",
    solidWasteDisposal = "Solid Waste Disposal",
    biologicalTreatmentSolidWaste = "Biological Treatment of Solid Waste",
    incinerationOpenBurningWaste = "Incineration and Open Burning of Waste",
    wastewaterTreatmentDischarge = "Wastewater Treatment and Discharge",
    otherWaste = "Other (Waste)",
    indirectN2oEmissions = "Indirect N2O emissions from the atmospheric deposition of nitrogen in NOx and NH3",
    other = "Other"
}
declare enum ProjectionTypes {
    bau = "BAU",
    conditionalNdc = "Conditional NDC",
    unconditionalNdc = "Unconditional NDC",
    actual = "Actual"
}

declare enum RadioButtonStatus {
    YES = "YES",
    NO = "NO",
    NA = "N/A"
}
declare enum RadioButtonStatus2 {
    YES = "YES",
    NO = "NO",
    MAYBE = "MAYBE"
}
declare enum Titles {
    Mr = "Mr",
    Mrs = "Mrs"
}
declare const titleList: {
    value: Titles;
    label: string;
}[];
declare enum FormElementType {
    Radio = 0,
    Label = 1,
    Input = 2
}

declare enum SdgGoals {
    noPoverty = "No Poverty",
    zeroHunger = "Zero Hunger",
    gdHealth = "Good Health and Well-being",
    qualityEducation = "Quality Education",
    genderEq = "Gender Equality",
    cleanWatr = "Clean Water and Sanitation",
    affEnergy = "Affordable and Clean Energy",
    decentWork = "Decent Work and Economic Growth",
    industry = "Industry, Innovation and Infrastructure",
    reducedInEq = "Reduced Inequalities",
    sustainableCities = "Sustainable Cities and Communities",
    responsibleConsumption = "Responsible Consumption and Production",
    climateAction = "Climate Action",
    lifeBelowWater = "Life Below Water",
    lifeOnLand = "Life On Land",
    peace = "Peace, Justice and Strong Institutions",
    partnership = "Partnerships for the Goals"
}

declare enum DocType {
    DESIGN_DOCUMENT = "0",
    METHODOLOGY_DOCUMENT = "1",
    MONITORING_REPORT = "2",
    VERIFICATION_REPORT = "3",
    ENVIRONMENTAL_IMPACT_ASSESSMENT = "7"
}

declare enum DocumentStatus {
    PENDING = "Pending",
    ACCEPTED = "Accepted",
    REJECTED = "Rejected"
}

declare enum CompanyState {
    SUSPENDED = 0,
    ACTIVE = 1,
    PENDING = 2,
    REJECTED = 3
}

declare enum WidgetType {
    PIE = "Pie",
    MAP = "Map",
    LIST = "List",
    BAR = "Bar",
    BAR_ESTIMATED_AND_ACTUAL = "Bar Estimated And Actual"
}

declare enum StatsCardsTypes {
    PROGRAMMES_PENDING = "Projects Pending",
    TRANSFER_REQUEST_RECEIVED = "Pending Transfers Received",
    PROGRAMMES_UNCERTIFIED = "Projects Certifiable",
    TRANSFER_REQUEST_SENT = "Pending Transfers Sent",
    PROGRAMMES_CERTIFIED = "Projects Certified",
    CREDIT_BALANCE = "Credit Balance",
    CREDIT_CERTIFIED = "Credits Certified",
    PROGRAMMES = "Programmes",
    CREDITS = "Credits",
    CERTIFIED_CREDITS = "Certified Credits",
    TOTAL_PROGRAMMES = "Total Programmes",
    TOTAL_PROGRAMMES_SECTOR = "Total Programmes: Sector",
    TOTAL_CREDITS = "Total Credits",
    TOTAL_CREDITS_CERTIFIED = "Total Credits Certified",
    PROGRAMME_LOCATIONS = "Programme Locations",
    TRANSFER_LOCATIONS_INTERNATIONAL = "Transfer Locations International"
}
declare enum MrvStatsCardsTypes {
    AGG_PROGRAMME_BY_SECTOR = "AGG_PROGRAMME_BY_SECTOR",
    AGG_NDC_ACTION_BY_TYPE = "AGG_NDC_ACTION_BY_TYPE",
    AGG_NDC_ACTION_BY_SECTOR = "AGG_NDC_ACTION_BY_SECTOR",
    TOTAL_EMISSIONS = "TOTAL_EMISSIONS",
    PROGRAMME_LOCATION = "PROGRAMME_LOCATION",
    INVESTMENT_LOCATION = "INVESTMENT_LOCATION",
    AGG_INVESTMENT_BY_TYPE = "AGG_INVESTMENT_BY_TYPE"
}
declare enum SystemNames {
    CARBON_REGISTRY = "CARBON_REGISTRY_SYSTEM",
    CARBON_TRANSPARENCY = "CARBON_TRANSPARENCY_SYSTEM"
}
declare enum GhgStatCardTypes {
    AGG_EMISSIONS_BY_SECTOR = "AGG_EMISSIONS_BY_SECTOR",
    AGG_EMISSIONS_BY_GAS = "AGG_EMISSIONS_BY_GAS",
    AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR = "AGG_EMISSIONS_MITIGATION_POTENTIAL_BY_SECTOR",
    AGG_REDUCTION_PERCENT_BAU_BY_SECTOR = "AGG_REDUCTION_PERCENT_BAU_BY_SECTOR",
    AGG_EMISSIONS_COMPARISON = "AGG_EMISSIONS_COMPARISON"
}

declare enum Action {
    Manage = "manage",
    Create = "create",
    Read = "read",
    Update = "update",
    Delete = "delete",
    Approve = "approve",
    Reject = "reject"
}

declare enum GovDepartment {
    "Cocoa Research Institute" = "1",
    "National Agricultural Extension, Research and Liaison Services" = "2",
    "National Veterinary Research Institute" = "3",
    "Agricultural Insurance Corporation" = "4",
    "National Root Crops Research Institute" = "5",
    "Agricultural Research Council" = "6",
    "Institute for Oceanography and Marine Research" = "7",
    "Institute for Oil Palm Research" = "8",
    "Agricultural Quarantine Service" = "9",
    "National Horticultural Research Institute" = "10",
    "Federal Airports Authority" = "11",
    "Airspace Management Agency" = "12",
    "Civil Aviation Authority" = "13",
    "Safety Investigation Bureau" = "14",
    "Meteorological Agency" = "15",
    "College of Aviation Technology" = "16",
    "National Information Technology Development Agency" = "17",
    "Satellite Limited" = "18",
    "Broadcasting Commission" = "19",
    "Commission" = "20",
    "Postal Service" = "21",
    "National Frequency Management Council" = "22",
    "Television Authority" = "23",
    "Galaxy Backbone" = "24",
    "Asset Management Corporation" = "25",
    "Social Security Administration" = "26",
    "Budget Office of the Federation" = "27",
    "Bureau of Public Enterprises" = "28",
    "Bureau of Public Procurement" = "29",
    "Central Bank" = "30",
    "Corporate Affairs Commission" = "31",
    "Debt Management Office" = "32",
    "Inland Revenue Service" = "33",
    "Mortgage Bank" = "34",
    "Fiscal Responsibility Commission" = "35",
    "Infrastructure Concession Regulatory Commission" = "36",
    "National Bureau of Statistics" = "37",
    "National Council on Privatisation" = "38",
    "National Insurance Commission" = "39",
    "National Pension Commission" = "40",
    "National Planning Commission" = "41",
    "National Sugar Development Council" = "42",
    "Niger Delta Development Commission" = "43",
    "Customs Service" = "44",
    "Deposit Insurance Corporation" = "45",
    "Investment Promotion Commission" = "46",
    "Export - Import Bank" = "47",
    "Export Promotion Council" = "48",
    "Oil and Gas Free Zones Authority" = "49",
    "Export Processing Zones Authority" = "50",
    "Revenue Mobilisation Allocation and Fiscal Commission" = "51",
    "Securities and Exchange Commission" = "52",
    "Standards Organisation" = "53",
    "Small and Medium Enterprise Development Agency" = "54",
    "National Board for Arabic And Islamic Studies" = "55",
    "Joint Admissions and Matriculation Board" = "56",
    "National Examination Council" = "115",
    "National Open University" = "57",
    "National Teachers Institute" = "58",
    "National Universities Commission" = "59",
    "Tertiary Education Trust Fund" = "60",
    "Teachers Registration Council" = "61",
    "National Business and Technical Examinations Board" = "62",
    "Universal Basic Education Commission" = "63",
    "West African Examination Council" = "64",
    "National Commission for Colleges of Education" = "65",
    "National Library" = "66",
    "Midstream and Downstream Petroleum Regulatory Authority" = "67",
    "Upstream Petroleum Regulatory Commission" = "68",
    "Electricity Management Services Limited" = "69",
    "Energy Commission" = "70",
    "National Power Training Institute" = "71",
    "Electricity Regulatory Commission" = "72",
    "Content Monitoring and Development Board" = "73",
    "National Petroleum Corporation" = "74",
    "Petroleum Product Pricing Regulatory Agency" = "76",
    "Power Holding Company (defunct)" = "77",
    "Rural Electrification Agency" = "78",
    "Transmission Company" = "79",
    "Environmental Protection Agency (defunct)" = "80",
    "Forestry Research Institute" = "81",
    "National Biosafety Management Agency" = "82",
    "National Environmental Standards and Regulations Enforcement Agency" = "83",
    "National Oil Spill Detection and Response Agency" = "84",
    "Environmental Health Officers Registration Council" = "85",
    "National Health Insurance Scheme" = "86",
    "Institute for Pharmaceutical Research and Development" = "87",
    "Agency for the Control of AIDS" = "88",
    "Agency for Food and Drug Administration and Control" = "89",
    "Primary Health Care Development Agency" = "90",
    "Institute of Medical Research" = "91",
    "Centre for Disease Control" = "92",
    "Drug Law Enforcement Agency" = "93",
    "Defence Intelligence Agency" = "94",
    "State Security Service" = "95",
    "National Intelligence Agency" = "96",
    "Financial Intelligence Unit" = "97",
    "National Judicial Council" = "98",
    "Federal Judicial Service Commission" = "99",
    "National Judicial Institute" = "100",
    "Maritime Administration and Safety Agency" = "101",
    "Ports Authority" = "102",
    "Shippers' Council" = "103",
    "Broadcasting Organisation" = "104",
    "News Agency" = "105",
    "Press Council" = "106",
    "Agency For Science and Engineering Infrastructure" = "108",
    "Biotechnology Development Agency" = "109",
    "Centre for Remote Sensing" = "110",
    "Science and Technology Complex" = "111",
    "Office for Technology Acquisition and Promotion" = "112",
    "Space Research and Development Agency" = "113",
    "Nuclear Regulatory Authority" = "114",
    "Raw Materials Research and Development Council" = "116",
    "Communications Satellite Ltd" = "117",
    "Centre for Technology Management" = "118",
    "Hydrological Services Agency" = "119",
    "Integrated Water Resources Commission" = "120",
    "Water Resources Institute" = "121",
    "River Basin Development Authorities" = "122",
    "Centre for Black and African Arts and Civilization" = "123",
    "Automotive Design and Development Council" = "124",
    "Code of Conduct Bureau" = "125",
    "Computer Professionals Registration Council" = "126",
    "Consumer Protection Council" = "127",
    "Economic and Financial Crimes Commission" = "128",
    "Federal Character Commission" = "129",
    "Federal Housing Authority" = "130",
    "Corrupt Practices and Other Related Offences Commission" = "131",
    "Independent National Electoral Commission" = "132",
    "Industrial Training Fund" = "133",
    "Legal Aid Council" = "134",
    "Agency for the Prohibition of Trafficking in Persons" = "135",
    "National Boundary Commission" = "136",
    "National Council of Arts and Culture" = "137",
    "Economic Reconstruction Fund" = "138",
    "Emergency Management Agency" = "139",
    "Hajj Commission" = "140",
    "Human Rights Commission" = "141",
    "Identity Management Commission" = "142",
    "Institute for Hospitality Tourism" = "143",
    "Lottery Regulatory Commission" = "144",
    "Orientation Agency" = "145",
    "Population Commission" = "146",
    "Poverty Eradication Programme (defunct)" = "147",
    "Salaries, Incomes and Wages Commission" = "148",
    "Sports Commission" = "149",
    "Extractive Industries Transparency Initiative" = "150",
    "Immigration Service" = "151",
    "Building and Road Research Institute" = "152",
    "Institute of Building" = "153",
    "Christian Pilgrim Commission" = "154",
    "Copyright Commission" = "155",
    "Tourism Development Corporation" = "156",
    "Public Complaints Commission" = "157",
    "Surveyors Council" = "158",
    "National Lottery Trust Fund" = "159"
}

declare enum Ministry {
    Agriculture = "Agriculture",
    Aviation = "Aviation",
    Communications = "Communications",
    Economy = "Economy",
    Education = "Education",
    Energy = "Energy",
    Environment = "Environment",
    Health = "Health",
    Intelligence = "Intelligence",
    Judiciary = "Judiciary",
    Maritime = "Maritime",
    Media = "Media",
    ScienceAndTechnology = "Science And Technology",
    WaterResources = "Water Resources",
    Other = "Other"
}

interface LoginProps {
    email: string;
    password: string;
}

interface IdeaNoteTableDataType {
    logo?: string;
    denomination?: string;
    ref_note_idee?: string;
    Statut?: string;
    date_soumission?: string;
}

type UserProps = {
    id: string;
    userRole: string;
    companyId: number;
    companyRole: string;
    companyLogo: string;
    companyName: string;
    companyState: number;
};
interface UserContextProps {
    userInfoState?: UserProps;
    setUserInfo: (val: UserProps) => void;
    removeUserInfo: () => void;
    IsAuthenticated: (tkn?: any) => boolean;
    isTokenExpired: boolean;
    setIsTokenExpired: (val: boolean) => void;
}

interface userForgotPasswordProps {
    email: string;
}

declare enum ConfigurationSettingsType {
    isTransferFrozen = 0
}

interface ProgrammeDeveloperCreation {
    companyName?: string;
    companyLocation?: string;
    industry?: string;
    registrationNo?: string;
}
interface UserCreationProps extends ProgrammeDeveloperCreation {
    name: string;
    email: string;
    role: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
    contactNo: string;
    companyLogo?: string;
}
interface CountrySelect {
    key: string;
    label: string;
    value: string;
}

type Methods = 'get' | 'post' | 'delete' | 'put' | 'patch';
type ConnectionContextProviderProps = {
    serverURL: string;
    t: any;
    statServerUrl?: string;
    children: ReactNode;
};
interface Response<T> {
    data: T;
    statusText: string;
    status?: number;
    headers: RawAxiosResponseHeaders | AxiosResponseHeaders;
    config?: AxiosRequestConfig;
    request?: any;
    message: string;
}
type ConnectionProps = {
    post<T = any, R = Response<T>>(path: string, data?: any, config?: AxiosRequestConfig, extraUrl?: string): Promise<R>;
    get<T = any, R = Response<T>>(path: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = Response<T>>(path: string, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = Response<T>>(path: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    patch<T = any, R = Response<T>>(path: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    updateToken: (token?: string) => void;
    token?: string;
    removeToken: (tkn?: string) => void;
    statServerUrl?: string;
};

type HeaderProps = {
    title?: string;
    onToggle: (val: boolean) => void;
};

type LayoutSiderProps = {
    selectedKey?: string;
    collapsed?: boolean;
};

interface AgricultureProperties {
    landArea: number;
    landAreaUnit: string;
}
interface SolarProperties {
    energyGeneration: number;
    energyGenerationUnit: string;
    consumerGroup: BuildingType;
}
interface AdaptationProperties {
    implementingAgency: string;
    nationalPlanObjectives: string;
    nationalPlanCoverage: string;
    includedInNAP: any;
    ghgEmissionsReduced: any;
    ghgEmissionsAvoided: any;
}
interface CreditCalculationProperties {
    typeOfMitigation?: MitigationTypes;
    subTypeOfMitigation?: MitigationSubTypes;
    energyGeneration?: number;
    energyGenerationUnit?: string;
    consumerGroup?: BuildingType;
    landArea?: number;
    landAreaUnit?: string;
    numberOfDays?: number;
    numberOfPeopleInHousehold?: number;
    weight?: number;
}
interface CoBenefitsProperties {
}
interface EnablementProperties {
    title: string;
    type?: any[];
    report?: string;
}
interface NdcFinancing {
    userEstimatedCredits: number;
    systemEstimatedCredits: number;
}
interface NdcAction {
    programmeId: string;
    programmeName: string;
    action: NdcActionTypes;
    methodology: string;
    typeOfMitigation: MitigationTypes;
    subTypeOfMitigation: MitigationSubTypes;
    agricultureProperties?: AgricultureProperties;
    solarProperties?: SolarProperties;
    creditCalculationProperties?: CreditCalculationProperties;
    adaptationProperties: AdaptationProperties;
    ndcFinancing?: NdcFinancing;
    monitoringReport?: string;
    coBenefitsProperties?: CoBenefitsProperties;
    enablementProperties?: EnablementProperties;
    constantVersion: string;
    id?: string;
    externalId?: string;
    status: NdcActionStatus;
    sector: string;
}

declare const dateTimeFormat = "dd LLLL yyyy @ HH:mm";
declare const dateFormat = "dd LLLL yyyy";
declare const creditUnit = "ITMO";

declare class Company implements BaseEntity {
    companyId?: number;
    taxId?: string;
    name?: string;
    email?: string;
    phoneNo?: string;
    website?: string;
    address?: string;
    logo?: string;
    country?: string;
    companyRole?: string;
}

declare class User implements BaseEntity {
    id?: number;
    email?: string;
    role?: string;
    name?: string;
    country?: string;
    phoneNo?: string;
    companyId?: number;
    companyRole?: string;
    companyState?: number;
}

declare class ProgrammeEntity implements BaseEntity {
    programmeId?: string;
    serialNo?: string;
    title?: string;
    externalId?: string;
    currentStage?: string;
    typeOfMitigation?: string;
    certifierId?: number[];
    companyId?: number[];
}

declare class ProgrammeCertify implements BaseEntity {
    programmeId?: string;
    comment?: string;
}

declare enum GHGRecordState {
    SAVED = "SAVED",
    FINALIZED = "FINALIZED"
}

declare class Emission implements BaseEntity {
    id?: string;
    year?: string;
    state?: GHGRecordState;
    emissionDocument?: string;
    version?: number;
}

declare class Projection implements BaseEntity {
    id?: string;
    year?: string;
    state?: GHGRecordState;
    emissionDocument?: string;
    version?: number;
}

declare class IdeaNote implements BaseEntity {
    logo?: string;
    denomination?: string;
    ref_note_idee?: string;
    Statut?: string;
    date_soumission?: string;
}

interface TransferActionModelProps {
    icon: any;
    title: string;
    transfer: ProgrammeTransfer;
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
declare const TransferActionModel: FC<TransferActionModelProps>;

interface NdcActionBodyProps {
    data?: any;
    progressIcon?: any;
    programmeId?: any;
    canUploadMonitorReport?: boolean;
    programmeOwnerId?: any;
    getProgrammeDocs?: any;
    ministryLevelPermission?: boolean;
    translator: any;
    onFinish?: any;
    programme?: any;
}
declare const NdcActionBody: FC<NdcActionBodyProps>;

interface OrganisationStatusProps {
    organisationStatus: number;
    t: any;
}
declare const OrganisationStatus: (props: OrganisationStatusProps) => React.JSX.Element;

interface IdeaNoteStatusProps {
    IdeaNoteStatus: string;
    t: any;
}
declare const IdeaNoteStatus: (props: IdeaNoteStatusProps) => React.JSX.Element;

interface ProgrammeDocumentsProps {
    data: any;
    title: any;
    icon: any;
    programmeId: any;
    programmeOwnerId: any[];
    getDocumentDetails: any;
    programme: any;
    authoriseDoc2Url: any;
    setauthoriseDoc2Url: any;
    onPopupAction: any;
    updateProgrammeData: any;
    getProgrammeById: any;
    ministryLevelPermission?: boolean;
    translator: any;
    methodologyDocumentUpdated: any;
    programmeStatus?: any;
}
declare const ProgrammeDocuments: FC<ProgrammeDocumentsProps>;

interface UserRoleIconProps {
    role: string;
}
declare const UserRoleIcon: FC<UserRoleIconProps>;

interface TimelineBodyProps {
    text: string;
    remark?: string | null;
    via?: string | null;
    t: any;
}
declare const addNdcDesc: (props: any) => string;
declare const TimelineBody: FC<TimelineBodyProps>;

declare const GHGEmissionsComponent: (props: any) => React.JSX.Element;

declare const GHGProjectionsComponent: (props: any) => React.JSX.Element;

declare const GHGDashboardComponent: (props: any) => React.JSX.Element;

declare const AdminBGColor = "rgba(255, 166, 166, 0.42)";
declare const AdminColor = "#D12800";
declare const RootBGColor = "rgba(255, 0, 229, 0.15)";
declare const RootColor = "#DB00FF";
declare const ManagerBGColor = "rgba(96, 27, 209, 0.13)";
declare const ManagerColor = "#75009E";
declare const ViewBGColor = "rgba(176, 190, 197, 0.23)";
declare const ViewColor = "#707070";
declare const GovBGColor = "rgba(185, 226, 244, 0.56)";
declare const GovColor = "#008f39";
declare const DevBGColor = "rgba(254, 241, 173, 0.55)";
declare const DevColor = "#FFA070";
declare const MinBGColor = "rgba(198, 144, 251, 0.12)";
declare const MinColor = "#9155fd";
declare const CertBGColor = "rgba(128, 255, 0, 0.12)";
declare const CertColor = "#519E4F";
declare const TooltipColor = "#0dcc59";
declare const InvestmentBGColor = "rgba(151, 110, 215, 0.3)";
declare const InvestmentColor = "#9155FD";

declare const ConnectionContextProvider: FC<ConnectionContextProviderProps>;

declare const useConnection: () => ConnectionProps;

declare const UserContext: React.Context<UserContextProps>;
declare const UserInformationContextProvider: ({ children }: React.PropsWithChildren) => React.JSX.Element;

declare const useUserContext: () => UserContextProps;

declare const SettingsContext: React.Context<{
    isTransferFrozen: boolean;
    setTransferFrozen: (value: boolean) => void;
}>;
declare const SettingsContextProvider: ({ children }: React.PropsWithChildren) => React.JSX.Element;
declare const useSettingsContext: () => {
    isTransferFrozen: boolean;
    setTransferFrozen: (value: boolean) => void;
};

export { Action, AdaptationProperties, AddNdcActionComponent, AddNewCompanyComponent, AddNewUserComponent, AdminBGColor, AdminColor, AgricultureProperties, ApproveDocumentationConfirmationModel, ApproveDocumentationProps, BaseEntity, CarbonSystemType, CertBGColor, CertColor, CoBenefitProps, CoBenefitsProperties, CoBenifitsComponent, Company, CompanyManagementColumns, CompanyManagementComponent, CompanyProfileComponent, CompanyRole, CompanyState, ConfigurationSettingsType, ConnectionContextProvider, ConnectionContextProviderProps, ConnectionProps, CountrySelect, CreditCalculationProperties, CreditTransferComponent, CreditTransferStage, DevBGColor, DevColor, DocType, DocumentStatus, ESGType, Emission, EmissionGas, EmissionSector, EmissionSubSectors, EnablementProperties, EnergyGenerationUnits, FormElementType, GHGDashboardComponent, GHGEmissionsComponent, GHGProjectionsComponent, GhgStatCardTypes, GovBGColor, GovColor, GovDepartment, HeaderProps, IdeaNote, IdeaNoteDetail2Component, IdeaNoteDetailComponent, IdeaNoteManagementColumns, IdeaNoteManagementComponent, IdeaNoteStatus, IdeaNoteStatusProps, IdeaNoteTableDataType, ImgWithFallback, InfoView, InfoViewProps, Instrument, InvestmentBGColor, InvestmentBody, InvestmentBodyProps, InvestmentColor, InvestmentCreationComponent, InvestmentCreationType, InvestmentLevel, InvestmentManagementComponent, InvestmentOwnershipType, InvestmentStatus, InvestmentStream, InvestmentType, LandAreaUnits, LayoutSiderProps, LegendItem, LegendItemItemProps, Loading, LoginProps, ManagerBGColor, ManagerColor, MapComponent, MapComponentProps, MapPopupData, MapSourceData, MapTypes, MapboxComponent, MarkerData, Methods, MinBGColor, MinColor, Ministry, MitigationSubTypes, MitigationTypes, MrvDashboardComponent, MrvStatsCardsTypes, NdcAction, NdcActionBody, NdcActionBodyProps, NdcActionManagementComponent, NdcActionStatus, NdcActionTypes, NdcActionViewComponent, NdcDetailsComponent, NdcFinancing, OrganisationStatus, OrganisationStatusProps, ProfileIcon, ProfileIconProps, Programme, ProgrammeCertify, ProgrammeCreationComponent, ProgrammeDeveloperCreation, ProgrammeDocuments, ProgrammeDocumentsProps, ProgrammeEntity, ProgrammeIssueForm, ProgrammeIssueFormProps, ProgrammeManagementColumns, ProgrammeManagementComponent, ProgrammeProperties, ProgrammePropertiesR, ProgrammePropertiesT, ProgrammePropertiesU, ProgrammeR, ProgrammeRetireForm, ProgrammeRetireFormProps, ProgrammeRevokeForm, ProgrammeRevokeFormProps, ProgrammeStageLegend, ProgrammeStageMRV, ProgrammeStageR, ProgrammeStageUnified, ProgrammeT, ProgrammeTransfer, ProgrammeTransferForm, ProgrammeTransferFormProps, ProgrammeU, Projection, ProjectionTypes, RadioButtonStatus, RadioButtonStatus2, RegistryDashboardComponent, RejectDocumentationConfirmationModel, RejectDocumentationProps, Response, RetireType, Role, RoleIcon, RoleIconProps, RootBGColor, RootColor, SdgGoals, Sector, SectoralScope, SettingsContext, SettingsContextProvider, SolarProperties, StasticCard, StasticCardItemProps, StatsCardsTypes, SubTypeOfMitigation, SupportCreationComponent, SupportManagementComponent, SystemNames, TimelineBody, TimelineBodyProps, Titles, TooltipColor, TransferActionModel, TransferActionModelProps, TxType, TypeOfMitigation, UnitField, User, UserContext, UserContextProps, UserCreationProps, UserInformationContextProvider, UserManagementColumns, UserManagementComponent, UserProfileComponent, UserProps, UserRoleIcon, UserRoleIconProps, ViewBGColor, ViewColor, WidgetType, addCommSep, addCommSepRound, addNdcDesc, addRoundNumber, addSpaces, consumerGroupList, creditUnit, dateFormat, dateTimeFormat, energyGenerationUnitList, getBase64, getCompanyBgColor, getCreditStageVal, getFinancialFields, getGeneralFields, getInvestmentStatusEnumVal, getNdcActionStatusEnumVal, getNdcStatusTagType, getRetirementTypeString, getStageEnumVal, getStageTagType, getStageTagTypeMRV, getStageTransferEnumVal, getStatusTagType, getTransferStageTagType, getValidNdcActions, isBase64, landAreaUnitList, methodologyOptions, mitigationSubTypeList, mitigationSubTypesListMapped, mitigationTypeList, ndcActionTypeList, sectorMitigationTypesListMapped, sumArray, titleList, useConnection, useSettingsContext, useUserContext, userForgotPasswordProps };
