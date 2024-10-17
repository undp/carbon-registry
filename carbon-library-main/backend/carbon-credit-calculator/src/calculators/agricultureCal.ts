import { PRECISION } from "../calculator";
import { AgricultureCreationRequest } from "../requests/agricultureCreationRequest";
var convert = require('convert-units')

export class AgricultureCal {
    public static calculate(req: AgricultureCreationRequest): number {
        const constants = req.agricultureConstants;
        const unitParts = constants.emissionFactorUnit.split('/')
        if (unitParts.length != 3) {
            throw Error("Invalid emission factor unit " + constants.emissionFactorUnit)
        }
        const landArea = convert(req.landArea).from(req.landAreaUnit).to(unitParts[1]);
        const duration = convert(req.duration).from(req.durationUnit).to(unitParts[2]);
        return Number((constants.emissionFactor * landArea * duration).toFixed(PRECISION))
    }
}