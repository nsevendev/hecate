import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { ProjectRepository } from './infra/project.repository'
import { ProjectService } from './app/project.service'
import { Project } from './domaine/project.entity'
import { TechnoService } from '../techno/app/techno.service'
import { CreateTechnoDto } from '../techno/app/create-techno.dto'
import { CreateProjectDto } from './app/create-project.dto'
import { ProjectController } from './app/project.controller'
import { BadRequestException, NotFoundException } from '@nestjs/common'
import { ImageModule } from '../image/image.module'
import { TechnoModule } from '../techno/techno.module'
import { ProjectImage } from '../project-image/domaine/project-image.entity'
import { ProjectModule } from './project.module'

describe('Project', () => {
  let projectService: ProjectService
  let projectController: ProjectController
  let technoService: TechnoService
  let module: TestingModule
  let createTechnoDto: CreateTechnoDto
  let createProjectDto: CreateProjectDto
  let mockFile: (filename: string) => Express.Multer.File

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseTestModule, // Utilisation bdd pour les tests
        TypeOrmModule.forFeature([Project, ProjectImage]),
        ImageModule,
        TechnoModule,
      ],
      controllers: [ProjectController],
      providers: [ProjectService, ProjectRepository],
    }).compile()

    projectService = module.get<ProjectService>(ProjectService)
    technoService = module.get<TechnoService>(TechnoService)
    projectController = module.get<ProjectController>(ProjectController)

    createTechnoDto = { name: 'Angular' }

    mockFile = (filename: string): Express.Multer.File => ({
      fieldname: 'images',
      originalname: filename,
      encoding: '7bit',
      mimetype: 'image/png',
      buffer: Buffer.from('mocked image content'),
      size: 1024,
      destination: 'uploads/',
      filename,
      path: `uploads/${filename}`,
      stream: undefined,
    })
  })

  describe('ProjectModule', () => {
    let moduleProject: TestingModule

    beforeAll(async () => {
      moduleProject = await Test.createTestingModule({
        imports: [DatabaseTestModule, ProjectModule],
      }).compile()
    })

    it('ProjectModule est defini', () => {
      expect(moduleProject).toBeDefined()
    })

    it('ProjectModule : Les services et contrôleurs sont injectés', () => {
      const projectService = moduleProject.get<ProjectService>(ProjectService)
      const projectController = moduleProject.get<ProjectController>(ProjectController)

      expect(projectService).toBeDefined()
      expect(projectController).toBeDefined()
    })
  })

  describe('Controller', () => {
    it('ProjectController est defini', () => {
      expect(projectController).toBeDefined()
    })

    it('ProjectController.getProjects avec aucun project', async () => {
      const projects = await projectController.getProjects()

      expect(projects).toEqual([])
    })

    it('ProjectController.getProjects avec project existant', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectController.createProject(createProjectDto, null)
      const projects = await projectController.getProjects()

      expect(projects[0].id).toEqual(projectCreated.id)
      expect(projects[0].name).toEqual(createProjectDto.name)
    })

    it('ProjectController.getProjectById avec project existant', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectController.createProject(createProjectDto, null)
      const project = await projectController.getProjectById(projectCreated.id)

      expect(project.id).toEqual(projectCreated.id)
      expect(project.name).toEqual(createProjectDto.name)
      expect(project.technos).toHaveLength(1)
      expect(project.technos[0].id).toEqual(techno.id)
      expect(project.technos[0].name).toEqual(techno.name)
    })

    it('ProjectController.getProjectById sans project', async () => {
      await expect(projectController.getProjectById(1)).rejects.toThrow(
        new NotFoundException("Le project n'existe pas")
      )
    })

    it('ProjectController.createProject sans image, techno obligatoire', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectController.createProject(createProjectDto, null)

      expect(projectCreated.id).toBeDefined()
      expect(projectCreated.name).toBe(createProjectDto.name)
      expect(projectCreated.description).toBe(createProjectDto.description)

      expect(projectCreated.technos).toHaveLength(1)
      expect(projectCreated.technos[0].id).toBe(techno.id)
      expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)
    })

    it('ProjectController.createProject sans techno KO', async () => {
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [] }

      await expect(projectController.createProject(createProjectDto, null)).rejects.toThrowError(
        'Un projet doit avoir au moins une techno'
      )
    })

    it('ProjectController.createProject avec images', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const files: Express.Multer.File[] = [mockFile('image1.png'), mockFile('image2.jpg')]
      const projectCreated = await projectController.createProject(createProjectDto, files)

      expect(projectCreated.id).toBeDefined()
      expect(projectCreated.name).toBe(createProjectDto.name)
      expect(projectCreated.description).toBe(createProjectDto.description)

      expect(projectCreated.technos).toHaveLength(1)
      expect(projectCreated.technos[0].id).toBe(techno.id)
      expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)

      expect(projectCreated.projectImage).toHaveLength(2)

      // suppression du projet et des images pour non stockage des test
      await projectService.deleteProject(projectCreated.id)
    })

    it('ProjectController.updateProject modifie les propriétés et la relation techno', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectController.createProject(createProjectDto, null)

      // Nouvelle techno à ajouter
      const newTechnoDto = { name: 'React' }
      const newTechno = await technoService.createTechno(newTechnoDto)

      // Mise à jour du projet
      const updatedProjectDto = {
        name: 'my updated projet',
        description: 'updated description',
        technos: [techno.id, newTechno.id],
      }
      const updatedProject = await projectController.updateProjectById(
        projectCreated.id,
        updatedProjectDto,
        null
      )

      expect(updatedProject.name).toBe(updatedProjectDto.name)
      expect(updatedProject.description).toBe(updatedProjectDto.description)
      expect(updatedProject.technos).toHaveLength(2)
      expect(updatedProject.technos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: techno.id, name: techno.name }),
          expect.objectContaining({ id: newTechno.id, name: newTechno.name }),
        ])
      )
    })

    it('ProjectController.deleteProject supprime un projet existant et verifie la mise à jour de techno', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectController.createProject(createProjectDto, null)

      await projectController.deleteProject(projectCreated.id)
      const projects = await projectController.getProjects()

      expect(projects).toHaveLength(0)
    })

    it('ProjectController.removeImageFromProject supprime une image du project', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const files: Express.Multer.File[] = [mockFile('image1.png'), mockFile('image2.jpg')]
      const projectCreated = await projectController.createProject(createProjectDto, files)

      const project = await projectController.removeImageFromProject(
        projectCreated.id,
        projectCreated.projectImage[0].image.id
      )

      expect(project.projectImage).toHaveLength(1)

      // suppression du projet et des images pour non stockage des test
      await projectService.deleteProject(projectCreated.id)
    })
  })

  describe('Service', () => {
    it('ProjectService est defini', () => {
      expect(projectService).toBeDefined()
    })

    it('ProjectService.getProjects sans project : retourne []', async () => {
      const projects = await projectService.getProjects()

      expect(projects).toEqual([])
    })

    it('ProjectService.getProjects avec project : recupere les projects', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectService.createProject(createProjectDto, null)
      const projects = await projectService.getProjects()

      expect(projects[0].id).toEqual(projectCreated.id)
      expect(projects[0].name).toEqual(createProjectDto.name)
    })

    it('ProjectService.getProjectById : recupere le project avec ID', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectService.createProject(createProjectDto, null)
      const project = await projectService.getProjectById(projectCreated.id)

      expect(project.id).toEqual(projectCreated.id)
      expect(project.name).toEqual(createProjectDto.name)
      expect(project.technos).toHaveLength(1)
      expect(project.technos[0].id).toEqual(techno.id)
      expect(project.technos[0].name).toEqual(techno.name)
    })

    it('ProjectService.getProjectById avec un id non valide : NotFoundException', async () => {
      await expect(projectService.getProjectById(1)).rejects.toThrow(
        new NotFoundException("Le project n'existe pas")
      )
    })

    it('ProjectService.createProject sans image : creer le project', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectService.createProject(createProjectDto, null)

      expect(projectCreated.id).toBeDefined()
      expect(projectCreated.name).toBe(createProjectDto.name)
      expect(projectCreated.description).toBe(createProjectDto.description)

      expect(projectCreated.technos).toHaveLength(1)
      expect(projectCreated.technos[0].id).toBe(techno.id)
      expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)
    })

    it('ProjectService.createProject sans techno : BadRequestException', async () => {
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [] }

      await expect(projectService.createProject(createProjectDto, null)).rejects.toThrow(
        new BadRequestException('Un projet doit avoir au moins une techno')
      )
    })

    it('ProjectService.createProject avec images : creer project et image', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const files: Express.Multer.File[] = [mockFile('image1.png'), mockFile('image2.jpg')]
      const projectCreated = await projectService.createProject(createProjectDto, files)

      expect(projectCreated.id).toBeDefined()
      expect(projectCreated.name).toBe(createProjectDto.name)
      expect(projectCreated.description).toBe(createProjectDto.description)

      expect(projectCreated.technos).toHaveLength(1)
      expect(projectCreated.technos[0].id).toBe(techno.id)
      expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)

      expect(projectCreated.projectImage).toHaveLength(2)

      // suppression du projet et des images pour non stockage des test
      await projectService.deleteProject(projectCreated.id)
    })

    it('ProjectService.updateProject : modifie les propriétés et la relation techno', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectService.createProject(createProjectDto, null)

      // Nouvelle techno à ajouter
      const newTechnoDto = { name: 'React' }
      const newTechno = await technoService.createTechno(newTechnoDto)

      // Mise à jour du projet
      const updatedProjectDto = {
        name: 'my updated projet',
        description: 'updated description',
        technos: [techno.id, newTechno.id],
      }
      const updatedProject = await projectService.updateProjectById(
        projectCreated.id,
        updatedProjectDto,
        null
      )

      expect(updatedProject.name).toBe(updatedProjectDto.name)
      expect(updatedProject.description).toBe(updatedProjectDto.description)
      expect(updatedProject.technos).toHaveLength(2)
      expect(updatedProject.technos).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ id: techno.id, name: techno.name }),
          expect.objectContaining({ id: newTechno.id, name: newTechno.name }),
        ])
      )
    })

    it('ProjectService.deleteProject : supprime un projet existant', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const projectCreated = await projectService.createProject(createProjectDto, null)

      await projectService.deleteProject(projectCreated.id)
      const projects = await projectService.getProjects()

      expect(projects).toHaveLength(0)
    })

    it('ProjectService.deleteProject avec id non valide : NotFoundException', async () => {
      const nonExistentId = 999

      await expect(projectService.deleteProject(nonExistentId)).rejects.toThrow(
        new NotFoundException(`Le project n'existe pas`)
      )
    })

    it('ProjectService.removeImageFromProject : supprime une image associée à un projet', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const files: Express.Multer.File[] = [mockFile('image1.png'), mockFile('image2.jpg')]

      const projectCreated = await projectService.createProject(createProjectDto, files)
      expect(projectCreated.projectImage).toHaveLength(2)

      const imageToRemove = projectCreated.projectImage[0].image

      await projectService.removeImageFromProject(projectCreated.id, imageToRemove.id)

      const updatedProject = await projectService.getProjectById(projectCreated.id)

      expect(updatedProject.projectImage).toHaveLength(1)
      expect(updatedProject.projectImage[0].image.id).not.toEqual(imageToRemove.id)
    })

    it('ProjectService.removeImageFromProject avec un projectId non valide : NotFoundException', async () => {
      const nonExistentProjectId = 999
      const validImageId = 1

      await expect(projectService.removeImageFromProject(nonExistentProjectId, validImageId)).rejects.toThrow(
        new NotFoundException("Le project n'existe pas")
      )
    })

    it('ProjectService.removeImageFromProject avec un imageId non valide : NotFoundException', async () => {
      const techno = await technoService.createTechno(createTechnoDto)
      createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
      const files: Express.Multer.File[] = [mockFile('image1.png')]

      const projectCreated = await projectService.createProject(createProjectDto, files)

      const nonExistentImageId = 999

      await expect(
        projectService.removeImageFromProject(projectCreated.id, nonExistentImageId)
      ).rejects.toThrow(new NotFoundException("L'image n'est pas associée à ce projet"))

      // suppression du projet et des images pour non stockage des test
      await projectService.deleteProject(projectCreated.id)
    })
  })
})
