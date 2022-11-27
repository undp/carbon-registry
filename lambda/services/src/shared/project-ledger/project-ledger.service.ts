import { Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
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

    public async updateProjectStatus(projectId: string, status: ProjectStatus): Promise<void> {
        this.logger.log(`Updating project ${projectId} status ${status}`)
        await this.ledger.updateRecords({
            'status': status.valueOf()
        }, {
            'projectId': projectId
        });
    }
}
