import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from '../../shared/dto/company.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Company } from '../../shared/entities/company.entity';
import { CompanyRole } from '../../shared/enum/company.role.enum';
import { QueryDto } from '../../shared/dto/query.dto';
import { DataListResponseDto } from '../../shared/dto/data.list.response';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private companyRepo: Repository<Company>, private logger: Logger, private configService: ConfigService) {
        
    }

    async query(query: QueryDto, abilityCondition: string): Promise<any> {
        const resp = (await this.companyRepo.createQueryBuilder()
            .where(abilityCondition ? abilityCondition : "")
            .skip((query.size * query.page) - query.size)
            .take(query.size)
            .getManyAndCount())

        return new DataListResponseDto(
            resp.length > 0 ? resp[0] : undefined,
            resp.length > 1 ? resp[1] : undefined
        );
    }
    
    async findByTaxId(taxId: string): Promise<Company | undefined> {
        const companies = await this.companyRepo.find({
            where: {
                taxId: taxId,
            }
        });
        return (companies && companies.length > 0) ? companies[0] : undefined;
    }

    async findByCompanyId(companyId: number): Promise<Company | undefined> {
        const companies = await this.companyRepo.find({
            where: {
                companyId: companyId,
            }
        });
        return (companies && companies.length > 0) ? companies[0] : undefined;
    }

    async findGovByCountry(countryCode: string): Promise<Company | undefined> {
        const companies = await this.companyRepo.find({
            where: {
                country: countryCode,
                companyRole: CompanyRole.GOVERNMENT,
            }
        });
        return (companies && companies.length > 0) ? companies[0] : undefined;
    }

    async create(companyDto: CompanyDto): Promise<Company | undefined> {
        this.logger.verbose('Company create received', companyDto.email)

        return await this.companyRepo.save(companyDto).catch((err: any) => {
            if (err instanceof QueryFailedError) {
                switch (err.driverError.code) {
                    case PG_UNIQUE_VIOLATION:
                        throw new HttpException('Company tax id already exist', HttpStatus.BAD_REQUEST);
                }
            }
            return err;
        });
    }
}
