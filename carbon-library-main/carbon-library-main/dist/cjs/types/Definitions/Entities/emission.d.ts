import { GHGRecordState } from '../Enums/ghg.record.state.enum';
import { BaseEntity } from './baseEntity';
export declare class Emission implements BaseEntity {
    id?: string;
    year?: string;
    state?: GHGRecordState;
    emissionDocument?: string;
    version?: number;
}
