import { Techno } from './domaine/techno.entity'
import { TechnoService } from './app/techno.service'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { CreateTechnoDto } from './app/create-techno.dto'
import { NotFoundException } from '@nestjs/common'
import { TechnoRepository } from './infra/techno.repository'
import { TechnoController } from './app/techno.controller'

describe('TechnoModule', () => {
  let technoController: TechnoController
  let technoService: TechnoService
  let module: TestingModule
  let createTechnoDto: CreateTechnoDto

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseTestModule, // Utilisation bdd pour les tests
        TypeOrmModule.forFeature([Techno]),
      ],
      controllers: [TechnoController],
      providers: [TechnoService, TechnoRepository],
    }).compile()

    technoService = module.get<TechnoService>(TechnoService)
    technoController = module.get<TechnoController>(TechnoController)

    createTechnoDto = { name: 'angular' }
  })

  describe('Controller', () => {
    it('TechnoController est defini', () => {
      expect(technoController).toBeDefined()
    })

    it('TechnoController.getTechnos sans techno : retourne un tableau vide', async () => {
      const technos = await technoController.getTechnos()

      expect(technos).toEqual([])
    })

    it('TechnoController.getTechnos avec des technos : récupère les technos', async () => {
      const technoCreated = await technoController.createTechno(createTechnoDto)
      const technos = await technoController.getTechnos()

      expect(technos).toEqual([technoCreated])
    })

    it('TechnoController.getTechnoById : récupère la techno par ID', async () => {
      const technoCreated = await technoController.createTechno(createTechnoDto)
      const techno = await technoController.getTechnoById(technoCreated.id)

      expect(techno).toEqual(technoCreated)
    })

    it('TechnoController.getTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999

      await expect(technoController.getTechnoById(nonExistentId)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })

    it('TechnoController.createTechno : crée la techno', async () => {
      const technoCreated = await technoController.createTechno(createTechnoDto)

      expect(technoCreated.id).toBeDefined()
      expect(technoCreated.name).toBe(createTechnoDto.name)
    })

    it('TechnoController.updateTechnoById : met à jour les propriétés de la techno', async () => {
      const technoCreated = await technoController.createTechno(createTechnoDto)

      const updatedTechnoDto = { name: 'UpdatedAngular' }
      const updatedTechno = await technoController.updateTechnoById(technoCreated.id, updatedTechnoDto)

      expect(updatedTechno.id).toBe(technoCreated.id)
      expect(updatedTechno.name).toBe(updatedTechnoDto.name)
    })

    it('TechnoController.updateTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999
      const updatedTechnoDto = { name: 'NonExistentTechno' }

      await expect(technoController.updateTechnoById(nonExistentId, updatedTechnoDto)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })

    it('TechnoController.deleteTechnoById : supprime la techno', async () => {
      const technoCreated = await technoController.createTechno(createTechnoDto)

      await technoController.deleteTechnoById(technoCreated.id)

      const technos = await technoController.getTechnos()

      expect(technos).toHaveLength(0)
    })

    it('TechnoController.deleteTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999

      await expect(technoController.deleteTechnoById(nonExistentId)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })
  })

  describe('Service', () => {
    it('TechnoService est defini', () => {
      expect(technoService).toBeDefined()
    })

    it('TechnoService.getTechnos sans techno : retourne un tableau vide', async () => {
      const technos = await technoService.getTechnos()

      expect(technos).toEqual([])
    })

    it('TechnoService.getTechnos avec des technos : récupère les technos', async () => {
      const technoCreated = await technoService.createTechno(createTechnoDto)
      const technos = await technoService.getTechnos()

      expect(technos).toEqual([technoCreated])
    })

    it('TechnoService.getTechnoByIds avec des ids valide: retourne les technos correspondantes', async () => {
      const technoIds = [1, 2]
      const technoCreated1 = await technoService.createTechno(createTechnoDto)
      const technoCreated2 = await technoService.createTechno(createTechnoDto)

      const result = await technoService.getTechnoByIds(technoIds)

      expect(result).toEqual([technoCreated1, technoCreated2])
    })

    it('TechnoService.getTechnoByIds avec ids non valide : NotFoundException', async () => {
      const technoIds = [999]

      await expect(technoService.getTechnoByIds(technoIds)).rejects.toThrow(NotFoundException)
    })

    it('TechnoService.getTechnoByIds avec des ids non valide : NotFoundException avec les IDs manquants', async () => {
      const technoIds = [1, 2]
      await technoService.createTechno(createTechnoDto)

      await expect(technoService.getTechnoByIds(technoIds)).rejects.toThrow(
        new NotFoundException(`Les technos avec les IDs suivants n'ont pas été trouvées : 2`)
      )
    })

    it('TechnoService.getTechnoById : récupère la techno par ID', async () => {
      const technoCreated = await technoService.createTechno(createTechnoDto)
      const techno = await technoService.getTechnoById(technoCreated.id)

      expect(techno).toEqual(technoCreated)
    })

    it('TechnoService.getTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999

      await expect(technoService.getTechnoById(nonExistentId)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })

    it('TechnoService.createTechno sans projet : crée la techno', async () => {
      const technoCreated = await technoService.createTechno(createTechnoDto)

      expect(technoCreated.id).toBeDefined()
      expect(technoCreated.name).toBe(createTechnoDto.name)
    })

    it('TechnoService.updateTechnoById : met à jour les propriétés de la techno', async () => {
      const technoCreated = await technoService.createTechno(createTechnoDto)

      const updatedTechnoDto = { name: 'UpdatedAngular' }
      const updatedTechno = await technoService.updateTechnoById(technoCreated.id, updatedTechnoDto)

      expect(updatedTechno.id).toBe(technoCreated.id)
      expect(updatedTechno.name).toBe(updatedTechnoDto.name)
    })

    it('TechnoService.updateTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999
      const updatedTechnoDto = { name: 'NonExistentTechno' }

      await expect(technoService.updateTechnoById(nonExistentId, updatedTechnoDto)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })

    it('TechnoService.deleteTechnoById : supprime la techno', async () => {
      const technoCreated = await technoService.createTechno(createTechnoDto)

      await technoService.deleteTechnoById(technoCreated.id)

      const technos = await technoService.getTechnos()

      expect(technos).toHaveLength(0)
    })

    it('TechnoService.deleteTechnoById avec un ID inexistant : NotFoundException', async () => {
      const nonExistentId = 999

      await expect(technoService.deleteTechnoById(nonExistentId)).rejects.toThrow(
        new NotFoundException(`La techno avec l'id ${nonExistentId} n'a pas été trouvée`)
      )
    })
  })
})
