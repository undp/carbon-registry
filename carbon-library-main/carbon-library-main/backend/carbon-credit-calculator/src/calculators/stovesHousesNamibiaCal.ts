import { PRECISION } from "../calculator";
import { StovesHousesNamibiaCreationRequest } from "../requests/stovesHousesNamibiaCreationRequest"; 

export class StovesHousesNamibiaCal {
    public static calculate(req: StovesHousesNamibiaCreationRequest): number {
        const constants = req.stovesHousesNamibiaConstants;
        return Number((constants.emissionFactor * req.numberOfDays * req.numberOfPeopleInHousehold).toFixed(PRECISION))
    }
}