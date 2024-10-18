import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Techno } from '../domaine/techno.entity'
import { Repository } from 'typeorm'
import { CreateTechnoDto } from '../app/create-techno.dto'

@Injectable()
export class TechnoRepository {
  constructor(
    @InjectRepository(Techno)
    public repository: Repository<Techno>
  ) {}

  createTechno = async (createTechnoDto: CreateTechnoDto) => {
    const techno = this.repository.create(createTechnoDto)
    return await this.repository.save(techno)
  }
}
