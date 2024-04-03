import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credential.dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserRepository {

    private userRepository: Repository<User>;
    constructor(
        @InjectEntityManager()
        private readonly entityManager: EntityManager,
    ) {
        this.userRepository = this.entityManager.getRepository(User); 
    }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.userRepository.create({ username, password: hashedPassword });

        try {
            await this.userRepository.save(user);
        } catch (error) {
            if (error.code === '23505') throw new ConflictException('Username already exists');
            else throw new InternalServerErrorException();
        }
    }

    async findUser(userName: string): Promise<User> {
        return this.userRepository.findOne({ where: { username:userName } });
    }
    // Aquí puedes agregar más métodos personalizados
}