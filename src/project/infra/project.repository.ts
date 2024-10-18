import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Project } from '../domaine/project.entity'
import { CreateProjectDto } from '../app/create-project.dto'
import { Techno } from '../../techno/domaine/techno.entity'

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    public repository: Repository<Project>
  ) {}

  createProject = async (createProjectDto: CreateProjectDto, technos: Techno[], projectImage = null) => {
    const project = this.repository.create({
      ...createProjectDto,
      technos,
      projectImage: projectImage,
    })

    return await this.repository.save(project)
  }
}
