import { SoilEnrichmentConstants } from "../constants/soilEnrichmentConstants";
import { CreditCreationRequest } from "./creditCreationRequest";

export class SoilEnrichmentCreationRequest implements CreditCreationRequest {
    weight!: number;
    soilEnrichmentConstants: SoilEnrichmentConstants = new SoilEnrichmentConstants();

    
}