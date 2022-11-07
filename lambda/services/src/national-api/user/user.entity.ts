import { Role } from '../../shared/casl/role.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({
        type: "enum",
        enum: Role,
        array: true,
        default: [Role.User]
    })
    roles: Role[];
}
