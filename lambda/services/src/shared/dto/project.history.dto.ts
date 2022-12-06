import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Project } from "../entities/project.entity";
import { ProjectStage } from "../project-ledger/project-status.enum";
import { QldbMetadata } from "./qldb.metadata";

export class ProjectHistoryDto {
    metadata: QldbMetadata;
    data: Project
}