import { Injectable, Logger } from '@nestjs/common';
import { ProjectDto } from '../../shared/dto/project.dto';
import { Project } from '../../shared/entities/project.entity';
import { ProjectLedgerService } from '../../shared/project-ledger/project-ledger.service';
import { generateSerialNumber } from 'serial-number-gen';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { ProjectStatus } from '../../shared/project-ledger/project-status.enum';
import { calculateCredit } from 'carbon-credit-calculator';

@Injectable()
export class ProjectService {

    constructor(private projectLedger: ProjectLedgerService, private logger: Logger) {

    }

    private toProject(projectDto: ProjectDto): Project {
        const data = instanceToPlain(projectDto);
        console.log('instanceToPlain', data)
        return plainToClass(Project, data);
    }

    async create(projectDto: ProjectDto): Promise<Project | undefined> {
        this.logger.verbose('ProjectDTO received', projectDto)
        const project: Project = this.toProject(projectDto);
        this.logger.verbose('Project create', project)
        project.serialNo = generateSerialNumber(projectDto.countryAlpha2Code, "AGRI", 1, 2022);
        project.credit = calculateCredit();
        project.status = ProjectStatus.ISSUED;
        return await this.projectLedger.createProject(project);
    }
}
