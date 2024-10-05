import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from '../domaine/project.entity'

@Injectable()
export class ProjectRepository {
    constructor(
        @InjectRepository(Project)
        public repository: Repository<Project>
    ) {}
}
