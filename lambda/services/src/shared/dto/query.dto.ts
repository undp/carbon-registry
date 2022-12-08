import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNumber, IsPositive } from "class-validator";

export class QueryDto {

    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    page: number;

    @IsPositive()
    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    size: number;


}