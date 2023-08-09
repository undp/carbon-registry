import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class ProgrammeTransferCancel {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    requestId: number;

    @ApiPropertyOptional()
    @IsString()
    @IsOptional()
    comment: string;
}