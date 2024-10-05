import { Techno } from './domaine/techno.entity'
import { TechnoService } from './app/techno.service'
import { TechnoRepository } from './infra/techno.repository'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTechnoDto } from './app/create-techno.dto'
import { DataSource } from 'typeorm'
import { ProjectService } from '../project/app/project.service'

describe('TechnoModule', () => {
    let technoService: TechnoService
    let projectService: ProjectService
    let technoRepository: TechnoRepository
    let module: TestingModule
    let createTechnoDto: CreateTechnoDto
    let dataSource: DataSource

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseTestModule, // Utilisation bdd pour les tests
                TypeOrmModule.forFeature([Techno]),
            ],
            providers: [TechnoService, TechnoRepository, ProjectService],
        }).compile()

        technoService = module.get<TechnoService>(TechnoService)
        technoRepository = module.get<TechnoRepository>(TechnoRepository)
        projectService = module.get<ProjectService>(ProjectService)

        createTechnoDto = { name: 'angular' }
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
        it('TechnoService est defini', () => {
            expect(technoService).toBeDefined()
        })

        it('TechnoService.getTechnos avec aucune technos', async () => {
            const technos = await technoService.getTechnos()

            expect(technos).toEqual([])
        })

        it('TechnoService.getTechno avec des technos', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)
            const technos = await technoService.getTechnos()

            expect(technos).toEqual([technoCreated])
        })

        it('TechnoService.createTechno sans project', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)

            expect(technoCreated.id).toBeDefined()
            expect(technoCreated.name).toBe(createTechnoDto.name)
        })

        it('TechnoService.updateTechno modifie les propriétés', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)

            const updatedTechnoDto = { name: 'UpdatedAngular' }
            const updatedTechno = await technoService.updateTechno(technoCreated.id, updatedTechnoDto)

            // TODO : Vérifier que la techno a bien été mise à jour
            expect(updatedTechno.id).toBe(technoCreated.id)
            expect(updatedTechno.name).toBe(updatedTechnoDto.name)
        })

        it("TechnoService.updateTechno lance une erreur si la techno n'existe pas", async () => {
            const nonExistentId = 999
            const updatedTechnoDto = { name: 'NonExistentTechno' }

            // TODO : Vérifier que la fonction updateTechno lance une erreur si la techno n'existe pas
            await expect(technoService.updateTechno(nonExistentId, updatedTechnoDto)).rejects.toThrowError(
                `Techno with ID ${nonExistentId} not found`
            )
        })

        it('TechnoService.deleteTechno supprime une techno', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)

            await technoService.deleteTechno(technoCreated.id)

            const technos = await technoService.getTechnos()

            // TODO : Vérification que la techno n'existe plus
            expect(technos).toHaveLength(0)
        })

        it('TechnoService.deleteTechno supprime une techno et met à jour les projets associés', async () => {
            // Création d'une techno
            const technoCreated = await technoService.createTechno(createTechnoDto)

            // Création d'un projet associé à la techno
            const createProjectDto = {
                name: 'my projet',
                description: 'super projet',
                technos: [technoCreated.id],
            }
            const projectCreated = await projectService.createProject(createProjectDto)

            await technoService.deleteTechno(technoCreated.id)

            const technos = await technoService.getTechnos()

            // TODO : Vérification que la techno n'existe plus
            expect(technos).toHaveLength(0)

            const updatedProject = await projectService.getProjectById(projectCreated.id)

            // TODO : Vérification que le projet n'a plus de techno associée
            expect(updatedProject.technos).toHaveLength(0)
        })
    })
})
