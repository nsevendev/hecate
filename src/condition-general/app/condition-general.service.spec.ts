import { Test, TestingModule } from '@nestjs/testing'
import { ConditionGeneralService } from './condition-general.service'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { ConditionGeneralModule } from '../condition-general.module'
import { CreateConditionGeneralDto } from './dto/create-condition-general.dto'
import { CreateArticleCgDto } from '../../article-cg/app/dto/create-article-cg.dto'
import { NotFoundException } from '@nestjs/common'
import { ArticleCgService } from '../../article-cg/app/article-cg.service'

describe('ConditionGeneralService', () => {
  let service: ConditionGeneralService
  let createCgDto: CreateConditionGeneralDto
  let createArticleCgDto: CreateArticleCgDto
  let articleCgService: ArticleCgService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ConditionGeneralModule],
    }).compile()

    service = module.get<ConditionGeneralService>(ConditionGeneralService)
    articleCgService = module.get<ArticleCgService>(ArticleCgService)

    createCgDto = {
      title: 'title',
      intro: 'intro',
    }

    createArticleCgDto = {
      title: 'title article',
      description: 'description article',
    }
  })

  it('ConditionGeneralService : est defini', () => {
    expect(service).toBeDefined()
  })

  it('ConditionGeneralService.createConditionGeneral : creation simple sans article', async () => {
    const cg = await service.createConditionGeneral(createCgDto)

    expect(cg).toBeDefined()
    expect(cg.title).toBe(createCgDto.title)
    expect(cg.intro).toBe(createCgDto.intro)
  })

  it('ConditionGeneralService.getConditionGenerals : recupere toutes les conditions', async () => {
    await service.createConditionGeneral(createCgDto)
    await service.createConditionGeneral(createCgDto)
    const cgs = await service.getConditionGenerals()

    expect(cgs).toBeDefined()
    expect(cgs.length).toBe(2)
  })

  it('ConditionGeneralService.getConditionGeneralById : recupere une condition par son id', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const cgById = await service.getConditionGeneralById(cg.id)

    expect(cgById).toBeDefined()
    expect(cgById.title).toBe(createCgDto.title)
    expect(cgById.intro).toBe(createCgDto.intro)
  })

  it("ConditionGeneralService.getConditionGeneralById : recupere une condition avec un id qui n'existe pas", async () => {
    await service.createConditionGeneral(createCgDto)

    await expect(service.getConditionGeneralById(999)).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralService.updateConditionGeneralById : met à jour une condition avec son ID', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const cgUpdated = await service.updateConditionGeneralById(cg.id, { title: 'new title' })

    expect(cgUpdated).toBeDefined()
    expect(cgUpdated.title).toBe('new title')
    expect(cgUpdated.intro).toBe(createCgDto.intro)
  })

  it("ConditionGeneralService.updateConditionGeneralById : met à jour une condition avec un ID qu qui n'existe pas", async () => {
    await service.createConditionGeneral(createCgDto)

    await expect(service.updateConditionGeneralById(9999, { title: 'new title' })).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralService.addArticlesToConditionGeneralById : creer et ajoute un article à la condition', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const cgWithArticle = await service.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(cgWithArticle).toBeDefined()
    expect(cgWithArticle.articlecgs).toBeDefined()
    expect(cgWithArticle.articlecgs.length).toBe(1)
    expect(cgWithArticle.articlecgs[0].title).toBe('title article')
    expect(cgWithArticle.articlecgs[0].description).toBe('description article')
  })

  it('ConditionGeneralService.addArticlesToConditionGeneralById : creer et ajoute un article à la condition avec un ID inexistant', async () => {
    await service.createConditionGeneral(createCgDto)

    await expect(service.addArticlesToConditionGeneralById(999, [createArticleCgDto])).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralService.addArticlesToConditionGeneralById : creer et ajoute plusieurs article à la condition', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const cgWithArticle = await service.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(cgWithArticle).toBeDefined()
    expect(cgWithArticle.articlecgs).toBeDefined()
    expect(cgWithArticle.articlecgs.length).toBe(1)
    expect(cgWithArticle.articlecgs[0].title).toBe('title article')
    expect(cgWithArticle.articlecgs[0].description).toBe('description article')

    const cgWithArticleSecond = await service.addArticlesToConditionGeneralById(cg.id, [
      {
        title: 'title article 2',
        description: 'description article 2',
      },
    ])

    expect(cgWithArticleSecond).toBeDefined()
    expect(cgWithArticleSecond.articlecgs).toBeDefined()
    expect(cgWithArticleSecond.articlecgs.length).toBe(2)
    expect(cgWithArticleSecond.articlecgs[1].title).toBe('title article 2')
    expect(cgWithArticleSecond.articlecgs[1].description).toBe('description article 2')
  })

  it('ConditionGeneralService.deleteArticlesFromConditionGeneralById : supprime un article de la condition', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const article = await service.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(article).toBeDefined()
    expect(article.articlecgs).toBeDefined()
    expect(article.articlecgs.length).toBe(1)

    const cgWithoutArticle = await service.deleteArticlesFromConditionGeneralById(cg.id, [
      article.articlecgs[0].id,
    ])

    expect(cgWithoutArticle).toBeDefined()
    expect(cgWithoutArticle.articlecgs).toBeDefined()
    expect(cgWithoutArticle.articlecgs.length).toBe(0)
  })

  it('ConditionGeneralService.deleteArticlesFromConditionGeneralById : supprime un article de la condition avec un ID inexistant', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const article = await service.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(article).toBeDefined()
    expect(article.articlecgs).toBeDefined()
    expect(article.articlecgs.length).toBe(1)

    await expect(
      service.deleteArticlesFromConditionGeneralById(999, [article.articlecgs[0].id])
    ).rejects.toThrow(new NotFoundException("La condition generale n'existe pas"))
  })

  it('ConditionGeneralService.deleteConditionGeneralById : supprimer une condition avec un ID', async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    const cgs1 = await service.getConditionGenerals()

    expect(cgs1).toBeDefined()
    expect(cgs1.length).toBe(1)

    await service.deleteConditionGeneralById(cg.id)

    const cgs2 = await service.getConditionGenerals()

    expect(cgs2).toBeDefined()
    expect(cgs2.length).toBe(0)
  })

  it("ConditionGeneralService.deleteConditionGeneralById : supprime une condition avec un ID et supprime l'article", async () => {
    const cg = await service.createConditionGeneral(createCgDto)
    await service.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    const cgs1 = await service.getConditionGenerals()

    expect(cgs1).toBeDefined()
    expect(cgs1.length).toBe(1)
    expect(cgs1[0].articlecgs).toBeDefined()
    expect(cgs1[0].articlecgs.length).toBe(1)

    await service.deleteConditionGeneralById(cg.id)

    const cgs2 = await service.getConditionGenerals()
    const articleCgs = await articleCgService.getArticleCgs()

    expect(cgs2).toBeDefined()
    expect(cgs2.length).toBe(0)

    expect(articleCgs).toBeDefined()
    expect(articleCgs.length).toBe(0)
  })
})
