import { Repository } from 'typeorm'
import { Ping } from '../domaine/ping.entity'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class PingRepository {
    constructor(
        @InjectRepository(Ping)
        public repository: Repository<Ping>
    ) {}

    findFirst = async () => {
        return await this.repository.find({
            order: { id: 'ASC' },
            take: 1,
        })
    }
}
