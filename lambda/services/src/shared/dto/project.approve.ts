import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsNumber, IsString, Length } from "class-validator";

export class ProjectApprove {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    projectId: string;

    @ApiProperty()
    @IsString()
    @Length(0, 200)
    comment: string;
}