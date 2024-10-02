import { Column, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project_image } from 'src/project_image/domaine/project_image.entity'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "id de l'image" })
    id: number

    @Column()
    @ApiProperty({ description: "Le chemin de l'image, relier à un S3 ou autre" })
    path: string

    @OneToOne(() => Project_image, (project_image) => project_image.image_id)
    project_id: Project_image[]
}

