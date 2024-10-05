import { Injectable } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { TechnoRepository } from '../infra/techno.repository'
import { CreateTechnoDto } from './create-techno.dto'

@Injectable()
export class TechnoService extends BaseService {
    constructor(private readonly technoRepository: TechnoRepository) {
        super('TechnoService')
    }

    getTechnos = async () => {
        return await this.technoRepository.repository.find()
    }

    createTechno = async (createTechnoDto: CreateTechnoDto) => {
        const techno = await this.technoRepository.repository.create({ ...createTechnoDto })
        return await this.technoRepository.repository.save(techno)
    }
}
