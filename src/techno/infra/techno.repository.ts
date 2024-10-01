import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Techno } from '../domaine/techno.entity'
import { Repository } from 'typeorm'

@Injectable()
export class TechnoRepository {
    constructor(
        @InjectRepository(Techno)
        public repository: Repository<Techno>
    ) {}
}
