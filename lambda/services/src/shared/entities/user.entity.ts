import { Role } from '../casl/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { EntitySubject } from './entity.subject';

@Entity()
export class User  implements EntitySubject{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        array: false,
        default: Role.NationalView
    })
    role: Role;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    zipCode: string;

    @Column()
    state: string;

    @Column()
    country: string;

    @Column()
    contactNo: string;
}
