import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepostory } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    
    constructor(private userRepostory: UserRepostory) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepostory.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepostory.findUser(username);

        if(user && await bcrypt.compare(password, user.password)){
            return 'User signed in';
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }

}
 