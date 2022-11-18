import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../shared/dto/user.dto';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { EmailService } from '../../shared/email/email.service';
import { EmailTypes } from '../../shared/email/emailtypes.enum';

@Injectable()
export class UserService {

    constructor( @InjectRepository(User) private userRepo: Repository<User>, private emailService: EmailService, private logger: Logger) {}

    private generateRandomPassword() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
            
        for (let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
                
            pass += str.charAt(char)
        }
            
        return pass;
    }
    async findOne(username: string): Promise<User | undefined> {
        const users = await this.userRepo.find({
            where: {
                email: username,
            }
        });
        return (users && users.length > 0) ? users[0]: undefined;
    }

    async create(userDto: UserDto): Promise<User | undefined> {
        this.logger.verbose('User create received', userDto.email)
        await this.emailService.sendEmail(
            userDto.email,
            EmailTypes.REGISTER_EMAIL,
            {
                "name": userDto.email,
                "countryName": userDto.country,
                "password": this.generateRandomPassword()
            });

        return await this.userRepo.save(userDto);
    }
}
