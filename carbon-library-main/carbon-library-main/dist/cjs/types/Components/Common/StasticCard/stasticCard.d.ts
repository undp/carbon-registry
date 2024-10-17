import { FC } from 'react';
import './stasticCard.scss';
export interface StasticCardItemProps {
    value: number;
    title: string;
    updatedDate: any;
    icon: any;
    loading: boolean;
    companyRole: any;
    tooltip: any;
    t: any;
}
export declare const StasticCard: FC<StasticCardItemProps>;
