import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.interface';
@Injectable()
export class AuthService {
    
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
        ) { }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken : string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findUser(username);

        if(user && await bcrypt.compare(password, user.password)){
            const payload: JwtPayload = { username };
            const accessToken: string = this.jwtService.sign(payload);
            return { accessToken };
        }else{
            throw new UnauthorizedException('Please check your login credentials');
        }
    }
}
 