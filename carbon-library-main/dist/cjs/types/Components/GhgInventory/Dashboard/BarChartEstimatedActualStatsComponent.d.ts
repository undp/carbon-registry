import { FC } from 'react';
export interface BarChartEstimatedActualStatsProps {
    id: string;
    title: string;
    estimateOptions: any;
    actualOptions: any;
    estimatedSeries: any;
    actualSeries: any;
    lastUpdateEstimate: any;
    lastUpdateActual: any;
    loading: boolean;
    toolTipText: string;
    Chart: any;
    width: any;
}
export declare const BarChartEstimatedActualStatComponent: FC<BarChartEstimatedActualStatsProps>;
