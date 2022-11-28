import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Country } from '../entities/country.entity';

@Injectable()
export class CountryService {
    constructor(@InjectRepository(Country) private countryRepo: Repository<Country>) {
    }

    async insertCountry(country: Country) {
        return this.countryRepo.save(country)
    }

    async isValidCountry(alpha2: string) {
        return (await this.countryRepo.findOneBy({
            alpha2: alpha2
        })) != null;
    }
}
