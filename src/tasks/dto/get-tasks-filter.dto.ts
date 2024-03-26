import { IsEnum, IsOptional, IsString, isEnum } from "class-validator";
import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
    @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    @IsOptional()
    @IsString()
    search?: string;
}