import { Module } from '@nestjs/common'
import { TechnoService } from './app/techno.service'
import { TechnoRepository } from './infra/techno.repository'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Techno } from './domaine/techno.entity'
import { TechnoController } from './app/techno.controller'

@Module({
    imports: [TypeOrmModule.forFeature([Techno])],
    controllers: [TechnoController],
    providers: [TechnoService, TechnoRepository],
    exports: [TechnoService, TechnoRepository],
})
export class TechnoModule {}
