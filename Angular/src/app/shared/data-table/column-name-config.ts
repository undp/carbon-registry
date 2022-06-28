export interface ColumnNameConfig {
    id:string;
    value:string;
    type:string;
    values ?:string[];
    placeHolder?:string;
    readonly?:boolean;
}
