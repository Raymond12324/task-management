import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepostory } from "./user.repository";
import { JwtPayload } from "./dto/jwt-payload.interface";
import { User } from "./user.entity";


@Injectable()

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepostory)
        private userRepostory: UserRepostory,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        })
    }

    async validate(payload: JwtPayload) : Promise<User> {
        const { username } = payload;
        const user: User = await this.userRepostory.findUser(username);

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }


}