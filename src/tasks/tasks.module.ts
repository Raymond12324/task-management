import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskCustomRepository } from './TaskRepository/task.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task]),],
  controllers: [TasksController],
  providers: [TaskCustomRepository, TasksService],
  exports: [TaskCustomRepository],
})
export class TasksModule { }
