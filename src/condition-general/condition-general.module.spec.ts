import { ConditionGeneralModule } from './condition-general.module'
import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { ConditionGeneralService } from './app/condition-general.service'
import { ConditionGeneralController } from './app/condition-general.controller'
import { ConditionGeneralRepository } from './infra/condition-general.repository'

describe('ConditionGeneralModule', () => {
  let module: TestingModule

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, ConditionGeneralModule],
    }).compile()
  })

  it('ConditionGeneralModule est defini avec son contructeur', () => {
    expect(new ConditionGeneralModule()).toBeDefined()
  })

  it('ConditionGeneralModule est defini dans un module', () => {
    expect(module).toBeDefined()
  })

  it('ConditionGeneralModule : service, repository et controller sont defini', () => {
    expect(module.get<ConditionGeneralService>(ConditionGeneralService)).toBeDefined()
    expect(module.get<ConditionGeneralController>(ConditionGeneralController)).toBeDefined()
    expect(module.get<ConditionGeneralRepository>(ConditionGeneralRepository)).toBeDefined()
  })
})
