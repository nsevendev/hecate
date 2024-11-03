import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'ID du rôle' })
  id: number

  @Column()
  @ApiProperty({ description: 'Nom du rôle', required: true })
  name: string
}
