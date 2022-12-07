import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, isNotEmpty, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateIf } from "class-validator";
import { Role } from "../casl/role.enum";
import { CompanyRole } from "../enum/company.role.enum";
import { IsValidCountry } from "../util/validcountry.decorator";

export class CompanyDto {

    @ValidateIf( c => c.companyRole != CompanyRole.GOVERNMENT)
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    taxId: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name: string;

    @ValidateIf( c => c.companyRole != CompanyRole.GOVERNMENT)
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;

    @ValidateIf( c => c.companyRole != CompanyRole.GOVERNMENT)
    @IsString()
    @ApiProperty()
    phoneNo: string;

    @ValidateIf( c => c.companyRole != CompanyRole.GOVERNMENT)
    @IsUrl()
    @ApiProperty()
    website: string;

    @ValidateIf( c => c.companyRole != CompanyRole.GOVERNMENT)
    @IsString()
    @ApiProperty()
    address: string;

    @IsString()
    @ApiProperty()
    logo: string;

    @IsValidCountry()
    @ApiProperty()
    country: string;

    @IsNotEmpty()
    @ApiProperty({ enum: CompanyRole })
    @IsEnum(CompanyRole, {
        message: 'Invalid role. Supported following roles:' + Object.values(CompanyRole)
    })
    companyRole: CompanyRole;
}