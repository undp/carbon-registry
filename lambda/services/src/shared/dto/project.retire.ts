import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class ProjectRetire {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    projectId: string;

    @ApiProperty()
    @IsString()
    @Length(0, 200)
    comment: string;
}