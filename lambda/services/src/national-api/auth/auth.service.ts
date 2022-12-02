import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CaslAbilityFactory } from '../../shared/casl/casl-ability.factory';
import { API_KEY_SEPARATOR } from '../../shared/constants';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
        public caslAbilityFactory: CaslAbilityFactory
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.getUserCredentials(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateApiKey(apiKey: string): Promise<any> {
        const parts = Buffer.from(apiKey, 'base64').toString('utf-8').split(API_KEY_SEPARATOR)
        if (parts.length != 2) {
            return null;
        } 
        const user = await this.userService.getUserCredentials(parts[0]);
        if (user && user.apiKey === apiKey) {
            const { password, apiKey, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        const ability = this.caslAbilityFactory.createForUser(user);
        return {
            access_token: this.jwtService.sign(payload),
            role: user.role,
            id: user.id,
            ability: JSON.stringify(ability)
        };
    }
}
