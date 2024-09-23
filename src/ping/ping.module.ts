import { Module } from '@nestjs/common'
import { PingController } from './app/ping.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PingRepository } from './infra/ping.repository'
import { PingService } from './app/ping.service'
import { Ping } from './domaine/ping.entity'
import { DataSource } from 'typeorm'

@Module({
    imports: [TypeOrmModule.forFeature([Ping])],
    controllers: [PingController],
    providers: [
        PingService,
        {
            provide: 'PING_REPOSITORY', // PingRepository ==> PING_REPOSITORY
            useFactory: (dataSource: DataSource) => new PingRepository(dataSource),
            inject: [DataSource],
        },
    ],
})
export class PingModule {}
