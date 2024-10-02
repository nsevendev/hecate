import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project_techno } from 'src/project_techno/domaine/project_techno.entity'
import { Project_image } from 'src/project_image/domaine/project_image.entity'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "id du projet" })
    id: number

    @Column()
    @ApiProperty({ description: "nom du projet" })
    name: string

    @Column()
    @ApiProperty({ description: "description du projet" })
    description: string

    @OneToMany(() => Project_techno, (project_techno) => project_techno.project_id, {
        cascade: true
    })
    technos_id: Project_techno[]

    @OneToMany(() => Project_image, (project_image) => project_image.project_id, {
        cascade: true
    })
    images_id: Project_image

}