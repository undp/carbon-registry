import { StovesHousesNamibiaConstants } from "../constants/stovesHousesNamibiaConstants"; 
import { CreditCreationRequest } from "./creditCreationRequest";

export class StovesHousesNamibiaCreationRequest implements CreditCreationRequest {
    numberOfDays!: number;
    numberOfPeopleInHousehold!: number;
    stovesHousesNamibiaConstants: StovesHousesNamibiaConstants = new StovesHousesNamibiaConstants();

    
}