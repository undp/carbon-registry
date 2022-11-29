import { PRECISION } from 'carbon-credit-calculator/dist/esm/calculator';
import { SectoralScope } from 'serial-number-gen';
import { Entity, Column, PrimaryColumn } from 'typeorm';
import { AgricultureProperties } from '../dto/agriculture.properties';
import { ProjectProperties } from '../dto/project.properties';
import { SolarProperties } from '../dto/solar.properties';
import { SubSector } from '../enum/subsector.enum';
import { ProjectStatus } from '../project-ledger/project-status.enum';
import { EntitySubject } from './entity.subject';

@Entity()
export class Project implements EntitySubject {

    @PrimaryColumn()
    projectId: string;

    @Column()
    serialNo: string;

    @Column()
    title: string;

    @Column()
    countryCodeA2: string;

    @Column()
    expectedLifeTime: number;

    @Column({
        type: "enum",
        enum: SectoralScope,
        array: false
    })
    sectoralScope: SectoralScope;

    @Column({
        type: "enum",
        enum: SubSector,
        array: false
    })
    subSector: SubSector;

    @Column()
    sector: string;

    @Column({
        type: "enum",
        enum: ProjectStatus,
        array: false,
        default: ProjectStatus.REGISTERED
    })
    status: ProjectStatus;

    @Column()
    startTime: number;

    @Column()
    endTime: number;

    @Column({type: "decimal", precision: 10, scale: PRECISION})
    numberOfITMO: number;

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
