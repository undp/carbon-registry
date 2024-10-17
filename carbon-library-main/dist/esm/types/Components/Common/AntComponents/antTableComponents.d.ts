import React from "react";
interface Item {
    key: string;
    name: string;
    age: string;
    address: string;
}
interface EditableRowProps {
    index: number;
}
export declare const EditableRow: React.FC<EditableRowProps>;
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: "number" | "text";
    record: Item;
    index: number;
    children: React.ReactNode;
    onBlurHandler: any;
    t: any;
}
export declare const EditableCell: React.FC<EditableCellProps>;
export {};
