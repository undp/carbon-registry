export class QuestionModel {
    label?:string;
    question?:string;
    strengths ?:string;
    opportunities ?:string;
    weakness ?:string;
    threats ?:string;

    likelihood ?:string;
    impact ?:string;
    data ?:number;
    dataSource ?:string;
    ynValue ?:string;

    // flag
    isQualitative?:boolean;
    isQuantitative?:boolean;

    
}



/* export class QuestionSchema {
    label:string;
    question:string;
    strengths :string;
    opportunities :string;
    weakness :string;
    threats :string;

    likelihood :string;
    impact :string;
    data :number;
    dataSource :string;

    // flag
    isQualitative:boolean;
    isQuantitative:boolean;

    constructor(
        label = "",
        question = "",
        strengths  = "",
        opportunities  = "",
        weakness  = "",
        threats  = "",

        likelihood  = "",
        impact  = "",
        data :number = 0 ,
        dataSource  = "",

        isQualitative:boolean = false,
        isQuantitative:boolean = false
    ) {
        this.label = label;
        this.question = question;
        this.strengths  = strengths;
        this.opportunities = opportunities;
        this.weakness  = weakness;
        this.threats  = threats;

        this.likelihood  = likelihood;
        this.impact = impact;
        this.data  = data;
        this.dataSource = dataSource;

        // flag
        this.isQualitative = isQualitative;
        this.isQuantitative = isQuantitative;
    }
}
 */