import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../shared/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepo: Repository<User>, private logger: Logger) {}

    async findOne(username: string): Promise<User | undefined> {
        const users = await this.userRepo.find({
            where: {
                email: username,
            }
        });
        return (users && users.length > 0) ? users[0]: undefined;
    }

    async create(userDto: UserDto): Promise<User | undefined> {
        this.logger.log('User create received', userDto)
        return await this.userRepo.save(userDto);
    }
}
