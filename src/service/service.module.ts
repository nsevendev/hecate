import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Service } from './domaine/service.entity'
import { ServiceService } from './app/service.service'
import { ServiceRepository } from './infra/service.repository'
import { ImageModule } from '../image/image.module'
import { ServiceController } from './app/service.controller'

@Module({
  imports: [TypeOrmModule.forFeature([Service]), ImageModule],
  controllers: [ServiceController],
  providers: [ServiceService, ServiceRepository],
  exports: [ServiceService, ServiceRepository],
})
export class ServiveModule {}
