import { PRECISION } from 'carbon-credit-calculator/dist/esm/calculator';
import { Entity, Column, PrimaryColumn } from 'typeorm';
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
