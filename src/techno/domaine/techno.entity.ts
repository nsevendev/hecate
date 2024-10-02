import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { Project_techno } from 'src/project_techno/domaine/project_techno.entity'

@Entity()
export class Techno {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id de la techno' })
    id: number

    @Column()
    @ApiProperty({ description: 'Nom de la techno' })
    name: string

    @OneToMany(() => Project_techno, (project_techno) => project_techno.techno_id)

    @JoinTable()
    project: Project_techno[]
}
