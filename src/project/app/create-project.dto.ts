import { ArrayUnique, IsArray, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateProjectDto {
    @ApiProperty({ description: 'Nom du projet' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ description: 'Description du projet' })
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty({
        description: 'IDs des technologies associées au projet',
        type: [Number],
    })
    @IsArray()
    @IsInt({ each: true })
    @ArrayUnique()
    technos: number[]

    @ApiPropertyOptional({
        description: 'Images du projet',
        type: 'array',
        items: {
            type: 'string',
            format: 'binary',
        },
    })
    @IsOptional()
    @IsArray()
    images?: Express.Multer.File[]
}
