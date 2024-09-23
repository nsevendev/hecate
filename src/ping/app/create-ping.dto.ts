import { IsNumber, IsString } from 'class-validator'

export class CreatePingDto {
    @IsNumber()
    status: number

    @IsString()
    value: string
}
