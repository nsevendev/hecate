import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './domaine/image.entity'
import { ImageService } from './app/image.service'
import { ImageRepository } from './infra/image.repository'
import { AwsS3Service } from '../aws/aws-s3.service'

describe('ImageModule', () => {
  let module: TestingModule
  let imageService: ImageService
  let mockFile: (filename: string) => Express.Multer.File

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [
        DatabaseTestModule, // Utilisation bdd pour les tests
        TypeOrmModule.forFeature([Image]),
      ],
      providers: [ImageService, ImageRepository, AwsS3Service],
    }).compile()

    imageService = module.get<ImageService>(ImageService)

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
    it('ImageService est defini', () => {
      expect(imageService).toBeDefined()
    })

    it('ImageService.getImages sans image : retourne tableau vide', async () => {
      const images = await imageService.getImages()

      expect(images).toEqual([])
    })

    it('ImageService.getImages avec image : recupere toutes les images', async () => {
      const imageCreated = await imageService.createImages([mockFile('image.png')])
      const images = await imageService.getImages()

      expect(images).toEqual(imageCreated)

      // suppression de l'image dans le S3 pour non stockage des test
      await imageService.deleteImageFromStorage(imageCreated[0])
    })

    it('ImageService.createImages avec 1 image mocker : creer image dans BDD + S3', async () => {
      const imageCreated = await imageService.createImages([mockFile('image.png')])

      expect(imageCreated[0].id).toEqual(1)

      // suppression de l'image dans le S3 pour non stockage des test
      await imageService.deleteImageFromStorage(imageCreated[0])
    })

    it('ImageService.deleteImage avec 1 image mocker : image supprimer de la BDD + S3', async () => {
      const imageCreated = await imageService.createImages([mockFile('image.png')])
      const imageDeleted = await imageService.deleteImageByIdAndDeleteFromStorage(imageCreated[0].id)

      const images = await imageService.getImages()

      // undefined car l'image a été supprimée
      expect(imageDeleted.id).toEqual(undefined)
      expect(images).toEqual([])
    })
  })
})
