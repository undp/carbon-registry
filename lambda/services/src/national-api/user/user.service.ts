import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepo: Repository<User>) {}

    async findOne(username: string): Promise<User | undefined> {
        const users = await this.userRepo.find({
            where: {
                email: username,
            }
        });
        return (users && users.length > 0) ? users[0]: undefined;
    }
}
