import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { ImageRepository } from '../infra/image.repository'
import { Image } from '../domaine/image.entity'
import { AwsS3Service, fileSchema } from '../../aws/aws-s3.service'

@Injectable()
export class ImageService extends BaseService {
  constructor(
    private readonly imageRepository: ImageRepository,
    private readonly awsS3Service: AwsS3Service
  ) {
    super('ImageService')
  }

  getImages = async () => {
    return await this.imageRepository.repository.find()
  }

  createImages = async (files: Array<Express.Multer.File>): Promise<Image[]> => {
    const images: Image[] = []

    for (const file of files) {
      const validatedFile = fileSchema.parse({
        size: file.size,
        buffer: file.buffer,
        originalname: file.originalname,
        mimetype: file.mimetype,
      })

      const s3UploadResult = await this.awsS3Service.uploadFile({ file: validatedFile })

      const image = this.imageRepository.repository.create({ path: s3UploadResult.fileKey })
      images.push(await this.imageRepository.repository.save(image))
    }

    return images
  }

  deleteImageFromStorage = async (image: Image) => {
    if (!image.path) {
      throw new BadRequestException("L'image n'a pas de chemin valide pour la suppression")
    }

    await this.awsS3Service.deleteFile({ fileKey: image.path })
  }

  // TODO : peut être à supprimer si pas d'utilité
  deleteImageById = async (id: number) => {
    const image = await this.imageRepository.repository.findOne({ where: { id } })

    if (!image) {
      throw new NotFoundException("L'Image n'existe pas")
    }

    return await this.imageRepository.repository.remove(image)
  }

  deleteImageByIdAndDeleteFromStorage = async (id: number) => {
    const image = await this.imageRepository.repository.findOne({ where: { id } })

    if (!image) {
      throw new NotFoundException("L'Image n'existe pas")
    }

    await this.deleteImageFromStorage(image)

    return await this.imageRepository.repository.remove(image)
  }
}
