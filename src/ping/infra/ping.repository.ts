import { DataSource, Repository } from 'typeorm'
import { Ping } from '../domaine/ping.entity'

export class PingRepository extends Repository<Ping> {
    constructor(private dataSource: DataSource) {
        super(Ping, dataSource.createEntityManager())
    }

    findFirst = async () => {
        return await this.find({
            order: { id: 'ASC' },
            take: 1,
        })
    }
}
