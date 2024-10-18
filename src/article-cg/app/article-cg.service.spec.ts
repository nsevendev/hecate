import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCgService } from './article-cg.service';

describe('ArticleCgService', () => {
  let service: ArticleCgService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticleCgService],
    }).compile();

    service = module.get<ArticleCgService>(ArticleCgService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
