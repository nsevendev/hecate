import { Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from 'src/project/domaine/project.entity'
import { Image } from 'src/image/domaine/image.entity'

@Entity({ name: 'project_image' })
export class ProjectImage {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id de project_image' })
    id: number

    @OneToOne(() => Image, (image) => image.projectImage, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'image_id' })
    @ApiProperty({ description: "ID de l'image associée" })
    image: Image

    @ManyToOne(() => Project, (project) => project.projectImage, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: 'project_id' })
    @ApiProperty({ description: 'ID du projet associé' })
    project: Project
}
