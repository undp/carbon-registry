import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from '../../shared/dto/user.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { EmailService } from '../../shared/email/email.service';
import { QueryDto } from '../../shared/dto/query.dto';
import { ConfigService } from '@nestjs/config';
import { EmailTemplates } from '../../shared/email/email.template';
import { BadRequestError } from 'passport-headerapikey';
import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { UserUpdateDto } from '../../shared/dto/user.update.dto';
import { PasswordUpdateDto } from '../../shared/dto/password.update.dto';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>, private emailService: EmailService, private logger: Logger) { }

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
        return (users && users.length > 0) ? users[0] : undefined;
    }

    async findById(id: number): Promise<User | undefined> {
        return await this.userRepo.findOneBy({
            id: id,
        });
    }

    async update(userDto: UserUpdateDto): Promise<User | undefined> {
        this.logger.verbose('User update received', userDto.id)
        const { id, ...update } = userDto;
        const result = await this.userRepo.update({
            id: id
        }, update).catch((err: any) => {
            this.logger.error(err)
            return err;
        });
        if (result.affected) {
            const u = await this.findById(id);
            delete u.password
            return u
        }
        return undefined;
    }

    async resetPassword(id: number, passwordResetDto: PasswordUpdateDto) {
        this.logger.verbose('User password reset received', id)

        const user = await this.findById(id)
        if (!user || user.password != passwordResetDto.password) {
            throw new HttpException("Password mismatched", HttpStatus.UNAUTHORIZED)
        }
        const result = await this.userRepo.update({
            id: id
        }, {
            password: passwordResetDto.newPassword
        }).catch((err: any) => {
            this.logger.error(err)
            return err;
        });
        return result.affected > 0 ? "Successfully updated" : "Password update failed"
    }

    async create(userDto: UserDto): Promise<User | undefined> {
        this.logger.verbose('User create received', userDto.email)

        const user = await this.findOne(userDto.email)
        if (user) {
            throw new HttpException("User already exist in the system", HttpStatus.BAD_REQUEST)
        }
        userDto.password = this.generateRandomPassword()
        await this.emailService.sendEmail(
            userDto.email,
            EmailTemplates.REGISTER_EMAIL,
            {
                "name": userDto.name,
                "countryName": userDto.country,
                "password": userDto.password
            });

        return await this.userRepo.save(userDto).catch((err: any) => {
            if (err instanceof QueryFailedError) {
                switch (err.driverError.code) {
                    case PG_UNIQUE_VIOLATION:
                        throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
                }
            }
            return err;
        });
    }

    async query(query: QueryDto, abilityCondition: string): Promise<User[]> {
        this.logger.verbose('Ability query', abilityCondition)
        return (await this.userRepo.createQueryBuilder()
            .where(abilityCondition ? abilityCondition : "")
            .skip((query.size * query.page) - query.size)
            .take(query.size)
            .getMany()).map(e => {
                delete e.password
                return e;
            })
    }

    async delete(username: string, query: string): Promise<string> {

        if (query) {
            query = `${query} and email = '${username}'`
        } else {
            query = `email = '${username}'`
        }
        const result = await this.userRepo.createQueryBuilder().where(query).getMany()
        if (result.length <= 0) {
            throw new HttpException("No visible user found", HttpStatus.BAD_REQUEST)
        }
        const result2 = await this.userRepo.delete({ email: username });
        return result2.affected > 0 ? "Successfully deleted" : "Delete failed"
    }
}
