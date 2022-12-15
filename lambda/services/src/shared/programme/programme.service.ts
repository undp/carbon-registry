import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ProgrammeDto } from '../dto/programme.dto';
import { Programme } from '../entities/programme.entity';
import { ProgrammeLedgerService } from '../programme-ledger/programme-ledger.service';
import { instanceToPlain, plainToClass } from 'class-transformer';
import { ProgrammeStage } from '../programme-ledger/programme-status.enum';
import { AgricultureConstants, AgricultureCreationRequest, calculateCredit, SolarConstants, SolarCreationRequest } from 'carbon-credit-calculator';
import { QueryDto } from '../dto/query.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PrimaryGeneratedColumnType } from 'typeorm/driver/types/ColumnTypes';
import { CounterService } from '../util/counter.service';
import { CounterType } from '../util/counter.type.enum';
import { ConstantEntity } from '../entities/constants.entity';
import { DataResponseDto } from '../dto/data.response.dto';
import { ConstantUpdateDto } from '../dto/constants.update.dto';
import { ProgrammeApprove } from '../dto/programme.approve';
import { DataListResponseDto } from '../dto/data.list.response';
import { BasicResponseDto } from '../dto/basic.response.dto';
import { ConfigService } from '@nestjs/config';
import { TypeOfMitigation } from '../enum/typeofmitigation.enum';
import { CompanyService } from '../company/company.service';
import { ProgrammeTransferRequest } from '../dto/programme.transfer.request';
import { EmailService } from '../email/email.service';
import { EmailTemplates } from '../email/email.template';
import { User } from '../entities/user.entity';
import { ProgrammeTransfer } from '../entities/programme.transfer';

export declare function PrimaryGeneratedColumn(options: PrimaryGeneratedColumnType): Function;

@Injectable()
export class ProgrammeService {

    constructor(
        private programmeLedger: ProgrammeLedgerService, 
        private counterService: CounterService,
        private configService: ConfigService,
        private companyService: CompanyService,
        private emailService: EmailService,
        @InjectRepository(Programme) private programmeRepo: Repository<Programme>, 
        @InjectRepository(ProgrammeTransfer) private programmeTransferRepo: Repository<ProgrammeTransfer>, 
        @InjectRepository(ConstantEntity) private constantRepo: Repository<ConstantEntity>,
        private logger: Logger) {}

    private toProgramme(programmeDto: ProgrammeDto): Programme {
        const data = instanceToPlain(programmeDto);
        this.logger.verbose('Converted programme', JSON.stringify(data))
        return plainToClass(Programme, data);
    }

    private async getCreditRequest(programmeDto: ProgrammeDto, constants: ConstantEntity) {
        switch(programmeDto.typeOfMitigation) {
            case TypeOfMitigation.AGRICULTURE:
                const ar = new AgricultureCreationRequest()
                ar.duration = (programmeDto.endTime - programmeDto.startTime)
                ar.durationUnit = "s"
                ar.landArea = programmeDto.agricultureProperties.landArea;
                ar.landAreaUnit = programmeDto.agricultureProperties.landAreaUnit
                if (constants) {
                    ar.agricultureConstants = constants.data as AgricultureConstants
                } 
                return ar;
            case TypeOfMitigation.SOLAR:
                const sr = new SolarCreationRequest()
                sr.buildingType = programmeDto.solarProperties.consumerGroup;
                sr.energyGeneration = programmeDto.solarProperties.energyGeneration;
                sr.energyGenerationUnit = programmeDto.solarProperties.energyGenerationUnit
                if (constants) {
                    sr.solarConstants = constants.data as SolarConstants
                } 
                return sr;
        }
        throw Error("Not implemented for mitigation type " + programmeDto.typeOfMitigation)
    }

    async transfer(req: ProgrammeTransferRequest, requester: User) {
        this.logger.log(`Programme transfer request by ${requester.companyId}-${requester.id} received ${JSON.stringify(req)}`)
        const programme = await this.programmeLedger.getProgrammeById(req.programmeId);
        if (programme.creditBalance <= 0) {
            throw new HttpException("Requested programme credit already consumed", HttpStatus.BAD_REQUEST)
        }

        const requestedCompany = await this.companyService.findByCompanyId(requester.companyId);

        for (const companyId of programme.companyId) {
            const company = await this.companyService.findByCompanyId(companyId);
            await this.emailService.sendEmail(
                company.email,
                EmailTemplates.TRANSFER_REQUEST,
                {
                    "name": company.name,
                    "requestedCompany": requestedCompany.name,
                    "credits": req.creditAmount,
                    "serialNo": programme.serialNo,
                    "programmeName": programme.title
                });
        }

        const result = await this.programmeTransferRepo.save(req);

    }

    async create(programmeDto: ProgrammeDto): Promise<Programme | undefined> {
        this.logger.verbose('ProgrammeDTO received', programmeDto)
        const programme: Programme = this.toProgramme(programmeDto);
        this.logger.verbose('Programme create', programme)

        if (programmeDto.proponentTaxVatId.length > 1 && ( !programmeDto.proponentPercentage || programmeDto.proponentPercentage.length != programmeDto.proponentTaxVatId.length)) {
            throw new HttpException("Proponent percentage must defined for each proponent tax id", HttpStatus.BAD_REQUEST)
        }

        const companyIds = []
        for (const taxId in programmeDto.proponentTaxVatId) {
            const projectCompany = await this.companyService.findByTaxId(taxId);
            if (!projectCompany) {
                throw new HttpException("Proponent tax id does not exist in the system", HttpStatus.BAD_REQUEST)
            }
            companyIds.push(projectCompany.companyId)
        }
        

        programme.programmeId = (await this.counterService.incrementCount(CounterType.PROGRAMME, 3))
        programme.countryCodeA2 = this.configService.get('systemCountry');
        const constants = await this.getLatestConstant(programmeDto.typeOfMitigation)

        const req = await this.getCreditRequest(programmeDto, constants);
        try {
            programme.creditIssued = Math.round(await calculateCredit(req));
        } catch(err) {
            this.logger.log(`Credit calculate failed ${err.message}`)
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
        }
        
        if (programme.creditIssued <= 0) {
            throw new HttpException("Not enough credits to create the programme", HttpStatus.BAD_REQUEST)
        }
        programme.creditBalance = programme.creditIssued;
        programme.creditChange = programme.creditIssued;
        programme.programmeProperties.creditYear = new Date(programme.startTime*1000).getFullYear()
        programme.constantVersion = constants ? String(constants.version): "default"
        programme.currentStage = ProgrammeStage.AWAITING_AUTHORIZATION;
        programme.companyId = companyIds;
        programme.txTime = new Date().getTime();
        programme.createdTime = programme.txTime;
        if (!programme.creditUnit) {
            programme.creditUnit = this.configService.get('defaultCreditUnit')
        }

        return await this.programmeLedger.createProgramme(programme);
    }

    async query(query: QueryDto, abilityCondition: string): Promise<DataListResponseDto> {
        const skip = (query.size * query.page) - query.size;
        const resp = (await this.programmeRepo.createQueryBuilder()
            .where(abilityCondition ? abilityCondition : "")
            .skip(skip)
            .take(query.size)
            .getManyAndCount())

        return new DataListResponseDto(
            resp.length > 0 ? resp[0] : undefined,
            resp.length > 1 ? resp[1] : undefined
        );
    }

    async getProgrammeEvents(programmeId: string): Promise<any> {
        const resp = await this.programmeLedger.getProgrammeHistory(programmeId);
        return resp == null ? []: resp;
    }

    async updateCustomConstants(customConstantType: TypeOfMitigation, constants: ConstantUpdateDto) {
        let config;
        if (customConstantType == TypeOfMitigation.AGRICULTURE) {
            config = new AgricultureConstants()
            const recv = instanceToPlain(constants.agricultureConstants)
            for (const key in recv) {
                if (recv.hasOwnProperty(key) && recv[key] != undefined) {
                    config[key] = recv[key]
                }
            }
        }
        else if (customConstantType == TypeOfMitigation.SOLAR) {
            config = new SolarConstants()
            const recv = instanceToPlain(constants.solarConstants)
            for (const key in recv) {
                if (recv.hasOwnProperty(key) && recv[key] != undefined) {
                    config[key] = recv[key]
                }
            }
        }

        const existing = await this.getLatestConstant(customConstantType);
        if (existing && JSON.stringify(existing.data) == JSON.stringify(config)) {
            throw new HttpException("Not difference in the config from the previous version", HttpStatus.BAD_REQUEST)
        }
        const resp = await this.constantRepo.save({
            id: customConstantType,
            data: config
        })
        return new DataResponseDto(HttpStatus.OK, resp);
    }

    async getLatestConstant(customConstantType: TypeOfMitigation) {
        return await this.constantRepo.findOne({
            where: [ {id : customConstantType}],
            order: { version: 'DESC' }
        });
    }

    async updateProgrammeStatus(req: ProgrammeApprove, status: ProgrammeStage, expectedCurrentStatus: ProgrammeStage) {
        this.logger.log(`Programme ${req.programmeId} status updating to ${status}. Comment: ${req.comment}`)
        if (status == ProgrammeStage.ISSUED) {
            const updated = await this.programmeLedger.authProgrammeStatus(req.programmeId, this.configService.get('systemCountry'))
            if (!updated) {
                return new BasicResponseDto(HttpStatus.BAD_REQUEST, `Does not found a programme in ${expectedCurrentStatus} status for the given programme id ${req.programmeId}`)
            }
            return new DataResponseDto(HttpStatus.OK, updated)
        } else {
            const updated = await this.programmeLedger.updateProgrammeStatus(req.programmeId, status, expectedCurrentStatus)
            if (!updated) {
                return new BasicResponseDto(HttpStatus.BAD_REQUEST, `Does not found a programme in ${expectedCurrentStatus} status for the given programme id ${req.programmeId}`)
            }
            return new BasicResponseDto(HttpStatus.OK, "Successfully updated")
        }
        
    }
}
