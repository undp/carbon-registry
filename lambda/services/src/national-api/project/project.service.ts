import { Injectable, Logger } from '@nestjs/common';
import { ProjectDto } from '../../shared/dto/project.dto';
import { Project } from '../../shared/entities/project.entity';
import { ProjectLedgerService } from '../../shared/project-ledger/project-ledger.service';
import { generateSerialNumber } from 'serial-number-gen';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { ProjectStatus } from '../../shared/project-ledger/project-status.enum';
import { calculateCredit } from 'carbon-credit-calculator';
import { QueryDto } from '../../shared/dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {

    constructor(
        private projectLedger: ProjectLedgerService, 
        @InjectRepository(Project) private projectRepo: Repository<Project>, 
        private logger: Logger) {}

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

    async query(query: QueryDto): Promise<Project[]> {
        const skip = (query.size * query.page) - query.size;
        return await this.projectRepo.find({
            skip,
            take: query.size
        });
    }

}
