import { Injectable, NotFoundException } from '@nestjs/common'
import { ArticleCgRepository } from '../infra/article-cg.repository'
import { CreateArticleCgDto } from './dto/create-article-cg.dto'
import { ArticleCg } from '../domaine/article-cg.entity'
import { In } from 'typeorm'
import { UpdateArticleCgDto } from './dto/update-article-cg.dto'
import { ConditionGeneral } from '../../condition-general/domaine/condition-general.entity'
import { BaseService } from '../../shared/base-service/base.service'

@Injectable()
export class ArticleCgService extends BaseService {
  constructor(private readonly articleCgRepository: ArticleCgRepository) {
    super('ArticleCgService')
  }

  getArticleCgs = async () => {
    return await this.articleCgRepository.repository.find()
  }

  getArticleCgById = async (id: number) => {
    const articleCg = await this.articleCgRepository.repository.findOne({ where: { id } })

    if (!articleCg) {
      throw new NotFoundException("L'article n'existe pas")
    }

    return articleCg
  }

  getArticleCgsByIds = async (ids: number[]) => {
    const articleCgs = await this.articleCgRepository.repository.findBy({ id: In(ids) })

    if (articleCgs.length !== ids.length) {
      throw new NotFoundException("Un ou plusieurs articles n'existent pas")
    }

    return articleCgs
  }

  createArticleCgs = async (createArticleCgDto: CreateArticleCgDto[], cg: ConditionGeneral) => {
    const createdArticleCgs = [] as ArticleCg[]

    for (const articleCgDto of createArticleCgDto) {
      const articleCreated = await this.articleCgRepository.createArticleCg(articleCgDto, cg)
      createdArticleCgs.push(articleCreated)
    }

    return createdArticleCgs
  }

  updateArticleCgById = async (id: number, updateArticleCgDto: UpdateArticleCgDto) => {
    const articleCg = await this.getArticleCgById(id)

    const updatedArticleCg = { ...articleCg, ...updateArticleCgDto }

    return await this.articleCgRepository.repository.save(updatedArticleCg)
  }

  deleteArticleByIds = async (ids: number[]) => {
    const articleCgs = await this.getArticleCgsByIds(ids)
    return await this.articleCgRepository.repository.remove(articleCgs)
  }
}
