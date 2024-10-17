import { PRECISION } from "../calculator";
import { SolarCreationRequest } from "../requests/solarCreationRequest";

var convert = require('convert-units')

export class SolarCal {
    public static calculate(req: SolarCreationRequest): number {
        const constants = req.solarConstants;
        const emissionUnitParts = constants.emissionFactorUnit.split('/')
        if (emissionUnitParts.length != 2) {
            throw Error("Invalid emission factor unit " + constants.emissionFactorUnit)
        }

        const measuredUnitParts = req.energyGenerationUnit.split('/')
        if (measuredUnitParts.length != 3) {
            throw Error("Invalid measured unit " + req.energyGenerationUnit)
        }

        let threshold = constants.buildingTypes[req.buildingType];
        if (!threshold) {
            throw Error("Invalid building type " + req.buildingType)
        }

        if (req.energyGenerationUnit != constants.thresholdUnit) {
            const thresholdUnitParts = constants.thresholdUnit.split('/')
            if (thresholdUnitParts.length != 2) {
                throw Error("Invalid threshold unit " + constants.thresholdUnit)
            }

            let factor = convert(1).from(thresholdUnitParts[0]).to(measuredUnitParts[0]);
            factor = factor / convert(1).from(thresholdUnitParts[1]).to(measuredUnitParts[1]);
            threshold = Number(threshold * factor)
        }
        
        const unitX = convert(1).from(measuredUnitParts[0]).to(emissionUnitParts[1]);
        
        const highFactor = Number(constants.highEmissionFactor * unitX);
        const lowFactor = Number(constants.lowEmissionFactor * unitX);

        let value;
        if (req.energyGeneration < threshold) {
            value = req.energyGeneration * highFactor;
        } else {
            value = threshold * highFactor + (req.energyGeneration - threshold) * lowFactor;
        }
        return Number(value.toFixed(PRECISION))
    }
}