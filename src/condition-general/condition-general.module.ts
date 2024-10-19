import { Module } from '@nestjs/common'
import { ConditionGeneralService } from './app/condition-general.service'
import { ConditionGeneralRepository } from './infra/condition-general.repository'
import { ConditionGeneralController } from './app/condition-general.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConditionGeneral } from './domaine/condition-general.entity'
import { ArticleCgModule } from '../article-cg/article-cg.module'

@Module({
  imports: [TypeOrmModule.forFeature([ConditionGeneral]), ArticleCgModule],
  controllers: [ConditionGeneralController],
  providers: [ConditionGeneralService, ConditionGeneralRepository],
  exports: [ConditionGeneralService, ConditionGeneralRepository],
})
export class ConditionGeneralModule {}
