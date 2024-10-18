import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { ProjectRepository } from '../infra/project.repository'
import { CreateProjectDto } from './create-project.dto'
import { ImageService } from '../../image/app/image.service'
import { TechnoService } from '../../techno/app/techno.service'
import { InjectRepository } from '@nestjs/typeorm'
import { ProjectImage } from '../../project-image/domaine/project-image.entity'
import { Repository } from 'typeorm'
import { UpdateProjectDto } from './update-project.dto'

@Injectable()
export class ProjectService extends BaseService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly imageService: ImageService,
    private readonly technoService: TechnoService,
    @InjectRepository(ProjectImage)
    private readonly projectImageRepository: Repository<ProjectImage>
  ) {
    super('ProjectService')
  }

  getProjects = async () => {
    return await this.projectRepository.repository.find({
      relations: ['technos', 'projectImage.image'],
    })
  }

  getProjectById = async (id: number) => {
    const project = await this.projectRepository.repository.findOne({
      where: { id },
      relations: ['technos', 'projectImage.image'],
    })

    if (!project) {
      throw new NotFoundException("Le project n'existe pas")
    }

    return project
  }

  createProject = async (createProjectDto: CreateProjectDto, files: Array<Express.Multer.File>) => {
    if (!createProjectDto.technos || createProjectDto.technos.length === 0) {
      throw new BadRequestException('Un projet doit avoir au moins une techno')
    }

    const technos = await this.technoService.getTechnoByIds(createProjectDto.technos)
    const project = await this.projectRepository.createProject(createProjectDto, technos)

    if (files && files.length > 0) {
      const images = await this.imageService.createImages(files)

      project.projectImage = images.map((image) => {
        return this.projectImageRepository.create({ project, image })
      })

      await this.projectRepository.repository.save(project)
    }

    return project
  }

  updateProjectById = async (
    id: number,
    updatedProjectDto: UpdateProjectDto,
    files: Array<Express.Multer.File>
  ) => {
    if (!updatedProjectDto.technos || updatedProjectDto.technos.length === 0) {
      throw new BadRequestException('Il faut au moins une techno pour créer un projet')
    }

    const existingProject = await this.getProjectById(id)
    const technos = await this.technoService.getTechnoByIds(updatedProjectDto.technos)

    const updatedProject = {
      ...existingProject,
      ...updatedProjectDto,
      technos: technos,
    }

    await this.projectRepository.repository.save(updatedProject)

    if (files && files.length > 0) {
      const newImages = await this.imageService.createImages(files)

      const projectImages = newImages.map((image) => {
        return this.projectImageRepository.create({ project: updatedProject, image })
      })

      updatedProject.projectImage = [...(updatedProject.projectImage || []), ...projectImages]

      await this.projectRepository.repository.save(updatedProject)
    }

    return updatedProject
  }

  removeImageFromProject = async (projectId: number, imageId: number) => {
    const project = await this.getProjectById(projectId)
    const projectImageToRemove = project.projectImage.find((pi) => pi.image.id === imageId)

    if (!projectImageToRemove) {
      throw new NotFoundException("L'image n'est pas associée à ce projet")
    }

    await this.imageService.deleteImageByIdAndDeleteFromStorage(imageId)

    project.projectImage = project.projectImage?.filter((pi) => pi.image.id !== imageId)

    return await this.projectRepository.repository.save(project)
  }

  deleteProject = async (id: number) => {
    const project = await this.getProjectById(id)

    if (!project) {
      throw new NotFoundException("Le project n'existe pas")
    }

    if (project.projectImage && project.projectImage.length > 0) {
      project.projectImage.forEach((pi) => {
        this.imageService.deleteImageByIdAndDeleteFromStorage(pi.image.id)
      })
    }

    return await this.projectRepository.repository.remove(project)
  }
}
