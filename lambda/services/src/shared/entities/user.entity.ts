import { Role } from '../casl/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntitySubject } from './entity.subject';
import { CompanyRole } from '../enum/company.role.enum';

@Entity()
export class User  implements EntitySubject{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column({select: false})
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        array: false,
        default: Role.ViewOnly
    })
    role: Role;

    @Column()
    name: string;

    @Column()
    country: string;

    @Column({nullable: true})
    phoneNo: string;

    @Column({nullable: true})
    companyId: number;

    @Column({
        type: "enum",
        enum: CompanyRole,
        array: false,
        default: CompanyRole.PROGRAMME_DEVELOPER
    })
    companyRole: CompanyRole;

    @Column({nullable: true, select: false})
    apiKey: string;
}
