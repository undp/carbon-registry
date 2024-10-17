import { PRECISION } from "../calculator";
import { SolarWaterPumpingOnGridCreationRequest } from "../requests/solarWaterPumpingOnGridCreationRequest";

var convert = require('convert-units')

export class solarWaterPumpingOnGridCal {
    public static calculate(req: SolarWaterPumpingOnGridCreationRequest): number {
        const constants = req.solarWaterPumpingOnGridConstants;
        const emissionUnitParts = constants.emissionFactorUnit.split('/')
        if (emissionUnitParts.length != 2) {
            throw Error("Invalid emission factor unit " + constants.emissionFactorUnit)
        }
        const measuredUnitParts = req.energyGenerationUnit.split('/')
        if (measuredUnitParts.length != 3) {
            throw Error("Invalid measured unit " + req.energyGenerationUnit)
        }
        const unitX = convert(req.energyGeneration).from(measuredUnitParts[0]).to(emissionUnitParts[0]);
        return Number((constants.emissionFactor * unitX).toFixed(PRECISION))
    }
}