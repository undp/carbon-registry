import { Injectable } from '@nestjs/common';
import { ProjectDto } from '../../shared/dto/project.dto';
import { Logger } from 'winston';
import { Project } from '../../shared/entities/project.entity';
import { ProjectLedgerService } from '../../shared/project-ledger/project-ledger.service';
import { generateSerialNumber } from 'serial-number-gen';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { ProjectStatus } from '../../shared/project-ledger/project-status.enum';

@Injectable()
export class ProjectService {

    constructor(private projectLedger: ProjectLedgerService) {

    }

    private toProject(projectDto: ProjectDto): Project {
        const data = instanceToPlain(projectDto);
        return plainToClass(Project, data);
    }

    async create(projectDto: ProjectDto): Promise<Project | undefined> {
        const project: Project = this.toProject(projectDto);
        project.serialNo = generateSerialNumber(projectDto.countryAlpha2Code, "AGRI", 1, 2022);
        project.credit = 0;
        project.status = ProjectStatus.ISSUED;
        return await this.projectLedger.createProject(project);
    }
}
