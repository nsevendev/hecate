import { Test, TestingModule } from '@nestjs/testing'
import { ServiceService } from './app/service.service'
import { ServiceController } from './app/service.controller'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './domaine/service.entity'
import { ImageModule } from '@faker-js/faker/.'
import { ServiceRepository } from './infra/service.repository'
import { CreateServiceDto } from './app/create-service.dto'

describe('ServiceModule', () => {
  let module: TestingModule
  let serviceService: ServiceService
  let serviceController: ServiceController
  let createServiceDto: CreateServiceDto
  let mockFile: (filename: string) => Express.Multer.File

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, TypeOrmModule.forFeature([Service]), ImageModule],
      controllers: [ServiceController],
      providers: [ServiceService, ServiceRepository],
    }).compile()

    serviceService = module.get<ServiceService>(ServiceService)
    serviceController = module.get<ServiceController>(ServiceController)

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

  describe('Service', () => {
    it('ServiceService est défini', () => {
      expect(serviceService).toBeDefined()
    })
    it('Service.getServices sans service : retourne tableau vide', async () => {
      const services = await serviceService.getServices()

      expect(services).toEqual([])
    })
    it('ServiceService.createService sans image : creer le service', async () => {
      createServiceDto = {
        title: 'creation application',
        description: 'on fait de supers applications',
      }
      const serviceCreated = await serviceService.createService(createServiceDto, null)

      expect(serviceCreated.id).toBeDefined()
      expect(serviceCreated.title).toEqual(createServiceDto.title)
      expect(serviceCreated.description).toEqual(createServiceDto.description)
      expect(serviceCreated).not.toHaveProperty('image')
    })
    it('ServiceService.createService avec image: creer le service et image', async () => {
      createServiceDto = {
        title: 'creation application',
        description: 'on fait de supers applications',
      }
      const file: Express.Multer.File = mockFile('image1.png')
      const serviceCreated = await serviceService.createService(createServiceDto, file)

      expect(serviceCreated.id).toBeDefined()
      expect(serviceCreated.title).toEqual(createServiceDto.title)
      expect(serviceCreated.description).toEqual(createServiceDto.description)
      expect(serviceCreated.image).toBeDefined()
    })
  })
})
