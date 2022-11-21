import { AgricultureConstants } from "../constants/agricultureConstants";
import { CreditCreationRequest } from "./creditCreationRequest";

export class AgricultureCreationRequest implements CreditCreationRequest {
    landArea!: number;
    landAreaUnit!: string;
    duration!: number;
    durationUnit!: string;
    agricultureConstants: AgricultureConstants = new AgricultureConstants();
}