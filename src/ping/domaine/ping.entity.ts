import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Ping {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    status: number

    @Column()
    value: string
}
