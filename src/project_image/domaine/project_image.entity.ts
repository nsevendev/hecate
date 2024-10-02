import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from 'src/project/domaine/project.entity'
import { Image } from 'src/image/domaine/image.entity'

@Entity()
export class Project_image {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "id de project_image" })
    id: number

    @Column()
    @ApiProperty({ description: "id de l'image' associée" })
    image_id: number

    @Column()
    @ApiProperty({ description: "id du projet associé" })
    project_id: number

    @ManyToOne(() => Project, (project) => project.images, {
        onDelete: 'CASCADE',
    })

    @ManyToOne(() => Image, (image) => image.projects, {
        onDelete: 'CASCADE'
    })

    project: Project
    image : Image
}