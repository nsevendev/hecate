import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from 'src/project/domaine/project.entity'
import { Image } from 'src/image/domaine/image.entity'

@Entity()
export class Project_image {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "id de project_image" })
    id: number

    @ManyToOne(() => Project, (project) => project.images_id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "project_id" })
    @ApiProperty({ description: "id du projet associé" })
    image_id : Image
    
    
    @OneToOne(() => Image, (image) => image.project_id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "image_id" })
    @ApiProperty({ description: "id de l'image' associée" })
    project_id: Project

}