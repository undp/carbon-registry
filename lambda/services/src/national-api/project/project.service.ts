import { Injectable, Logger } from '@nestjs/common';
import { ProjectDto } from '../../shared/dto/project.dto';
import { Project } from '../../shared/entities/project.entity';
import { ProjectLedgerService } from '../../shared/project-ledger/project-ledger.service';
import { generateSerialNumber } from 'serial-number-gen';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { ProjectStatus } from '../../shared/project-ledger/project-status.enum';
import { AgricultureCreationRequest, calculateCredit, SolarCreationRequest } from 'carbon-credit-calculator';
import { QueryDto } from '../../shared/dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { CounterService } from '../../shared/util/counter.service';
import { CounterType } from '../../shared/util/counter.type.enum';
import { SubSector } from '../../shared/enum/subsector.enum';

export declare function PrimaryGeneratedColumn(options: PrimaryGeneratedColumnType): Function;

@Injectable()
export class ProjectService {

    constructor(
        private projectLedger: ProjectLedgerService, 
        private counterService: CounterService,
        @InjectRepository(Project) private projectRepo: Repository<Project>, 
        private logger: Logger) {}

    private toProject(projectDto: ProjectDto): Project {
        const data = instanceToPlain(projectDto);
        this.logger.verbose('Converted project', JSON.stringify(data))
        return plainToClass(Project, data);
    }

    private getCreditRequest(projectDto: ProjectDto) {
        switch(projectDto.subSector) {
            case SubSector.AGRICULTURE:
                const ar = new AgricultureCreationRequest()
                ar.duration = (projectDto.endTime - projectDto.startTime)
                ar.durationUnit = "s"
                ar.landArea = projectDto.agricultureProperties.landArea;
                ar.landAreaUnit = projectDto.agricultureProperties.landAreaUnit
                return ar;
            case SubSector.SOLAR:
                const sr = new SolarCreationRequest()
                sr.buildingType = projectDto.solarProperties.consumerGroup;
                sr.energyGeneration = projectDto.solarProperties.energyGeneration;
                sr.energyGenerationUnit = projectDto.solarProperties.energyGenerationUnit
                return ar;
        }
        throw Error("Unknown sub sector " + projectDto.subSector)
    }

    async create(projectDto: ProjectDto): Promise<Project | undefined> {
        this.logger.verbose('ProjectDTO received', projectDto)
        const project: Project = this.toProject(projectDto);
        this.logger.verbose('Project create', project)
        project.projectId = (await this.counterService.incrementCount(CounterType.PROJECT, 4))
        const year = new Date(projectDto.startTime*1000).getFullYear()
        const startBlock = await this.counterService.getCount(CounterType.ITMO)
        project.numberOfITMO = calculateCredit(this.getCreditRequest(projectDto));
        const endBlock = parseInt(await this.counterService.incrementCount(CounterType.ITMO, 0, project.numberOfITMO))
        project.serialNo = generateSerialNumber(projectDto.countryCodeA2, projectDto.sectoralScope, project.projectId, year, startBlock, endBlock);
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

    async getProjectEvents(projectId: string): Promise<any> {
        const resp = await this.projectLedger.getProjectHistory(projectId);
        return resp == null ? []: resp;
    }

}
