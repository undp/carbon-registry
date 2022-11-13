import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProjectStatus } from "../project-ledger/project-status.enum";

export class ProjectDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    group: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    countryAlpha2Code: string;
}