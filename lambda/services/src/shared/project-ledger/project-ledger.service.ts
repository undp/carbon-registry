import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { BasicResponseDto } from '../dto/basic.response.dto';
import { ProjectHistoryDto } from '../dto/project.history.dto';
import { Project } from '../entities/project.entity';
import { LedgerDbService } from '../ledger-db/ledger-db.service';
import { ProjectStatus } from './project-status.enum';

@Injectable()
export class ProjectLedgerService {
    constructor(private readonly logger: Logger, private ledger: LedgerDbService) {

    }

    public async createProject(project: Project): Promise<Project> {
        this.logger.debug('Creating project', JSON.stringify(project))
        await this.ledger.insertRecord(project)
        return project;
    }

    public async getProjectById(projectId: string): Promise<Project> {
        const p = (await this.ledger.fetchRecords({
            'projectId': projectId
        })).map(domValue => {
                return plainToClass(Project, JSON.parse(JSON.stringify(domValue)));
            }
        )
        return (p.length <= 0) ? null: p[0];
    }

    public async getProjectHistory(projectId: string): Promise<ProjectHistoryDto[]> {
        return (await this.ledger.fetchHistory({
            'projectId': projectId
        }))?.map(domValue => {
                return plainToClass(ProjectHistoryDto, JSON.parse(JSON.stringify(domValue)));
            }
        )
    }

    public async getProject(projectId: string): Promise<Project> {
        const results = await this.ledger.fetchRecords({
            'projectId': projectId
        })
        if (results.length <= 0) {
            return null
        }
        return plainToClass(Project, results[0])
    }

    public async updateProjectStatus(projectId: string, status: ProjectStatus, currentExpectedStatus: ProjectStatus): Promise<BasicResponseDto> {
        this.logger.log(`Updating project ${projectId} status ${status}`)
        const affected = (await this.ledger.updateRecords({
            'status': status.valueOf()
        }, {
            'projectId': projectId,
            'status': currentExpectedStatus.valueOf()
        }));
        if (affected && affected.length > 0) {
            return new BasicResponseDto(HttpStatus.OK, "Successfully updated")
        }
        return new BasicResponseDto(HttpStatus.BAD_REQUEST, `Does not found a project in ${currentExpectedStatus} status for the given project id ${projectId}`)
    }

    public async authProjectStatus(projectId: string, serialNo: string): Promise<BasicResponseDto> {
        this.logger.log(`Authorizing project ${projectId} serialNo ${serialNo}`)
        const affected = (await this.ledger.updateRecords({
            'status': ProjectStatus.AUTHORIZED.valueOf(),
            'serialNo': serialNo
        }, {
            'projectId': projectId,
            'status': ProjectStatus.REGISTERED.valueOf()
        }));
        if (affected && affected.length > 0) {
            return new BasicResponseDto(HttpStatus.OK, "Successfully updated")
        }
        return new BasicResponseDto(HttpStatus.BAD_REQUEST, `Does not found a project in Registered status for the given project id ${projectId}`)
    }
}
