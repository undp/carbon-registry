import { SubSectorConstants } from "carbon-credit-calculator";
import { Column, Entity, Generated, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { SubSector } from "../enum/subsector.enum";

@Entity()
export class ConstantEntity {

    @PrimaryColumn({
        type: "enum",
        enum: SubSector,
        array: false
    })
    id: SubSector;

    @PrimaryGeneratedColumn('increment')
    version: number;

    @Column({
        type: 'jsonb',
        array: false,
        nullable: true
    })
    data: SubSectorConstants;

}