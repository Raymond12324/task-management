import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
        }
      },
    }),
    ConfigModule.forRoot({
      envFilePath: `.env.stage.${process.env.STAGE}`,
    }),
    TasksModule,
    TypeOrmModule.forRoot(
      {
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        autoLoadEntities: true,
        synchronize: true,
      }
    ),
    AuthModule,
  ],
})
export class AppModule { }
