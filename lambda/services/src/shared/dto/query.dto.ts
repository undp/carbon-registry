import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class QueryDto {

    @IsNumber()
    @ApiProperty()
    page: number;

    @IsNumber()
    @ApiProperty()
    size: number;


}