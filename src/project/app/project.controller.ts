import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    InternalServerErrorException,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common'
import { ApiConsumes, ApiResponse, ApiTags } from '@nestjs/swagger'
import { ProjectService } from './project.service'
import { HttpExceptionResponse } from '../../shared/exception-response/http-exception-response'
import { Project } from '../domaine/project.entity'
import { FilesInterceptor } from '@nestjs/platform-express'
import { CreateProjectDto } from './create-project.dto'
import { UpdateProjectDto } from './update-project.dto'

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

    @Get('project/:id')
    @ApiResponse({ status: 200, description: 'Renvoie un project', type: Project })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => Le projet n'a pas été trouvée`,
    })
    async getProjectById(@Param() id: number) {
        return this.projectService.getProjectById(id)
    }

    @Post('project/create')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({
        status: 201,
        description: 'Le projet créé, si images existe il sera créé avec les images',
        type: Project,
    })
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 400,
        type: HttpExceptionResponse,
        description: `${BadRequestException.name} => Mauvaise utilisation de la requête`,
    })
    @UseInterceptors(FilesInterceptor('images'))
    async createProject(
        @Body() createProjectDto: CreateProjectDto,
        @UploadedFiles() files?: Array<Express.Multer.File>
    ) {
        return await this.projectService.createProject(createProjectDto, files)
    }

    @Put('project/:id')
    @ApiConsumes('multipart/form-data')
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => Le projet n'a pas été trouvée`,
    })
    @ApiResponse({
        status: 400,
        type: HttpExceptionResponse,
        description: `${BadRequestException.name} => Mauvaise utilisation de la requête`,
    })
    @UseInterceptors(FilesInterceptor('images'))
    async updateProjectById(
        @Param() id: number,
        updateProjectDto: UpdateProjectDto,
        @UploadedFiles() files?: Array<Express.Multer.File>
    ) {
        return await this.projectService.updateProjectById(id, updateProjectDto, files)
    }

    @Delete('project/:id')
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => Le projet n'a pas été trouvée`,
    })
    async deleteProject(@Param() id: number) {
        return await this.projectService.deleteProject(id)
    }

    @Delete('project/:projectId/image/:imageId')
    @ApiResponse({
        status: 500,
        type: HttpExceptionResponse,
        description: `${InternalServerErrorException.name} => Une erreur server est survenue`,
    })
    @ApiResponse({
        status: 404,
        type: HttpExceptionResponse,
        description: `${NotFoundException.name} => Le projet ou l'image n'a pas été trouvée`,
    })
    async removeImageFromProject(@Param('projectId') projectId: number, @Param('imageId') imageId: number) {
        return await this.projectService.removeImageFromProject(projectId, imageId)
    }
}
