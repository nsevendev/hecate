import { Test, TestingModule } from '@nestjs/testing'
import { ArticleCgRepository } from './article-cg.repository'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { ArticleCgModule } from '../article-cg.module'

describe('ArticleCgRepository', () => {
  let repository: ArticleCgRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ArticleCgModule],
    }).compile()

    repository = module.get<ArticleCgRepository>(ArticleCgRepository)
  })

  it('ArticleCgRepository : est defini', () => {
    expect(repository).toBeDefined()
  })
})
