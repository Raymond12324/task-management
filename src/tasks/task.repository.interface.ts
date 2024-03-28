import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./task.entity";

export interface ITaskRepository {
    getTasks(): Promise<Task[]>
    getTaskById(id: string): Promise<Task>
    createTask(createTaskDto: CreateTaskDto): Promise<Task>
    deleteTask(id: string): Promise<void>
    updateTaskStatus(id: string, status: string): Promise<Task>
}