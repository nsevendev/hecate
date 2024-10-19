import { IsOptional, IsString, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateConditionGeneralDto {
  @IsString()
  @ApiProperty({ example: 'Titre', description: 'Titre de la condition general' })
  title: string

  @ApiProperty({ example: 'Petit intro', description: 'Introduction de la condition general' })
  @IsString()
  @IsOptional()
  intro?: string

  @ApiProperty({
    example: 'true',
    description: 'Defini si la condition est active ou pas (par defaut false)',
  })
  @IsBoolean()
  @IsOptional()
  activate?: boolean = false
}
