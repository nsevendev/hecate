import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common'
import { PingRepository } from '../infra/ping.repository'
import { CreatePingDto } from './create-ping.dto'
import { BaseService } from '../../shared/base-service/base.service'

@Injectable()
export class PingService extends BaseService {
    constructor(
        @Inject('PING_REPOSITORY')
        private readonly pingRepository: PingRepository
    ) {
        super('PingService')
    }

    getFirstPing = async () => {
        const [ping] = await this.pingRepository.findFirst()

        if (!ping) {
            throw new NotFoundException('Pas de ping trouvé')
        }

        return ping
    }

    createPing = async (createPingDto: CreatePingDto) => {
        const [pingExist] = await this.pingRepository.findFirst()

        if (pingExist) {
            throw new ConflictException('Impossible de creer le ping, Un ping existe déjà')
        }

        const newPing = this.pingRepository.create(createPingDto)
        return await this.pingRepository.save(newPing)
    }
}
