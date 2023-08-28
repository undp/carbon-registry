import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {IsNotEmpty, IsOptional} from "class-validator";

export class FilterBy {

    @IsNotEmpty()
    @ApiPropertyOptional()
    @IsOptional()
    key: any;

    @IsNotEmpty()
    @ApiProperty()
    value: any[];
}