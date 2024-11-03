import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "ID de l'utilisateur" })
  id: number

  @Column()
  @ApiProperty({ description: "Nom d'utilisateur de l'utilisateur", required: true })
  username: string

  @Column()
  @ApiProperty({ description: "Email de l'utilisateur", required: true })
  email: string

  @Column()
  @ApiProperty({ description: 'Mot de passe', required: true })
  password: string
}
