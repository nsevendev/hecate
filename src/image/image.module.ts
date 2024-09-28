import { Module } from '@nestjs/common'
import { ImageService } from './app/image.service'
import { ImageRepository } from './infra/image.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './domaine/image.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    providers: [ImageService, ImageRepository],
    exports: [ImageService, ImageRepository],
})
export class ImageModule {}
