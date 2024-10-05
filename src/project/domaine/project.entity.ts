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
    @ApiProperty({ description: 'Liste des technos associées au projet' })
    technos: Techno[]

    @OneToMany(() => ProjectImage, (projectImage) => projectImage.project, {
        eager: true,
        nullable: true,
    })
    @ApiProperty({ description: 'Liste des images associées au projet' })
    projectImage?: ProjectImage[]
}
