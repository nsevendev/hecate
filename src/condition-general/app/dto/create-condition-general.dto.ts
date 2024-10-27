import { IsOptional, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateConditionGeneralDto {
  @IsString()
  @ApiProperty({ example: 'Titre', description: 'Titre de la condition general' })
  title: string

  @IsString()
  @IsOptional()
  @ApiProperty({ example: 'Petit intro', description: 'Introduction de la condition general' })
  intro?: string

  @IsBoolean()
  @IsOptional()
  @ApiProperty({
    example: 'true',
    description: 'Defini si la condition est active ou pas (par defaut false)',
  })
  activate?: boolean = false
}
