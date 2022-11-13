import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../shared/entities/project.entity';

@Injectable()
export class LedgerReplicatorService {

    constructor(@InjectRepository(Project) private projectRepo: Repository<Project>, private logger: Logger) {

    }

    async replicate(event) : Promise<any> {
        this.logger.log('Event received', event);
    }
}
