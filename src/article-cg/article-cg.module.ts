import { Module } from '@nestjs/common'
import { ArticleCgRepository } from './infra/article-cg.repository'
import { ArticleCgController } from './app/article-cg.controller'
import { ArticleCgService } from './app/article-cg.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ArticleCg } from './domaine/article-cg.entity'

@Module({
  imports: [TypeOrmModule.forFeature([ArticleCg])],
  controllers: [ArticleCgController],
  providers: [ArticleCgService, ArticleCgRepository],
  exports: [ArticleCgService, ArticleCgRepository],
})
export class ArticleCgModule {}
