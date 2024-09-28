import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './domaine/image.entity'
import { ImageService } from './app/image.service'
import { ImageRepository } from './infra/image.repository'

describe('ImageModule', () => {
    let imageService: ImageService
    let imageRepository: ImageRepository
    let module: TestingModule

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

    describe('Service', () => {
        it('ImageService est defini', () => {
            expect(imageService).toBeDefined()
        })

        it('ImageService.getImages avec aucune image', async () => {
            const images = await imageService.getImages()
            expect(images).toEqual([])
        })

        it('ImageService.getImages avec image', async () => {
            // TODO : creer le fonction createImage dans le service
            const imageCreated = await imageService.createImage()
            const images = await imageService.getImages()
            expect(images).toEqual([imageCreated])
        })
    })
})
