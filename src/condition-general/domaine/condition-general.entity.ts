import { Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class ConditionGeneral {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'id de la condition general' })
  id: number
}
