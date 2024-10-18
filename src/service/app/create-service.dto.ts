import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateServiceDto {
    @ApiProperty({ description: 'titre du service' })
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty({ description: 'synthèse du service proposé' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiPropertyOptional({
        description: 'Image associée au service',
        type: 'string',
        format: 'binary',
    })
    @IsOptional()
    image?: Express.Multer.File
}
