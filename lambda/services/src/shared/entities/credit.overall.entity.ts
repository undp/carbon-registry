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
export class CreditOverall implements EntitySubject {

    @PrimaryColumn()
    countryCodeA2: string;

    @Column()
    serialNo: string;

    @Column({type: "decimal", precision: 10, scale: PRECISION})
    ITMO: number;
}
