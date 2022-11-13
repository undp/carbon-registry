import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { ProjectStatus } from '../project-ledger/project-status.enum';
import { EntitySubject } from './entity.subject';

@Entity()
export class Project implements EntitySubject {

    @PrimaryColumn()
    serialNo: string;

    @Column()
    name: string;

    @Column()
    countryAlpha2Code: string;

    @Column()
    group: string;

    @Column()
    credit: number;

    @Column({
        type: "enum",
        enum: ProjectStatus,
        array: false,
        default: ProjectStatus.ISSUED
    })
    status: ProjectStatus;
}
