import { User } from "src/auth/user.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";
import { TaskStatus } from "../task-status.enum";
import { Task } from "../task.entity";

export interface ITaskRepository {
    getTasks(getTasksFilterDto: GetTasksFilterDto, user: User): Promise<Task[]>
    getTaskById(id: string, user : User): Promise<Task>
    createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task>
    deleteTask(id: string, user: User): Promise<void>
    updateTaskStatus(id: string, status: TaskStatus, user: User): Promise<Task>
}