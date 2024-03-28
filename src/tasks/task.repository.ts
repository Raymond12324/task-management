import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskCustomRepository implements ITaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }
    getTaskById(id: string): Promise<Task> {
        throw new Error('Method not implemented.');
    }
    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        throw new Error('Method not implemented.');
    }
    deleteTask(id: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    updateTaskStatus(id: string, status: string): Promise<Task> {
        throw new Error('Method not implemented.');
    }

    getTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    // Aquí puedes agregar más métodos personalizados
}