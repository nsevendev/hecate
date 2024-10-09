import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ProjectImage } from '../../project-image/domaine/project-image.entity'
import { Service } from 'src/service/domaine/service.entity'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "id de l'image" })
    id: number

    @Column()
    @ApiProperty({ description: "Le chemin de l'image, relier à un S3 ou autre" })
    path: string

    @OneToOne(() => ProjectImage, (projectImage) => projectImage.image, {
        nullable: true,
    })
    projectImage?: ProjectImage

    @OneToOne(() => Service, (service) => service.image, {
        nullable: true,
    })
    service?: Service
}
