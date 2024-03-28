import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { title } from 'process';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.entity';


@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }




    @Get()
    async getTask(): Promise<Task[]> {
        // if(Object.keys(filterDto).length) {
        //    return this.tasksService.getTasksWithFilters(filterDto);
        // }else{
        return await this.tasksService.getAllTasks();
        //}
    }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string) Promise<Task> {
    //     const Myid = id;
    //     return this.tasksService.getTasksById(id);
    // }

    // @Get('/:id')
    // getTaskById(@Param('id') id: string): Promise<Task> {
    //     return this.tasksService.getTaskById(id);
    // }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
        return this.tasksService.createTask(createTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body() updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
        const { status } = updateTaskStatusDto;
        return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
