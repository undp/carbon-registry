import { FC } from 'react';
export interface BarChartStatsProps {
    id: string;
    title: string;
    options: any;
    series: any;
    lastUpdate: any;
    loading: boolean;
    toolTipText: string;
    Chart: any;
    width: any;
}
export declare const BarChartsStatComponent: FC<BarChartStatsProps>;
