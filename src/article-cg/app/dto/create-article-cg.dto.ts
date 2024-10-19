import { IsString } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class CreateArticleCgDto {
  @ApiProperty({ example: 'Titre', description: "Titre de l'article" })
  @IsString()
  title: string

  @ApiProperty({ example: 'Petit intro', description: "content de l'article" })
  @IsString()
  description?: string
}
