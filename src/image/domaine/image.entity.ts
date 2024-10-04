import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ProjectImage } from 'src/project-image/domaine/project-image.entity'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "id de l'image" })
    id: number

    @Column()
    @ApiProperty({ description: "Le chemin de l'image, relier à un S3 ou autre" })
    path: string

    @OneToOne(() => ProjectImage, (projectImage) => projectImage.image, {
        cascade: true,
    })
    projectImage: ProjectImage
}
