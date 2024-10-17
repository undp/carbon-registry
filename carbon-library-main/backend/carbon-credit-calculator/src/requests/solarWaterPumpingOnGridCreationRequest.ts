import { SolarWaterPumpingOnGridConstants } from "../constants/solarWaterPumpingOnGridConstants"; 
import { CreditCreationRequest } from "./creditCreationRequest";

export class SolarWaterPumpingOnGridCreationRequest implements CreditCreationRequest {
    energyGeneration!: number;
    energyGenerationUnit!: string;
    solarWaterPumpingOnGridConstants: SolarWaterPumpingOnGridConstants = new SolarWaterPumpingOnGridConstants();

    
}