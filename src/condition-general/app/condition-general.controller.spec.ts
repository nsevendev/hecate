import { Test, TestingModule } from '@nestjs/testing'
import { ConditionGeneralController } from './condition-general.controller'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { ConditionGeneralModule } from '../condition-general.module'
import { CreateConditionGeneralDto } from './dto/create-condition-general.dto'
import { CreateArticleCgDto } from '../../article-cg/app/dto/create-article-cg.dto'
import { NotFoundException } from '@nestjs/common'
import { ArticleCgService } from '../../article-cg/app/article-cg.service'

describe('ConditionGeneralController', () => {
  let controller: ConditionGeneralController
  let createCgDto: CreateConditionGeneralDto
  let createArticleCgDto: CreateArticleCgDto
  let articleCgService: ArticleCgService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ConditionGeneralModule],
    }).compile()

    controller = module.get<ConditionGeneralController>(ConditionGeneralController)
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

  it('ConditionGeneralController : est defini', () => {
    expect(controller).toBeDefined()
  })

  it('ConditionGeneralController.createConditionGeneral : creation simple sans article', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)

    expect(cg).toBeDefined()
    expect(cg.title).toBe(createCgDto.title)
    expect(cg.intro).toBe(createCgDto.intro)
  })

  it('ConditionGeneralController.getConditionGenerals : recupere toute les CGS', async () => {
    await controller.createConditionGeneral(createCgDto)
    const cgs = await controller.getConditionGenerals()

    expect(cgs).toBeDefined()
    expect(cgs.length).toBe(1)
  })

  it('ConditionGeneralController.getConditionGeneralById : recupere un CG avec id', async () => {
    const newCg = await controller.createConditionGeneral(createCgDto)
    const cg = await controller.getConditionGeneralById(newCg.id)

    expect(cg).toBeDefined()
    expect(cg.title).toBe(createCgDto.title)
  })

  it("ConditionGeneralController.getConditionGeneralById : recupere une condition avec un id qui n'existe pas", async () => {
    await controller.createConditionGeneral(createCgDto)

    await expect(controller.getConditionGeneralById(999)).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralController.updateConditionGeneralById : met à jour une condition avec son ID', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    const cgUpdated = await controller.updateConditionGeneralById(cg.id, { title: 'new title' })

    expect(cgUpdated).toBeDefined()
    expect(cgUpdated.title).toBe('new title')
    expect(cgUpdated.intro).toBe(createCgDto.intro)
  })

  it("ConditionGeneralController.updateConditionGeneralById : met à jour une condition avec un ID qu qui n'existe pas", async () => {
    await controller.createConditionGeneral(createCgDto)

    await expect(controller.updateConditionGeneralById(9999, { title: 'new title' })).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralController.addArticlesToConditionGeneralById : creer et ajoute un article à la condition', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    const cgWithArticle = await controller.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(cgWithArticle).toBeDefined()
    expect(cgWithArticle.articlecgs).toBeDefined()
    expect(cgWithArticle.articlecgs.length).toBe(1)
    expect(cgWithArticle.articlecgs[0].title).toBe('title article')
    expect(cgWithArticle.articlecgs[0].description).toBe('description article')
  })

  it('ConditionGeneralController.addArticlesToConditionGeneralById : creer et ajoute un article à la condition avec un ID inexistant', async () => {
    await controller.createConditionGeneral(createCgDto)

    await expect(controller.addArticlesToConditionGeneralById(999, [createArticleCgDto])).rejects.toThrow(
      new NotFoundException("La condition generale n'existe pas")
    )
  })

  it('ConditionGeneralController.deleteArticlesFromConditionGeneralById : supprime un article de la condition', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    const article = await controller.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(article).toBeDefined()
    expect(article.articlecgs).toBeDefined()
    expect(article.articlecgs.length).toBe(1)

    const cgWithoutArticle = await controller.deleteArticlesFromConditionGeneralById(cg.id, [
      article.articlecgs[0].id,
    ])

    expect(cgWithoutArticle).toBeDefined()
    expect(cgWithoutArticle.articlecgs).toBeDefined()
    expect(cgWithoutArticle.articlecgs.length).toBe(0)
  })

  it('ConditionGeneralController.deleteArticlesFromConditionGeneralById : supprime un article de la condition avec un ID inexistant', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    const article = await controller.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    expect(article).toBeDefined()
    expect(article.articlecgs).toBeDefined()
    expect(article.articlecgs.length).toBe(1)

    await expect(
      controller.deleteArticlesFromConditionGeneralById(999, [article.articlecgs[0].id])
    ).rejects.toThrow(new NotFoundException("La condition generale n'existe pas"))
  })

  it('ConditionGeneralController.deleteConditionGeneralById : supprimer une condition avec un ID', async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    const cgs1 = await controller.getConditionGenerals()

    expect(cgs1).toBeDefined()
    expect(cgs1.length).toBe(1)

    await controller.deleteConditionGeneralById(cg.id)

    const cgs2 = await controller.getConditionGenerals()

    expect(cgs2).toBeDefined()
    expect(cgs2.length).toBe(0)
  })

  it("ConditionGeneralController.deleteConditionGeneralById : supprime une condition avec un ID et supprime l'article", async () => {
    const cg = await controller.createConditionGeneral(createCgDto)
    await controller.addArticlesToConditionGeneralById(cg.id, [createArticleCgDto])

    const cgs1 = await controller.getConditionGenerals()

    expect(cgs1).toBeDefined()
    expect(cgs1.length).toBe(1)
    expect(cgs1[0].articlecgs).toBeDefined()
    expect(cgs1[0].articlecgs.length).toBe(1)

    await controller.deleteConditionGeneralById(cg.id)

    const cgs2 = await controller.getConditionGenerals()
    const articleCgs = await articleCgService.getArticleCgs()

    expect(cgs2).toBeDefined()
    expect(cgs2.length).toBe(0)

    expect(articleCgs).toBeDefined()
    expect(articleCgs.length).toBe(0)
  })
})
