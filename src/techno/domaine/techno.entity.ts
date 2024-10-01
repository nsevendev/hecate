import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Techno {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id de la techno' })
    id: number

    @Column()
    @ApiProperty({ description: 'Nom de la techno' })
    name: string
}
