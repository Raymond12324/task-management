import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';

@Injectable()
export class UserRepostory extends Repository<User>{
    constructor(private dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        
        const { username, password } = authCredentialsDto;
        const user = this.create({ username, password });

        try {
            await this.save(user);
        } catch (error) {
            console.log(error.code);
            if (error.code === '23505') throw new ConflictException('Username already exists');
            else throw new InternalServerErrorException();
        }
        await this.save(user);

    }
}