import { Techno } from './domaine/techno.entity'
import { TechnoService } from './app/techno.service'
import { TechnoRepository } from './infra/techno.repository'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'

describe('TechnoModule', () => {
    let technoService: TechnoService
    let technoRepository: TechnoRepository
    let module: TestingModule

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

        // TODO : creer un objet create-techno.dto pour la fonction create
    })

    describe('Service', () => {
        it('TechnoService est defini', () => {
            expect(technoService).toBeDefined()
        })

        it('TechnoService.getTechnos avec aucune image', async () => {
            const technos = await technoService.getTechnos()
            expect(technos).toEqual([])
        })

        it('TechnoService.getTechnos avec image', async () => {
            // TODO : creer le fonction createTechno dans le service
            const technoCreated = await technoService.createTechno()
            const technos = await technoService.getTechnos()
            expect(technos).toEqual([technoCreated])
        })
    })
})
