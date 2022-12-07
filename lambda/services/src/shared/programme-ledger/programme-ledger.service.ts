import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { dom } from 'ion-js';
import { generateSerialNumber } from 'serial-number-gen';
import { ProgrammeHistoryDto } from '../dto/programme.history.dto';
import { CreditOverall } from '../entities/credit.overall.entity';
import { Programme } from '../entities/programme.entity';
import { LedgerDbService } from '../ledger-db/ledger-db.service';
import { ProgrammeStage } from './programme-status.enum';

@Injectable()
export class ProgrammeLedgerService {
    constructor(private readonly logger: Logger, private ledger: LedgerDbService) {

    }

    public async createProgramme(programme: Programme): Promise<Programme> {
        this.logger.debug('Creating programme', JSON.stringify(programme))
        await this.ledger.insertRecord(programme)
        return programme;
    }

    public async getProgrammeById(programmeId: string): Promise<Programme> {
        const p = (await this.ledger.fetchRecords({
            'programmeId': programmeId
        })).map(domValue => {
                return plainToClass(Programme, JSON.parse(JSON.stringify(domValue)));
            }
        )
        return (p.length <= 0) ? null: p[0];
    }

    public async getProgrammeHistory(programmeId: string): Promise<ProgrammeHistoryDto[]> {
        return (await this.ledger.fetchHistory({
            'programmeId': programmeId
        }))?.map(domValue => {
                return plainToClass(ProgrammeHistoryDto, JSON.parse(JSON.stringify(domValue)));
            }
        )
    }

    public async updateProgrammeStatus(programmeId: string, status: ProgrammeStage, currentExpectedStatus: ProgrammeStage): Promise<boolean> {
        this.logger.log(`Updating programme ${programmeId} status ${status}`)
        const affected = (await this.ledger.updateRecords({
            'status': status.valueOf()
        }, {
            'programmeId': programmeId,
            'status': currentExpectedStatus.valueOf()
        }));
        if (affected && affected.length > 0) {
            return true
        }
        return false
    }

    public async authProgrammeStatus(programmeId: string, countryCodeA2: string): Promise<boolean> {
        this.logger.log(`Authorizing programme ${programmeId}`)

        const getQueries = {}
        getQueries[this.ledger.tableName] = {
            'programmeId': programmeId,
            'status': ProgrammeStage.AWAITING_AUTHORIZATION
        };
        getQueries[this.ledger.overallTableName] = {
            'countryCodeA2': countryCodeA2
        }

        let updatedProgramme = undefined;
        const resp = await this.ledger.multiGetAndUpdate(
            getQueries,
            (results: Record<string, dom.Value[]>) => {
                const programmes: Programme[] = results[this.ledger.tableName].map(domValue => {
                    return plainToClass(Programme, JSON.parse(JSON.stringify(domValue)));
                });
                if (programmes.length <= 0) {
                    throw new HttpException("Programme does not exist", HttpStatus.BAD_REQUEST) 
                }

                const creditOveralls = results[this.ledger.overallTableName].map(domValue => {
                    return plainToClass(CreditOverall, JSON.parse(JSON.stringify(domValue)));
                });
                if (creditOveralls.length <= 0) {
                    throw new HttpException(`Overall credit does not found for the country code ${countryCodeA2}`, HttpStatus.BAD_REQUEST) 
                }
                const programme = programmes[0];
                const overall = creditOveralls[0];
                const year = new Date(programme.startTime*1000).getFullYear()
                const startBlock = overall.ITMO + 1
                const endBlock = overall.ITMO + programme.ITMOsIssued
                const serialNo = generateSerialNumber(programme.countryCodeA2, programme.sectoralScope, programme.programmeId, year, startBlock, endBlock);
                programme.serialNo = serialNo;
                programme.currentStage = ProgrammeStage.ISSUED
                updatedProgramme = programme;

                let updateMap = {}
                let updateWhereMap = {}
                updateMap[this.ledger.tableName] = {
                    'status': ProgrammeStage.ISSUED.valueOf(),
                    'serialNo': serialNo
                }
                updateWhereMap[this.ledger.tableName] = {
                    'programmeId': programmeId,
                    'status': ProgrammeStage.AWAITING_AUTHORIZATION.valueOf()
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
            return updatedProgramme;
        }
        return updatedProgramme;
    }
}