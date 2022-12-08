import { SolarConstants } from "../constants/solarConstants";
import { CreditCreationRequest } from "./creditCreationRequest";

export class SolarCreationRequest implements CreditCreationRequest {
    energyGeneration!: number;
    energyGenerationUnit!: string;
    buildingType!: string;
    solarConstants: SolarConstants = new SolarConstants()
}