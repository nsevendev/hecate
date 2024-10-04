import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Project } from './domaine/project.entity'
import { ProjectImage } from '../project-image/domaine/project-image.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Project, ProjectImage])],
    providers: [],
    exports: [],
})
export class ProjectModule {}
