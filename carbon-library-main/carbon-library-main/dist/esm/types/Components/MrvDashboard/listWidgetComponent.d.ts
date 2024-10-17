import { FC } from "react";
import "./dashboard.scss";
export interface ListWidgetProps {
    data: any[];
    icon: any;
    subTitle: string;
    total: number;
    totalText: string;
    updatedDate: any;
    loading: boolean;
    toolTipText: string;
    title: string;
}
export declare const ListWidgetComponent: FC<ListWidgetProps>;
