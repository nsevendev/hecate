import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class ArticleCg {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id de l'article cg" })
  id: number
}
