import { Test, TestingModule } from '@nestjs/testing'
import { ArticleCgController } from './article-cg.controller'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { ArticleCgModule } from '../article-cg.module'
import { ArticleCgService } from './article-cg.service'
import { ConditionGeneralModule } from '../../condition-general/condition-general.module'
import { ConditionGeneralService } from '../../condition-general/app/condition-general.service'
import { CreateArticleCgDto } from './dto/create-article-cg.dto'

describe('ArticleCgController', () => {
  let controller: ArticleCgController
  let service: ArticleCgService
  let conditionGeneralService: ConditionGeneralService
  let createArticleCgDto: CreateArticleCgDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ArticleCgModule, ConditionGeneralModule],
    }).compile()

    controller = module.get<ArticleCgController>(ArticleCgController)
    service = module.get<ArticleCgService>(ArticleCgService)
    conditionGeneralService = module.get<ConditionGeneralService>(ConditionGeneralService)

    createArticleCgDto = {
      title: 'title',
      description: 'description',
    }
  })

  it('ArticleCgController : est defini', () => {
    expect(controller).toBeDefined()
  })

  it('ArticleCgController.getArticleCgs : recupere tout les articles sans article', () => {
    expect(controller.getArticleCgs()).resolves.toEqual([])
  })

  it('ArticleCgController.getArticleCgById : recupere un article', async () => {
    const cg = await conditionGeneralService.createConditionGeneral({ title: 'title', intro: 'intro' })
    await conditionGeneralService.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    const cgWithArticle = await conditionGeneralService.getConditionGeneralById(cg.id)

    const article = await service.getArticleCgById(cgWithArticle.articlecgs[0].id)

    expect(article.title).toEqual(createArticleCgDto.title)
    expect(article.description).toEqual(createArticleCgDto.description)
  })

  it('ArticleCgController.updateArticleCgById : modifie un article', async () => {
    const cg = await conditionGeneralService.createConditionGeneral({ title: 'title', intro: 'intro' })
    await conditionGeneralService.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    const cgWithArticle = await conditionGeneralService.getConditionGeneralById(cg.id)

    const article = await service.getArticleCgById(cgWithArticle.articlecgs[0].id)

    const updateArticleCgDto = {
      title: 'title updated',
      description: 'description updated',
    }

    await service.updateArticleCgById(article.id, updateArticleCgDto)

    const articleUpdated = await service.getArticleCgById(cgWithArticle.articlecgs[0].id)

    expect(articleUpdated.title).toEqual(updateArticleCgDto.title)
    expect(articleUpdated.description).toEqual(updateArticleCgDto.description)
  })

  it('ArticleCgController.deleteArticleByIds : supprime un article', async () => {
    const cg = await conditionGeneralService.createConditionGeneral({ title: 'title', intro: 'intro' })
    await conditionGeneralService.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    const cgWithArticle = await conditionGeneralService.getConditionGeneralById(cg.id)

    await service.deleteArticleByIds([cgWithArticle.articlecgs[0].id])

    const cgWithArticleDeleted = await conditionGeneralService.getConditionGeneralById(cg.id)

    expect(cgWithArticleDeleted.articlecgs.length).toEqual(0)
  })
})
