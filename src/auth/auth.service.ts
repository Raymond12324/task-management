import { Injectable } from '@nestjs/common';
import { UserRepostory } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';

@Injectable()
export class AuthService {
    
    constructor(
        @InjectRepository(UserRepostory)
        private userRepostory: UserRepostory
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepostory.createUser(authCredentialsDto);
    }

}
