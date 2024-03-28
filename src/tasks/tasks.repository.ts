import { Repository } from "typeorm";
import { GetTasksFilterDto } from "./dto/get-tasks-filter.dto";
import { Task, TaskStatus } from "./task.model";
import { CreateTaskDto } from "./dto/create-task.dto";

export class TaskRepository extends Repository<Task> {

}