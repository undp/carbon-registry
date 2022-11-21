import { SubSectorConstants } from "./subSectorConstants";

export class SolarConstants implements SubSectorConstants {
    highEmissionFactor: number = 6.8;
    lowEmissionFactor: number = 1.3;
    emissionFactorUnit: string = "tCO2/MWh";
    thresholdUnit: string = "kWh/year";
    buildingTypes: { [k: string]: number } = {
        "Household": 55,
        "HealthCenter": 825,
        "Dispensary": 825,
        "School": 275,
        "PrimarySchool": 275,
        "SecondarySchool": 275,
        "PublicAdministration": 55,
        "TradingPlace": 825,
        "BusStop": 200,
    }
}

