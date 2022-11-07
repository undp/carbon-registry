import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProjectStatus } from "./project-status.enum";

export class Project {

    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    group: string;

    @IsNumber()
    @IsNotEmpty()
    credit: number;

    status: ProjectStatus;
}