import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepostory } from './user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepostory])],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
