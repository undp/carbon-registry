import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsPositive, IsInt, IsNumber, IsEnum, MaxLength } from "class-validator";
import { GHGs } from "../enum/ghgs.enum";
import { SourceOfFunding } from "../enum/sourceoffinding.enum";

export class ProgrammeProperties {

    @ApiProperty()
    @IsString()
    maxInternationalTransferAmount: string;

    @ApiProperty()
    @IsPositive()
    @IsInt()
    creditingPeriodInYears: number;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    @IsNotEmpty()
    programmeCostUSD: number;
    
    @ApiProperty({ enum: SourceOfFunding })
    @IsEnum(SourceOfFunding, {
        message: 'Invalid source of funding. Supported following values:' + Object.values(SourceOfFunding)
    })
    @IsNotEmpty()
    sourceOfFunding: SourceOfFunding;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    grantEquivalentAmount: number;

    @ApiProperty()
    @IsPositive()
    @IsNumber()
    carbonPriceUSDPerTon: number;

    @ApiProperty()
    @IsString()
    proponentPercentage: string;

    @ApiProperty()
    @IsString()
    buyerCountryEligibility: string;

    @ApiProperty()
    @IsString()
    @MaxLength(100)
    @IsNotEmpty()
    geographicalLocation:string;

    @ApiProperty({ enum: GHGs, isArray: true })
    @IsEnum(GHGs, {
        message: 'Invalid green house gas. Supported following values:' + Object.values(GHGs),
        each: true
    })
    @IsNotEmpty()
    greenHouseGasses: GHGs[];

    ITMOYear: number
}