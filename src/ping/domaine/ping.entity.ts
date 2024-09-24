import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Ping {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id du ping' })
    id: number

    @Column()
    @ApiProperty({ description: 'Le status est lier au status de la response' })
    status: number

    @Column()
    @ApiProperty({ description: 'Petit text donnant une phrase positive' })
    value: string
}
