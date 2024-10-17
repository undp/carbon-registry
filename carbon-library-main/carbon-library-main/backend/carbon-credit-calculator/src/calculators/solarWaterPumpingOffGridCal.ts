import { PRECISION } from "../calculator";
import { SolarWaterPumpingOffGridCreationRequest } from "../requests/solarWaterPumpingOffGridCreationRequest";

var convert = require('convert-units')

export class solarWaterPumpingOffGridCal {
    public static calculate(req: SolarWaterPumpingOffGridCreationRequest): number {
        const constants = req.solarWaterPumpingOffGridConstants;
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