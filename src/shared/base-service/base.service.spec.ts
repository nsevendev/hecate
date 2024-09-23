import { BaseService } from './base.service'

describe('BaseService', () => {
    let baseService: any

    beforeEach(async () => {
        class TestBaseService extends BaseService {
            constructor() {
                super('TestBaseService')
            }

            test = () => {
                this.logger.log('test')
                return true
            }
        }

        baseService = new TestBaseService()
    })

    describe('BaseService', () => {
        it('BaseService est defini', () => {
            expect(baseService).toBeDefined()
        })

        it('BaseService utilisation de logger sans erreur', () => {
            expect(baseService.test()).toBe(true)
        })
    })
})
