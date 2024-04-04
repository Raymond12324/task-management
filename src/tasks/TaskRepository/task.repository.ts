import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { Task } from '../task.entity';
import { ITaskRepository } from './task.repository.interface';
import { CreateTaskDto } from '../dto/create-task.dto';
import { TaskStatus } from '../task-status.enum';
import { GetTasksFilterDto } from '../dto/get-tasks-filter.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskCustomRepository implements ITaskRepository {
    private taskRepository: Repository<Task>;

    constructor(@InjectEntityManager()
    private readonly entityManager: EntityManager,
    ) {
        this.taskRepository = this.entityManager.getRepository(Task);
    }
    getTaskById(id: string, user: User): Promise<Task> {
        const task = this.taskRepository.findOne({ where: { id, user } });
        if (!task) throw new NotFoundException('Task not found');
        return task;
    }
    async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
        const task = this.taskRepository.create({ ...createTaskDto, user, status: TaskStatus.OPEN });
        return await this.taskRepository.save(task);
    }
    async deleteTask(id: string, user: User): Promise<void> {
        const task = await this.getTaskById(id, user);

        if (!task) throw new Error('Task not found');

        return await this.taskRepository.delete(id).then(() => { });


    }
    async updateTaskStatus(id: string, status: TaskStatus,user: User): Promise<Task> {
        const task = await this.getTaskById(id, user);
        task.status = status;
        return await this.taskRepository.save(task);
    }

    async getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
        const { status, search } = getTasksFilterDto;

        const query = this.taskRepository.createQueryBuilder('task');
        query.where('task.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('task.status = :status', { status });

        }
        if (search) {
            query.andWhere('(LOWER(task.title) LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search))', { search: `%${search}%` });
        }

        const task = await query.getMany();
        return task;
    }

    // Aquí puedes agregar más métodos personalizados
}