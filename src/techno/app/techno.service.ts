import { Injectable, NotFoundException } from '@nestjs/common'
import { BaseService } from '../../shared/base-service/base.service'
import { TechnoRepository } from '../infra/techno.repository'
import { CreateTechnoDto } from './create-techno.dto'
import { In } from 'typeorm'
import { UpdateTechnoDto } from './update-techno.dto'

@Injectable()
export class TechnoService extends BaseService {
  constructor(private readonly technoRepository: TechnoRepository) {
    super('TechnoService')
  }

  getTechnos = async () => {
    return await this.technoRepository.repository.find()
  }

  getTechnoByIds = async (ids: number[]) => {
    const technos = await this.technoRepository.repository.find({
      where: { id: In(ids) },
    })

    // check si y a tout les ids demandé
    if (technos.length !== ids.length) {
      const foundIds = technos.map((techno) => techno.id)
      const missingIds = ids.filter((id) => !foundIds.includes(id))
      throw new NotFoundException(
        `Les technos avec les IDs suivants n'ont pas été trouvées : ${missingIds.join(', ')}`
      )
    }

    return technos
  }

  getTechnoById = async (id: number) => {
    const techno = await this.technoRepository.repository.findOne({ where: { id } })

    if (!techno) {
      throw new NotFoundException(`La techno avec l'id ${id} n'a pas été trouvée`)
    }

    return techno
  }

  createTechno = async (createTechnoDto: CreateTechnoDto) => {
    return await this.technoRepository.createTechno(createTechnoDto)
  }

  updateTechnoById = async (id: number, updateTechnoDto: UpdateTechnoDto) => {
    const existingTechno = await this.technoRepository.repository.findOne({ where: { id } })

    if (!existingTechno) {
      throw new NotFoundException(`La techno avec l'id ${id} n'a pas été trouvée`)
    }

    const updatedTechno = {
      ...existingTechno,
      ...updateTechnoDto,
    }

    return await this.technoRepository.repository.save(updatedTechno)
  }

  deleteTechnoById = async (id: number) => {
    const techno = await this.technoRepository.repository.findOne({ where: { id } })

    if (!techno) {
      throw new NotFoundException(`La techno avec l'id ${id} n'a pas été trouvée`)
    }

    await this.technoRepository.repository.remove(techno)
  }
}
