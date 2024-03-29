import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';

@Injectable()
export class TaskCustomRepository extends Repository<Task> implements ITaskRepository {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }
    getTaskById(id: string): Promise<Task> {
        throw new Error('Method not implemented.');
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.create({ ...createTaskDto, status: TaskStatus.OPEN });
        return await this.save(task);
    }
    async deleteTask(id: string): Promise<void> {
        return await this.delete(id).then(() => { });
    }
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return await this.save(task);
    }
    getTasks(): Promise<Task[]> {
        return this.find();
    }

    // Aquí puedes agregar más métodos personalizados
}