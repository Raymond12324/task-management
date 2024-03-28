import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';
import { TaskCustomRepository } from './TaskRepository/task.repository';
@Injectable()
export class TasksService {

    constructor(private taskCustomRepository: TaskCustomRepository) { }

    getAllTasks(): Promise<Task[]> {
        return this.taskCustomRepository.getTasks();
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        return this.taskCustomRepository.createTask(createTaskDto);
    }

    deleteTask(id: string): void {
        this.taskCustomRepository.deleteTask(id);
    }

    updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        return this.taskCustomRepository.updateTaskStatus(id, status);
    }
}
