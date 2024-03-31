import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';

@Injectable()
export class TaskCustomRepository extends Repository<Task> implements ITaskRepository {
    constructor(private dataSource: DataSource) {
        super(Task, dataSource.createEntityManager());
    }
    getTaskById(id: string): Promise<Task> {
        const task = this.findOne({ where: { id } });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
        const task = this.create({ ...createTaskDto, status: TaskStatus.OPEN });
        return await this.save(task);
    }
    async deleteTask(id: string): Promise<void> {
        const task = await this.getTaskById(id);

        if (!task) throw new Error('Task not found');

        return await this.delete(id).then(() => { });


    }
    async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
        const task = await this.getTaskById(id);
        task.status = status;
        return await this.save(task);
    }

    async getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]> {
        const { status, search } = getTasksFilterDto;

        const query = this.createQueryBuilder('task');
        console.log(status);

        if (status) {
            query.andWhere('task.status = :status', { status });

        }
        if (search) {
            query.andWhere('LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)', { search: `%${search}%` });
        }

        const task = await query.getMany();
        return task;
    }

    // Aquí puedes agregar más métodos personalizados
}