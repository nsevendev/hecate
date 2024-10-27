import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { ArticleCg } from '../domaine/article-cg.entity'
import { Repository } from 'typeorm'
import { CreateArticleCgDto } from '../app/dto/create-article-cg.dto'
import { ConditionGeneral } from '../../condition-general/domaine/condition-general.entity'

@Injectable()
export class ArticleCgRepository {
  constructor(
    @InjectRepository(ArticleCg)
    public repository: Repository<ArticleCg>
  ) {}

  createArticleCg = async (createArticleCgDto: CreateArticleCgDto, cg: ConditionGeneral) => {
    const articleCg = this.repository.create({ ...createArticleCgDto, conditionGeneral: cg })
    return await this.repository.save(articleCg)
  }
}
