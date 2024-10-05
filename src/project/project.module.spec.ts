import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { ProjectRepository } from './infra/project.repository'
import { ProjectService } from './app/project.service'
import { Project } from './domaine/project.entity'
import { Techno } from '../techno/domaine/techno.entity'
import { TechnoService } from '../techno/app/techno.service'
import { TechnoRepository } from '../techno/infra/techno.repository'
import { DataSource } from 'typeorm'
import { CreateTechnoDto } from '../techno/app/create-techno.dto'
import { CreateProjectDto } from './app/create-project.dto'

describe('ProjectModule', () => {
    let projectService: ProjectService
    let projectRepository: ProjectRepository
    let technoService: TechnoService
    let technoRepository: TechnoRepository
    let module: TestingModule
    let dataSource: DataSource
    let createTechnoDto: CreateTechnoDto
    let createProjectDto: CreateProjectDto
    let mockFile: (filename: string) => Express.Multer.File

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseTestModule, // Utilisation bdd pour les tests
                TypeOrmModule.forFeature([Project, Techno]),
            ],
            providers: [ProjectService, ProjectRepository, TechnoService, TechnoRepository],
        }).compile()

        projectService = module.get<ProjectService>(ProjectService)
        projectRepository = module.get<ProjectRepository>(ProjectRepository)
        technoService = module.get<TechnoService>(TechnoService)
        technoRepository = module.get<TechnoRepository>(TechnoRepository)
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

    afterEach(async () => {
        dataSource = module.get<DataSource>(DataSource)
        const entities = dataSource.entityMetadatas // Récupère toutes les entités

        for (const entity of entities) {
            const repository = dataSource.getRepository(entity.name) // Accès au repository
            await repository.query(`TRUNCATE TABLE "${entity.tableName}" RESTART IDENTITY CASCADE;`) // Vide les tables
        }

        await dataSource.destroy()
    })

    describe('Service', () => {
        it('ProjectService est defini', () => {
            expect(projectService).toBeDefined()
        })

        it('ProjectService.getProjects avec aucun project', async () => {
            const projects = await projectService.getProjects()

            expect(projects).toEqual([])
        })

        it('ProjectService.getProjects avec project existant', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            const projectCreated = await projectService.createProject(createProjectDto)
            const projects = await projectService.getProjects()

            // TODO : ce test devrait passer si le test ProjectService.createProject passe
            expect(projects[0].id).toEqual(projectCreated.id)
            expect(projects[0].name).toEqual(createProjectDto.name)
        })

        it('ProjectService.createProject sans image techno obligatoire', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            const projectCreated = await projectService.createProject(createProjectDto)

            // TODO : Vérifier les propriétés du projet
            expect(projectCreated.id).toBeDefined()
            expect(projectCreated.name).toBe(createProjectDto.name)
            expect(projectCreated.description).toBe(createProjectDto.description)

            // TODO : Vérifier la relation techno
            expect(projectCreated.technos).toHaveLength(1)
            expect(projectCreated.technos[0].id).toBe(techno.id)
            expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)
        })

        it('ProjectService.createProject sans techno KO', async () => {
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [] }

            // TODO : vérifier que la fonction createProject lance une erreur si pas de techno
            await expect(projectService.createProject(createProjectDto)).rejects.toThrowError(
                'Un projet doit avoir au moins une techno'
            )
        })

        it('ProjectService.createProject avec images', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            const files: Express.Multer.File[] = [mockFile('image1.png'), mockFile('image2.jpg')]
            const projectCreated = await projectService.createProject(createProjectDto, files)

            // TODO : Vérifications propriter project
            expect(projectCreated.id).toBeDefined()
            expect(projectCreated.name).toBe(createProjectDto.name)
            expect(projectCreated.description).toBe(createProjectDto.description)

            // TODO : Vérifier les relations avec les technos
            expect(projectCreated.technos).toHaveLength(1)
            expect(projectCreated.technos[0].id).toBe(techno.id)
            expect(projectCreated.technos[0].name).toBe(createTechnoDto.name)

            // TODO : Vérifier que les images ont été ajoutées
            expect(projectCreated.projectImage).toHaveLength(2)
            expect(projectCreated.projectImage[0].image.path).toBe(files[0].path)
            expect(projectCreated.projectImage[1].image.path).toBe(files[1].path)
        })

        it('ProjectService vérifie que la techno inclut le projets associés', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            await projectService.createProject(createProjectDto)
            const technos = await technoService.getTechnos()

            // TODO : vérifier que la techno a un projet associé
            expect(technos[0].projects).toHaveLength(1)

            // TODO : vérifier les propriétés du projet dans techno
            expect(technos[0].projects[0].name).toBe(createProjectDto.name)
        })

        it('ProjectService.updateProject modifie les propriétés et la relation techno', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            const projectCreated = await projectService.createProject(createProjectDto)

            // Nouvelle techno à ajouter
            const newTechnoDto = { name: 'React' }
            const newTechno = await technoService.createTechno(newTechnoDto)

            // Mise à jour du projet
            const updatedProjectDto = {
                name: 'my updated projet',
                description: 'updated description',
                technos: [techno.id, newTechno.id],
            }
            const updatedProject = await projectService.updateProject(projectCreated.id, updatedProjectDto)

            // TODO : Vérifications après mise à jour
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

        it('ProjectService.deleteProject supprime un projet existant et verifie la mise à jour de techno', async () => {
            const techno = await technoService.createTechno(createTechnoDto)
            createProjectDto = { name: 'my projet', description: 'super projet', technos: [techno.id] }
            const projectCreated = await projectService.createProject(createProjectDto)
            await projectService.deleteProject(projectCreated.id)
            const projects = await projectService.getProjects()

            // TODO : vérifier que le projet a été supprimé
            expect(projects).toHaveLength(0)

            const updatedTechno = await technoService.getTechnoById(techno.id)

            // TODO : Vérification que la techno n'est plus associée à un projet
            expect(updatedTechno.projects).toHaveLength(0)
        })
    })
})
