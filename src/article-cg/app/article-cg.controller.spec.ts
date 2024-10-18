import { Test, TestingModule } from '@nestjs/testing';
import { ArticleCgController } from './article-cg.controller';

describe('ArticleCgController', () => {
  let controller: ArticleCgController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleCgController],
    }).compile();

    controller = module.get<ArticleCgController>(ArticleCgController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
