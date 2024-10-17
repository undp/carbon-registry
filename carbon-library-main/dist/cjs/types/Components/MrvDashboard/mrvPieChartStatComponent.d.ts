import { FC } from "react";
export interface PieChartStatsProps {
    id: string;
    title: any;
    options: any;
    series: any[];
    lastUpdate: any;
    loading: boolean;
    toolTipText: string;
    Chart: any;
}
export declare const MrvPieChartsStatComponent: FC<PieChartStatsProps>;
