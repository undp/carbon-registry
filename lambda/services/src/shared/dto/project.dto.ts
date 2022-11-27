import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsInt, IsNotEmpty, IsNotEmptyObject, IsPositive, IsString, ValidateIf } from "class-validator";
import { SectoralScope } from 'serial-number-gen'
import { SubSector } from "../enum/subsector.enum";
import { AgricultureProperties } from "./agriculture.properties";
import { SolarProperties } from "./solar.properties";
import { ProjectProperties } from "./project.properties";

export class ProjectDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    countryCodeA2: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsPositive()
    @IsInt()
    expectedLifeTime: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(SectoralScope, {
        message: 'Invalid sectoral scope. Supported following sectoral scope:' + Object.values(SectoralScope)
    })
    sectoralScope: SectoralScope;

    @ApiProperty()
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
