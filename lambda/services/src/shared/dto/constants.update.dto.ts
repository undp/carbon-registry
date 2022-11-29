import { ApiProperty } from "@nestjs/swagger";
import { AgricultureConstants, SolarConstants } from "carbon-credit-calculator";
import { IsNotEmpty, IsEnum, ValidateIf, IsNotEmptyObject } from "class-validator";
import { SubSector } from "../enum/subsector.enum";
import { AgricultureConstantsDto } from "./agriculture.constants.dto";
import { SolarConstantsDto } from "./solar.constants.dto";

export class ConstantUpdateDto {

    @ApiProperty({ enum: SubSector })
    @IsEnum(SubSector, {
        message: 'Invalid custom config group. Supported following values:' + Object.values(SubSector)
    })
    @IsNotEmpty()
    type: SubSector;

    @ApiProperty({ type: AgricultureConstantsDto })
    @IsNotEmptyObject()
    @ValidateIf(o => o.type === SubSector.AGRICULTURE)
    @IsNotEmpty()
    agricultureConstants: AgricultureConstantsDto;

    @ApiProperty({ type: SolarConstantsDto })
    @IsNotEmptyObject()
    @ValidateIf(o => o.type === SubSector.SOLAR)
    @IsNotEmpty()
    solarConstants: SolarConstantsDto;
}