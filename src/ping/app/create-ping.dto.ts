import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsString } from 'class-validator'

export class CreatePingDto {
    @IsNumber()
    @ApiProperty({ example: 200, description: 'Le status est lier au status de la response' })
    status: number

    @IsString()
    @ApiProperty({ example: 'OK', description: 'Petit text donnant une phrase positive' })
    value: string
}
