import { CreatePingDto } from 'src/ping/app/create-ping.dto'
import { PingService } from 'src/ping/app/ping.service'
import { PingRepository } from 'src/ping/infra/ping.repository'
import { BaseService } from 'src/shared/base-service/base.service'

export class PingSeed extends BaseService {
    constructor(
        private readonly pingRepository: PingRepository,
        private readonly pingService: PingService
    ) {
        super('PingSeed')
    }

    run = async () => {
        try {
            this.logger.log('Run recuperation du premier ping')
            const pings = await this.pingRepository.repository.find()
            this.logger.log('Ping reçus : ', JSON.stringify(pings))

            if (pings.length > 0) {
                this.logger.log('Un ping existe deja, pas de création de ping')
                return pings[0]
            }

            this.logger.log("Creation d'un ping DTO")
            const pingDto = new CreatePingDto()
            pingDto.status = 200
            pingDto.value = 'Pin est OK'

            this.logger.log("Creation d'un ping")
            const ping = await this.pingService.createPing(pingDto)
            this.logger.log('Ping cree : ', JSON.stringify(ping))

            return ping
        } catch (error) {
            this.logger.log('Une Erreur est survenu au moment de la creation du ping', error)
        }
    }
}
