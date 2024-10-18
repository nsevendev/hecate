import { Test, TestingModule } from '@nestjs/testing'
import { ConditionGeneralController } from './condition-general.controller'

describe('ConditionGeneralController', () => {
  let controller: ConditionGeneralController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConditionGeneralController],
    }).compile()

    controller = module.get<ConditionGeneralController>(ConditionGeneralController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
