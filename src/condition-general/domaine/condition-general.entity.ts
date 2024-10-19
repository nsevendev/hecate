import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ArticleCg } from '../../article-cg/domaine/article-cg.entity'

@Entity('condition_general')
export class ConditionGeneral {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id de la condition general' })
  id: number

  @Column()
  @ApiProperty({ description: 'Titre de la condition general' })
  title: string

  @Column()
  @ApiProperty({ description: 'Sous titre de la condition genereal' })
  intro?: string

  @OneToMany(() => ArticleCg, (articlecgs) => articlecgs.conditionGeneral, {
    eager: true,
    cascade: true,
    nullable: true,
  })
  @ApiProperty({ description: 'Liste des articles de la condition general' })
  articlecgs?: ArticleCg[]
}
