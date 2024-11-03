import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseTestModule } from '../database-test/database-test.module'
import { AuthModule } from './auth.module'

describe('AuthService', () => {
  let module: TestingModule

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [DatabaseTestModule, AuthModule],
    }).compile()
  })

  it('should be defined', () => {
    expect(module).toBeDefined()
  })
})
