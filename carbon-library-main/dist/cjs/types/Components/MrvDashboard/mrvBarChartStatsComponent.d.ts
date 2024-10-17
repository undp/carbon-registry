import { FC } from "react";
export interface BarChartStatsProps {
    id: string;
    title: string;
    options: any;
    series: any;
    lastUpdate: any;
    loading: boolean;
    toolTipText: string;
    Chart: any;
}
export declare const MrvBarChartsStatComponent: FC<BarChartStatsProps>;
