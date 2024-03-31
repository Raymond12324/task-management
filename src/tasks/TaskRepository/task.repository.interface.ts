import { CreateTaskDto } from "../dto/create-task.dto";
import { GetTasksFilterDto } from "../dto/get-tasks-filter.dto";
import { TaskStatus } from "../task-status.enum";
import { Task } from "../task.entity";

export interface ITaskRepository {
    getTasks(getTasksFilterDto: GetTasksFilterDto): Promise<Task[]>
    getTaskById(id: string): Promise<Task>
    createTask(createTaskDto: CreateTaskDto): Promise<Task>
    deleteTask(id: string): Promise<void>
    updateTaskStatus(id: string, status: TaskStatus): Promise<Task>
}