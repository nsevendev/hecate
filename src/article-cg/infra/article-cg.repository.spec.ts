import { Test, TestingModule } from '@nestjs/testing'
import { ArticleCgRepository } from './article-cg.repository'

describe('ArticleCgRepository', () => {
  let service: ArticleCgRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleCgRepository],
    }).compile()

    service = module.get<ArticleCgRepository>(ArticleCgRepository)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
