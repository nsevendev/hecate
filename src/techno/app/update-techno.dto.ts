import { ApiPropertyOptional } from '@nestjs/swagger'
import { ArrayUnique, IsArray, IsOptional } from 'class-validator'
import { CreateTechnoDto } from './create-techno.dto'

export class UpdateTechnoDto extends CreateTechnoDto {
    @ApiPropertyOptional({
        description: 'Liste des ids des projects associées',
        type: [Number],
    })
    @IsOptional()
    @IsArray()
    @ArrayUnique()
    projects?: number[]
}
