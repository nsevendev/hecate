import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Service } from '../domaine/service.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ServiceRepository {
    constructor(
        @InjectRepository(Service)
        public repository: Repository<Service>
    ) {}
}
