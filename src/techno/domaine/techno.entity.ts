import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project } from '../../project/domaine/project.entity'

@Entity()
export class Techno {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id de la techno' })
    id: number

    @Column()
    @ApiProperty({ description: 'Nom de la techno' })
    name: string

    @ManyToMany(() => Project, (project) => project.technos, {
        onDelete: 'CASCADE',
    })
    @JoinTable()
    projects: Project[]
}
