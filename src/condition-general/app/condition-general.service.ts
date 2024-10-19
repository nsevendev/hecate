import { Injectable, NotFoundException } from '@nestjs/common'
import { ConditionGeneralRepository } from '../infra/condition-general.repository'
import { BaseService } from '../../shared/base-service/base.service'
import { CreateConditionGeneralDto } from './dto/create-condition-general.dto'
import { UpdateConditionGeneralDto } from './dto/update-condition-general.dto'
import { CreateArticleCgDto } from '../../article-cg/app/dto/create-article-cg.dto'
import { ArticleCgService } from '../../article-cg/app/article-cg.service'

@Injectable()
export class ConditionGeneralService extends BaseService {
  constructor(
    private readonly conditionGeneralRepository: ConditionGeneralRepository,
    private readonly articleCgService: ArticleCgService
  ) {
    super('ConditionGeneralService')
  }

  getConditionGenerals = async () => {
    return await this.conditionGeneralRepository.repository.find()
  }

  getConditionGeneralById = async (id: number) => {
    const cg = await this.conditionGeneralRepository.repository.findOne({
      where: { id },
      relations: ['articlecgs'],
    })

    if (!cg) {
      throw new NotFoundException("La condition generale n'existe pas")
    }

    return cg
  }

  createConditionGeneral = async (createConditionGeneral: CreateConditionGeneralDto) => {
    return await this.conditionGeneralRepository.createConditionGeneral(createConditionGeneral)
  }

  updateConditionGeneralById = async (id: number, updateConditionGeneral: UpdateConditionGeneralDto) => {
    const cg = await this.getConditionGeneralById(id)

    const updateCg = { ...cg, ...updateConditionGeneral }

    return await this.conditionGeneralRepository.repository.save(updateCg)
  }

  addArticlesToConditionGeneralById = async (id: number, createArticleCgDto: CreateArticleCgDto[]) => {
    const cg = await this.getConditionGeneralById(id)

    const articleCgs = await this.articleCgService.createArticleCgs(createArticleCgDto, cg)

    cg.articlecgs = [...(cg.articlecgs || []), ...articleCgs]

    return await this.conditionGeneralRepository.repository.save(cg)
  }

  deleteArticlesFromConditionGeneralById = async (id: number, articleCgIds: number[]) => {
    await this.articleCgService.deleteArticleByIds(articleCgIds)

    //const updatedCg = await this.getConditionGeneralById(id)

    return await this.getConditionGeneralById(id)
  }

  deleteConditionGeneralById = async (id: number) => {
    const cg = await this.getConditionGeneralById(id)

    return await this.conditionGeneralRepository.repository.remove(cg)
  }
}
