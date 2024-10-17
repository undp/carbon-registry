import { PRECISION } from "../calculator";
import { SoilEnrichmentCreationRequest } from "../requests/soilEnrichmentCreationRequest";

export class SoilEnrichmentCal {
    public static calculate(req: SoilEnrichmentCreationRequest): number {
        const constants = req.soilEnrichmentConstants;
        return Number((constants.emissionFactor * req.weight).toFixed(PRECISION))
    }
}