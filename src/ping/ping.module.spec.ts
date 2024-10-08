import { Test, TestingModule } from '@nestjs/testing'
import { PingController } from './app/ping.controller'
import { PingService } from './app/ping.service'
import { PingRepository } from './infra/ping.repository'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ping } from './domaine/ping.entity'
import { CreatePingDto } from './app/create-ping.dto'
import { ConflictException, NotFoundException } from '@nestjs/common'

describe('PingModule', () => {
    let module: TestingModule
    let pingController: PingController
    let pingService: PingService
    let createPingDto: CreatePingDto

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseTestModule, // Utilisation bdd pour les tests
                TypeOrmModule.forFeature([Ping]),
            ],
            controllers: [PingController],
            providers: [PingService, PingRepository],
        }).compile()

        pingController = module.get<PingController>(PingController)
        pingService = module.get<PingService>(PingService)

        createPingDto = { status: 200, value: 'value' }
    })

    describe('Controller', () => {
        it('PingController est defini', () => {
            expect(pingController).toBeDefined()
        })

        it('PingController.firstPing avec aucun ping existant', async () => {
            await expect(pingController.firstPing()).rejects.toThrow(NotFoundException)
        })

        it('PingController.createPing', async () => {
            const result = await pingController.createPing(createPingDto)

            expect(result.status).toEqual(200)
            expect(result.value).toEqual('value')
        })

        it('PingController.firstPing', async () => {
            await pingController.createPing(createPingDto)

            const result = await pingController.firstPing()

            expect(result.status).toEqual(200)
            expect(result.value).toEqual('value')
        })

        it('PingController.createPing avec ping qui exist deja', async () => {
            await pingController.createPing(createPingDto)

            await expect(pingController.createPing(createPingDto)).rejects.toThrow(ConflictException)
        })
    })

    describe('Service', () => {
        it('PingService est defini', () => {
            expect(pingService).toBeDefined()
        })

        it('PingService.getFirstPing avec aucun ping existant', async () => {
            await expect(pingService.getFirstPing()).rejects.toThrow(NotFoundException)
        })

        it('PingService.createPing', async () => {
            const result = await pingService.createPing(createPingDto)

            expect(result.status).toEqual(200)
            expect(result.value).toEqual('value')
        })

        it('PingService.firstPing', async () => {
            await pingService.createPing(createPingDto)

            const result = await pingService.getFirstPing()

            expect(result.status).toEqual(200)
            expect(result.value).toEqual('value')
        })

        it('PingService.createPing avec ping qui exist deja', async () => {
            await pingService.createPing(createPingDto)

            await expect(pingService.createPing(createPingDto)).rejects.toThrow(ConflictException)
        })
    })
})
