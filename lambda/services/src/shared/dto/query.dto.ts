import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, isNotEmpty, IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class QueryDto {

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    page: number;

    @IsNumber()
    @IsPositive()
    @ApiProperty()
    size: number;


}