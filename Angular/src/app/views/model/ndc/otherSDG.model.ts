import { QuestionModel } from "./question-model";
import { Question2Model } from "./question2.model";

export interface OtherSDGModel {
    otherSdgType:string;
    isVisible?:boolean;
    qualitativeImpact?:QuestionModel[];
    quantitativeImpact?:QuestionModel[];
    quantitativeImpact2?:Question2Model[],
}