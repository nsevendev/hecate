import { Module } from '@nestjs/common'
import { ImageService } from './app/image.service'
import { ImageRepository } from './infra/image.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Image } from './domaine/image.entity'
import { AwsS3Service } from '../aws/aws-s3.service'

@Module({
    imports: [TypeOrmModule.forFeature([Image])],
    providers: [ImageService, ImageRepository, AwsS3Service],
    exports: [ImageService, ImageRepository],
})
export class ImageModule {}
