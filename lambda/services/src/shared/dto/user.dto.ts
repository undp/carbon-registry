import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Role } from "../casl/role.enum";

export class UserDto {

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @IsNotEmpty()
    @ApiProperty()
    @IsEnum(Role, {
        message: 'Invalid role. Supported following roles:' + Object.values(Role)
    })
    role: Role;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    city: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    zipCode: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    state: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    country: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    contactNo: string;
}