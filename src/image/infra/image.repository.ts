import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Image } from '../domaine/image.entity'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ImageRepository {
    constructor(
        @InjectRepository(Image)
        public repository: Repository<Image>
    ) {}
}
