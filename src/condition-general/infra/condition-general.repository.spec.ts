import { ConditionGeneralRepository } from './condition-general.repository'
import { Test, TestingModule } from '@nestjs/testing'
import { ConditionGeneralModule } from '../condition-general.module'
import { DatabaseTestModule } from '../../database-test/database-test.module'
import { CreateConditionGeneralDto } from '../app/dto/create-condition-general.dto'

describe('ConditionGeneralRepository', () => {
  let module: TestingModule
  let repository: ConditionGeneralRepository

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, ConditionGeneralModule],
    }).compile()

    repository = module.get<ConditionGeneralRepository>(ConditionGeneralRepository)
  })

  it('ConditionGeneralRepository : est defini', () => {
    const repository = module.get<ConditionGeneralRepository>(ConditionGeneralRepository)
    expect(repository).toBeDefined()
  })

  it('ConditionGeneralRepository : repository parent est defini', () => {
    const repository = module.get<ConditionGeneralRepository>(ConditionGeneralRepository)
    expect(repository.repository).toBeDefined()
  })

  it("ConditionGeneralRepository.createConditionGeneral : creation d'une condition general en BDD", async () => {
    const createConditionGeneralDto = new CreateConditionGeneralDto()
    createConditionGeneralDto.title = 'title'
    createConditionGeneralDto.intro = 'intro'

    const conditionGeneral = await repository.createConditionGeneral(createConditionGeneralDto)

    expect(conditionGeneral).toBeDefined()
    expect(conditionGeneral.id).toBeDefined()
    expect(conditionGeneral.title).toBe(createConditionGeneralDto.title)
    expect(conditionGeneral.intro).toBe(createConditionGeneralDto.intro)
  })
})
