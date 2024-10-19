import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'
import { ConditionGeneral } from '../../condition-general/domaine/condition-general.entity'

@Entity()
export class ArticleCg {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id de l'article cg" })
  id: number

  @Column()
  @ApiProperty({ description: "Titre de l'article" })
  title: string

  @Column()
  @ApiProperty({ description: "Sous titre de l'article" })
  description: string

  @ManyToOne(() => ConditionGeneral, (conditionGeneral) => conditionGeneral.articlecgs, {
    onDelete: 'CASCADE',
  })
  @ApiProperty({ description: "Condition general de l'article" })
  conditionGeneral: ConditionGeneral
}
