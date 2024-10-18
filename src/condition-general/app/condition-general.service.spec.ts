import { Test, TestingModule } from '@nestjs/testing'
import { ConditionGeneralService } from './condition-general.service'

describe('ConditionGeneralService', () => {
  let service: ConditionGeneralService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConditionGeneralService],
    }).compile()

    service = module.get<ConditionGeneralService>(ConditionGeneralService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
