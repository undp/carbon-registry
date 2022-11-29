import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsPositive, IsString, Length, ValidateIf } from "class-validator";
import { SectoralScope } from 'serial-number-gen'
import { SubSector } from "../enum/subsector.enum";
import { AgricultureProperties } from "./agriculture.properties";
import { SolarProperties } from "./solar.properties";
import { ProjectProperties } from "./project.properties";
import { IsValidCountry } from "../util/validcountry.decorator";

export class ProjectDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(2, 2)
    @IsValidCountry({
        message: 'Not a valid country alpha 2 country code',
    })
    countryCodeA2: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    expectedLifeTime: number;

    @ApiProperty({ enum: SectoralScope })
    @IsNotEmpty()
    @IsEnum(SectoralScope, {
        message: 'Invalid sectoral scope. Supported following sectoral scope:' + Object.values(SectoralScope)
    })
    sectoralScope: SectoralScope;

    @ApiProperty({ enum: SubSector })
    @IsEnum(SubSector, {
        message: 'Invalid sub sector. Supported following values:' + Object.values(SubSector)
    })
    @IsNotEmpty()
    subSector: SubSector;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    sector: string;

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
    @IsNotEmptyObject()
    projectProperties: ProjectProperties;

    @ApiProperty()
    @ValidateIf(o => o.subSector === SubSector.AGRICULTURE)
    @IsNotEmptyObject()
    agricultureProperties: AgricultureProperties;

    @ApiProperty()
    @ValidateIf(o => o.subSector === SubSector.SOLAR)
    @IsNotEmptyObject()
    solarProperties: SolarProperties;
}
