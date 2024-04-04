import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskCustomRepository } from './TaskRepository/task.repository';
import { User } from 'src/auth/user.entity';
@Injectable()
export class TasksService {

    constructor(private taskCustomRepository: TaskCustomRepository) { }

    getTask(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        return this.taskCustomRepository.getTasks(getTasksFilterDto, user);
    }

    getTaskById(id: string, user: User): Promise<Task> {
        return this.taskCustomRepository.getTaskById(id, user);
    }

    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        return this.taskCustomRepository.createTask(createTaskDto, user);
    }

    deleteTask(id: string, user: User): void {
        this.taskCustomRepository.deleteTask(id, user);
    }

    updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task> {
        return this.taskCustomRepository.updateTaskStatus(id, status, user);
    }
}
