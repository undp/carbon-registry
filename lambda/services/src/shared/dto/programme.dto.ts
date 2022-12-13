import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsPositive, IsString, Length, ValidateIf, ValidateNested } from "class-validator";
import { SectoralScope } from 'serial-number-gen'
import { TypeOfMitigation } from "../enum/typeofmitigation.enum";
import { AgricultureProperties } from "./agriculture.properties";
import { SolarProperties } from "./solar.properties";
import { ProgrammeProperties } from "./programme.properties";
import { IsValidCountry } from "../util/validcountry.decorator";
import { Sector } from "../enum/sector.enum";
import { Type } from "class-transformer";

export class ProgrammeDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({ enum: SectoralScope })
    @IsNotEmpty()
    @IsEnum(SectoralScope, {
        message: 'Invalid sectoral scope. Supported following sectoral scope:' + Object.values(SectoralScope)
    })
    sectoralScope: SectoralScope;

    @ApiProperty({ enum: Sector })
    @IsNotEmpty()
    @IsEnum(Sector, {
        message: 'Invalid sector. Supported following sector:' + Object.values(Sector)
    })
    sector: Sector;

    @ApiProperty({ enum: TypeOfMitigation })
    @IsEnum(TypeOfMitigation, {
        message: 'Invalid mitigation type. Supported following values:' + Object.values(TypeOfMitigation)
    })
    @IsNotEmpty()
    typeOfMitigation: TypeOfMitigation;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    startTime: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    endTime: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    proponentTaxVatId: string;

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => ProgrammeProperties)
    programmeProperties: ProgrammeProperties;

    @ApiProperty()
    @ValidateIf(o => o.typeOfMitigation === TypeOfMitigation.AGRICULTURE)
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AgricultureProperties)
    agricultureProperties: AgricultureProperties;

    @ApiProperty()
    @ValidateIf(o => o.typeOfMitigation === TypeOfMitigation.SOLAR)
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => SolarProperties)
    solarProperties: SolarProperties;
}
