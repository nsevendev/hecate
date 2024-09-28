import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: "id de l'image" })
    id: number

    @Column()
    @ApiProperty({ description: "Le chemin de l'image, relier à un S3 ou autre" })
    path: string
}
