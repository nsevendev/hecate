import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ConditionGeneral } from '../domaine/condition-general.entity'
import { CreateConditionGeneralDto } from '../app/dto/create-condition-general.dto'

@Injectable()
export class ConditionGeneralRepository {
  constructor(
    @InjectRepository(ConditionGeneral)
    public repository: Repository<ConditionGeneral>
  ) {}

  createConditionGeneral = async (createConditionGeneralDto: CreateConditionGeneralDto) => {
    const newConditionGeneral = this.repository.create(createConditionGeneralDto)
    return await this.repository.save(newConditionGeneral)
  }
}
