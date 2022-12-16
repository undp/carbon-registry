import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, Length } from "class-validator";

export class ProgrammeTransferApprove {

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    requestId: number;

    @ApiPropertyOptional()
    @IsArray()
    @IsInt({ each: true })
    @IsOptional()
    companyIds: number[];

    @ApiPropertyOptional()
    @IsArray()
    @IsPositive({ each: true })
    @IsOptional()
    companyCredit: number[];

    @ApiProperty()
    @IsString()
    @Length(0, 200)
    comment: string;
}