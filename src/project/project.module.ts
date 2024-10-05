import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './domaine/project.entity'
import { ProjectImage } from '../project-image/domaine/project-image.entity'
import { ProjectService } from './app/project.service'
import { ProjectRepository } from './infra/project.repository'

@Module({
    imports: [TypeOrmModule.forFeature([Project, ProjectImage])],
    providers: [ProjectService, ProjectRepository],
    exports: [ProjectService, ProjectRepository],
})
export class ProjectModule {}
