import { Test, TestingModule } from '@nestjs/testing'
import { ArticleCgService } from './article-cg.service'
import { ArticleCgModule } from '../article-cg.module'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { ConditionGeneralService } from '../../condition-general/app/condition-general.service'
import { CreateConditionGeneralDto } from '../../condition-general/app/dto/create-condition-general.dto'
import { CreateArticleCgDto } from './dto/create-article-cg.dto'
import { ConditionGeneralModule } from '../../condition-general/condition-general.module'
import { NotFoundException } from '@nestjs/common'

describe('ArticleCgService', () => {
  let service: ArticleCgService
  let serviceConditionGeneral: ConditionGeneralService
  let createConditionGeneralDto: CreateConditionGeneralDto
  let createArticleCgDto: CreateArticleCgDto

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ArticleCgModule, ConditionGeneralModule],
    }).compile()

    service = module.get<ArticleCgService>(ArticleCgService)
    serviceConditionGeneral = module.get<ConditionGeneralService>(ConditionGeneralService)

    createConditionGeneralDto = {
      title: 'title',
      intro: 'intro',
    }

    createArticleCgDto = {
      title: 'title',
      description: 'description',
    }
  })

  it('ArticleCgService : est defini', () => {
    expect(service).toBeDefined()
  })

  it("ArticleCgService.createArticle : creation d'article avec une condition genereal", async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    const articleCg = await service.createArticleCgs([createArticleCgDto], conditionGeneral)

    expect(articleCg).toBeDefined()
    expect(articleCg[0].title).toBe(createArticleCgDto.title)
    expect(articleCg[0].description).toBe(createArticleCgDto.description)
    expect(articleCg[0].conditionGeneral).toBeDefined()
  })

  it('ArticleCgService.getArticleCgs : recupere tous les articles', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const articleCgs = await service.getArticleCgs()

    expect(articleCgs).toBeDefined()
    expect(articleCgs.length).toBe(1)
    expect(articleCgs[0].title).toBe(createArticleCgDto.title)
    expect(articleCgs[0].description).toBe(createArticleCgDto.description)
  })

  it('ArticleCgService.getArticleCgById : recupere un article par id', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    const articleCg = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const articleCgById = await service.getArticleCgById(articleCg[0].id)

    expect(articleCgById).toBeDefined()
    expect(articleCgById.title).toBe(createArticleCgDto.title)
    expect(articleCgById.description).toBe(createArticleCgDto.description)
  })

  it('ArticleCgService.getArticleCgById : recupere un article par un id qui existe pas', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    await service.createArticleCgs([createArticleCgDto], conditionGeneral)

    await expect(service.getArticleCgById(999)).rejects.toThrow(
      new NotFoundException("L'article n'existe pas")
    )
  })

  it('ArticleCgService.getArticleCgByIds : recupere des articles avec des ids', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    const articleCg1 = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const articleCg2 = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const articleCgs = await service.getArticleCgsByIds([articleCg1[0].id, articleCg2[0].id])

    expect(articleCgs).toBeDefined()
    expect(articleCgs.length).toBe(2)
    expect(articleCgs[0].title).toBe(createArticleCgDto.title)
    expect(articleCgs[0].description).toBe(createArticleCgDto.description)
    expect(articleCgs[1].title).toBe(createArticleCgDto.title)
    expect(articleCgs[1].description).toBe(createArticleCgDto.description)
  })

  it('ArticleCgService.getArticleCgByIds : recupere des articles avec des ids qui existe pas', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    await service.createArticleCgs([createArticleCgDto], conditionGeneral)

    await expect(service.getArticleCgsByIds([999, 999])).rejects.toThrow(
      new NotFoundException("Un ou plusieurs articles n'existent pas")
    )
  })

  it('ArticleCgService.updateArticleCgById : modifie un article par id', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    const articleCg = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const updateArticleCgDto = {
      title: 'title update',
      description: 'description update',
    }
    const articleCgUpdated = await service.updateArticleCgById(articleCg[0].id, updateArticleCgDto)

    expect(articleCgUpdated).toBeDefined()
    expect(articleCgUpdated.title).toBe(updateArticleCgDto.title)
    expect(articleCgUpdated.description).toBe(updateArticleCgDto.description)
  })

  it('ArticleCgService.updateArticleCgById : modifie un article par id qui existe pas', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const updateArticleCgDto = {
      title: 'title update',
      description: 'description update',
    }

    await expect(service.updateArticleCgById(999, updateArticleCgDto)).rejects.toThrow(
      new NotFoundException("L'article n'existe pas")
    )
  })

  it('ArticleCgService.deleteArticleByIds : supprime des articles par ids', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    const articleCg1 = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    const articleCg2 = await service.createArticleCgs([createArticleCgDto], conditionGeneral)
    await service.deleteArticleByIds([articleCg1[0].id, articleCg2[0].id])

    const articleCgs = await service.getArticleCgs()

    expect(articleCgs).toBeDefined()
    expect(articleCgs.length).toBe(0)
  })

  it('ArticleCgService.deleteArticleByIds : supprime des articles par ids qui existe pas', async () => {
    const conditionGeneral = await serviceConditionGeneral.createConditionGeneral(createConditionGeneralDto)
    await service.createArticleCgs([createArticleCgDto], conditionGeneral)

    await expect(service.deleteArticleByIds([999, 999])).rejects.toThrow(
      new NotFoundException("Un ou plusieurs articles n'existent pas")
    )
  })
})
