import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtPayload } from './dto/jwt-payload.interface';
import { UserRepository } from './user.repository';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userRepository: UserRepository,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const user = await this.userRepository.findUser(payload.username);
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}