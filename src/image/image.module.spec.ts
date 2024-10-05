import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './domaine/image.entity'
import { ImageService } from './app/image.service'
import { ImageRepository } from './infra/image.repository'
import { DataSource } from 'typeorm'

describe('ImageModule', () => {
    let imageService: ImageService
    let imageRepository: ImageRepository
    let module: TestingModule
    let dataSource: DataSource

    beforeEach(async () => {
        module = await Test.createTestingModule({
            imports: [
                DatabaseTestModule, // Utilisation bdd pour les tests
                TypeOrmModule.forFeature([Image]),
            ],
            providers: [ImageService, ImageRepository],
        }).compile()

        imageService = module.get<ImageService>(ImageService)
        imageRepository = module.get<ImageRepository>(ImageRepository)

        // TODO : creer un objet create-image.dto pour la fonction create
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
        it('ImageService est defini', () => {
            expect(imageService).toBeDefined()
        })

        it('ImageService.getImages avec aucune image', async () => {
            const images = await imageService.getImages()

            expect(images).toEqual([])
        })

        it('ImageService.createImage avec image', async () => {
            // TODO implementer la fonction createImage
            const imageCreated = await imageService.createImage()
            const images = await imageService.getImages()

            expect(images).toEqual([imageCreated])
        })
    })
})
