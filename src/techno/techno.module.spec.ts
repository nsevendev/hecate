import { Techno } from './domaine/techno.entity'
import { TechnoService } from './app/techno.service'
import { TechnoRepository } from './infra/techno.repository'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTechnoDto } from './app/create-techno.dto'
import { DataSource } from 'typeorm'

describe('TechnoModule', () => {
    let technoService: TechnoService
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
            providers: [TechnoService, TechnoRepository],
        }).compile()

        technoService = module.get<TechnoService>(TechnoService)
        technoRepository = module.get<TechnoRepository>(TechnoRepository)

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

        it('TechnoService.createTechno sans project', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)

            expect(technoCreated.id).toBeDefined()
            expect(technoCreated.name).toBe(createTechnoDto.name)
        })

        it('TechnoService.getTechno avec des technos', async () => {
            const technoCreated = await technoService.createTechno(createTechnoDto)
            const technos = await technoService.getTechnos()

            expect(technos).toEqual([technoCreated])
        })
    })
})
