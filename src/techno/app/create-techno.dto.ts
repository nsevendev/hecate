import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreateTechnoDto {
    @ApiProperty({ description: 'Nom de la techno' })
    @IsString()
    @IsNotEmpty()
    name: string
}
