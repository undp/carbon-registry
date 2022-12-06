import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProjectStage } from "../project-ledger/project-status.enum";

export class DataListResponseDto {
    data: any[];
    total: number;

    constructor(data: any[], total: number) {
        this.total = total;
        this.data = data
    }
}