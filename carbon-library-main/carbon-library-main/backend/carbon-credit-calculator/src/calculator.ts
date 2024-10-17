import { AgricultureCal } from "./calculators/agricultureCal";
import { SoilEnrichmentCal } from "./calculators/soilEnrichmentCal";
import { SolarCal } from "./calculators/solarCal";
import { AgricultureCreationRequest } from "./requests/agricultureCreationRequest";
import { CreditCreationRequest } from "./requests/creditCreationRequest";
import { SoilEnrichmentCreationRequest } from "./requests/soilEnrichmentCreationRequest";
import { StovesHousesNamibiaCreationRequest } from "./requests/stovesHousesNamibiaCreationRequest";
import { SolarCreationRequest } from "./requests/solarCreationRequest";
import { StovesHousesNamibiaCal } from "./calculators/stovesHousesNamibiaCal";
import { SolarWaterPumpingOffGridCreationRequest } from "./requests/solarWaterPumpingOffGridCreationRequest";
import { solarWaterPumpingOffGridCal } from "./calculators/solarWaterPumpingOffGridCal";
import { SolarWaterPumpingOnGridCreationRequest } from "./requests/solarWaterPumpingOnGridCreationRequest";
import { solarWaterPumpingOnGridCal } from "./calculators/solarWaterPumpingOnGridCal";

export const PRECISION = 2
export const calculateCredit = (request: CreditCreationRequest): number => {
    if (request instanceof AgricultureCreationRequest) {
        return AgricultureCal.calculate(request)
    } else if (request instanceof SolarCreationRequest) {
        return SolarCal.calculate(request)
    } else if (request instanceof SoilEnrichmentCreationRequest) {
        return SoilEnrichmentCal.calculate(request)
    } else if (request instanceof StovesHousesNamibiaCreationRequest) {
        return StovesHousesNamibiaCal.calculate(request)
    } else if (request instanceof SolarWaterPumpingOffGridCreationRequest) {
        return solarWaterPumpingOffGridCal.calculate(request)
    } else if (request instanceof SolarWaterPumpingOnGridCreationRequest) {
        return solarWaterPumpingOnGridCal.calculate(request)
    } else {
        throw Error("Not implemented")
    }
}