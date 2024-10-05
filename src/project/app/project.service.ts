import { Injectable } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { ProjectRepository } from '../infra/project.repository'

@Injectable()
export class ProjectService extends BaseService {
    constructor(private readonly projectRepository: ProjectRepository) {
        super('ProjectService')
    }

    getProjects = async () => {
        return await this.projectRepository.repository.find()
    }

    createProject = async () => {}
}
