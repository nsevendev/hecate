import { Test, TestingModule } from '@nestjs/testing'
import { ArticleCgModule } from './article-cg.module'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { ArticleCgService } from './app/article-cg.service'
import { ArticleCgController } from './app/article-cg.controller'
import { ArticleCgRepository } from './infra/article-cg.repository'

describe('ArticleCgModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, ArticleCgModule],
    }).compile()
  })

  it('ArticleCgModule est defini avec son contructeur', () => {
    expect(new ArticleCgModule()).toBeDefined()
  })

  it('ArticleCgModule est defini dans un module', () => {
    expect(module).toBeDefined()
  })

  it('ArticleCgModule : service, repository et controller sont defini', () => {
    expect(module.get<ArticleCgService>(ArticleCgService)).toBeDefined()
    expect(module.get<ArticleCgController>(ArticleCgController)).toBeDefined()
    expect(module.get<ArticleCgRepository>(ArticleCgRepository)).toBeDefined()
  })
})
