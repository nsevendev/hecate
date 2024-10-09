import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Image } from 'src/image/domaine/image.entity'

@Entity()
export class Service {
    @PrimaryGeneratedColumn()
    @ApiProperty({ description: 'id du service' })
    id: number

    @Column()
    @ApiProperty({ description: 'titre du service' })
    title: string

    @Column()
    @ApiProperty({ description: 'synthèse du service proposé' })
    description: string

    @OneToOne(() => Image, (image) => image.service, {
        cascade: true,
        eager: true,
        nullable: true,
    })
    image?: Image
}
