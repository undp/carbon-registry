import { SolarWaterPumpingOffGridConstants } from "../constants/solarWaterPumpingOffGridConstants"; 
import { CreditCreationRequest } from "./creditCreationRequest";

export class SolarWaterPumpingOffGridCreationRequest implements CreditCreationRequest {
    energyGeneration!: number;
    energyGenerationUnit!: string;
    solarWaterPumpingOffGridConstants: SolarWaterPumpingOffGridConstants = new SolarWaterPumpingOffGridConstants();

    
}