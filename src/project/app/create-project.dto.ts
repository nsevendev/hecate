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

    // TODO : attention à rectifier le type, car utilisation de Multer, utilise l'implementation auto de nestjs
    @ApiPropertyOptional({
        description: 'Liste des chemins des images associées au projet',
        type: [String],
    })
    @IsOptional()
    @IsArray()
    images?: string[]
}
