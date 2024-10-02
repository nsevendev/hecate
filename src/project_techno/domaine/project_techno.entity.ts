import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from 'src/project/domaine/project.entity'
import { Techno } from 'src/techno/domaine/techno.entity'

@Entity()
export class Project_techno {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "id de project_techno" })
    id: number

    @Column()
    @ApiProperty({ description: "id de la techno associée" })
    techno_id: number

    @Column()
    @ApiProperty({ description: "id du projet associé"})
    project_id: number

    @ManyToOne(() => Project, (project) => project.technos, {
        onDelete: 'CASCADE',
    })

    @ManyToOne(() => Techno, (techno) => techno.projects, {
        onDelete: 'CASCADE'
    })

    project: Project
    techno : Techno
}