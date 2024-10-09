import { Injectable } from '@nestjs/common'
import { BaseService } from 'src/shared/base-service/base.service'
import { ServiceRepository } from '../infra/service.repository'
import { ImageService } from 'src/image/app/image.service'
import { InjectRepository } from '@nestjs/typeorm'
import { Image } from 'src/image/domaine/image.entity'
import { CreateServiceDto } from './create-service.dto'
import { UpdateServiceDto } from './update-service.dto'

@Injectable()
export class ServiceService extends BaseService {
    constructor(
        private readonly serviceRepository: ServiceRepository,
        @InjectRepository(Image)
        private readonly imageService: ImageService
    ) {
        super('ServiceService')
    }

    getServices = async () => {}

    getServiceById = async (id: number) => {}

    createService = async (createServiceDto: CreateServiceDto, file: Express.Multer.File) => {}

    updateServiceById = async (
        id: number,
        updatedServiceDto: UpdateServiceDto,
        file: Express.Multer.File
    ) => {}

    removeImageFromService = async () => {}

    deleteProjectById = async () => {}
}
