import { Injectable } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { TechnoRepository } from '../infra/techno.repository'

@Injectable()
export class TechnoService extends BaseService {
    constructor(private readonly technoRepository: TechnoRepository) {
        super('TechnoService')
    }

    getTechnos = async () => {
        return await this.technoRepository.repository.find()
    }
}
