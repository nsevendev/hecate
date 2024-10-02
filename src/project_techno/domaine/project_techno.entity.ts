import { Column, Entity, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from 'src/project/domaine/project.entity'
import { Techno } from 'src/techno/domaine/techno.entity'

@Entity()
export class Project_techno {
    @PrimaryGeneratedColumn()
    @ApiProperty({description: "id de project_techno" })
    id: number
    
    @ManyToOne(() => Project, (project) => project.technos_id, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "project_id"})
    @ApiProperty({ description: "id de la techno associée" })
    project_id: Project
    
    
    @ManyToOne(() => Techno, (techno) => techno.project_id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "techno_id"})
    @ApiProperty({ description: "id du projet associé"})
    technos_id : Techno
}