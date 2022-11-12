import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../casl/role.enum";

export class UserDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    password: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(Role, {
        message: 'Invalid role. Supported following roles:' + Object.values(Role)
    })
    role: Role;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    firstName: string;

    @ApiProperty()
    @IsString()
    lastName: string;

}