import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../casl/role.enum";

export class PasswordUpdateDto {

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    newPassword: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;
}