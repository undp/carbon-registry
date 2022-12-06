import { PRECISION } from 'carbon-credit-calculator/dist/esm/calculator';
import { SectoralScope } from 'serial-number-gen';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { AgricultureProperties } from '../dto/agriculture.properties';
import { ProjectProperties } from '../dto/project.properties';
import { SolarProperties } from '../dto/solar.properties';
import { Sector } from '../enum/sector.enum';
import { ProjectStage } from '../project-ledger/project-status.enum';
import { EntitySubject } from './entity.subject';

@Entity()
export class Project implements EntitySubject {

    @PrimaryColumn()
    projectId: string;

    @Column({nullable: true})
    serialNo: string;

    @Column()
    title: string;

    @Column({
        type: "enum",
        enum: SectoralScope,
        array: false
    })
    sectoralScope: SectoralScope;

    @Column()
    sector: Sector;

    @Column()
    countryCodeA2: string;


    @Column({
        type: "enum",
        enum: ProjectStage,
        array: false,
        default: ProjectStage.AWAITING_AUTHORIZATION
    })
    currentStage: ProjectStage;

    @Column()
    startTime: number;

    @Column()
    endTime: number;

    @Column({type: "decimal", precision: 10, scale: PRECISION})
    ITMOsChange: number;

    @Column({type: "decimal", precision: 10, scale: PRECISION})
    ITMOsIssued: number;

    @Column({type: "decimal", precision: 10, scale: PRECISION})
    ITMOsBalance: number;

    @Column({type: "decimal", precision: 10, scale: PRECISION, default: 0})
    ITMOsTransferred: number;

    @Column({nullable: true})
    constantVersion: string;

    @Column({
        type: 'jsonb',
        array: false
    })
    projectProperties: ProjectProperties;

    @Column({
        type: 'jsonb',
        array: false,
        nullable: true
    })
    agricultureProperties: AgricultureProperties;

    @Column({
        type: 'jsonb',
        array: false,
        nullable: true
    })
    solarProperties: SolarProperties;
}
