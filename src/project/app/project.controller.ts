import { Controller, Get, InternalServerErrorException } from '@nestjs/common'
import { ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProjectService } from './project.service'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'
import { Project } from '../domaine/project.entity'

@ApiTags('Project Controller')
@Controller()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get('projects')
    @ApiResponse({ status: 200, description: 'Renvoie tous les projects', type: [Project] })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    async getProjects() {
        return this.projectService.getProjects()
    }
}
