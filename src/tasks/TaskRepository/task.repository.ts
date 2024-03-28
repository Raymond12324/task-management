import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskCustomRepository implements ITaskRepository {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
    ) { }
    getTaskById(id: string): Promise<Task> {
        throw new Error('Method not implemented.');
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.taskRepository.create({ ...createTaskDto, status: TaskStatus.OPEN });
        return await this.taskRepository.save(task);
    }
    async deleteTask(id: string): Promise<void> {
        return await this.taskRepository.delete(id).then(() => { });
    }
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return await this.taskRepository.save(task);
    }
    getTasks(): Promise<Task[]> {
        return this.taskRepository.find();
    }

    // Aquí puedes agregar más métodos personalizados
}