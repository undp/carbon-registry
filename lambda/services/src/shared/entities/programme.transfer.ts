import { PRECISION } from 'carbon-credit-calculator/dist/esm/calculator';
import { SectoralScope } from 'serial-number-gen';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { AgricultureProperties } from '../dto/agriculture.properties';
import { ProgrammeProperties } from '../dto/programme.properties';
import { SolarProperties } from '../dto/solar.properties';
import { Sector } from '../enum/sector.enum';
import { ProgrammeStage } from '../programme-ledger/programme-status.enum';
import { EntitySubject } from './entity.subject';

@Entity()
export class ProgrammeTransfer implements EntitySubject {

    @PrimaryGeneratedColumn()
    requestId: number;

    @Column()
    programmeId: string;

    @Column()
    requesterId: string;

    @Column()
    creditAmount: number;

    @Column()
    comment: string;

    @Column({type: "bigint"})
    txTime: number;

}
