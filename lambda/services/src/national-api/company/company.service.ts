import { PG_UNIQUE_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyDto } from '../../shared/dto/company.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Company } from '../../shared/entities/company.entity';
import { CompanyRole } from '../../shared/enum/company.role.enum';

@Injectable()
export class CompanyService {
    constructor(@InjectRepository(Company) private companyRepo: Repository<Company>, private logger: Logger, private configService: ConfigService) {
        
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
