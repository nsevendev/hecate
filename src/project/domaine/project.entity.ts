import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ProjectImage } from '../../project-image/domaine/project-image.entity'
import { Techno } from '../../techno/domaine/techno.entity'

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id du projet' })
    id: number

    @Column()
    @ApiProperty({ description: 'nom du projet' })
    name: string

    @Column()
    @ApiProperty({ description: 'description du projet' })
    description: string

    @ManyToMany(() => Techno, (techno) => techno.projects, {
        onDelete: 'CASCADE',
        eager: true,
    })
    @JoinTable()
    technos: Techno[]

    @OneToMany(() => ProjectImage, (projectImage) => projectImage.project, {
        cascade: true,
        eager: true,
    })
    projectImage: ProjectImage[]
}
