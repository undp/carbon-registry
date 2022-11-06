import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';

@Injectable()
export class NationalAPIService {

  constructor(private configService: ConfigService, 
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,) {}
  
  getHello(): string {
    const stage = this.configService.get<string>('stage');
    return 'Hello National API :' + stage;
  }

  addProject(project: Project): Project {
    return this.projectRepository.create(project)
  }
}
