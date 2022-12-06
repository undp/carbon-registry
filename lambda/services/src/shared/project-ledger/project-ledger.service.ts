import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { dom } from 'ion-js';
import { generateSerialNumber } from 'serial-number-gen';
import { ProjectHistoryDto } from '../dto/project.history.dto';
import { CreditOverall } from '../entities/credit.overall.entity';
import { Project } from '../entities/project.entity';
import { LedgerDbService } from '../ledger-db/ledger-db.service';
import { ProjectStage } from './project-status.enum';

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

    public async updateProjectStatus(projectId: string, status: ProjectStage, currentExpectedStatus: ProjectStage): Promise<boolean> {
        this.logger.log(`Updating project ${projectId} status ${status}`)
        const affected = (await this.ledger.updateRecords({
            'status': status.valueOf()
        }, {
            'projectId': projectId,
            'status': currentExpectedStatus.valueOf()
        }));
        if (affected && affected.length > 0) {
            return true
        }
        return false
    }

    public async authProjectStatus(projectId: string, countryCodeA2: string): Promise<boolean> {
        this.logger.log(`Authorizing project ${projectId}`)

        const getQueries = {}
        getQueries[this.ledger.tableName] = {
            'projectId': projectId,
            'status': ProjectStage.AWAITING_AUTHORIZATION
        };
        getQueries[this.ledger.overallTableName] = {
            'countryCodeA2': countryCodeA2
        }

        let updatedProject = undefined;
        const resp = await this.ledger.multiGetAndUpdate(
            getQueries,
            (results: Record<string, dom.Value[]>) => {
                const projects: Project[] = results[this.ledger.tableName].map(domValue => {
                    return plainToClass(Project, JSON.parse(JSON.stringify(domValue)));
                });
                if (projects.length <= 0) {
                    throw new HttpException("Project does not exist", HttpStatus.BAD_REQUEST) 
                }

                const creditOveralls = results[this.ledger.overallTableName].map(domValue => {
                    return plainToClass(CreditOverall, JSON.parse(JSON.stringify(domValue)));
                });
                if (creditOveralls.length <= 0) {
                    throw new HttpException(`Overall credit does not found for the country code ${countryCodeA2}`, HttpStatus.BAD_REQUEST) 
                }
                const project = projects[0];
                const overall = creditOveralls[0];
                const year = new Date(project.startTime*1000).getFullYear()
                const startBlock = overall.ITMO + 1
                const endBlock = overall.ITMO + project.ITMOsIssued
                const serialNo = generateSerialNumber(project.countryCodeA2, project.sectoralScope, project.projectId, year, startBlock, endBlock);
                project.serialNo = serialNo;
                project.currentStage = ProjectStage.ISSUED
                updatedProject = project;

                let updateMap = {}
                let updateWhereMap = {}
                updateMap[this.ledger.tableName] = {
                    'status': ProjectStage.ISSUED.valueOf(),
                    'serialNo': serialNo
                }
                updateWhereMap[this.ledger.tableName] = {
                    'projectId': projectId,
                    'status': ProjectStage.AWAITING_AUTHORIZATION.valueOf()
                }

                updateMap[this.ledger.overallTableName] = {
                    'ITMO': endBlock,
                    'serialNo': serialNo
                }
                updateWhereMap[this.ledger.overallTableName] = {
                    'countryCodeA2': countryCodeA2
                }
                return [ updateMap, updateWhereMap ];
            }
        );

        const affected = resp[this.ledger.tableName];
        if (affected && affected.length > 0) {
            return updatedProject;
        }
        return updatedProject;
    }
}
