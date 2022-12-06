import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ProjectStage } from "../project-ledger/project-status.enum";

export class QldbMetadata {
    id: string;
    version: number;
    txTime: string;
}