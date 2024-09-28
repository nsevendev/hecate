import { Injectable } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { ImageRepository } from '../infra/image.repository'

@Injectable()
export class ImageService extends BaseService {
    constructor(private readonly imageRepository: ImageRepository) {
        super('ImageService')
    }

    getImages = async () => {
        return await this.imageRepository.repository.find()
    }
}
