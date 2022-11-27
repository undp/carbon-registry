import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";

export class ProjectProperties {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    proponentName: string;

    @ApiProperty()
    @IsEmail()
    proponentEmail: string;

    @ApiProperty()
    @IsString()
    proponentPhone: string;

    @ApiProperty()
    @IsString()
    proponentCompany: string;

    @ApiProperty()
    @IsString()
    currentStage: string;

    @ApiProperty()
    @IsString()
    bilateralName: string;

    @ApiProperty()
    @IsEmail()
    bilateralEmail: string;

    @ApiProperty()
    @IsString()
    bilateralPhone: string;

    @ApiProperty()
    @IsString()
    typeOfMitigationAction: string;

    @ApiProperty()
    @IsString()
    subTimeMitigationActivity: string;

    @ApiProperty()
    @IsString()
    mitigationTypeCalculation: string;

    @ApiProperty()
    @IsString()
    contactPersonName: string;

    @ApiProperty()
    @IsString()
    contactPersonEmail: string;

    @ApiProperty()
    @IsString()
    contactPersonNo: string;
}