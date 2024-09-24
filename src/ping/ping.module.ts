import { Module } from '@nestjs/common'
import { PingController } from './app/ping.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PingRepository } from './infra/ping.repository'
import { PingService } from './app/ping.service'
import { Ping } from './domaine/ping.entity'

@Module({
    imports: [TypeOrmModule.forFeature([Ping])],
    controllers: [PingController],
    providers: [PingService, PingRepository],
    exports: [PingService, PingRepository],
})
export class PingModule {}
