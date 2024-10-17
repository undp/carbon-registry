import { FC } from "react";
export interface MapStatsProps {
    id: string;
    title: string;
    lastUpdate: any;
    loading: boolean;
    toolTipText: string;
    mapType: string;
    mapCenter: any;
    mapZoom: number;
    dataSource: any;
    mapLayer: any;
    renderCB: any;
    style: string;
    labels: string[];
    colors: string[];
}
export declare const MapStatsComponent: FC<MapStatsProps>;
