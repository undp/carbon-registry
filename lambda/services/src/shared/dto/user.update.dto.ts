import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { Role } from "../casl/role.enum";

export class UserUpdateDto {

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    id: number;
    
    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    state: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    country: string;

    @IsNotEmpty()
    @IsString()
    @IsOptional()
    @ApiProperty()
    contactNo: string;
}